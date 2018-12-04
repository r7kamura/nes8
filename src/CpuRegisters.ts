import { Uint16, Uint8 } from "./types";

const enum CpuStatusIndex {
  Carry,
  Zero,
  Interrupt,
  Decimal,
  Break,
  Reserved,
  Overflow,
  Negative
}

export default class CpuRegisters {
  public accumulator: Uint8;
  public indexX: Uint8;
  public indexY: Uint8;
  public programCounter: Uint16;
  public stackPointer: Uint16;
  public status: Uint8;

  constructor() {
    this.accumulator = 0;
    this.indexX = 0;
    this.indexY = 0;
    this.programCounter = 0;
    this.stackPointer = 0;
    this.status = 0;
  }

  get break(): boolean {
    return this.maskStatusBit(CpuStatusIndex.Break);
  }

  set break(value: boolean) {
    this.toggleStatusBit(CpuStatusIndex.Break, value);
  }

  get carry(): boolean {
    return this.maskStatusBit(CpuStatusIndex.Carry);
  }

  set carry(value: boolean) {
    this.toggleStatusBit(CpuStatusIndex.Carry, value);
  }

  get decimal(): boolean {
    return this.maskStatusBit(CpuStatusIndex.Decimal);
  }

  set decimal(value: boolean) {
    this.toggleStatusBit(CpuStatusIndex.Decimal, value);
  }

  get interrupt(): boolean {
    return this.maskStatusBit(CpuStatusIndex.Interrupt);
  }

  set interrupt(value: boolean) {
    this.toggleStatusBit(CpuStatusIndex.Interrupt, value);
  }

  get negative(): boolean {
    return this.maskStatusBit(CpuStatusIndex.Negative);
  }

  set negative(value: boolean) {
    this.toggleStatusBit(CpuStatusIndex.Negative, value);
  }

  get overflow(): boolean {
    return this.maskStatusBit(CpuStatusIndex.Overflow);
  }

  set overflow(value: boolean) {
    this.toggleStatusBit(CpuStatusIndex.Overflow, value);
  }

  get reserved(): boolean {
    return this.maskStatusBit(CpuStatusIndex.Reserved);
  }

  set reserved(value: boolean) {
    this.toggleStatusBit(CpuStatusIndex.Reserved, value);
  }

  get zero(): boolean {
    return this.maskStatusBit(CpuStatusIndex.Zero);
  }

  set zero(value: boolean) {
    this.toggleStatusBit(CpuStatusIndex.Zero, value);
  }

  private maskStatusBit(index: CpuStatusIndex): boolean {
    return (this.status & (1 << index)) !== 0;
  }

  private toggleStatusBit(index: CpuStatusIndex, value: boolean) {
    const maskedByte = 1 << index;
    if (value) {
      this.status |= maskedByte;
    } else {
      this.status &= ~maskedByte;
    }
  }
}
