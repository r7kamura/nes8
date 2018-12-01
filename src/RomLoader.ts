import InesHeader from "./InesHeader";
import Rom from "./Rom";

export default class RomLoader {
  public bytes: Uint8Array;

  public inesHeader: InesHeader;

  public constructor(buffer: ArrayBuffer) {
    this.bytes = new Uint8Array(buffer);
    this.inesHeader = new InesHeader(this.bytes);
  }

  public characterRom(): Rom {
    return new Rom(this.characterRomBytes());
  }

  public programRom(): Rom {
    return new Rom(this.programRomBytes());
  }

  private characterRomBytes(): Uint8Array {
    const start = this.characterRomStart();
    return this.bytes.slice(
      start,
      start + this.inesHeader.characterRomByteSize()
    );
  }

  private characterRomStart(): number {
    return this.programRomStart() + this.inesHeader.programRomByteSize();
  }

  private programRomBytes(): Uint8Array {
    const start = this.programRomStart();
    return this.bytes.slice(
      start,
      start + this.inesHeader.programRomByteSize()
    );
  }

  private programRomStart(): number {
    return this.trainerStart() + this.inesHeader.trainerByteSize();
  }

  private trainerStart(): number {
    return this.inesHeader.byteSize();
  }
}
