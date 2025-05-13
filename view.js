import { readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Read the HTML file
async function viewHTML() {
  try {
    const filePath = join(__dirname, 'client/index.html');
    const content = await readFile(filePath, 'utf-8');
    console.log('HTML Content:');
    console.log('-'.repeat(50));
    console.log(content);
    console.log('-'.repeat(50));
    console.log('\nTo view the actual website:');
    console.log('1. Run "node preview.js"');
    console.log('2. Open a browser to http://localhost:3000');
    console.log('3. Or deploy following the instructions in DEPLOY.md');
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

viewHTML();