import fs from 'fs';
import { runEditorWithFile, runEditorWithoutFile } from './modules/editor.js';

const filePath = process.argv[2];


function checkFile() {
  if (filePath) {
    //const fileContent = fs.readFileSync(filePath, 'utf8');
    //if (fileContent) {
      //console.log(`File contents: ${fileContent}`);
    //}

    runEditorWithFile();
    
  } else {
    runEditorWithoutFile();
  }
}

checkFile();