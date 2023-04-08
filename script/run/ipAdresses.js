import os from "os";
export const ipV4Regex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;
export const getIpAddresses = () => Object.values(os.networkInterfaces())
    .flat()
    .filter((address) => address?.internal === false && address.family === "IPv4")
    .map((nonInternalNetworkInterfaces) => nonInternalNetworkInterfaces?.address)
    .reduce((accumulator, ipAddress) => {
    return { ...accumulator, name: ipAddress, ipAddress: ipAddress };
}, {});
export const returnIpAddressAndPortFromPrompt = (serverConfigPromt) => ({
    ipAddress: serverConfigPromt.local === "manual"
        ? serverConfigPromt.manual
        : serverConfigPromt.local,
    port: serverConfigPromt.port,
});
