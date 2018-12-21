import Cpu from "./Cpu";
import CpuBus from "./CpuBus";
import DmaController from "./DmaController";
import PartsFactory from "./PartsFactory";
import Ppu from "./Ppu";
import PpuBus from "./PpuBus";
import RomLoader from "./RomLoader";

const CPU_CYCLES_COUNT_PER_FRAME = 30972;

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
    this.loop();
  }

  private frame() {
    let cpuCyclesCount = 0;
    while (true) {
      cpuCyclesCount += this.step();
      if (cpuCyclesCount >= CPU_CYCLES_COUNT_PER_FRAME) {
        break;
      }
    }
  }

  private loop = () => {
    this.frame();
    requestAnimationFrame(this.loop);
  };

  private reset() {
    this.cpu.reset();
  }

  private step(): number {
    this.dmaController.transferIfRequested();
    const cpuCyclesCount = this.cpu.step();
    for (let i = 0; i < cpuCyclesCount * 3; i++) {
      this.ppu.step();
    }
    return cpuCyclesCount;
  }
}
