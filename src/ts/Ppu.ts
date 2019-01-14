import { getBit } from "./bitUtilities";
import Image from "./Image";
import InterruptLine from "./InterruptLine";
import IRenderer from "./IRenderer";
import PpuBus from "./PpuBus";
import PpuRegisters from "./PpuRegisters";
import Ram from "./Ram";
import { Uint16, Uint8 } from "./types";

const TILE_HEIGHT = 8;
const TILE_WIDTH = 8;

const WINDOW_HEIGHT = 240;
const WINDOW_WIDTH = 256;

const SPRITES_RAM_BYTESIZE = 256;
const MAX_SPRITES_COUNT = 64;

export default class Ppu {
  // 0 - 340
  private cycle: number;

  // Frame counter to switch behavior by even/odd.
  private frame: number;

  // 0 - 261
  private line: number;

  private image: Image;

  private registers: PpuRegisters;

  private spriteRam: Ram;

  // Represents Uint64 by 2 number instances.
  private tileData1: number;
  private tileData2: number;

  // For $2007 PPUDATA.
  private bufferedData: Uint8;

  // For background temporary values.
  private attributeByte: Uint8;
  private highTileByte: Uint8;
  private lowTileByte: Uint8;
  private nameTableByte: Uint8;

  private nmiDelay: number;
  private nmiPrevious: boolean;

  private spriteIndexes: number[];
  private spritePatterns: number[];
  private spritePositions: number[];
  private spritePriorities: number[];

  // How many sprites will be rendered in the next scanline (0-8).
  private spritesCount: number;

  constructor(
    private bus: PpuBus,
    private interruptLine: InterruptLine,
    private renderer: IRenderer
  ) {
    this.cycle = 240;
    this.frame = 0;
    this.line = 340;

    this.image = new Image(WINDOW_WIDTH, WINDOW_HEIGHT);
    this.registers = new PpuRegisters();
    this.spriteRam = new Ram(SPRITES_RAM_BYTESIZE);
    this.tileData1 = 0;
    this.tileData2 = 0;

    this.bufferedData = 0;

    this.attributeByte = 0;
    this.highTileByte = 0;
    this.lowTileByte = 0;
    this.nameTableByte = 0;

    this.nmiDelay = 0;
    this.nmiPrevious = false;

    this.spriteIndexes = [];
    this.spritePatterns = [];
    this.spritePositions = [];
    this.spritePriorities = [];
    this.spritesCount = 0;
  }

  public read(address: Uint16): Uint8 {
    switch (address) {
      case 0x0002: {
        return this.readStatus();
      }
      case 0x0004: {
        return this.readOamData();
      }
      case 0x0007: {
        return this.readData();
      }
      default: {
        return 0;
      }
    }
  }

  // Executes 1 PPU cycle.
  public step() {
    this.tick();

    const renderingEnabled =
      this.registers.backgroundEnabled || this.registers.spriteEnabled;
    const onVisibleLine = this.line < 240;
    const onPreRenderLine = this.line === 261;
    const onRenderLine = onPreRenderLine || onVisibleLine;
    const onVisibleCycle = this.cycle >= 1 && this.cycle <= 256;
    const onPreFetchCycle = this.cycle >= 321 && this.cycle <= 336;
    const onFetchCycle = onPreFetchCycle || onVisibleCycle;

    if (renderingEnabled) {
      if (onVisibleLine && onVisibleCycle) {
        this.renderPixel();
      }
      if (onRenderLine && onFetchCycle) {
        this.updateBackgroundRelatedData();
      }
      if (onPreRenderLine && this.cycle >= 280 && this.cycle <= 304) {
        this.copyY();
      }
      if (onRenderLine) {
        if (onFetchCycle && this.cycle % 8 === 0) {
          this.incrementX();
        }
        if (this.cycle === 256) {
          this.incrementY();
        } else if (this.cycle === 257) {
          this.copyX();
        }
      }

      if (this.cycle === 257) {
        if (onVisibleLine) {
          this.evaluateSprites();
        } else {
          this.spritesCount = 0;
        }
      }
    }

    if (this.line === 241 && this.cycle === 1) {
      this.setVBlank();
      this.renderImage();
    }

    if (onPreRenderLine && this.cycle === 1) {
      this.clearVBlank();
      this.registers.spriteHit = false;
      this.registers.spriteOverflow = false;
    }
  }

  public transferSpriteData(index: number, value: Uint8) {
    const address = (this.registers.oamAddress + index) & 0xff;
    this.spriteRam.write(address, value);
  }

