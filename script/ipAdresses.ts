import { Answers } from "inquirer";
import os from "os";
import { NICAddress } from "./interfaces.js";

export const getIpAddresses = (): NICAddress =>
  Object.values(os.networkInterfaces())
    .flat()
    .filter(
      (address) => address?.internal === false && address.family === "IPv4"
    )
    .map(
      (nonInternalNetworkInterfaces) => nonInternalNetworkInterfaces?.address
    )
    .reduce((accumulator, ipAddress) => {
      return { ...accumulator, name: ipAddress, ipAddress: ipAddress };
    }, {});

export const returnIpAddressAndPortFromPrompt = (
  serverConfigPromt: Answers
) => ({
  ipAddress:
    serverConfigPromt.local === "manual"
      ? serverConfigPromt.manual
      : serverConfigPromt.local,
  port: serverConfigPromt.port,
});
