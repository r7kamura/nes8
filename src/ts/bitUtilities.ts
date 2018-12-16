import { Uint8 } from "./types";

export function composeBit(byte: Uint8, index: number, value: boolean): Uint8 {
  const mask = 1 << index;
  return value ? byte | mask : byte & ~mask;
}

export function getBit(byte: Uint8, index: number): boolean {
  return (byte & (1 << index)) !== 0;
}
