export const log = (message, type = "log") => {
  console[type](`[Server]: ${message}`);
};