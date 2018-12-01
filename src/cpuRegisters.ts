import { Uint8, Uint16 } from './types';

export default class CpuRegisters {
  accumulator: Uint8;
  indexX: Uint8;
  indexY: Uint8;
  programCounter: Uint16;
  stackPointer: Uint16;
  status: Uint8;

  constructor() {
    this.accumulator = 0;
    this.indexX = 0;
    this.indexY = 0;
    this.programCounter = 0;
    this.stackPointer = 0;
    this.status = 0;
  }
}
