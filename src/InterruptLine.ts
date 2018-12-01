export default class InterruptLine {
  public irq: boolean;
  public nmi: boolean;

  constructor() {
    this.irq = false;
    this.nmi = false;
  }

  public assertIrq() {
    this.irq = true;
  }

  public assertNmi() {
    this.nmi = true;
  }

  public deassertIrq() {
    this.irq = false;
  }

  public deassertNmi() {
    this.nmi = false;
  }
}
