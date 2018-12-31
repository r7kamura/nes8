import { getBit } from "./bitUtilities";
import Image from "./Image";
import InterruptLine from "./InterruptLine";
import IRenderer from "./IRenderer";
import PpuBus from "./PpuBus";
import PpuRegisters from "./PpuRegisters";
import Ram from "./Ram";
import { Uint16, Uint8 } from "./types";

const ATTRIBUTE_TABLE_ELEMENT_HEIGHT = 32;
const ATTRIBUTE_TABLE_ELEMENT_WIDTH = 32;

const BLOCK_HEIGHT = 16;
const BLOCK_WIDTH = 16;

const TILE_HEIGHT = 8;
const TILE_WIDTH = 8;

const WINDOW_HEIGHT = 240;
const WINDOW_WIDTH = 256;

const H_BLANK_LENGTH = 101;
const V_BLANK_LENGTH = 21;

const SPRITES_RAM_BYTESIZE = 256;

const NAME_TABLE_ADDRESS_OFFSET = 0x2000;

export default class Ppu {
  private cycle: number;

  private line: number;

  private image: Image;

  private registers: PpuRegisters;

  private spriteRam: Ram;

  private videoRamReadingBuffer: Uint8;

  constructor(
    private bus: PpuBus,
    private interruptLine: InterruptLine,
    private renderer: IRenderer
  ) {
    this.cycle = 0;
    this.image = new Image(WINDOW_WIDTH, WINDOW_HEIGHT);
    this.line = 0;
    this.registers = new PpuRegisters();
    this.spriteRam = new Ram(SPRITES_RAM_BYTESIZE);
    this.videoRamReadingBuffer = 0x00;
  }

  public read(address: Uint16): Uint8 {
    switch (address) {
      case 0x0000: {
        return this.registers.control;
      }
      case 0x0001: {
        return this.registers.mask;
      }
      case 0x0002: {
        return this.registers.getStatus();
      }
      case 0x0004: {
        return this.spriteRam.read(this.registers.spriteRamAddress);
      }
      case 0x0007: {
        return this.readFromVideoRamForCpu();
      }
      default: {
        return 0;
      }
    }
  }

  public step() {
    if (this.onDrawableCycle()) {
      this.drawBackground8pixels();
    }
    if (this.onRightEndCycle()) {
      this.cycle = 0;
      if (this.onBottomEndLine()) {
        this.line = 0;
        this.interruptLine.nmi = false;
        this.registers.spriteHit = false;
        this.registers.inVBlank = false;
        this.drawSprites();
        this.renderImage();
      } else {
        this.line++;
        this.registers.spriteHit = this.onSpriteHit();
        if (this.onLineToStartVBlank()) {
          this.registers.inVBlank = true;
          if (this.registers.vBlankInterruptEnabled) {
            this.interruptLine.nmi = true;
          }
        }
      }
    } else {
      this.cycle++;
    }
  }

  public transferSpriteData(index: number, value: Uint8) {
    const address = (this.registers.spriteRamAddress + index) & 0xff;
    this.spriteRam.write(address, value);
  }

  public write(address: Uint16, value: Uint8) {
    switch (address) {
      case 0x0000: {
        this.registers.control = value;
        break;
      }
      case 0x0001: {
        this.registers.mask = value;
        break;
      }
      case 0x0003: {
        this.registers.spriteRamAddress = value;
        break;
      }
      case 0x0004: {
        this.writeToSpriteRamForCpu(value);
        break;
      }
      case 0x0005: {
        this.registers.scroll = value;
        break;
      }
      case 0x0006: {
        this.registers.setVideoRamAddress(value);
        break;
      }
      case 0x0007: {
        this.writeToVideoRamForCpu(value);
        break;
      }
      default: {
        throw new Error(`Invalid PPU write address: ${address}`);
      }
    }
  }

  private backgroundPatternIndex(): number {
    return (
      (this.yOfTile() % 30) * 32 +
      (this.xOfTile() % 32) +
      this.patternPagingOffset()
    );
  }

  private blockPositionId(): number {
    return (this.xOfBlock() % 2) + (this.yOfBlock() % 2) * 2;
  }

