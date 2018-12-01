import Cpu from './cpu';
import DmaController from './dmaController';
import Ppu from './ppu';

export default class Emulator {
  cpu: Cpu;
  ppu: Ppu;

  dmaController: DmaController;

  constructor() {
    this.cpu = new Cpu();
    this.ppu = new Ppu();

    this.dmaController = new DmaController();
  }

  run() {
    this.cpu.reset();
    while(true) {
      this.step();
    }
  }

  private step() {
    this.dmaController.transferIfRequested();
    const cyclesCount = this.cpu.step()
    for (let i = 0; i < cyclesCount * 3; i++) {
      this.ppu.step();
    }
  }
}
