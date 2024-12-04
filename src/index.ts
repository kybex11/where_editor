import fs from 'fs';
import { runEditorWithFile, runEditorWithoutFile } from './modules/editor.js';
import { addFileBrowserHandler, exitEscapeHandler, exitHandler } from './modules/tools.js';
import { Highlight } from './modules/highlight.js';
import { handle } from './modules/plugins/plugins.js';

const filePath = process.argv[2];

handle();

function checkFile() {
  if (filePath) {
    const stat = fs.statSync(filePath);

    if (stat.isFile) {
      runEditorWithFile(filePath);
      exitHandler();
    } else {
      runEditorWithoutFile();
      exitEscapeHandler();
      addFileBrowserHandler(true, filePath);
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
