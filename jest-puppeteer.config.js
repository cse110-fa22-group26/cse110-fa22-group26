const ci = Boolean(process.env.CI || false);
baseOptions = {
   launch: {
     headless: false,
     slowMo: 25,
   }
 };
const ciPipelineOptions = {
  launch: {
    headless: true,
    ignoreDefaultArgs: ["--disable-extensions"],
    args: ["--no-sandbox"],
    executablePath: "chrome.exe"
  }
}
module.exports = ci ? ciPipelineOptions : baseOptions;
