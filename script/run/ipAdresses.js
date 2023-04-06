import os from "os";
export const getIpAddresses = () => Object.values(os.networkInterfaces())
    .flat()
    .filter((address) => (address === null || address === void 0 ? void 0 : address.internal) === false && address.family === "IPv4")
    .map((nonInternalNetworkInterfaces) => nonInternalNetworkInterfaces === null || nonInternalNetworkInterfaces === void 0 ? void 0 : nonInternalNetworkInterfaces.address)
    .reduce((accumulator, ipAddress) => {
    return Object.assign(Object.assign({}, accumulator), { name: ipAddress, ipAddress: ipAddress });
}, {});
export const returnIpAddressAndPortFromPrompt = (serverConfigPromt) => ({
    ipAddress: serverConfigPromt.local === "manual"
        ? serverConfigPromt.manual
        : serverConfigPromt.local,
    port: serverConfigPromt.port,
});
