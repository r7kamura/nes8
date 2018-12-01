import CpuBus from './cpuBus';
import CpuRegisters from './cpuRegisters';

export default class Cpu {
  cpuRegisters: CpuRegisters;

  constructor(private cpuBus: CpuBus) {
    this.cpuRegisters = new CpuRegisters();
  }

  // @todo
  step(): number {
    return 1;
  }

  reset() {
    this.cpuRegisters.reset();
  }
}
