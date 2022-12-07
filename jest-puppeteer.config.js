
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
    server: 5501
}

module.exports = ciPipelineOptions;
