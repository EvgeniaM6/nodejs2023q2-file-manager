import process, { argv, stdin, stdout, exit, cwd } from 'node:process';
import { changeDir, printList } from './navigation/index.js';

let userName;

argv.slice(2).forEach((arg) => {
  if (!arg.startsWith('--')) return;

  const [key, val] = arg.slice(2).split('=');

  if (key === 'username') {
    userName = val;
  }

})

stdout.write(`Welcome to the File Manager, ${userName}!\n`);
showCurrentDir();

stdin.on('data', (data) => {
  const str = data.toString().trim();

  if (str === '.exit') {
    finishListen();
  } else if (str === 'up') {
    changeDir();
  } else if (str.startsWith('cd ')) {
    changeDir(str.slice(3));
  } else if (str === 'ls') {
    printList();
  } else {
    stdout.write(`Invalid input\n`);
  }

  showCurrentDir();
});

process.on('SIGINT', () => finishListen());

function finishListen() {
  stdout.write(`Thank you for using File Manager, ${userName}, goodbye!`);
  exit();
}

function showCurrentDir() {
  stdout.write(`You are currently in ${cwd()}\n`);
}
