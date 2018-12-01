import AddressingMode from "./addressingMode";
import OperationName from "./OperationName";

export default interface IOperation {
  addressingMode: AddressingMode;

  cycle: number;

  fullName: string;

  name: OperationName;
}
