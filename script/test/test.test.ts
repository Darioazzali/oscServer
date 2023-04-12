import exp from "node:constants";
import fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { PossibleNumericPort } from "../interfaces.js";
// import {
//   checkNonEmpty,
//   convertPortToString,
//   ipAddressCorrectlyDefined,
// } from "../readFromConfigFile";
const __dirname = dirname(fileURLToPath(import.meta.url));
import {
  readConfigurationFromFile,
} from "../run/readFromConfigFile.js";
import { configSchema } from "../run/schema.js";

describe("Tests", () => {
  describe("Check if property exixts", () => {
  //   it("should throw an error if one of config variables is empty", () => {
  //     const wrongConfigFile = {
  //       server: undefined,
  //       oscTarget: { ipAddress: "150.1.2.3", port: "952" },
  //     };
  //     expect(() => checkNonEmpty(wrongConfigFile)).toThrowError();
  //   });
  //   it("throw an error if server value is not defined", () => {
  //     const wrongConfigFile = {
  //       oscTarget: { ipAddress: "150.1.2.3", port: "952" },
  //     };
  //     expect(() => checkNonEmpty(wrongConfigFile)).toThrowError();
  //   });
  //   it("returns true if is all defined", () => {
  //     const correctConfig = {
  //       server: { ipAddress: "125.1.1.6", port: "236" },
  //       oscTarget: { ipAddress: "150.1.2.3", port: "952" },
  //     };
  //     expect(() => checkNonEmpty(correctConfig)).not.toThrowError();
  //   });
  //   it("throw an error if nested properties are not defined", () => {
  //     const wrongConfigFile = {
  //       server: { port: "123" },
  //       oscTarget: { ipAddress: "150.1.2.3", port: "952" },
  //     };
  //     expect(() => checkNonEmpty(wrongConfigFile)).toThrowError();
  //   });
  // });
  // describe("Ip address correctly defined", () => {
    // it("returns false if address not correctly defined", () => {
    //   const incorrectIpAddConfigFile = {
    //     server: { ipAddress: "allora", port: 223 },
    //     oscTarget: { ipAddress: "", port: 223 },
    //   };
    //   expect(bothIpAddressesAreCorrect(incorrectIpAddConfigFile)).toBe(false);
    });
  //   it("returns true if address is correctly defined", () => {
  //     const incorrectIpAddConfigFile = {
  //       server: {
  //         ipAddress: "192.145.6.5",
  //         port: 223,
  //       },
  //       oscTarget: { ipAddress: "192.145.6.5", port: 223 },
  //     };
  //     expect(bothIpAddressesAreCorrect(incorrectIpAddConfigFile)).toBe(true);
  //   });
  // });
  // describe("Convert Port to string", () => {
  //   it("convert portString to string", () => {
  //     const configFile = {
  //       server: { ipAddress: "192.168.1.1", port: "223" },
  //       oscTarget: { ipAddress: "192.168.1.56", port: "556" },
  //     };
  //     expect(convertPortToString(configFile)).toEqual({
  //       server: { ipAddress: "192.168.1.1", port: "223" },
  //       oscTarget: { ipAddress: "192.168.1.56", port: "556" },
  //     });
  //   });
  // });
  it("Read from a config file", () => {
    const data = JSON.parse(
      fs.readFileSync(path.join(__dirname, "mockedConfig.json"), {
        encoding: "utf-8",
      })
    );
    expect(data).toEqual({
      oscTarget: { ipAddress: "192.1.0.5", port: 5217 },
      server: { ipAddress: "192.145.6.5", port: 25 },
    });
  });
  xit("read the json and output correctly", () => {
    expect(readConfigurationFromFile()).toEqual({
      oscTarget: { ipAddress: "192.1.0.5", port: "5217" },
      server: { ipAddress: "192.145.6.5", port: "25" },
    });
  });
  describe("Validation with Yup", () => {
    it("validates the schema correctly", () => {
      const correctConfig: PossibleNumericPort = {
        server: { ipAddress: "192.126.1.4", port: 2345 },
        oscTarget: { ipAddress: "1.123.1.4", port: "324" },
      };
      expect(configSchema.validateSync(correctConfig)).toEqual({
        server: { ipAddress: "192.126.1.4", port: "2345" },
        oscTarget: { ipAddress: "1.123.1.4", port: "324" },
      });
    });
    it("throw 'la porta del server non ha la forma corretta' if a port number is in the wrong format", () => {
      const correctConfig = {
        server: { ipAddress: "192.126.1.4", port: "acca" },
        oscTarget: { ipAddress: "1.123.1.4", port: "324" },
      };
      expect(() => configSchema.validateSync(correctConfig)).toThrowError(
        "La porta del server non ha la forma corretta"
      );
    });
    it("throw 'manca la porta del server' if a port number is empty", () => {
      const correctConfig = {
        server: { ipAddress: "192.126.1.4", port: undefined },
        oscTarget: { ipAddress: "1.123.1.4", port: "324" },
      };
      expect(() => configSchema.validateSync(correctConfig)).toThrowError(
        "Non è stata specificata la porta del server"
      );
    });
    it("throw 'l'indirizzo ip del oscTarget è mancante' if the oscTarget IPv4 is empty", () => {
      const correctConfig = {
        server: { ipAddress: "192.126.1.4", port: 2348 },
        oscTarget: { ipAddress: undefined, port: "324" },
      };
      expect(() => configSchema.validateSync(correctConfig)).toThrowError(
        `L'indirizzo Ip del oscTarget è mancante`
      );
    });

    it("throw 'l'indirizzo ip del oscTarget non è nella forma corretta' if the oscTarget IPv4 is malformed", () => {
      const correctConfig = {
        server: { ipAddress: "192.126.1.4", port: 2348 },
        oscTarget: { ipAddress: "prova", port: "324" },
      };
      expect(() => configSchema.validateSync(correctConfig)).toThrowError(
 `L'indirizzo ip del oscTarget non è nella forma corretta`
      );
    });
  });
});
