import readline from "readline";
import { exec } from "child_process";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * ====================================
 * 1) Apps conhecidos (camada 1)
 * ====================================
 * Mapeamento nome → pacote + activity exata
 */
const appsConhecidos = {
  whatsapp: "com.whatsapp/.HomeActivity",
  telegram: "org.telegram.messenger/.MainActivity",
  instagram: "com.instagram.mainactivity.LauncherActivity",
  facebook: "com.facebook.katana/LoginActivity",
  messenger: "com.facebook.orca/com.facebook.orca.auth.StartScreenActivity",
  twitter: "com.twitter.android/.MainActivity",
  tiktok: "com.zhiliaoapp.musically/.splash.SplashActivity",
  youtube: "com.google.android.youtube/.HomeActivity",
  chrome: "com.android.chrome/com.google.android.apps.chrome.Main",
  gmail: "com.google.android.gm/com.google.android.gm.ConversationListActivityGmail",
  maps: "com.google.android.apps.maps/.MapsActivity",
  spotify: "com.spotify.music/.MainActivity",
  netflix: "com.netflix.mediaclient/.ui.launch.LaunchActivity",
  linkedin: "com.linkedin.android/.authenticator.LaunchActivity",
  snapchat: "com.snapchat.android/.LaunchActivity",
  reddit: "com.reddit.frontpage/.LauncherActivity",
  pinterest: "com.pinterest/.HomeActivity",
  amazon: "com.amazon.mShop.android/.splash.SplashActivity",
  teams: "com.microsoft.teams/.main.MainActivity",
  zoom: "us.zoom.videomeetings/.LauncherActivity"
};

/**
 * ====================================
 * 2) Prefixos genéricos (camada 2)
 * ====================================
 * Usados quando o app não está em appsConhecidos
 */
const prefixosGenericos = ["com", "org", "net"];
const sufixosGenericos = ["", ".android", ".mobile", ".app", ".beta"];

/**
 * ====================================
 * 3) Prefixos de empresas (camada 3)
 * ====================================
 */
const prefixosEmpresas = [
  "facebook", "google", "instagram", "snapchat",
  "twitter", "telegram", "microsoft", "amazon", "messenger", "katana"
];

/**
 * ====================================
 * 4) Activities comuns
 * ====================================
 * Ordem baseada em probabilidade real
 */
const listaActivities = [
  (/*nome*/) => ".MainActivity",
  (/*nome*/) => ".LauncherActivity",
  (/*nome*/) => ".HomeActivity",
  (/*nome*/) => ".Main",
  (/*nome*/) => ".StartActivity",
  (/*nome*/) => ".SplashActivity"
];

/**
 * ====================================
 * Função que tenta os comandos em sequência
 * ====================================
 */
function tentarComandos(comandos, index = 0) {
  if (index >= comandos.length) {
    console.error("Nenhum comando funcionou.");
    return;
  }

  const cmd = comandos[index];
  console.log(`Tentando (${index + 1}/${comandos.length}): ${cmd}`);

  exec(cmd, (err, stdout, stderr) => {
    if (!err) {
      console.log(`Sucesso: ${cmd}`);
      if (stdout && stdout.trim()) console.log("Saída:", stdout.trim());
      return; // parar após sucesso
    } else {
      setTimeout(() => tentarComandos(comandos, index + 1), 300);
    }
  });
}

/**
 * ====================================
 * Pergunta pelo app e gera os comandos
 * ====================================
 */
rl.question("Qual é o nome do app: ", (nomeInput) => {
  const nome = nomeInput.trim().toLowerCase();
  if (!nome) {
    console.error("Nome inválido.");
    rl.close();
    return;
  }

  console.log(`Procurando por: "${nome}"`);

  const comandos = [];

  // ========== Camada 1: Apps conhecidos ==========
  if (appsConhecidos[nome]) {
    comandos.push(`am start -n ${appsConhecidos[nome]}`);
  }

  // ========== Camada 2: Prefixos genéricos ==========
  for (const pre of prefixosGenericos) {
    for (const suf of sufixosGenericos) {
      const pacote = `${pre}.${nome}${suf}`;
      for (const act of listaActivities) {
        comandos.push(`am start -n ${pacote}/${act(nome)}`);
      }
    }
  }

  // ========== Camada 3: Prefixos de empresas ==========
  for (const emp of prefixosEmpresas) {
    for (const suf of sufixosGenericos) {
      const pacote = `com.${emp}.${nome}${suf}`;
      for (const act of listaActivities) {
        comandos.push(`am start -n ${pacote}/${act(nome)}`);
      }
    }
  }

  // ========== Inicia tentativas ==========
  tentarComandos(comandos);

  rl.close();
});
