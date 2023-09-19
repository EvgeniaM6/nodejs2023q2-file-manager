import process, { argv, stdin, stdout, exit, cwd, chdir } from 'node:process';
import { homedir } from 'node:os';
import {
  changeDir,
  printList,
  readFileContent,
  addNewFile,
  renameFile,
  copyFile,
  moveFile,
  removeFile,
  executeOsOperation,
  printFileHash,
  compressFile
} from './operations/index.js';

let userName;

argv.slice(2).forEach((arg) => {
  if (!arg.startsWith('--')) return;

  const [key, val] = arg.slice(2).split('=');

  if (key === 'username') {
    userName = val;
  }
})

if (!userName) {
  userName = 'Username';
}

chdir(homedir());
stdout.write(`Welcome to the File Manager, ${userName}!\n`);
showCurrentDir();

stdin.on('data', (data) => {
  const str = data.toString().trim();
  const [operation, ...argsArr] = str.split(' ');

  switch (operation) {
    case '.exit':
      finishListen();
      break;
    case 'up':
      changeDir();
      break;
    case 'cd':
      changeDir(argsArr[0]);
      break;
    case 'ls':
      printList();
      break;
    case 'cat':
      readFileContent(argsArr[0]);
      break;
    case 'add':
      addNewFile(argsArr[0]);
      break;
    case 'rn': {
      const [path, newFileName] = argsArr;
      renameFile(path, newFileName);
      break;
    }
    case 'cp': {
      const [oldPath, newPath] = argsArr;
      copyFile(oldPath, newPath);
      break;
    }
    case '.mv': {
      const [filePath, newDirPath] = argsArr;
      moveFile(filePath, newDirPath);
      break;
    }
    case 'rm':
      removeFile(argsArr[0]);
      break;
    case 'os':
      executeOsOperation(argsArr[0]);
      break;
    case 'hash':
      printFileHash(argsArr[0]);
      break;
    case 'compress': {
      const [filePath, destinationPath] = argsArr;
      compressFile(filePath, destinationPath);
      break;
    }
    case 'decompress': {
      const [filePath, destinationPath] = argsArr;
      compressFile(filePath, destinationPath, true);
      break;
    }
  
    default:
      stdout.write(`Invalid input\n`);
      break;
  }

  showCurrentDir();
});

process.on('SIGINT', finishListen);

function finishListen() {
  stdout.write(`Thank you for using File Manager, ${userName}, goodbye!`);
  exit();
}

function showCurrentDir() {
  stdout.write(`You are currently in ${cwd()}\n`);
}
