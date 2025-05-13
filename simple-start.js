// Simple script to run http-server in the client directory
import { execSync } from 'child_process';

console.log('Starting a simple HTTP server in the client directory...');
console.log('Press Ctrl+C to stop the server.');

try {
  // Run http-server in the client directory
  execSync('npx http-server client -p 8080 -o', { stdio: 'inherit' });
} catch (error) {
  console.error('Error starting server:', error);
}