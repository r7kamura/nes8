import CpuRegisters from './cpuRegisters';

export default class Cpu {
  cpuRegisters: CpuRegisters;

  constructor() {
    this.cpuRegisters = new CpuRegisters();
  }

  // @todo
  step(): number {
    return 1;
  }
}
