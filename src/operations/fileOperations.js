import { createReadStream, appendFile, rename, createWriteStream, rm } from 'node:fs';
import { stdout, cwd } from 'node:process';
import { join } from 'node:path';

function handleErr(err) {
  if (err) {
    stdout.write('Operation failed\n');
  }
}

export function readFileContent(path) {
  const readStream = createReadStream(path, { autoClose: false });

  let fileContent = '';
  readStream.on('data', (data) => {
    fileContent += data;
  });

  readStream.on('end', () => {
    console.log(fileContent);
  })

  readStream.on('error', (err) => {
    stdout.write('Operation failed\n');
  })
}

export function addNewFile(fileName) {
  appendFile(join(cwd(), fileName), '', handleErr);
}

export function renameFile(path, newFileName = '') {
  if (!newFileName) {
    stdout.write('Operation failed\n');
    return;
  }
  const i = path.lastIndexOf('/') + 1 || path.lastIndexOf('\\') + 1;
  const part = path.slice(0, i);
  const newFilePath = join(part, newFileName);
  rename(path, newFilePath, handleErr);
}

export function copyFile(oldPath, newDirPath) {
  if (!newDirPath) {
    stdout.write('Operation failed\n');
    return;
  }
  const i = oldPath.lastIndexOf('/') + 1 || oldPath.lastIndexOf('\\') + 1;
  const fileName = oldPath.slice(i);
  const newFilePath = join(newDirPath, fileName);

  const readStream = createReadStream(oldPath);
  const writeStream = createWriteStream(newFilePath);

  readStream.on('data', (chunk) => {
    writeStream.write(chunk);
  })

  readStream.on('error', () => {
    stdout.write('Operation failed\n');
    return false;
  })

  readStream.on('end', () => true);
}

export function removeFile(filePath) {
  rm(filePath, handleErr);
}

export function moveFile(filePath, newDirPath) {
  if (!newDirPath) {
    stdout.write('Operation failed\n');
    return;
  }

  const isSuccess = copyFile(filePath, newDirPath);
  if (!isSuccess) return;
  removeFile(filePath);
}
