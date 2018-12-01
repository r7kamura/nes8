import Cpu from "./Cpu";
import CpuBus from "./CpuBus";
import DmaController from "./DmaController";
import PartsFactory from "./PartsFactory";
import Ppu from "./Ppu";
import PpuBus from "./PpuBus";
import RomLoader from "./RomLoader";

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
