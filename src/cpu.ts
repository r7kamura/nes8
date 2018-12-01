import AddressingMode from './addressingMode';
import CpuBus from './cpuBus';
import CpuRegisters from './cpuRegisters';
import InterruptLine from './interruptLine';
import Operation from './operation';
import OperationName from './OperationName';
import operations from './operations'
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

  private branch(address: Uint16) {
    this.branched = true;
    this.registers.programCounter = address;
  }

  // @todo
  private execute(operand: Uint8 | undefined, addressingMode: AddressingMode, operationName: OperationName) {}

  private fetch(): Uint16 {
    return this.read(this.registers.programCounter++);
  }

  private fetchOperand(addressingMode: AddressingMode): Uint8 | undefined {
    switch (addressingMode) {
      case 'absolute': {
        return this.fetchWord();
      }
      case 'absolute_x': {
        const baseAddress = this.fetchWord();
        const result = baseAddress + this.registers.indexX;
        this.crossed = (baseAddress & 0xFF00) !== (result & 0xFF00);
        return result & 0xFFFF;
      }
      case 'absolute_y': {
        const baseAddress = this.fetchWord();
        const result = baseAddress + this.registers.indexY;
        this.crossed = (baseAddress & 0xFF00) !== (result & 0xFF00);
        return result & 0xFFFF;
      }
      case 'accumulator': {
        return;
      }
      case 'immediate': {
        return this.fetch();
      }
      case 'implied': {
        return;
      }
      case 'indirect_absolute': {
        const address = this.fetchWord();
        const low = this.read(address);
        const high = this.read((address & 0xFF00) | ((address + 1) & 0xFF));
        return low + (high << 8);
      }
      case 'pre_indexed_indirect': {
        const baseAddress = (this.fetch() + this.registers.indexX) & 0xFF;
        const result = this.readWord(baseAddress);
        this.crossed = (result & 0xFF00) !== (baseAddress & 0xFF00);
        return result;
      }
      case 'post_indexed_indirect': {
        const baseAddress = this.fetch();
        const result = (this.readWord(baseAddress) + this.registers.indexY) & 0xFFFF;
        this.crossed = (result & 0xFF00) !== (baseAddress & 0xFF00);
        return result;
      }
      case 'relative': {
        const int8 = this.fetch();
        const offset = int8 >= 0x80 ? int8 - 256 : int8;
        const result = this.registers.programCounter + offset;
        this.crossed = (result & 0xFF00) !== (this.registers.programCounter & 0xFF00);
        return result;
      }
      case 'zero_page': {
        return this.fetch();
      }
      case 'zero_page_x': {
        return (this.fetch() + this.registers.indexX) & 0xFF;
      }
      case 'zero_page_y': {
        return (this.fetch() + this.registers.indexY) & 0xFF;
      }
    }
  }

  private fetchOperation(): Operation {
    const opcode = this.fetch();
    const operation = operations[opcode];
    if (operation) {
      return operation;
    } else {
      throw new Error(`Unknown opcode: ${opcode}`);
    }
  }

  private fetchWord(): Uint16 {
    return this.fetch() | (this.fetch() << 8);
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
    const low = this.read(address);
    const high = this.read((address + 1) & 0xFF);
    return low + (high << 8);
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
