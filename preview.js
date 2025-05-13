// Simple server to preview the website locally
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PORT = 3000;

// MIME types for different file extensions
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.ico': 'image/x-icon',
};

const server = createServer(async (req, res) => {
  try {
    // Get the requested path
    let path = req.url;
    
    // Default to index.html if root path is requested
    if (path === '/') {
      path = '/index.html';
    }
    
    // Construct the file path
    const filePath = join(__dirname, 'client', path);
    
    // Read the file
    const content = await readFile(filePath);
    
    // Determine the content type
    const ext = extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    // Send the response
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (err) {
    // If the file doesn't exist, return 404
    if (err.code === 'ENOENT') {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
    
    // For other errors, return 500
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('500 Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Open your browser to view the romantic website!`);
});