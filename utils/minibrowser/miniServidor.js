import { exec } from "child_process";
import http from "http";
import path from "path";
import fs from "fs";

export function servidor(PORT = 300,arquivoHtml) {
const server = http.createServer((req, res) => {
  fs.readFile(arquivoHtml, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Erro ao ler HTML");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  // abre no navegador do Android
});
}
