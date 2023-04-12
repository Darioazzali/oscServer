import chalk from "chalk";
import { object, ObjectSchema, string, StringSchema, InferType } from "yup";
import { ConfigFile } from "./interfaces.js";
import { ipV4Regex } from "./ipAdresses.js";

const validIpv4 = string().test("is Ipv4", (value, context) => {
  const parent = context.path.split(".")[0];
  if (value === undefined) {
    return context.createError({
      message: `L'indirizzo Ip del ${parent} è mancante`,
    });
  }
  if (!ipV4Regex.test(value)) {
    return context.createError({
      message: `L'indirizzo ip del ${parent} non è nella forma corretta ${chalk.red(
        context.originalValue
      )}`,
    });
  }
  return true;
});
const validPort = string().test("is valid port", (value, context) => {
  const parent = context.path.split(".")[0];
  if (value === undefined) {
    console.log("Ci arrivaaa");
    return context.createError({
      message: `Non è stata specificata la porta del ${parent}`,
    });
  }
  if (!/^\d+$/.test(value)) {
    return context.createError({
      message: `La porta del ${parent} non ha la forma corretta ${chalk.red(
        value
      )}`,
    });
  }
  return true;
});
export const configSchema = object({
  server: object({
    ipAddress: validIpv4,
    port: validPort,
  }),
  oscTarget: object({
    ipAddress: validIpv4,
    port: validPort,
  }),
}) as ObjectSchema<ConfigFile>;
