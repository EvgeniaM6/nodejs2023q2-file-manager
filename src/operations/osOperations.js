import { EOL, cpus, homedir } from 'node:os';
import { stdout, arch } from 'node:process';

export function executeOsOperation(operation) {
  switch (operation) {
    case '--EOL':
      stdout.write(`${JSON.stringify(EOL)}\n`);
      break;
    case '--cpus':
      printCpus();
      break;
    case '--homedir':
      console.log(homedir());
      break;
    case '--username':
      printSystemUsername();
      break;
    case '--architecture':
      console.log(arch);
      break;
  
    default:
      stdout.write(`Invalid input\n`);
      break;
  }
}

function printCpus() {
  const cpusInfo = cpus().map((cpu) => {
    const { model, speed } = cpu;
    return { model, speed: speed / 1000 };
  })
  console.log(cpusInfo);
}

function printSystemUsername() {
  const currentHomedir = homedir();
  const i = currentHomedir.lastIndexOf('/') + 1 || currentHomedir.lastIndexOf('\\') + 1;
  const userName = currentHomedir.slice(i);
  console.log(userName);
}
