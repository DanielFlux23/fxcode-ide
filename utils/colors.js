export const cor = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  underline: "\x1b[4m",

  red: (msg) => `\x1b[31m${msg}\x1b[0m`,
  green: (msg) => `\x1b[32m${msg}\x1b[0m`,
  yellow: (msg) => `\x1b[33m${msg}\x1b[0m`,
  blue: (msg) => `\x1b[34m${msg}\x1b[0m`,
  magenta: (msg) => `\x1b[35m${msg}\x1b[0m`,
  cyan: (msg) => `\x1b[36m${msg}\x1b[0m`,
  white: (msg) => `\x1b[37m${msg}\x1b[0m`,
  };
