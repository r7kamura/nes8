import AddressingMode from "./AddressingMode";
import CpuBus from "./CpuBus";
import CpuRegisters from "./CpuRegisters";
import InterruptLine from "./InterruptLine";
import IOperation from "./IOperation";
import OperationName from "./OperationName";
import operations from "./operations";
import { Uint16, Uint8 } from "./types";

function isCarry(value: number): boolean {
  return value > 0xff;
}

function isNegative(value: number): boolean {
  return (value & 0x80) !== 0;
}

function isOverflowOnAddition(
  left: Uint8,
  right: Uint8,
  result: number
): boolean {
  return isSameSign(left, right) && !isSameSign(left, result);
}

function isOverflowOnSubtraction(
  left: Uint8,
  right: Uint8,
  result: number
): boolean {
  return !isSameSign(left, result) && !isSameSign(left, right);
}

function isSameSign(a: Uint8, b: Uint8): boolean {
  return !isNegative(a ^ b);
}

function isZero(value: number): boolean {
  return (value & 0xff) === 0;
}

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
    operand: Uint16 | undefined,
    addressingMode: AddressingMode,
    operationName: OperationName
  ) {
    switch (operationName) {
      case "ADC": {
        this.executeADC(operand!, addressingMode);
        break;
      }
      case "AND": {
        this.executeAND(operand!, addressingMode);
        break;
      }
      case "ASL": {
        this.executeASL(operand!, addressingMode);
        break;
      }
      case "BCC": {
        this.executeBCC(operand!);
        break;
      }
      case "BCS": {
        this.executeBCS(operand!);
        break;
      }
      case "BEQ": {
        this.executeBEQ(operand!);
        break;
      }
      case "BIT": {
        this.executeBIT(operand!);
        break;
      }
      case "BMI": {
        this.executeBMI(operand!);
        break;
      }
      case "BNE": {
        this.executeBNE(operand!);
        break;
      }
      case "BPL": {
        this.executeBPL(operand!);
        break;
      }
      case "BRK": {
        this.executeBRK();
        break;
      }
      case "BVC": {
        this.executeBVC(operand!, addressingMode);
        break;
      }
      case "BVS": {
        this.executeBVS(operand!);
        break;
      }
      case "CLC": {
        this.executeCLC();
        break;
      }
      case "CLD": {
        this.executeCLD();
        break;
      }
      case "CLI": {
        this.executeCLI();
        break;
      }
      case "CLV": {
        this.executeCLV();
        break;
      }
      case "CMP": {
        this.executeCMP(operand!, addressingMode);
        break;
      }
      case "CPX": {
        this.executeCPX(operand!, addressingMode);
        break;
      }
      case "CPY": {
        this.executeCPY(operand!, addressingMode);
        break;
      }
      case "DCP": {
        this.executeDCP(operand!);
        break;
      }
      case "DEC": {
        this.executeDEC(operand!);
        break;
      }
      case "DEX": {
        this.executeDEX(operand!);
        break;
      }
      case "DEY": {
        this.executeDEY(operand!);
        break;
      }
      case "EOR": {
        this.executeEOR(operand!, addressingMode);
        break;
      }
      case "INC": {
        this.executeINC(operand!);
        break;
      }
      case "INX": {
        this.executeINX(operand!);
        break;
      }
      case "INY": {
        this.executeINY(operand!);
        break;
      }
      case "ISB": {
        this.executeISB(operand!);
        break;
      }
      case "JMP": {
        this.executeJMP(operand!);
        break;
      }
      case "JSR": {
        this.executeJSR(operand!);
        break;
      }
      case "LAX": {
        this.executeLAX(operand!);
        break;
      }
      case "LDA": {
        this.executeLDA(operand!, addressingMode);
        break;
      }
      case "LDX": {
        this.executeLDX(operand!, addressingMode);
        break;
      }
      case "LDY": {
        this.executeLDY(operand!, addressingMode);
        break;
      }
      case "LSR": {
        this.executeLSR(operand!, addressingMode);
        break;
      }
      case "NOP": {
        this.executeNOP();
        break;
      }
      case "NOPD": {
        this.executeNOPD();
        break;
      }
      case "NOPI": {
        this.executeNOPI();
        break;
      }
      case "ORA": {
        this.executeORA(operand!, addressingMode);
        break;
      }
      case "PHA": {
        this.executePHA();
        break;
      }
      case "PHP": {
        this.executePHP();
        break;
      }
      case "PLA": {
        this.executePLA();
        break;
      }
      case "PLP": {
        this.executePLP();
        break;
      }
      case "RLA": {
        this.executeRLA(operand!);
        break;
      }
      case "ROL": {
        this.executeROL(operand!, addressingMode);
        break;
      }
      case "ROR": {
        this.executeROR(operand!, addressingMode);
        break;
      }
      case "RRA": {
        this.executeRRA(operand!);
        break;
      }
      case "RTI": {
        this.executeRTI();
        break;
      }
      case "RTS": {
        this.executeRTS();
        break;
      }
      case "SAX": {
        this.executeSAX(operand!);
        break;
      }
      case "SBC": {
        this.executeSBC(operand!, addressingMode);
        break;
      }
      case "SEC": {
        this.executeSEC();
        break;
      }
      case "SED": {
        this.executeSED();
        break;
      }
      case "SEI": {
        this.executeSEI();
        break;
      }
      case "SLO": {
        this.executeSLO(operand!);
        break;
      }
      case "SRE": {
        this.executeSRE(operand!);
        break;
      }
      case "STA": {
        this.executeSTA(operand!);
        break;
      }
      case "STX": {
        this.executeSTX(operand!);
        break;
      }
      case "STY": {
        this.executeSTY(operand!);
        break;
      }
      case "TAX": {
        this.executeTAX();
        break;
      }
      case "TAY": {
        this.executeTAY();
        break;
      }
      case "TSX": {
        this.executeTSX();
        break;
      }
      case "TXA": {
        this.executeTXA();
        break;
      }
      case "TXS": {
        this.executeTXS();
        break;
      }
      case "TYA": {
        this.executeTYA();
        break;
      }
      default: {
        const exhaustiveCheck: never = operationName;
      }
    }
  }

  private executeADC(operand: Uint16, addressingMode: AddressingMode) {
    operand = this.resolveOperand(operand, addressingMode);
    const result =
      this.registers.accumulator + operand + (this.registers.carry ? 1 : 0);
    this.registers.carry = isCarry(result);
    this.registers.negative = isNegative(result);
    this.registers.overflow = isOverflowOnAddition(
      this.registers.accumulator,
      operand,
      result
    );
    this.registers.zero = isZero(result);
    this.registers.accumulator = result & 0xff;
  }

  private executeAND(operand: Uint16, addressingMode: AddressingMode) {
    operand = this.resolveOperand(operand, addressingMode);
    const result = operand & this.registers.accumulator;
    this.registers.negative = isNegative(result);
    this.registers.zero = isZero(result);
    this.registers.accumulator = result;
  }

  private executeASL(operand: Uint16, addressingMode: AddressingMode) {
    if (addressingMode === "accumulator") {
      const value = this.registers.accumulator;
      const result = value << 1;
      this.registers.carry = isCarry(result);
      this.registers.negative = isNegative(result);
      this.registers.zero = isZero(result);
      this.registers.accumulator = result & 0xff;
    } else {
      const value = this.bus.read(operand);
      const result = value << 1;
      this.registers.carry = isCarry(result);
      this.registers.negative = isNegative(result);
      this.registers.zero = isZero(result);
      this.bus.write(operand, result & 0xff);
    }
  }

  private executeBCC(operand: Uint16) {
    if (!this.registers.carry) {
      this.branch(operand);
    }
  }

  private executeBCS(operand: Uint16) {
    if (this.registers.carry) {
      this.branch(operand);
    }
  }

  private executeBEQ(operand: Uint16) {
    if (this.registers.zero) {
      this.branch(operand);
    }
  }

  private executeBIT(operand: Uint16) {
    const value = this.bus.read(operand);
    const result = this.registers.accumulator & value;
    this.registers.negative = isNegative(value);
    this.registers.overflow = (value & 0x40) !== 0;
    this.registers.zero = isZero(result);
  }

  private executeBMI(operand: Uint16) {
    if (this.registers.negative) {
      this.branch(operand);
    }
  }

  private executeBNE(operand: Uint16) {
    if (!this.registers.zero) {
      this.branch(operand);
    }
  }

  private executeBPL(operand: Uint16) {
    if (!this.registers.negative) {
      this.branch(operand);
    }
  }

  private executeBRK() {
    this.registers.break = true;
    this.registers.programCounter++;
    this.pushWord(this.registers.programCounter);
    this.push(this.registers.status);
    if (!this.registers.interrupt) {
      this.registers.interrupt = true;
      this.registers.programCounter = this.readWord(0xfffe);
    }
    this.registers.programCounter--;
  }

  private executeBVC(operand: Uint16, addressingMode: AddressingMode) {
    if (!this.registers.overflow) {
      this.branch(operand);
    }
  }

  private executeBVS(operand: Uint16) {
    if (this.registers.overflow) {
      this.branch(operand);
    }
  }

  private executeCLC() {
    this.registers.carry = false;
  }

  private executeCLD() {
    this.registers.decimal = false;
  }

  private executeCLI() {
    this.registers.interrupt = false;
  }

  private executeCLV() {
    this.registers.overflow = false;
  }

  private executeCMP(operand: Uint16, addressingMode: AddressingMode) {
    operand = this.resolveOperand(operand, addressingMode);
    const result = this.registers.accumulator - operand;
    this.registers.carry = result >= 0;
    this.registers.negative = isNegative(result);
    this.registers.zero = isZero(result);
  }

  private executeCPX(operand: Uint16, addressingMode: AddressingMode) {
    operand = this.resolveOperand(operand, addressingMode);
    const result = this.registers.indexX - operand;
    this.registers.carry = result >= 0;
    this.registers.negative = isNegative(result);
    this.registers.zero = isZero(result);
  }

  private executeCPY(operand: Uint16, addressingMode: AddressingMode) {
    operand = this.resolveOperand(operand, addressingMode);
    const result = this.registers.indexY - operand;
    this.registers.carry = result >= 0;
    this.registers.negative = isNegative(result);
    this.registers.zero = isZero(result);
  }

  private executeDCP(operand: Uint16) {
    const result = (this.bus.read(operand) - 1) & 0xff;
    const subResult = (this.registers.accumulator - result) & 0xff;
    this.registers.negative = isNegative(subResult);
    this.registers.zero = isZero(subResult);
    this.bus.write(operand, result);
  }

  private executeDEC(operand: Uint16) {
    const result = (this.bus.read(operand) - 1) & 0xff;
    this.registers.negative = isNegative(result);
    this.registers.zero = isZero(result);
    this.bus.write(operand, result);
  }

  private executeDEX(operand: Uint16) {
    const result = (this.registers.indexX - 1) & 0xff;
    this.registers.negative = isNegative(result);
    this.registers.zero = isZero(result);
    this.registers.indexX = result;
  }

  private executeDEY(operand: Uint16) {
    const result = (this.registers.indexY - 1) & 0xff;
    this.registers.negative = isNegative(result);
    this.registers.zero = isZero(result);
    this.registers.indexY = result;
  }

  private executeEOR(operand: Uint16, addressingMode: AddressingMode) {
    operand = this.resolveOperand(operand, addressingMode);
    const result = (operand ^ this.registers.accumulator) & 0xff;
    this.registers.negative = isNegative(result);
    this.registers.zero = isZero(result);
    this.registers.accumulator = result;
  }

  private executeINC(operand: Uint16) {
    const result = (this.bus.read(operand) + 1) & 0xff;
    this.registers.negative = isNegative(result);
    this.registers.zero = isZero(result);
    this.bus.write(operand, result);
  }

  private executeINX(operand: Uint16) {
    const result = (this.registers.indexX + 1) & 0xff;
    this.registers.negative = isNegative(result);
    this.registers.zero = isZero(result);
    this.registers.indexX = result;
  }

  private executeINY(operand: Uint16) {
    const result = (this.registers.indexY + 1) & 0xff;
    this.registers.negative = isNegative(result);
    this.registers.zero = isZero(result);
    this.registers.indexY = result;
  }

  private executeISB(operand: Uint16) {
    const value = (this.bus.read(operand) + 1) & 0xff;
    const result =
      (~value & 0xff) +
      this.registers.accumulator +
      (this.registers.carry ? 1 : 0);
    this.registers.overflow = isOverflowOnAddition(
      this.registers.accumulator,
      value,
      result
    );
    this.registers.carry = isCarry(result);
    this.registers.negative = isNegative(result);
    this.registers.zero = isZero(result);
    this.registers.accumulator = result & 0xff;
    this.bus.write(operand, value);
  }

  private executeJMP(operand: Uint16) {
    this.registers.programCounter = operand;
  }

  private executeJSR(operand: Uint16) {
    this.pushWord(this.registers.programCounter - 1);
    this.registers.programCounter = operand;
  }

  private executeLAX(operand: Uint16) {
    const result = this.bus.read(operand);
    this.registers.negative = isNegative(result);
    this.registers.zero = isZero(result);
    this.registers.accumulator = result;
    this.registers.indexX = result;
  }

  private executeLDA(operand: Uint16, addressingMode: AddressingMode) {
    operand = this.resolveOperand(operand, addressingMode);
    this.registers.negative = isNegative(operand);
    this.registers.zero = isZero(operand);
    this.registers.accumulator = operand;
  }

  private executeLDX(operand: Uint16, addressingMode: AddressingMode) {
    operand = this.resolveOperand(operand, addressingMode);
    this.registers.negative = isNegative(operand);
    this.registers.zero = isZero(operand);
    this.registers.indexX = operand;
  }

  private executeLDY(operand: Uint16, addressingMode: AddressingMode) {
    operand = this.resolveOperand(operand, addressingMode);
    this.registers.negative = isNegative(operand);
    this.registers.zero = isZero(operand);
    this.registers.indexY = operand;
  }

  private executeLSR(operand: Uint16, addressingMode: AddressingMode) {
    if (addressingMode === "accumulator") {
      const value = this.registers.accumulator;
      const result = value >> 1;
      this.registers.carry = (value & 1) === 1;
      this.registers.negative = false;
      this.registers.zero = isZero(result);
      this.registers.accumulator = result;
    } else {
      const value = this.bus.read(operand);
      const result = value >> 1;
      this.registers.carry = (value & 1) === 1;
      this.registers.negative = false;
      this.registers.zero = isZero(result);
      this.bus.write(operand, result);
    }
  }

  private executeNOP() {}

  private executeNOPD() {
    this.registers.programCounter += 1;
  }

  private executeNOPI() {
    this.registers.programCounter += 2;
  }

  private executeORA(operand: Uint16, addressingMode: AddressingMode) {
    operand = this.resolveOperand(operand, addressingMode);
    const result = this.registers.accumulator | operand;
    this.registers.negative = isNegative(result);
    this.registers.zero = isZero(result);
    this.registers.accumulator = result & 0xff;
  }

  private executePHA() {
    this.push(this.registers.accumulator);
  }

  private executePHP() {
    this.push(this.registers.status | 0x10);
  }

  private executePLA() {
    const result = this.pop();
    this.registers.negative = isNegative(result);
    this.registers.zero = isZero(result);
    this.registers.accumulator = result;
  }

  private executePLP() {
    this.registers.status = this.pop() & 0b11101111;
    this.registers.reserved = true;
  }

  private executeRLA(operand: Uint16) {
    const value =
      (this.bus.read(operand) << 1) + (this.registers.carry ? 1 : 0);
    const result = value & this.registers.accumulator;
    this.registers.carry = (value & 0x100) !== 0;
    this.registers.negative = isNegative(result);
    this.registers.zero = isZero(result);
    this.registers.accumulator = result & 0xff;
    this.bus.write(operand, value & 0xff);
  }

  private executeROL(operand: Uint16, addressingMode: AddressingMode) {
    if (addressingMode === "accumulator") {
      const value = this.registers.accumulator;
      const result = (value << 1) | (this.registers.carry ? 1 : 0);
      this.registers.carry = (value & 0x80) !== 0;
      this.registers.negative = isNegative(result);
      this.registers.zero = isZero(result);
      this.registers.accumulator = result;
    } else {
      const value = this.bus.read(operand);
      const result = (value << 1) | (this.registers.carry ? 1 : 0);
      this.registers.carry = (value & 0x80) !== 0;
      this.registers.negative = isNegative(result);
      this.registers.zero = isZero(result);
      this.bus.write(operand, result);
    }
  }

  private executeROR(operand: Uint16, addressingMode: AddressingMode) {
    if (addressingMode === "accumulator") {
      const value = this.registers.accumulator;
      const result = (value >> 1) | ((this.registers.carry ? 1 : 0) << 7);
      this.registers.carry = (value & 1) === 1;
      this.registers.negative = isNegative(result);
      this.registers.zero = isZero(result);
      this.registers.accumulator = result;
    } else {
      const value = this.bus.read(operand);
      const result = (value >> 1) | ((this.registers.carry ? 1 : 0) << 7);
      this.registers.carry = (value & 1) === 1;
      this.registers.negative = isNegative(result);
      this.registers.zero = isZero(result);
      this.bus.write(operand, result);
    }
  }

  private executeRRA(operand: Uint16) {
    const readValue = this.bus.read(operand);
    const value = (readValue >> 1) | ((this.registers.carry ? 1 : 0) << 7);
    const result = this.registers.accumulator + value + (readValue & 1);
    this.registers.carry = isCarry(result);
    this.registers.negative = isNegative(result);
    this.registers.overflow = isOverflowOnAddition(
      this.registers.accumulator,
      value,
      result
    );
    this.registers.zero = isZero(result);
    this.registers.accumulator = result & 0xff;
    this.bus.write(operand, value);
  }

  private executeRTI() {
    this.registers.status = this.pop();
    this.registers.programCounter = this.popWord();
    this.registers.reserved = true;
  }

  private executeRTS() {
    this.registers.programCounter = this.popWord();
    this.registers.programCounter++;
  }

  private executeSAX(operand: Uint16) {
    const result = this.registers.accumulator & this.registers.indexX;
    this.bus.write(operand, result);
  }

  private executeSBC(operand: Uint16, addressingMode: AddressingMode) {
    operand = this.resolveOperand(operand, addressingMode);
    const result =
      this.registers.accumulator - operand + (this.registers.carry ? 0 : -1);
    this.registers.carry = result >= 0;
    this.registers.negative = isNegative(result);
    this.registers.overflow = isOverflowOnSubtraction(
      this.registers.accumulator,
      operand,
      result
    );
    this.registers.zero = isZero(result);
    this.registers.accumulator = result & 0xff;
  }

  private executeSEC() {
    this.registers.carry = true;
  }

  private executeSED() {
    this.registers.decimal = true;
  }

  private executeSEI() {
    this.registers.interrupt = true;
  }

  private executeSLO(operand: Uint16) {
    const value = this.bus.read(operand) << 1;
    const result = this.registers.accumulator | value;
    this.registers.carry = isCarry(result);
    this.registers.negative = isNegative(result);
    this.registers.zero = isZero(result);
    this.registers.accumulator = result & 0xff;
    this.bus.write(operand, value & 0xff);
  }

  private executeSRE(operand: Uint16) {
    const readValue = this.bus.read(operand);
    const value = readValue >> 1;
    const result = this.registers.accumulator ^ value;
    this.registers.carry = (readValue & 1) === 1;
    this.registers.negative = isNegative(result);
    this.registers.zero = isZero(result);
    this.registers.accumulator = result & 0xff;
    this.bus.write(operand, value);
  }

  private executeSTA(operand: Uint16) {
    this.bus.write(operand, this.registers.accumulator);
  }

  private executeSTX(operand: Uint16) {
    this.bus.write(operand, this.registers.indexX);
  }

  private executeSTY(operand: Uint16) {
    this.bus.write(operand, this.registers.indexY);
  }

  private executeTAX() {
    const result = this.registers.accumulator;
    this.registers.negative = isNegative(result);
    this.registers.zero = isZero(result);
    this.registers.indexX = result;
  }

  private executeTAY() {
    const result = this.registers.accumulator;
    this.registers.negative = isNegative(result);
    this.registers.zero = isZero(result);
    this.registers.indexY = result;
  }

  private executeTSX() {
    const result = this.registers.stackPointer & 0xff;
    this.registers.negative = isNegative(result);
    this.registers.zero = isZero(result);
    this.registers.indexX = result;
  }

  private executeTXA() {
    const result = this.registers.indexX;
    this.registers.negative = isNegative(result);
    this.registers.zero = isZero(result);
    this.registers.accumulator = result;
  }

  private executeTXS() {
    this.registers.stackPointer = this.registers.indexX + 0x100;
  }

  private executeTYA() {
    const result = this.registers.indexY;
    this.registers.negative = isNegative(result);
    this.registers.zero = isZero(result);
    this.registers.accumulator = result;
  }

  private fetch(): Uint16 {
    return this.bus.read(this.registers.programCounter++);
  }

  private fetchOperand(
    addressingMode: AddressingMode
  ): Uint16 | Uint8 | undefined {
    switch (addressingMode) {
      case "absolute": {
        return this.fetchOperandByAbsolute();
      }
      case "absoluteX": {
        return this.fetchOperandByAbsoluteX();
      }
      case "absoluteY": {
        return this.fetchOperandByAbsoluteY();
      }
      case "accumulator": {
        return this.fetchOperandByAccumulator();
      }
      case "immediate": {
        return this.fetchOperandByImmediate();
      }
      case "implied": {
        return this.fetchOperandByImplied();
      }
      case "indirectAbsolute": {
        return this.fetchOperandByIndirectAbsolute();
      }
      case "preIndexedIndirect": {
        return this.fetchOperandByPreIndexedIndirect();
      }
      case "postIndexedIndirect": {
        return this.fetchOperandByPostIndexedIndirect();
      }
      case "relative": {
        return this.fetchOperandByRelative();
      }
      case "zeroPage": {
        return this.fetchOperandByZeroPage();
      }
      case "zeroPageX": {
        return this.fetchOperandByZeroPageX();
      }
      case "zeroPageY": {
        return this.fetchOperandByZeroPageY();
      }
      default: {
        const exhaustiveCheck: never = addressingMode;
        return;
      }
    }
  }

  private fetchOperandByAbsolute(): Uint16 {
    return this.fetchWord();
  }

  private fetchOperandByAbsoluteX(): Uint16 {
    const baseAddress = this.fetchWord();
    const result = baseAddress + this.registers.indexX;
    this.crossed = (baseAddress & 0xff00) !== (result & 0xff00);
    return result & 0xffff;
  }

  private fetchOperandByAbsoluteY(): Uint16 {
    const baseAddress = this.fetchWord();
    const result = baseAddress + this.registers.indexY;
    this.crossed = (baseAddress & 0xff00) !== (result & 0xff00);
    return result & 0xffff;
  }

  private fetchOperandByAccumulator(): undefined {
    return;
  }

  private fetchOperandByImmediate(): Uint16 {
    return this.fetch();
  }

  private fetchOperandByImplied(): undefined {
    return;
  }

  private fetchOperandByIndirectAbsolute(): Uint16 {
    const address = this.fetchWord();
    const low = this.bus.read(address);
    const high = this.bus.read((address & 0xff00) | ((address + 1) & 0xff));
    return low + (high << 8);
  }

  private fetchOperandByPreIndexedIndirect(): Uint16 {
    const baseAddress = (this.fetch() + this.registers.indexX) & 0xff;
    const result = this.readWordWithWrapAround(baseAddress);
    this.crossed = (result & 0xff00) !== (baseAddress & 0xff00);
    return result;
  }

  private fetchOperandByPostIndexedIndirect(): Uint16 {
    const baseAddress = this.fetch();
    const result =
      (this.readWordWithWrapAround(baseAddress) + this.registers.indexY) &
      0xffff;
    this.crossed = (result & 0xff00) !== (baseAddress & 0xff00);
    return result;
  }

  private fetchOperandByRelative(): Uint16 {
    const int8 = this.fetch();
    const offset = int8 >= 0x80 ? int8 - 256 : int8;
    const result = this.registers.programCounter + offset;
    this.crossed =
      (result & 0xff00) !== (this.registers.programCounter & 0xff00);
    return result;
  }

  private fetchOperandByZeroPage(): Uint8 {
    return this.fetch();
  }

  private fetchOperandByZeroPageX(): Uint8 {
    return (this.fetch() + this.registers.indexX) & 0xff;
  }

  private fetchOperandByZeroPageY(): Uint8 {
    return (this.fetch() + this.registers.indexY) & 0xff;
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
    this.interruptLine.irq = false;
    this.registers.break = false;
    this.pushWord(this.registers.programCounter);
    this.push(this.registers.status);
    this.registers.interrupt = true;
    this.registers.programCounter = this.readWord(0xfffe);
  }

  private handleNmi() {
    this.interruptLine.nmi = false;
    this.registers.break = false;
    this.pushWord(this.registers.programCounter);
    this.push(this.registers.status);
    this.registers.interrupt = true;
    this.registers.programCounter = this.readWord(0xfffa);
  }

  private handleReset() {
    this.registers.accumulator = 0;
    this.registers.indexX = 0;
    this.registers.indexY = 0;
    this.registers.programCounter = this.readWord(0xfffc);
    this.registers.stackPointer = 0x01fd;
    this.registers.status = 0b00110100;
  }

  private pop(): Uint8 {
    this.registers.stackPointer =
      ((this.registers.stackPointer + 1) % 0x100) + 0x100;
    return this.bus.read(this.registers.stackPointer);
  }

  private popWord(): Uint16 {
    return this.pop() | (this.pop() << 8);
  }

  private push(value: Uint8) {
    this.bus.write(this.registers.stackPointer, value);
    this.registers.stackPointer =
      ((this.registers.stackPointer - 1) % 0x100) + 0x100;
  }

  private pushWord(value: Uint16) {
    this.push(value >> 8);
    this.push(value & 0xff);
  }

  private readWord(address: Uint16): Uint16 {
    const low = this.bus.read(address);
    const high = this.bus.read((address + 1) & 0xffff);
    return low + (high << 8);
  }

  private readWordWithWrapAround(address: Uint16): Uint16 {
    const low = this.bus.read(address);
    const high = this.bus.read((address + 1) & 0xff);
    return low + (high << 8);
  }

  private resolveOperand(
    addressOrImmediateValue: Uint16,
    addressingMode: AddressingMode
  ): Uint16 {
    return addressingMode === "immediate"
      ? addressOrImmediateValue
      : this.bus.read(addressOrImmediateValue);
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
