import Cpu from "./cpu";
import CpuBus from "./cpuBus";
import DmaController from "./dmaController";
import PartsFactory from "./partsFactory";
import Ppu from "./ppu";
import PpuBus from "./ppuBus";
import RomLoader from "./romLoader";

export default class Emulator {
  public cpu: Cpu;

  public cpuBus: CpuBus;

  public dmaController: DmaController;

  public ppu: Ppu;

  public ppuBus: PpuBus;

  constructor() {
    const partsFactory = new PartsFactory();
    this.cpu = partsFactory.cpu();
    this.cpuBus = partsFactory.cpuBus();
    this.dmaController = partsFactory.dmaController();
    this.ppu = partsFactory.ppu();
    this.ppuBus = partsFactory.ppuBus();
  }

  public load(buffer: ArrayBuffer) {
    const romLoader = new RomLoader(buffer);
    this.ppuBus.characterRom = romLoader.characterRom();
    this.cpuBus.programRom = romLoader.programRom();
  }

  public run() {
    this.reset();
    while (true) {
      this.step();
    }
  }

  private reset() {
    this.cpu.reset();
  }

  private step() {
    this.dmaController.transferIfRequested();
    const cyclesCount = this.cpu.step();
    for (let i = 0; i < cyclesCount * 3; i++) {
      this.ppu.step();
    }
  }
}
