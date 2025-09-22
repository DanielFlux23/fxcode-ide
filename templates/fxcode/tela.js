import readline from "readline";

// ====== Controle do terminal ======
function clearScreen() { process.stdout.write('\x1b[2J'); }
function moveCursorTop() { process.stdout.write('\x1b[H'); }
function hideCursor() { process.stdout.write('\x1b[?25l'); }
function showCursor() { process.stdout.write('\x1b[?25h'); }

// ====== Setup inicial ======
function init() {
  hideCursor();         // esconde cursor
  clearScreen();        // limpa tela
  moveCursorTop();      // coloca cursor no topo
  console.log("App iniciado!"); // exemplo de conteúdo
}

// ====== Teclado ======
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on("keypress", (str, key) => {
  if (key.ctrl && key.name === "c") { // sair com Ctrl+C
    showCursor();
    clearScreen();
    moveCursorTop();
    process.exit();
  }
});

// ====== Inicia app ======
init();
