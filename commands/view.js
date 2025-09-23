import path from "path";
import { copiarTemplate, criarArquivo } from "../utils/fs.js";
import logger from "../utils/logger.js";
import  {miniBrowser,servidor} from "../utils/minibrowser/minibrowser.js";
import { exec } from "child_process";
import config from "../config/commands.json" with { type: "json" };

async function run(args) {
  const [pathHtml, tipo = "-local"] = args;

  if (!pathHtml) {
    return logger.error("Você precisa passar o path do html!");
  }

  // 
  if (!config.view) {
    //return logger.error(`Tipo inválido: ${tipo}. Use: ${config.new.types.join(", ")}`);
  }

if(tipo === "-local") miniBrowser(pathHtml)
if (tipo === "-open") {
  switch (process.platform) {
    case "win32": // Windows
      exec('start "" "index.html"');
      break;
    case "linux": // Linux
      exec(`xdg-open ${pathHtml}`);
      break;
    case "darwin": // macOS
      exec(`open ${pathHtml}`);
      break;    
    case "android":

    const caminhoAbsoluto = path.resolve(pathHtml)
    const PORT = 3000
    servidor(PORT,caminhoAbsoluto)
      exec(`am start -a android.intent.action.VIEW -d "http://localhost:${PORT}" -t "text/html"`, (err, stdout, stderr) => {

          if (err) {
            console.error("Erro ao tentar abrir o HTML:", err);
          } else {
            console.log("HTML aberto com sucesso no navegador!");
          }
        });
      break;
    default:
      console.log("Sistema operacional não suportado",process.platform);
  }
}
  /*const destino = path.join(process.cwd(), nomeProjeto);
  await copiarTemplate(tipo, destino);

  // README padrão
  await criarArquivo(path.join(destino, "README.md"), `# ${nomeProjeto}\n`);

  // aplica flags (ex: git, install)
  await aplicarFlags(flags, destino, config.new.flags);

  logger.success("Projeto criado com sucesso!");*/
}

export {run};
