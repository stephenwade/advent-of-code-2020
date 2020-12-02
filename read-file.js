import fs from 'fs';
import readline from 'readline';
import { fileURLToPath } from 'url';

export default async (url, callback) => {
  const inputFilename = fileURLToPath(url);

  const rl = readline.createInterface({
    terminal: false,
    input: fs.createReadStream(inputFilename),
  });

  for await (const line of rl) {
    callback(line);
  }
};