  public write(address: Uint16, value: Uint8) {
    switch (address) {
      case 0x0000: {
        this.writeControl(value);
        break;
      }
      case 0x0001: {
        this.writeMask(value);
        break;
      }
      case 0x0003: {
        this.writeOamAddress(value);
        break;
      }
      case 0x0004: {
        this.writeOamData(value);
        break;
      }
      case 0x0005: {
        this.writeScroll(value);
        break;
      }
      case 0x0006: {
        this.writeVideoRamAddress(value);
        break;
      }
      case 0x0007: {
        this.writeData(value);
        break;
      }
      default: {
        throw new Error(`Invalid PPU write address: ${address}`);
      }
    }
  }

  // 0-15
  private backgroundPaletteIndex(): number {
    if (this.registers.backgroundEnabled) {
      return (
        (this.tileData2 >> ((7 - this.registers.fineXScroll) * 4)) & 0b1111
      );
    } else {
      return 0;
    }
  }

  private clearCoarseXScroll() {
    this.registers.currentVideoRamAddress &= 0b1111111111100000;
  }

  private clearFineYScroll() {
    this.registers.currentVideoRamAddress &= 0b1000111111111111;
  }

  private clearVBlank() {
    this.registers.inVBlank = false;
    this.nmiChange();
  }

  private coarseXScroll(): number {
    return this.registers.currentVideoRamAddress & 0b11111;
  }

  private coarseYScroll(): number {
    return (this.registers.currentVideoRamAddress >> 5) & 0b11111;
  }

  // Copies horizontal information from temporary VRAM address to current VRAM address,
  // such as coarse X scroll and horizontal bit of name table select.
  private copyX() {
    this.registers.currentVideoRamAddress =
      (this.registers.currentVideoRamAddress & 0b1111101111100000) |
      (this.registers.temporaryVideoRamAddress & 0b0000010000011111);
  }

  // Copies vertical information from temporary VRAM address to current VRAM address,
  // such as fine Y scroll, coarse Y scroll, and vertical bit of name table select.
  private copyY() {
    this.registers.currentVideoRamAddress =
      (this.registers.currentVideoRamAddress & 0b1000010000011111) |
      (this.registers.temporaryVideoRamAddress & 0b0111101111100000);
  }

  // Scans which sprites to render on the next scanline during visible scanlines.
  // See https://wiki.nesdev.com/w/index.php/PPU_sprite_evaluation for more details.
  private evaluateSprites() {
    const spriteHeight = this.spriteHeight();
    let spritesCount = 0;
    for (let i = 0; i < MAX_SPRITES_COUNT; i++) {
      const y = this.spriteRam.read(i * 4 + 0);
      const patternIndex = this.spriteRam.read(i * 4 + 1);
      const attributes = this.spriteRam.read(i * 4 + 2);
      const x = this.spriteRam.read(i * 4 + 3);
      let rowInPattern = this.line - y;
      if (rowInPattern < 0 || rowInPattern >= spriteHeight) {
        continue; // Because this sprite is not related to this scanline.
      }
      if (spritesCount < 8) {
        const verticallyMirrored = (attributes & 0b10000000) === 0b10000000;
        const horizontallyMirrored = (attributes & 0b01000000) === 0b01000000;
        if (verticallyMirrored) {
          rowInPattern = spriteHeight - 1 - rowInPattern;
        }
        const address =
          (this.registers.spritePatternTableAddressBanked ? 0x1000 : 0) +
          patternIndex * TILE_HEIGHT * 2 +
          rowInPattern;
        let lowTileByte = this.bus.read(address);
        let highTileByte = this.bus.read(address + TILE_HEIGHT);
        const attributeMask = (attributes & 0b11) << 2;
        let tileData = 0;
        for (let j = 0; j < TILE_WIDTH; j++) {
          let bitMask1;
          let bitMask2;
          if (horizontallyMirrored) {
            bitMask1 = lowTileByte & 1;
            bitMask2 = (highTileByte & 1) << 1;
            lowTileByte >>= 1;
            highTileByte >>= 1;
          } else {
            bitMask1 = (lowTileByte & 0b10000000) >> 7;
            bitMask2 = (highTileByte & 0b10000000) >> 6;
            lowTileByte <<= 1;
            highTileByte <<= 1;
          }
          tileData <<= 4;
          tileData |= attributeMask | bitMask2 | bitMask1;
        }
        this.spritePatterns[spritesCount] = tileData;
        this.spritePositions[spritesCount] = x;
        this.spritePriorities[spritesCount] = (attributes >> 5) & 1;
        this.spriteIndexes[spritesCount] = i;
      }
      spritesCount++;
    }
    if (spritesCount > 8) {
      this.registers.spriteOverflow = true;
    }
    this.spritesCount = spritesCount > 8 ? 8 : spritesCount;
  }