  private calculateAttributeIndex(): number {
    return (
      this.xInAttributeTable() * 8 +
      this.yInAttributeTable() +
      this.patternPagingOffset()
    );
  }

  private drawBackground8pixels() {
    const patternIndex = this.readBackgroundPatternIndex();
    const patternLineLowAddress =
      TILE_HEIGHT * 2 * patternIndex + this.yInTile();
    const patternLineLowByte = this.readBackgroundPatternLine(
      patternLineLowAddress
    );
    const patternLineHighByte = this.readBackgroundPatternLine(
      patternLineLowAddress + TILE_HEIGHT
    );
    const paletteId = this.readPaletteId();
    for (let xInPattern = 0; xInPattern < TILE_WIDTH; xInPattern++) {
      const patternLineByteIndex = TILE_WIDTH - 1 - xInPattern;
      const paletteIndex =
        (getBit(patternLineLowByte, patternLineByteIndex) ? 1 : 0) |
        ((getBit(patternLineHighByte, patternLineByteIndex) ? 1 : 0) << 1) |
        (paletteId << 2);
      this.image.write(
        this.x() + xInPattern,
        this.y(),
        this.readColorCodeForBackground(paletteIndex)
      );
    }
  }

  private drawSprites() {
    for (
      let baseAddress = 0;
      baseAddress < SPRITES_RAM_BYTESIZE;
      baseAddress += 4
    ) {
      const spriteY = this.spriteRam.read(baseAddress);
      const patternIndex = this.spriteRam.read(baseAddress + 1);
      const attributeByte = this.spriteRam.read(baseAddress + 2);
      const spriteX = this.spriteRam.read(baseAddress + 3);

      const paletteId = attributeByte & 0b11;
      const reversedHorizontally = getBit(attributeByte, 6);
      const reversedVertically = getBit(attributeByte, 7);

      for (let yInPattern = 0; yInPattern < TILE_HEIGHT; yInPattern++) {
        const patternLineLowByteAddress =
          TILE_HEIGHT * 2 * patternIndex + yInPattern;
        const patternLineHighByteAddress =
          patternLineLowByteAddress + TILE_HEIGHT;
        const patternLineLowByte = this.readSpritePatternLine(
          patternLineLowByteAddress
        );
        const patternLineHighByte = this.readSpritePatternLine(
          patternLineHighByteAddress
        );
        for (let xInPattern = 0; xInPattern < TILE_WIDTH; xInPattern++) {
          const patternLineByteIndex = TILE_WIDTH - 1 - xInPattern;
          const paletteIndex =
            (getBit(patternLineLowByte, patternLineByteIndex) ? 1 : 0) |
            ((getBit(patternLineHighByte, patternLineByteIndex) ? 1 : 0) << 1) |
            (paletteId << 2);
          if (paletteIndex % 4 !== 0) {
            this.image.write(
              spriteX +
                (reversedHorizontally
                  ? TILE_WIDTH - 1 - xInPattern
                  : xInPattern),
              spriteY +
                (reversedVertically
                  ? TILE_HEIGHT - 1 - yInPattern
                  : yInPattern),
              this.readColorCodeForSprite(paletteIndex)
            );
          }
        }
      }
    }
  }

  private inVisibleWindow(): boolean {
    return (
      this.x() >= 0 &&
      this.x() < WINDOW_WIDTH &&
      this.y() >= 0 &&
      this.y() < WINDOW_HEIGHT
    );
  }

  private onBottomEndLine(): boolean {
    return this.line === WINDOW_HEIGHT + V_BLANK_LENGTH - 1;
  }

  private onDrawableCycle(): boolean {
    return this.inVisibleWindow() && this.x() % 8 === 0;
  }

  private onLineToStartVBlank(): boolean {
    return this.line === WINDOW_HEIGHT;
  }

  private onRightEndCycle(): boolean {
    return this.cycle === WINDOW_WIDTH + H_BLANK_LENGTH - 1;
  }

  private onSpriteHit(): boolean {
    return (
      this.spriteRam.read(0) === this.yWithScroll() &&
      this.registers.backgroundEnabled &&
      this.registers.spriteEnabled
    );
  }

