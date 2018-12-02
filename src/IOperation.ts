import AddressingMode from "./AddressingMode";
import OperationName from "./OperationName";

export default interface IOperation {
  addressingMode: AddressingMode;

  cycle: number;

  name: OperationName;
}
