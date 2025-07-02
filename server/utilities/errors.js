import { log } from "./logs.js";
import { mergeOptions } from "./options.js";

const DEFAULT_ERROR_OPTIONS = {
  code: 500,
  message: "Internal Server Error",
};

const outError = (res, error, options = DEFAULT_ERROR_OPTIONS) => {
  options = mergeOptions(DEFAULT_ERROR_OPTIONS, options);

  //console.log(error);
  console.error("🔥 ERRORE REGISTRAZIONE:", error);

  return res.status(options.code).json({ message: options.message });
};

export { outError };
