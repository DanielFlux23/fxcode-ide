#!/usr/bin/env node
const [,, comando, ...args] = process.argv;
import logger from "../utils/logger.js";
import {cor} from "../utils/colors.js";
import config from "../config/commands.json" with { type: "json" };

(async () => {
  try {
    if (!comando || comando === "--help" || comando === "-h") {
      return mostrarHelp();
    }
const commandModule = await import(`../commands/${comando}.js`);
    await commandModule.run(args);
  } catch (err) {
    logger.error(`Erro: ${err.message}`);
  }
})();

function mostrarHelp() {

  console.log(cor.red("==========\nUso: fxcode <comando> [opcoes]"))
  console.log("\nComandos disponíveis:");

  for (const cmd in config) {
    console.log(cor.cyan(cmd))

    const commandConfig = config[cmd];

    for (const key in commandConfig) {
      const value = commandConfig[key];

      if (value === undefined || value === null) continue; // ignora undefined/null

      if (Array.isArray(value)) {
        console.log(`    ${cor.green(key)}: ${value.join(", ")}`);
      } else if (typeof value === "object") {
        console.log(`    ${key}: ${JSON.stringify(value, null, 2)}`);
      } else {
        console.log(`    ${key}: ${value}`);
      }
    }
  }

  console.log("\nExemplo:");
  console.log(`  fxcode new meu-projeto js --git --install`);
}
