import AddressingMode from './addressingMode';

export default interface Operation {
  addressingMode: AddressingMode;

  cycle: number;

  name: string;
}
