import { exec } from "child_process";
import logger from "../utils/logger";

async function run(args) {
  if (!args.length) {
    console.log("Use: fxcode git <comando> [args]");
    return;
  }

  const gitCommand = "git " + args.join(" ");

  exec(gitCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(stderr || error.message);
      return;
    }
    console.log(stdout);
  });
}

export {run};
