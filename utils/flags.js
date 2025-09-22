import { exec } from "child_process";
import util from "util";
const execAsync = util.promisify(exec);
import logger from "./logger.js";

async function aplicarFlags(flags, destino, flagsValidas) {
  for (const flag of flags) {
    if (!flagsValidas.includes(flag.replace("--", ""))) {
      logger.error(`Flag inválida: ${flag}`);
      continue;
    }

    switch (flag) {
      case "--git":
        await execAsync("git init", { cwd: destino });
        logger.success("Repositório Git inicializado.");
        break;

      case "--install":
        await execAsync("npm install", { cwd: destino });
        logger.success("Dependências instaladas.");
        break;

      case "--eslint":
        logger.info("Criando config ESLint...");
        // aqui poderia copiar um arquivo .eslintrc.json do templates
        break;

      case "--prettier":
        logger.info("Criando config Prettier...");
        break;

      case "--venv":
        await execAsync("python -m venv venv", { cwd: destino });
        logger.success("Virtualenv criado.");
        break;

      default:
        logger.error(`Flag '${flag}' ainda não implementada.`);
    }
  }
}

export {aplicarFlags};
