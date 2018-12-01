import AddressingMode from './addressingMode';
import CpuBus from './cpuBus';
import CpuRegisters from './cpuRegisters';
import InterruptLine from './interruptLine';
import Operation from './operation';
import { Uint8, Uint16 } from './types';

export default class Cpu {
  branched: boolean;

  crossed: boolean;

  registers: CpuRegisters;

  constructor(private bus: CpuBus, private interruptLine: InterruptLine) {
    this.branched = false;
    this.crossed = false;
    this.registers = new CpuRegisters();
  }

  // @returns {number} Cycles count elapsed in this step.
  step(): number {
    this.scanIrqAndNmi();
    const operation = this.fetchOperation();
    this.execute(
      this.fetchOperand(operation.addressingMode),
      operation.addressingMode,
      operation.name
    );
    const cyclesCount = operation.cycle + (this.branched ? 1 : 0) + (this.crossed ? 1 : 0);
    this.branched = false;
    this.crossed = false;
    return cyclesCount;
  }

  reset() {
    this.handleReset();
  }

  // @todo
  private execute(operand: Uint8, addressingMode: AddressingMode, operationName: string) {}

  // @todo
  private fetchOperand(addressingMode: AddressingMode): Uint8 {
    return 0;
  }

  // @todo
  private fetchOperation(): Operation {
    return {
      addressingMode: 'immediate',
      cycle: 1,
      name: 'dummy',
    };
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