  private paletteDataRequested(): boolean {
    return this.registers.videoRamAddress % 0x4000 >= 0x3f00;
  }

  private patternPage(): number {
    return (
      Math.floor(this.xWithScroll() / WINDOW_WIDTH) +
      Math.floor(this.yWithScroll() / WINDOW_HEIGHT) * 2
    );
  }

  private patternPagingOffset(): number {
    return this.patternPage() * 0x0400;
  }

  private readAttribute(): Uint8 {
    return this.bus.read(0x23c0 + this.calculateAttributeIndex());
  }

  private readBackgroundPatternIndex(): Uint16 {
    return this.bus.read(
      NAME_TABLE_ADDRESS_OFFSET +
        this.registers.baseNameTableId() * 0x0400 +
        this.backgroundPatternIndex()
    );
  }

  private readBackgroundPatternLine(address: Uint16): Uint8 {
    const offset = this.registers.backgroundPatternTableAddressBanked
      ? 0x1000
      : 0x0000;
    return this.bus.read(offset + address);
  }

  private readColorCodeForBackground(index: Uint8): Uint8 {
    return this.bus.read(0x3f00 + index);
  }

  private readColorCodeForSprite(index: Uint8): Uint8 {
    return this.bus.read(0x3f10 + index);
  }

  private readFromVideoRamForCpu(): Uint8 {
    const readValue = this.bus.read(this.registers.videoRamAddress);
    let returnedValue;
    if (this.paletteDataRequested()) {
      returnedValue = readValue;
      this.videoRamReadingBuffer = this.bus.read(
        this.registers.videoRamAddress - 0x1000
      );
    } else {
      returnedValue = this.videoRamReadingBuffer;
      this.videoRamReadingBuffer = readValue;
    }
    this.registers.incrementVideoRamAddress();
    return returnedValue;
  }

  private readPaletteId(): number {
    return (this.readAttribute() >> (this.blockPositionId() * 2)) & 0b11;
  }

  private readSpritePatternLine(address: Uint16): Uint8 {
    const offset = this.registers.spritePatternTableAddressBanked
      ? 0x1000
      : 0x0000;
    return this.bus.read(offset + address);
  }

  private renderImage() {
    this.renderer.render(this.image);
  }

  private writeToSpriteRamForCpu(value: Uint8) {
    this.spriteRam.write(this.registers.spriteRamAddress, value);
    this.registers.spriteRamAddress++;
    this.registers.spriteRamAddress &= 0xff;
  }

  private writeToVideoRamForCpu(value: Uint8) {
    this.bus.write(this.registers.videoRamAddress, value);
    this.registers.incrementVideoRamAddress();
  }

  private x(): number {
    return this.cycle - 1;
  }

  private xInAttributeTable(): number {
    return Math.floor(
      (this.xWithScroll() % WINDOW_WIDTH) / ATTRIBUTE_TABLE_ELEMENT_WIDTH
    );
  }

  private xInTile(): number {
    return this.xWithScroll() % TILE_WIDTH;
  }

  private xOfBlock(): number {
    return Math.floor((this.xWithScroll() % WINDOW_WIDTH) / BLOCK_WIDTH);
  }

  private xOfTile(): number {
    return Math.floor(this.xWithScroll() / TILE_WIDTH);
  }

  private xWithScroll(): number {
    return this.x() + this.registers.scrollX;
  }

  private y(): number {
    return this.line;
  }

  private yInAttributeTable(): number {
    return Math.floor(
      (this.yWithScroll() % WINDOW_HEIGHT) / ATTRIBUTE_TABLE_ELEMENT_HEIGHT
    );
  }

  private yInTile(): number {
    return this.yWithScroll() % TILE_HEIGHT;
  }

  private yOfBlock(): number {
    return Math.floor((this.yWithScroll() % WINDOW_HEIGHT) / BLOCK_HEIGHT);
  }

  private yOfTile(): number {
    return Math.floor(this.yWithScroll() / TILE_HEIGHT);
  }

  private yWithScroll(): number {
    return this.y() + this.registers.scrollY;
  }
}
