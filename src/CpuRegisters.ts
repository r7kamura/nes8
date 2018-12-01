import { Uint16, Uint8 } from "./types";

const enum StatusIndex {
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
    return this.maskStatusBit(StatusIndex.Break);
  }

  set break(value: boolean) {
    this.toggleStatusBit(StatusIndex.Break, value);
  }

  get carry(): boolean {
    return this.maskStatusBit(StatusIndex.Carry);
  }

  set carry(value: boolean) {
    this.toggleStatusBit(StatusIndex.Carry, value);
  }

  get interrupt(): boolean {
    return this.maskStatusBit(StatusIndex.Interrupt);
  }

  set interrupt(value: boolean) {
    this.toggleStatusBit(StatusIndex.Interrupt, value);
  }

  get negative(): boolean {
    return this.maskStatusBit(StatusIndex.Negative);
  }

  set negative(value: boolean) {
    this.toggleStatusBit(StatusIndex.Negative, value);
  }

  get overflow(): boolean {
    return this.maskStatusBit(StatusIndex.Overflow);
  }

  set overflow(value: boolean) {
    this.toggleStatusBit(StatusIndex.Overflow, value);
  }

  get zero(): boolean {
    return this.maskStatusBit(StatusIndex.Zero);
  }

  set zero(value: boolean) {
    this.toggleStatusBit(StatusIndex.Zero, value);
  }

  private maskStatusBit(index: StatusIndex): boolean {
    return (this.status & (1 << index)) !== 0;
  }

  private toggleStatusBit(index: StatusIndex, value: boolean) {
    const maskedByte = 1 << index;
    if (value) {
      this.status |= maskedByte;
    } else {
      this.status &= ~maskedByte;
    }
  }
}
