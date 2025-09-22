import fs from "fs";
const fsP = fs.promises;
import path from "path";
import fsExtra from "fs-extra"; // precisa instalar: npm i fs
// importa helpers
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function criarArquivo(caminho, conteudo) {
  await fsP.writeFile(caminho, conteudo);
}

async function copiarTemplate(tipo, destino) {
  const origem = path.join(__dirname, "..", "templates", tipo);
  await fsExtra.copy(origem, destino);
}

export { 
criarArquivo,
copiarTemplate
 };
