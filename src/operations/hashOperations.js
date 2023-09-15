import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';

export function printFileHash(path) {
  const hash = createHash('sha256');
  const readStream = createReadStream(path);

  let fileContent = '';
  readStream.on('data', (chunk) => {
    fileContent += chunk;
  })

  readStream.on('end', () => {
    hash.update(fileContent);
    console.log(hash.digest('hex'));
  })
}