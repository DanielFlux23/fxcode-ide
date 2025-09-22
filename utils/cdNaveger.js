import fs from "fs";
import path from "path";
import readline from "readline";

let currentDir = process.cwd();
let items = [];
let selectedIndex = 0;

// Pega tamanho do terminal
function getTerminalSize() {
  return { rows: process.stdout.rows, cols: process.stdout.columns };
}

// Função para listar arquivos e pastas
function listDir(dirPath) {
  try {
    return fs.readdirSync(dirPath, { withFileTypes: true })
      .map(d => d.name);
  } catch (err) {
    return [];
  }
}

// Função para renderizar a tela full-screen
function render() {
  const { rows } = getTerminalSize();
  process.stdout.write('\x1b[H'); // topo
  process.stdout.write('\x1b[2J'); // limpa tela inteira

  console.log(`Diretório: ${currentDir}\n`);

  const visibleItems = items.slice(0, rows - 4); // limita pela altura da tela
  visibleItems.forEach((item, idx) => {
    if (idx === selectedIndex) {
      process.stdout.write('\x1b[7m'); // destaque
      console.log(item + (fs.statSync(path.join(currentDir, item)).isDirectory() ? '/' : ''));
      process.stdout.write('\x1b[0m'); // reset
    } else {
      console.log(item + (fs.statSync(path.join(currentDir, item)).isDirectory() ? '/' : ''));
    }
  });

  // Preenche o resto da tela
  for(let i = visibleItems.length; i < rows - 3; i++) {
    console.log('');
  }

  console.log('Use ↑ ↓ para navegar, → para entrar, ← para voltar, q para sair');
}

// Função para processar teclas
function handleKeypress(str, key) {
  if (key.name === 'up') {
    selectedIndex = (selectedIndex > 0) ? selectedIndex - 1 : items.length - 1;
  } else if (key.name === 'down') {
    selectedIndex = (selectedIndex + 1) % items.length;
  } else if (key.name === 'right') {
    const selectedItem = items[selectedIndex];
    const newPath = path.join(currentDir, selectedItem);
    if (fs.existsSync(newPath) && fs.statSync(newPath).isDirectory()) {
      currentDir = newPath;
      selectedIndex = 0;
      items = listDir(currentDir);
    }
  } else if (key.name === 'left') {
    const parent = path.dirname(currentDir);
    if (parent !== currentDir) {
      currentDir = parent;
      selectedIndex = 0;
      items = listDir(currentDir);
    }
  } else if (key.name === 'q' || (key.ctrl && key.name === 'c')) {
    process.stdout.write('\x1b[2J'); // limpa tela
    process.stdout.write('\x1b[H');   // topo
    process.stdout.write('\x1b[?25h'); // mostra cursor
    process.exit();
  }
  render();
}

// Inicialização
items = listDir(currentDir);
process.stdout.write('\x1b[?25l'); // oculta cursor
render();

// Configura stdin para ler teclas individuais
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', handleKeypress);
