import Ppu from './ppu';
import Ram from './ram';

export default class DmaController {
  constructor(
    private ppu: Ppu,
    private workingRam: Ram
  ) {}

  transferIfRequested() {}
}
