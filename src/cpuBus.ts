import DmaController from "./dmaController";
import Ppu from "./ppu";
import Ram from "./ram";
import Rom from "./rom";
import { Uint8, Uint16 } from "./types";

export default class CpuBus {
  programRom?: Rom;

  constructor(
    private dmaController: DmaController,
    private ppu: Ppu,
    private workingRam: Ram
  ) {}

  // @todo
  read(address: Uint16): Uint8 {
    return 0;
  }

  // @todo
  write(address: Uint16, value: Uint8) {}
}