  // Selects sprite size from 8x8 or 8x16 and returns its height.
  private spriteHeight(): number {
    return this.registers.spriteTall ? 16 : 8;
  }

  private fetchAttributeTableByte(): Uint8 {
    const v = this.registers.currentVideoRamAddress;
    const address =
      0x23c0 |
      (v & 0b0000110000000000) |
      ((v >> 4) & 0b111000) |
      ((v >> 2) & 0b111);
    return this.bus.read(address);
  }

  private fetchHighTileByte(): Uint8 {
    return this.bus.read(this.lowTileByteAddress() + TILE_HEIGHT);
  }

  private fetchLowTileByte(): Uint8 {
    return this.bus.read(this.lowTileByteAddress());
  }

  private fetchNameTableByte(): Uint8 {
    const address = 0x2000 | (this.registers.currentVideoRamAddress & 0x0fff);
    return this.bus.read(address);
  }

  private fineYScroll(): number {
    return (this.registers.currentVideoRamAddress >> 12) & 0b111;
  }

  // Moves X-position by 8 px.
  private incrementX() {
    if (this.coarseXScroll() === 31) {
      this.clearCoarseXScroll();
      this.toggleHorizontalNameTableSelect();
    } else {
      this.registers.currentVideoRamAddress++;
    }
  }

  // Moves Y-position by 1 px.
  private incrementY() {
    if (this.fineYScroll() < 7) {
      this.registers.currentVideoRamAddress += 0b0001000000000000;
    } else {
      this.clearFineYScroll();
      const coarseYScroll = this.coarseYScroll();
      switch (coarseYScroll) {
        case 29: {
          this.setCoarseYScroll(0);
          this.toggleVerticalNameTableSelect();
          break;
        }
        case 31: {
          this.setCoarseYScroll(0);
          break;
        }
        default: {
          this.setCoarseYScroll(coarseYScroll + 1);
        }
      }
    }
  }

  private lowTileByteAddress(): Uint16 {
    return (
      (this.registers.backgroundPatternTableAddressBanked ? 0x1000 : 0) +
      this.nameTableByte * TILE_HEIGHT * 2 +
      this.fineYScroll()
    );
  }

  private nmiChange() {
    const nmi =
      this.registers.vBlankInterruptEnabled && this.registers.inVBlank;
    if (nmi && !this.nmiPrevious) {
      this.nmiDelay = 15;
    }
    this.nmiPrevious = nmi;
  }

  private paletteDataRequested(): boolean {
    return this.registers.currentVideoRamAddress % 0x4000 >= 0x3f00;
  }

  private readColorCode(index: Uint8): Uint8 {
    return this.bus.read(0x3f00 + index);
  }

  private readControl(): Uint8 {
    return this.registers.control;
  }

  private readData(): Uint8 {
    const readValue = this.bus.read(this.registers.currentVideoRamAddress);
    let returnedValue;
    if (this.paletteDataRequested()) {
      returnedValue = readValue;
      this.bufferedData = this.bus.read(
        this.registers.currentVideoRamAddress - 0x1000
      );
    } else {
      returnedValue = this.bufferedData;
      this.bufferedData = readValue;
    }
    this.registers.incrementVideoRamAddress();
    return returnedValue;
  }

  private readMask(): Uint8 {
    return this.registers.mask;
  }

  private readOamData(): Uint8 {
    return this.spriteRam.read(this.registers.oamAddress);
  }

  private readStatus(): Uint8 {
    const value = this.registers.getStatus();
    this.nmiChange();
    return value;
  }

  private renderImage() {
    this.renderer.render(this.image);
  }

  private renderPixel() {
    const x = this.cycle - 1;
    const y = this.line;
    const backgroundPaletteIndex =
      x >= 8 || this.registers.leftBackgroundEnabled
        ? this.backgroundPaletteIndex()
        : 0;
    const sprite = this.spritePaletteIndex();
    const i = sprite[0];
    const spritePaletteIndex =
      x >= 8 || this.registers.leftSpriteEnabled ? sprite[1] : 0;
    let index: number;
    const b = backgroundPaletteIndex % 4 !== 0;
    const s = spritePaletteIndex % 4 !== 0;
    if (b) {
      if (s) {
        if (this.spriteIndexes[i] === 0 && x < 255) {
          this.registers.spriteHit = true;
        }
        if (this.spritePriorities[i] === 0) {
          index = spritePaletteIndex | 0x10;
        } else {
          index = backgroundPaletteIndex;
        }
      } else {
        index = backgroundPaletteIndex;
      }
    } else {
      if (s) {
        index = spritePaletteIndex | 0x10;
      } else {
        index = 0;
      }
    }
    this.image.write(x, y, this.readColorCode(index));
  }

