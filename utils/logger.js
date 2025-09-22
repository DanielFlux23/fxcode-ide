import {cor} from "./colors.js";

function info(msg) {
  console.log(cor.blue(msg));
}

function success(msg) {
  console.log(cor.magenta(msg));
}

function error(msg) {
  console.error(cor.red(msg));
}

function bold(msg) {
  console.log(`${cor.bold}${msg}${cor.bold}`);
}

function cyan(msg) {
   console.log(cor.cyan(msg));
}

const logger = { info, success, error, cor};
export default logger;
