module.exports = {
  launch: {
    headless: process.env.CI === "true",
    slowMo: 25,
    ignoreDefaultArgs: ["--disable-extensions"],
    args: ["--no-sandbox"],
    executablePath: "chrome.exe"
  }
};
