export const enviromentVariable = (async function () {
    await import("dotenv/config");
    console.log(process.env);
})();
