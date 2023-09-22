import { chdir, stdout, cwd } from 'node:process';
import { readdir } from 'node:fs';

export function changeDir(path = '..') {
  try {
    chdir(path);
  } catch (error) {
    stdout.write('Operation failed\n');
  }
}

export function printList() {
  readdir(cwd(), { withFileTypes: true }, (err, files) => {
    if (err) {
      throw new Error('Sorry, unknown error')
    }

    const filesTableArr = files.map((file) => {
      return { 'Name': file.name, 'Type': file.isFile() ? 'file' : 'directory' };
    });

    filesTableArr.sort((a, b) => {
      if (a['Type'] === b['Type']) {
        return a['Name'].toLowerCase() > b['Name'].toLowerCase() ? 1 : -1;
      }

      return a['Type'] > b['Type'] ? 1 : -1;
    })
  
    console.table(filesTableArr);
  })
}