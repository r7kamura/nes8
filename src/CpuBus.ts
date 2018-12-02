import DmaController from "./DmaController";
import Keypad from "./Keypad";
import Ppu from "./Ppu";
import Ram from "./Ram";
import Rom from "./Rom";
import { Uint16, Uint8 } from "./types";

export default class CpuBus {
  public programRom?: Rom;

  constructor(
    private dmaController: DmaController,
    private keypad1: Keypad,
    private keypad2: Keypad,
    private ppu: Ppu,
    private workingRam: Ram
  ) {}

  public read(address: Uint16): Uint8 {
    if (address >= 0 && address < 0x0800) {
      return this.workingRam.read(address);
    } else if (address >= 0x0800 && address < 0x2000) {
      return this.workingRam.read(address - 0x0800);
    } else if (address >= 0x2000 && address < 0x2008) {
      return this.ppu.read(address - 0x2000);
    } else if (address >= 0x2008 && address < 0x4000) {
      return this.read(address - 0x0008);
    } else if (address === 0x4016) {
      return this.keypad1.read();
    } else if (address === 0x4017) {
      return this.keypad2.read();
    } else if (address >= 0x4000 && address < 0x4020) {
      return 0; // TODO: I/O port for API, etc.
    } else if (address >= 0x4020 && address < 0x6000) {
      return 0; // TODO: extended RAM on special mappers
    } else if (address >= 0x6000 && address < 0x8000) {
      return 0; // TODO: battery-backed-up RAM
    } else if (address >= 0x8000 && address < 0xc000) {
      if (this.programRom) {
        return this.programRom.read(address - 0x8000);
      } else {
        throw new Error(`Program ROM not connected`);
      }
    } else if (address >= 0xc000 && address < 0x10000) {
      if (this.programRom) {
        return this.programRom.read(
          address - this.programRom.bytesize > 16 * 2 ** 10 ? 0x8000 : 0xc000
        );
      } else {
        throw new Error(`Program ROM not connected`);
      }
    } else {
      throw new Error(`Invalid CPU bus address: ${address}`);
    }
  }

  public write(address: Uint16, value: Uint8) {
    if (address >= 0 && address < 0x0800) {
      this.workingRam.write(address, value);
    } else if (address >= 0x0800 && address < 0x2000) {
      this.workingRam.write(address - 0x0800, value);
    } else if (address >= 0x2000 && address < 0x2008) {
      this.ppu.write(address - 0x2000, value);
    } else if (address >= 0x2008 && address < 0x4000) {
      this.write(address - 0x0008, value);
    } else if (address === 0x4014) {
      this.dmaController.requestTransfer(value);
    } else if (address === 0x4016) {
      this.keypad1.write(value);
    } else if (address === 0x4017) {
      this.keypad2.write(value);
    } else if (address >= 0x4000 && address < 0x4020) {
      // TODO: I/O port for API, etc.
    } else if (address >= 0x4020 && address < 0x6000) {
      // TODO: extended RAM on special mappers
    } else if (address >= 0x6000 && address < 0x8000) {
      // TODO: battery-backed-up RAM
    } else if (address >= 0x8000 && address < 0x10000) {
    } else {
      throw new Error(`Invalid CPU bus address: ${address}`);
    }
  }

  private tryToReadProgramRom(address: Uint16): Uint8 {
    if (this.programRom) {
      return this.programRom.read(address);
    } else {
      throw new Error(`Program ROM not connected`);
    }
  }
}
