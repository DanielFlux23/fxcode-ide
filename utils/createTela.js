import fs from "fs";
import path from "path";
import readline from "readline";
// ============================
// Terminal Helpers (unitárias)
// ============================

// Limpa a tela inteira
function clearScreen() {
  process.stdout.write('\x1b[2J');
}

// Move o cursor para o topo
function moveCursorTop() {
  process.stdout.write('\x1b[H');
}

// Oculta cursor
function hideCursor() {
  process.stdout.write('\x1b[?25l');
}

// Mostra cursor
function showCursor() {
  process.stdout.write('\x1b[?25h');
}

// Ativa destaque (reverse video)
function highlight() {
  process.stdout.write('\x1b[7m');
}

// Desativa destaque
function resetHighlight() {
  process.stdout.write('\x1b[0m');
}

//preencher linhas
function fillEmptyLines(count) {
  for (let i = 0; i < count; i++) console.log('');
}

//preencher area
function fillArea(lines, filler = '') {
  for (let i = 0; i < lines; i++) console.log(filler);
}

// Tamanho do terminal
function getTerminalSize() {
  const cols = process.stdout.columns || 80; // largura padrão se undefined
  const rows = process.stdout.rows || 24;    // altura padrão se undefined
  return { cols, rows };
}


//Setup inicial
function init() {
  hideCursor();         // esconde cursor
  clearScreen();        // limpa tela
  moveCursorTop();      // coloca cursor no topo
}

// ====== Teclado ======
function ctrlTeclaSair(){
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
}
// ============================
// Exporta funções para testes
// ============================
export {
  clearScreen,
  moveCursorTop,
  hideCursor,
  showCursor,
  highlight,
  resetHighlight,

  fillEmptyLines,
  fillArea,
  getTerminalSize,

  init,
  ctrlTeclaSair
};
