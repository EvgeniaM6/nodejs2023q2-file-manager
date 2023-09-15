import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream';

export function compressFile(filePath, destinationPath, isDecompress = false) {
  if (!destinationPath) {
    stdout.write('Operation failed\n');
    return;
  }

  const compressObj = isDecompress ? createBrotliDecompress() : createBrotliCompress();
  const readStream = createReadStream(filePath);
  const writeStream = createWriteStream(destinationPath);

  pipeline(readStream, compressObj, writeStream, (err) => {
    if (err) {
      stdout.write('Operation failed\n');
    }
  })
}
