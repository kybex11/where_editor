import fs from 'fs';
import { runEditorWithFile, runEditorWithoutFile } from './modules/editor.js';
import { addFileBrowserHandler, exitEscapeHandler, exitHandler } from './modules/tools.js';
import { Highlight } from './modules/highlight.js';
const filePath = process.argv[2];

async function checkFile() {
  let stat: fs.Stats;
  if (filePath) {
    if (!filePath.startsWith('-')) {
      try {
        stat = fs.statSync(filePath);
        if (stat.isFile) {
          runEditorWithFile(filePath);
          exitHandler();
        } else {
          runEditorWithoutFile();
          exitEscapeHandler();
          addFileBrowserHandler(true, filePath);
        }
      } catch (err) { }
    } else {
      
    }
  } else {
    runEditorWithoutFile();
    exitEscapeHandler();
    addFileBrowserHandler(true, filePath);
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
