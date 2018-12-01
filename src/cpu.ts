import CpuBus from './cpuBus';
import CpuRegisters from './cpuRegisters';
import InterruptLine from './interruptLine';
import { Uint8, Uint16 } from './types';

export default class Cpu {
  registers: CpuRegisters;

  constructor(private bus: CpuBus, private interruptLine: InterruptLine) {
    this.registers = new CpuRegisters();
  }

  // @todo
  step(): number {
    this.scanIrqAndNmi();
    return 1;
  }

  reset() {
    this.handleReset();
  }

  // @todo
  private handleIrq() {}

  // @todo
  private handleNmi() {}

  private handleReset() {
    this.registers.accumulator = 0;
    this.registers.indexX = 0;
    this.registers.indexY = 0;
    this.registers.programCounter = this.readWord(0xFFFC);
    this.registers.stackPointer = 0x01FD;
    this.registers.status = 0b00110100;
  }

  private read(address: Uint16): Uint8 {
    return this.bus.read(address);
  }

  private readWord(address: Uint16): Uint16 {
    return this.read(address) | (this.read((address + 1) & 0xFFFF) << 8);
  }

  private scanIrqAndNmi() {
    if (this.interruptLine.nmi) {
      this.handleNmi();
    }

    if (this.registers.interrupt && this.interruptLine.irq) {
      this.handleIrq();
    }
  }
}
