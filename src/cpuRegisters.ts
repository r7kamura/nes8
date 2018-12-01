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

  get carry(): boolean {
    return this.maskStatusBit(StatusIndex.Carry);
  }

  get interrupt(): boolean {
    return this.maskStatusBit(StatusIndex.Interrupt);
  }

  get negative(): boolean {
    return this.maskStatusBit(StatusIndex.Negative);
  }

  get overflow(): boolean {
    return this.maskStatusBit(StatusIndex.Overflow);
  }

  get zero(): boolean {
    return this.maskStatusBit(StatusIndex.Zero);
  }

  set break(value: boolean) {
    this.toggleStatusBit(StatusIndex.Break, value);
  }

  set carry(value: boolean) {
    this.toggleStatusBit(StatusIndex.Carry, value);
  }

  set interrupt(value: boolean) {
    this.toggleStatusBit(StatusIndex.Interrupt, value);
  }

  set negative(value: boolean) {
    this.toggleStatusBit(StatusIndex.Negative, value);
  }

  set overflow(value: boolean) {
    this.toggleStatusBit(StatusIndex.Overflow, value);
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
