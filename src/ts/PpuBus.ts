import Ram from "./Ram";
import Rom from "./Rom";
import { Uint16, Uint8 } from "./types";

export default class PpuBus {
  constructor(public characterRam: Ram, public videoRam: Ram) {}

  set characterRom(characterRom: Rom) {
    for (let i = 0; i < characterRom.bytesize; i++) {
      this.characterRam.write(i, characterRom.read(i));
    }
  }

  public read(address: Uint16): Uint8 {
    if (address >= 0 && address < 0x2000) {
      return this.characterRam.read(address);
    } else if (address >= 0x2000 && address < 0x2800) {
      return this.videoRam.read(address - 0x2000);
    } else if (address >= 0x2800 && address < 0x3000) {
      return this.read(address - 0x0800);
    } else if (address >= 0x3000 && address < 0x3f00) {
      return this.read(address - 0x1000);
    } else if (address === 0x3f04 || address === 0x3f08 || address === 0x3f0c) {
      return this.read(0x3f00);
    } else if (
      address === 0x3f10 ||
      address === 0x3f14 ||
      address === 0x3f18 ||
      address === 0x3f1c
    ) {
      return this.read(address - 0x0010);
    } else if (address >= 0x3f00 && address < 0x3f20) {
      return this.videoRam.read(address - 0x2000);
    } else if (address >= 0x3f20 && address < 0x4000) {
      return this.read(address - 0x0020);
    } else if (address >= 0x4000 && address < 0x10000) {
      return this.read(address - 0x4000);
    } else {
      throw new Error(`Invalid PPU bus address: ${address}`);
    }
  }

  public write(address: Uint16, value: Uint8) {
    if (address >= 0 && address < 0x2000) {
      this.characterRam.write(address, value);
    } else if (address >= 0x2000 && address < 0x2800) {
      this.videoRam.write(address - 0x2000, value);
    } else if (address >= 0x2800 && address < 0x3000) {
      this.write(address - 0x0800, value);
    } else if (address >= 0x3000 && address < 0x3f00) {
      this.write(address - 0x1000, value);
    } else if (
      address === 0x3f10 ||
      address === 0x3f14 ||
      address === 0x3f18 ||
      address === 0x3f1c
    ) {
      this.write(address - 0x0010, value);
    } else if (address >= 0x3f00 && address < 0x3f20) {
      this.videoRam.write(address - 0x2000, value);
    } else if (address >= 0x3f20 && address < 0x4000) {
      this.write(address - 0x0020, value);
    } else if (address >= 0x4000 && address < 0x10000) {
      this.write(address - 0x4000, value);
    } else {
      throw new Error(`Invalid PPU bus address: ${address}`);
    }
  }
}
