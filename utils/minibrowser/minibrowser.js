import fs from 'fs';
import { parse } from 'node-html-parser';
import {
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
 } from "../createTela.js";

import {servidor} from "./miniServidor.js";

import {cor} from '../colors.js';

ctrlTeclaSair()

function miniBrowser(pathHtml){
const html = fs.readFileSync(pathHtml, 'utf-8');
const root = parse(html);

// Função recursiva para “renderizar” HTML no terminal
console.log("---------------");
function renderizaNo(node, indent = 0) {
    const prefixo = '  '.repeat(indent);
    const texto = node.text.trim();

    if (!texto) return; // ignora espaços vazios

    switch (node.tagName) {
        case 'H1':
            console.log(prefixo + cor.bold + cor.cyan(texto) + cor.reset);
            break;
        case 'H2':
            console.log(prefixo + cor.bold + cor.blue(texto) + cor.reset);
            break;
        case 'H3':
            console.log(prefixo + cor.magenta(texto));
            break;
        case 'P':
            console.log(prefixo + texto);
            break;
        case 'A': // simula link
            console.log(prefixo + cor.underline + cor.yellow(texto) + cor.reset);
            break;
        case 'BUTTON': // simula botão
            console.log(prefixo + cor.white(cor.bold(`[ ${texto} ]`)));
            break;
        case 'FOOTER':
            console.log(prefixo + cor.dim + texto + cor.reset);
            break;
        default:
            if (node.childNodes) {
                node.childNodes.forEach(child => {
                    if (child.nodeType === 1) renderizaNo(child, indent + 1);
                });
            }
            break;
    }
}

// Começa do <body>
const body = root.querySelector('body');
renderizaNo(body);

const {rows} = getTerminalSize()
const emptyLines = rows - 2 - 26;
if (emptyLines > 0) fillEmptyLines(emptyLines);
console.log("---------------");
console.log("use ctrl-c para sair");
}

export {
	miniBrowser,
	servidor
}

// ====== Inicia app ======
init();
