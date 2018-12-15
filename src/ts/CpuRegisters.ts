import { composeBit, getBit } from "./bitUtilities";
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
    return getBit(this.status, CpuStatusIndex.Break);
  }

  set break(value: boolean) {
    this.status = composeBit(this.status, CpuStatusIndex.Break, value);
  }

  get carry(): boolean {
    return getBit(this.status, CpuStatusIndex.Carry);
  }

  set carry(value: boolean) {
    this.status = composeBit(this.status, CpuStatusIndex.Carry, value);
  }

  get decimal(): boolean {
    return getBit(this.status, CpuStatusIndex.Decimal);
  }

  set decimal(value: boolean) {
    this.status = composeBit(this.status, CpuStatusIndex.Decimal, value);
  }

  get interrupt(): boolean {
    return getBit(this.status, CpuStatusIndex.Interrupt);
  }

  set interrupt(value: boolean) {
    this.status = composeBit(this.status, CpuStatusIndex.Interrupt, value);
  }

  get negative(): boolean {
    return getBit(this.status, CpuStatusIndex.Negative);
  }

  set negative(value: boolean) {
    this.status = composeBit(this.status, CpuStatusIndex.Negative, value);
  }

  get overflow(): boolean {
    return getBit(this.status, CpuStatusIndex.Overflow);
  }

  set overflow(value: boolean) {
    this.status = composeBit(this.status, CpuStatusIndex.Overflow, value);
  }

  get reserved(): boolean {
    return getBit(this.status, CpuStatusIndex.Reserved);
  }

  set reserved(value: boolean) {
    this.status = composeBit(this.status, CpuStatusIndex.Reserved, value);
  }

  get zero(): boolean {
    return getBit(this.status, CpuStatusIndex.Zero);
  }

  set zero(value: boolean) {
    this.status = composeBit(this.status, CpuStatusIndex.Zero, value);
  }

  private toggleStatusBit(index: CpuStatusIndex, value: boolean) {
    this.status = composeBit(this.status, index, value);
  }
}
