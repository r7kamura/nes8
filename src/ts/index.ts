import Emulator from "./Emulator";

fetch("nestest.nes")
  .then(response => {
    return response.arrayBuffer();
  })
  .then(buffer => {
    const emulator = new Emulator();
    emulator.load(buffer);
    document.addEventListener("keydown", emulator.keypad1.onKeyDown);
    emulator.run();
  });
