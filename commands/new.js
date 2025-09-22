import path from "path";
import { copiarTemplate, criarArquivo } from "../utils/fs.js";
import logger from "../utils/logger.js";
import { aplicarFlags } from "../utils/flags.js";
import config from "../config/commands.json" with {type:"json"};

async function run(args) {
 const [nomeProjeto, tipo = "js", ...flags] = args;

  if (!nomeProjeto) {
    return logger.error("Você precisa passar o nome do projeto!");
  }

  // valida tipo
  if (!config.new.types.includes(tipo)) {
    return logger.error(`Tipo inválido: ${tipo}. Use: ${config.new.types.join(", ")}`);
  }
console.log("estamos aqui");
  logger.info(`Criando projeto '${nomeProjeto}' (${tipo})...`);

  const destino = path.join(process.cwd(), nomeProjeto);
  await copiarTemplate(tipo, destino);

  // README padrão
  await criarArquivo(path.join(destino, "README.md"), `# ${nomeProjeto}\n`);

  // aplica flags (ex: git, install)
  await aplicarFlags(flags, destino, config.new.flags);

  logger.success("Projeto criado com sucesso!");
}

export {run};
