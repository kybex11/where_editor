import fs from 'fs';
import { runEditorWithFile, runEditorWithoutFile } from './modules/editor.js';
import { exitEscapeHandler, exitHandler } from './modules/tools.js';
import { Highlight } from './modules/highlight.js';

const filePath = process.argv[2];


function checkFile() {
  if (filePath) {
    //const fileContent = fs.readFileSync(filePath, 'utf8');
    //if (fileContent) {
      //console.log(`File contents: ${fileContent}`);
    //}

    runEditorWithFile();
    exitHandler();
    
  } else {
    runEditorWithoutFile();
    exitEscapeHandler();
  }
}

checkFile();

const highlight = new Highlight();

function testHighlight() {
console.log(highlight.HighlightCode(`
  import * as fs from 'fs';

  function main() {
    console.log("hello");
  }

  main();
  `, 'ts'));

}

//testHighlight();
