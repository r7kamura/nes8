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
    this.spriteRam = new Ram(256);
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
        return this.registers.status;
      }
      case 0x0004: {
        return this.readFromSpriteRam(this.registers.spriteRamAddress);
      }
      case 0x0007: {
        return this.readFromVideoRamForCpu();
      }
      default: {
        throw new Error(`Invalid PPU read address: ${address}`);
      }
    }
  }

  public step() {
    this.callbackBeforeCycleIncremented();
    if (this.onRightEndCycle()) {
      this.cycle = 0;
      this.callbackAfterCycleCleared();
    } else {
      this.cycle++;
    }
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
      Math.floor(this.yWithScroll() / TILE_HEIGHT) * 32 +
      Math.floor(this.xWithScroll() / TILE_WIDTH) +
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

  private callbackAfterCycleCleared() {
    if (this.onBottomEndLine()) {
      this.line = 0;
      this.callbackAfterLineCleared();
    } else {
      this.line++;
      this.callbackAfterLineIncremented();
    }
  }

  private callbackAfterLineCleared() {
    this.interruptLine.nmi = false;
    this.registers.spriteHit = false;
    this.registers.inVBlank = false;
    this.drawSprites();
    this.renderImage();
  }

  private callbackAfterLineIncremented() {
    this.registers.spriteHit = this.onSpriteHit();
    if (this.onLineToStartVBlank()) {
      this.registers.inVBlank = true;
      if (this.registers.vBlankInterruptEnabled) {
        this.interruptLine.nmi = true;
      }
    }
  }

  private callbackBeforeCycleIncremented() {
    if (this.inVisibleWindow() && this.x() % 8 === 0) {
      this.drawBackground8pixels();
    }
  }

  private drawBackground8pixels() {
    const patternIndex = this.readBackgroundPatternIndex();
    const patternLineLowAddress =
      TILE_HEIGHT * 2 * patternIndex + this.yInTile();
    const patternLineLow = this.readBackgroundPatternLine(
      patternLineLowAddress
    );
    const patternLineHigh = this.readBackgroundPatternLine(
      patternLineLowAddress + TILE_HEIGHT
    );
    const paletteId = this.readPaletteId();
    for (let xInPattern = 0; xInPattern < TILE_WIDTH; xInPattern++) {
      const patternLineIndex = TILE_WIDTH - 1 - xInPattern;
      const paletteIndex =
        (getBit(patternLineLow, patternLineIndex) ? 1 : 0) |
        ((getBit(patternLineHigh, patternLineIndex) ? 1 : 0) << 1) |
        (paletteId << 2);
      this.image.write(
        this.x() + xInPattern,
        this.y(),
        this.readColorCode(paletteIndex)
      );
    }
  }

  private drawSprites() {
    // TODO
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

  private onLineToStartVBlank(): boolean {
    return this.line === WINDOW_HEIGHT;
  }

  private onRightEndCycle(): boolean {
    return this.cycle === WINDOW_WIDTH + H_BLANK_LENGTH - 1;
  }

  private onSpriteHit(): boolean {
    return (
      this.readFromSpriteRam(0) === this.yWithScroll() &&
      this.registers.backgroundEnabled &&
      this.registers.spriteEnabled
    );
  }

  private paletteDataRequested(): boolean {
    const address = this.registers.videoRamAddress % 0x4000;
    return address >= 0x3f00 && address < 0x3f20;
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
    return this.bus.read(this.calculateAttributeIndex());
  }

  private readBackgroundPatternIndex(): Uint16 {
    return this.bus.read(
      0x2000 +
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

  private readColorCode(index: Uint8): Uint8 {
    return this.bus.read(0x3f00 + index);
  }

  private readFromSpriteRam(address: Uint16): Uint8 {
    return this.spriteRam.read(address);
  }

  private readFromVideoRamForCpu(): Uint8 {
    let value;
    if (this.paletteDataRequested()) {
      value = this.bus.read(this.registers.videoRamAddress);
      this.videoRamReadingBuffer = this.bus.read(
        this.registers.videoRamAddress - 0x1000
      );
    } else {
      value = this.videoRamReadingBuffer;
      this.videoRamReadingBuffer = this.bus.read(
        this.registers.videoRamAddress
      );
    }
    return value;
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
    const offset = this.registers.horizontalIncrement
      ? WINDOW_WIDTH / TILE_WIDTH
      : 1;
    this.registers.incrementVideoRamAddress(offset);
  }

  private x(): number {
    return this.cycle - 1;
  }

  private xInTile(): number {
    return this.xWithScroll() % TILE_WIDTH;
  }

  private xOfBlock(): number {
    return Math.floor((this.xWithScroll() % WINDOW_WIDTH) / BLOCK_WIDTH);
  }

  private xInAttributeTable(): number {
    return Math.floor(
      (this.xWithScroll() % WINDOW_WIDTH) / ATTRIBUTE_TABLE_ELEMENT_WIDTH
    );
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

  private yWithScroll(): number {
    return this.y() + this.registers.scrollY;
  }
}
