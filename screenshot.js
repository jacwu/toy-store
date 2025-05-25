const { exec } = require('child_process');

console.log('Taking screenshot of the homepage...');
// Use the wkhtmltoimage tool to take a screenshot
exec('apt-get update && apt-get install -y wkhtmltopdf && wkhtmltoimage http://localhost:3001 /home/runner/work/toy-store/toy-store/homepage.png', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  console.log(`Screenshot taken: ${stdout}`);
  if (stderr) {
    console.error(`stderr: ${stderr}`);
  }
});