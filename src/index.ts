import fs from 'fs';

const filePath = process.argv[2];

function runEditorWithoutFile() {

}

function runEditorWithFile() {
  
}

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