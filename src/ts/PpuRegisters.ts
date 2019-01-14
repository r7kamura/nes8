import { composeBit, getBit } from "./bitUtilities";
import { Uint16, Uint8 } from "./types";

const enum PpuControlIndex {
  HorizontalIncrement = 2,
  SpritePatternTableAddressBanked,
  BackgroundPatternTableAddressBanked,
  SpriteTall,
  MasterSlave,
  VBlankIrqEnabled
}

const enum PpuMaskIndex {
  LeftBackgroundEnabled = 1,
  LeftSpriteEnabled,
  BackgroundEnabled,
  SpriteEnabled
}

const enum PpuStatusIndex {
  SpriteOverflow = 5,
  SpriteHit,
  InVBlank
}

export default class PpuRegisters {
  public control: Uint8;

  public mask: Uint8;

  public oamAddress: Uint8;

  // 15 bits
  // yyy NN YYYYY XXXXX
  // ||| || ||||| +++++-- coarse X scroll
  // ||| || +++++-------- coarse Y scroll
  // ||| ++-------------- nametable select
  // +++----------------- fine Y scroll
  public currentVideoRamAddress: Uint16;

  // 15 bits
  public temporaryVideoRamAddress: Uint16;

  // 3 bits
  public fineXScroll: Uint8;

  private status: Uint8;

  private writeToggle: boolean;

  constructor() {
    this.control = 0;
    this.currentVideoRamAddress = 0;
    this.fineXScroll = 0;
    this.mask = 0;
    this.oamAddress = 0;
    this.status = 0;
    this.temporaryVideoRamAddress = 0;
    this.writeToggle = false;
  }

  get backgroundEnabled(): boolean {
    return getBit(this.mask, PpuMaskIndex.BackgroundEnabled);
  }

  get backgroundPatternTableAddressBanked(): boolean {
    return getBit(
      this.control,
      PpuControlIndex.BackgroundPatternTableAddressBanked
    );
  }

  get horizontalIncrement(): boolean {
    return getBit(this.control, PpuControlIndex.HorizontalIncrement);
  }

  get inVBlank(): boolean {
    return getBit(this.status, PpuStatusIndex.InVBlank);
  }

  set inVBlank(value: boolean) {
    this.status = composeBit(this.status, PpuStatusIndex.InVBlank, value);
  }

  get leftBackgroundEnabled(): boolean {
    return getBit(this.mask, PpuMaskIndex.LeftBackgroundEnabled);
  }

  get leftSpriteEnabled(): boolean {
    return getBit(this.mask, PpuMaskIndex.LeftSpriteEnabled);
  }

  get spriteEnabled(): boolean {
    return getBit(this.mask, PpuMaskIndex.SpriteEnabled);
  }

  set spriteHit(value: boolean) {
    this.status = composeBit(this.status, PpuStatusIndex.SpriteHit, value);
  }

  set spriteOverflow(value: boolean) {
    this.status = composeBit(this.status, PpuStatusIndex.SpriteOverflow, value);
  }

  get spritePatternTableAddressBanked(): boolean {
    return getBit(
      this.control,
      PpuControlIndex.SpritePatternTableAddressBanked
    );
  }

  get spriteTall(): boolean {
    return getBit(this.control, PpuControlIndex.SpriteTall);
  }

  get vBlankInterruptEnabled(): boolean {
    return getBit(this.control, PpuControlIndex.VBlankIrqEnabled);
  }

  // @return {Integer} 0-3
  public baseNameTableId(): Uint8 {
    return this.control & 0b11;
  }

  public getStatus(): Uint8 {
    const value = this.status;
    this.inVBlank = false;
    this.writeToggle = false;
    return value;
  }

  public incrementVideoRamAddress() {
    this.currentVideoRamAddress += this.horizontalIncrement ? 32 : 1;
  }

  public writeScroll(value: Uint8) {
    if (this.writeToggle) {
      this.temporaryVideoRamAddress =
        (this.temporaryVideoRamAddress & 0b1000111111111111) |
        ((value & 0b00000111) << 12);
      this.temporaryVideoRamAddress =
        (this.temporaryVideoRamAddress & 0b1111110000011111) |
        ((value & 0b11111000) << 2);
    } else {
      this.temporaryVideoRamAddress =
        (this.temporaryVideoRamAddress & 0b1111111111100000) | (value >> 3);
      this.fineXScroll = value & 0b00000111;
    }
    this.writeToggle = !this.writeToggle;
  }

  public writeVideoRamAddress(value: Uint8) {
    if (this.writeToggle) {
      this.temporaryVideoRamAddress =
        (this.temporaryVideoRamAddress & 0b1111111100000000) | value;
      this.currentVideoRamAddress = this.temporaryVideoRamAddress;
    } else {
      this.temporaryVideoRamAddress =
        (this.temporaryVideoRamAddress & 0b1000000011111111) |
        ((value & 0b00111111) << 8);
    }
    this.writeToggle = !this.writeToggle;
  }
}
