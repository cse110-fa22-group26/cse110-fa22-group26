const ci = Boolean(process.env.CI || false);
baseOptions = {
   launch: {
     headless: false,
     slowMo: 25,
   }
 };
const ciPipelineOptions = {
  launch: {
    executablePath: '/usr/bin/google-chrome-stable',
    headless: true,
    args: [
      '--ignore-certificate-errors',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu'
    ]
  },
  plugins: ["istanbul"]
}
module.exports = ci ? ciPipelineOptions : baseOptions;
