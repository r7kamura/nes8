import AddressingMode from "./addressingMode";
import CpuBus from "./cpuBus";
import CpuRegisters from "./cpuRegisters";
import InterruptLine from "./interruptLine";
import IOperation from "./ioperation";
import OperationName from "./OperationName";
import operations from "./operations";
import { Uint16, Uint8 } from "./types";

export default class Cpu {
  public branched: boolean;

  public crossed: boolean;

  public registers: CpuRegisters;

  constructor(private bus: CpuBus, private interruptLine: InterruptLine) {
    this.branched = false;
    this.crossed = false;
    this.registers = new CpuRegisters();
  }

  // @returns {number} Cycles count elapsed in this step.
  public step(): number {
    this.scanIrqAndNmi();
    const operation = this.fetchOperation();
    this.execute(
      this.fetchOperand(operation.addressingMode),
      operation.addressingMode,
      operation.name
    );
    const cyclesCount =
      operation.cycle + (this.branched ? 1 : 0) + (this.crossed ? 1 : 0);
    this.branched = false;
    this.crossed = false;
    return cyclesCount;
  }

  public reset() {
    this.handleReset();
  }

  private branch(address: Uint16) {
    this.branched = true;
    this.registers.programCounter = address;
  }

  private execute(
    operand: Uint8 | undefined,
    addressingMode: AddressingMode,
    operationName: OperationName
  ) {
    // TODO
  }

  private fetch(): Uint16 {
    return this.read(this.registers.programCounter++);
  }

  private fetchOperand(addressingMode: AddressingMode): Uint8 | undefined {
    switch (addressingMode) {
      case "absolute": {
        return this.fetchWord();
      }
      case "absolute_x": {
        const baseAddress = this.fetchWord();
        const result = baseAddress + this.registers.indexX;
        this.crossed = (baseAddress & 0xff00) !== (result & 0xff00);
        return result & 0xffff;
      }
      case "absolute_y": {
        const baseAddress = this.fetchWord();
        const result = baseAddress + this.registers.indexY;
        this.crossed = (baseAddress & 0xff00) !== (result & 0xff00);
        return result & 0xffff;
      }
      case "accumulator": {
        return;
      }
      case "immediate": {
        return this.fetch();
      }
      case "implied": {
        return;
      }
      case "indirect_absolute": {
        const address = this.fetchWord();
        const low = this.read(address);
        const high = this.read((address & 0xff00) | ((address + 1) & 0xff));
        return low + (high << 8);
      }
      case "pre_indexed_indirect": {
        const baseAddress = (this.fetch() + this.registers.indexX) & 0xff;
        const result = this.readWord(baseAddress);
        this.crossed = (result & 0xff00) !== (baseAddress & 0xff00);
        return result;
      }
      case "post_indexed_indirect": {
        const baseAddress = this.fetch();
        const result =
          (this.readWord(baseAddress) + this.registers.indexY) & 0xffff;
        this.crossed = (result & 0xff00) !== (baseAddress & 0xff00);
        return result;
      }
      case "relative": {
        const int8 = this.fetch();
        const offset = int8 >= 0x80 ? int8 - 256 : int8;
        const result = this.registers.programCounter + offset;
        this.crossed =
          (result & 0xff00) !== (this.registers.programCounter & 0xff00);
        return result;
      }
      case "zero_page": {
        return this.fetch();
      }
      case "zero_page_x": {
        return (this.fetch() + this.registers.indexX) & 0xff;
      }
      case "zero_page_y": {
        return (this.fetch() + this.registers.indexY) & 0xff;
      }
    }
  }

  private fetchOperation(): IOperation {
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

  private handleIrq() {
    // TODO
  }

  private handleNmi() {
    // TODO
  }

  private handleReset() {
    this.registers.accumulator = 0;
    this.registers.indexX = 0;
    this.registers.indexY = 0;
    this.registers.programCounter = this.readWord(0xfffc);
    this.registers.stackPointer = 0x01fd;
    this.registers.status = 0b00110100;
  }

  private read(address: Uint16): Uint8 {
    return this.bus.read(address);
  }

  private readWord(address: Uint16): Uint16 {
    const low = this.read(address);
    const high = this.read((address + 1) & 0xff);
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
