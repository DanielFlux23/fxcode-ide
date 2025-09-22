import fs from "fs";
import readline from "readline";
import path from "path";
import logger from "../utils/logger.js";

import config from "../config/commands.json" with {type:"json"}

async function run(args) {
  const [ pathArquivo, termo, tipoDeBusca = "simples",] = args;

  if (!termo) {
    return logger.error("Você precisa passar o termo da busca!");
  }

  // valida tipo
 /* if (!config.new.types.includes(tipo)) {
    return logger.error(`Tipo inválido: ${tipo}. Use: ${config.new.types.join(", ")}`);
  }*/

  logger.info(`buscando em ${pathArquivo}`);

const stream = fs.createReadStream(pathArquivo);
const rl = readline.createInterface({ input: stream });

rl.on("line", (linha) => {
  if (linha.includes(termo)) {
  logger.success("+ ")
  console.log(linha);
  }
});

}

export {run};
