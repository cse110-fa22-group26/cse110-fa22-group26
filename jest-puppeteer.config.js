
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
    server: {
        command: 'npm run start',
        port: 9999
      }
}

module.exports = ciPipelineOptions;
