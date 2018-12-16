import colors from "./colors";
import Image from "./Image";
import { Rgb, Uint8 } from "./types";

const BRAILLE_WIDTH = 2;
const BRAILLE_HEIGHT = 4;

const BRAILLE_BASE_CODE_POINT = 0x2800;

const BRIGHTNESS_THRESHOLD = 86;

const TEXT_HEIGHT = 240 / BRAILLE_HEIGHT;
const TEXT_WIDTH = 256 / BRAILLE_WIDTH;

const ESCAPE_TO_CLEAR_TEXT = `\e[${TEXT_HEIGHT}A\e[${TEXT_WIDTH}D`;

function colorCodeToBrightness(colorCode: Uint8): number {
  const rgb = colorCodeToRgb(colorCode);
  return rgb.reduce((left, right) => left + right) / 3;
}

function colorCodeToRgb(colorCode: Uint8): Rgb {
  return colors[colorCode];
}

function imageToString(image: Image): string {
  let result = "";
  for (let y = 0; y < image.height; y += BRAILLE_HEIGHT) {
    let line = "";
    for (let x = 0; x < image.width; x += BRAILLE_WIDTH) {
      const offset = [
        image.read(x + 0, y + 0),
        image.read(x + 0, y + 1),
        image.read(x + 0, y + 2),
        image.read(x + 1, y + 0),
        image.read(x + 1, y + 1),
        image.read(x + 1, y + 2),
        image.read(x + 0, y + 3),
        image.read(x + 1, y + 3)
      ]
        .map((colorCode, index) => {
          return (
            (colorCodeToBrightness(colorCode) < BRIGHTNESS_THRESHOLD ? 0 : 1) <<
            index
          );
        })
        .reduce((previousValue, currentValue) => previousValue | currentValue);
      line += String.fromCodePoint(BRAILLE_BASE_CODE_POINT + offset);
    }
    result += line + "\n";
  }
  return result;
}

export default class TerminalRenderer {
  public render(image: Image) {
    const brailles = imageToString(image);
    process.stdout.write(`${ESCAPE_TO_CLEAR_TEXT}\n${brailles}`);
  }
}