  private setCoarseYScroll(value: number) {
    this.registers.currentVideoRamAddress =
      (this.registers.currentVideoRamAddress & 0b1111110000011111) |
      (value << 5);
  }

  private setVBlank() {
    this.registers.inVBlank = true;
    this.nmiChange();
  }

  // @returns {number} An Integer from 0 to 15.
  private spritePaletteIndex(): [number, number] {
    if (this.registers.spriteEnabled) {
      for (let i = 0; i < this.spritesCount; i++) {
        const offset = this.cycle - 1 - this.spritePositions[i];
        if (offset < 0 || offset > 7) {
          continue;
        }
        const paletteIndex =
          (this.spritePatterns[i] >> ((7 - offset) * 4)) & 0b1111;
        if (paletteIndex % 4 === 0) {
          continue;
        }
        return [i, paletteIndex];
      }
    }
    return [0, 0];
  }

  private storeTileData() {
    let tileData = 0;
    const v = this.registers.currentVideoRamAddress;
    const shift = ((v >> 4) & 0b100) | (v & 0b10);
    const attributeMask = ((this.attributeByte >> shift) & 0b11) << 2;
    for (let i = 0; i < TILE_WIDTH; i++) {
      const bit1Mask = (this.lowTileByte & 0b10000000) >> 7;
      const bit2Mask = (this.highTileByte & 0b10000000) >> 6;
      this.lowTileByte <<= 1;
      this.highTileByte <<= 1;
      tileData <<= 4;
      tileData |= attributeMask | bit2Mask | bit1Mask;
    }
    this.tileData1 = tileData;
  }

  // Updates cycle, line, and frame.
  private tick() {
    if (this.nmiDelay > 0) {
      this.nmiDelay--;
      if (
        this.nmiDelay === 0 &&
        this.registers.vBlankInterruptEnabled &&
        this.registers.inVBlank
      ) {
        this.interruptLine.nmi = true;
      }
    }

    if (
      (this.registers.backgroundEnabled || this.registers.spriteEnabled) &&
      this.frame % 2 === 1 &&
      this.line === 261 &&
      this.cycle === 339
    ) {
      this.cycle = 0;
      this.line = 0;
      this.frame++;
      return;
    }
    this.cycle++;
    if (this.cycle > 340) {
      this.cycle = 0;
      this.line++;
      if (this.line > 261) {
        this.line = 0;
        this.frame++;
      }
    }
  }

  private toggleHorizontalNameTableSelect() {
    this.registers.currentVideoRamAddress ^= 0b0000010000000000;
  }

  private toggleVerticalNameTableSelect() {
    this.registers.currentVideoRamAddress ^= 0b0000100000000000;
  }

  private updateBackgroundRelatedData() {
    this.tileData2 <<= 4;
    this.tileData2 |= (this.tileData1 >> 28) & 0b1111;
    this.tileData1 <<= 4;
    switch (this.cycle % 8) {
      case 0: {
        this.storeTileData();
        break;
      }
      case 1: {
        this.nameTableByte = this.fetchNameTableByte();
        break;
      }
      case 3: {
        this.attributeByte = this.fetchAttributeTableByte();
        break;
      }
      case 5: {
        this.lowTileByte = this.fetchLowTileByte();
        break;
      }
      case 7: {
        this.highTileByte = this.fetchHighTileByte();
        break;
      }
    }
  }

  private writeControl(value: Uint8) {
    this.registers.control = value;
    this.nmiChange();
    this.registers.temporaryVideoRamAddress =
      (this.registers.temporaryVideoRamAddress & 0b1111001111111111) |
      ((value & 0b00000011) << 10);
  }

  private writeData(value: Uint8) {
    this.bus.write(this.registers.currentVideoRamAddress, value);
    this.registers.incrementVideoRamAddress();
  }

  private writeMask(value: Uint8) {
    this.registers.mask = value;
  }

  private writeOamAddress(value: Uint8) {
    this.registers.oamAddress = value;
  }

  private writeOamData(value: Uint8) {
    this.spriteRam.write(this.registers.oamAddress, value);
    this.registers.oamAddress = (this.registers.oamAddress + 1) & 0xff;
  }

  private writeScroll(value: Uint8) {
    this.registers.writeScroll(value);
  }

  private writeVideoRamAddress(value: Uint8) {
    this.registers.writeVideoRamAddress(value);
  }
}
