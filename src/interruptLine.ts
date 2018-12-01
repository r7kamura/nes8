export default class InterruptLine {
  irq: boolean;
  nmi: boolean;

  constructor() {
    this.irq = false;
    this.nmi = false;
  }

  assertIrq() {
    this.irq = true;
  }

  assertNmi() {
    this.nmi = true;
  }

  deassertIrq() {
    this.irq = false;
  }

  deassertNmi() {
    this.nmi = false;
  }
}
