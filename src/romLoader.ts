import InesHeader from "./inesHeader";
import Rom from "./rom";

export default class RomLoader {
  bytes: Uint8Array;

  inesHeader: InesHeader;

  constructor(buffer: ArrayBuffer) {
    this.bytes = new Uint8Array(buffer);
    this.inesHeader = new InesHeader(this.bytes);
  }

  characterRom(): Rom {
    return new Rom(this.characterRomBytes());
  }

  programRom(): Rom {
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
