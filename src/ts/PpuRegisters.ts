import { composeBit, getBit } from "./bitUtilities";
import { Uint16, Uint8 } from "./types";

const enum PpuControlIndex {
  HorizontalIncrement = 2,
  SpritePatternTableAddressBanked = 3,
  BackgroundPatternTableAddressBanked = 4,
  VBlankIrqEnabled = 7
}

const enum PpuMaskIndex {
  BackgroundEnabled = 3,
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

  public scrollX: Uint8;

  public scrollY: Uint8;

  public videoRamAddress: Uint16;

  private buffer: Uint8;

  private latch: boolean;

  private status: Uint8;

  constructor() {
    this.control = 0;
    this.mask = 0;
    this.status = 0;

    this.scrollX = 0;
    this.scrollY = 0;

    this.oamAddress = 0;
    this.videoRamAddress = 0;

    this.buffer = 0;
    this.latch = false;
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

  set inVBlank(value: boolean) {
    this.status = composeBit(this.status, PpuStatusIndex.InVBlank, value);
  }

  set scroll(value: Uint8) {
    if (this.latch) {
      this.scrollX = this.buffer;
      this.scrollY = value;
    } else {
      this.buffer = value;
    }
    this.latch = !this.latch;
  }

  get spriteEnabled(): boolean {
    return getBit(this.mask, PpuMaskIndex.SpriteEnabled);
  }

  set spriteHit(value: boolean) {
    this.status = composeBit(this.status, PpuStatusIndex.SpriteHit, value);
  }

  get spritePatternTableAddressBanked(): boolean {
    return getBit(
      this.control,
      PpuControlIndex.SpritePatternTableAddressBanked
    );
  }

  get vBlankInterruptEnabled(): boolean {
    return getBit(this.control, PpuControlIndex.VBlankIrqEnabled);
  }

  public baseNameTableId(): Uint8 {
    return this.control & 0b11;
  }

  public getStatus(): Uint8 {
    const value = this.status;
    this.inVBlank = false;
    this.latch = false;
    return value;
  }

  public incrementVideoRamAddress() {
    this.videoRamAddress += this.horizontalIncrement ? 32 : 1;
  }

  public setVideoRamAddress(value: Uint8) {
    if (this.latch) {
      this.videoRamAddress = value + (this.buffer << 8);
    } else {
      this.buffer = value;
    }
    this.latch = !this.latch;
  }
}
