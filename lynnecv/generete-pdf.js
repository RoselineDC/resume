const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const filePath = path.resolve(__dirname, 'mom.html');
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });

  // Define a clean output folder name
  const outputDir = path.resolve(__dirname, 'Sihle_Dangazela_Waitress');
  
  // Create the folder if it doesn’t exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Save the PDF safely inside the folder
  const outputFile = path.join(outputDir, 'Kitchen_Staff_CV.pdf');

  await page.pdf({
    path: outputFile,
    format: 'A4',
    printBackground: true,
  });

  console.log('✅ PDF successfully created at:', outputFile);

  await browser.close();
})();
