const path = require('path');
const fs = require('fs');
const fsp = require('fs').promises;

const newDirectoryPath = path.join(__dirname, '/project-dist');
const templateFile = path.join(__dirname, 'template.html');
const indexFile = path.join(newDirectoryPath, 'index.html');
const components = path.join(__dirname, '/components');
const assetsPath = path.join(__dirname, '/assets');
const newAssetsPath = path.join(newDirectoryPath, '/assets');


// create folder /project-dist
const createFolder = async () => {
  fs.mkdir(newDirectoryPath, { recursive: true }, (error) => {
    if (error) throw error;
  });
};


// copy and rename index file
const copyFileToFolder = async () => {
  fs.copyFile(templateFile, indexFile, err => {
    if (!err) {
      console.log(templateFile + ' has been copied!');
    }
  });
};


// find'n'replace tags in html template
const replaceInIndexFile = async () => {
  const readS = fs.createReadStream(templateFile, 'utf-8'); // create read stream 
  const writeS = fs.createWriteStream(indexFile);           // crate write stream
  readS.on('data', async (data) => {                        
    const replaced = await replaceTag(data);                // read index file and replacing tags with content from dir with components
    writeS.write(replaced);                                 // write index file with replaced tags
  });
};


// collect CSS from files (05-merge-styles) all comments there
const collectCSS = async () => {
  const stylesDirectoryPath = path.join(__dirname, '/styles');
  const newStylesDirectoryPath = path.join(__dirname, '/project-dist');
  fs.readdir(stylesDirectoryPath, (error, files) => { // read directory with *.css files
    if (error) throw error;
    files.forEach(file => {
      let pathFile = `${stylesDirectoryPath}/${file}`; // check every file on *.css extension, if true => read and append to final css file
      if (path.extname(file).substr(1) === 'css') {
        fs.readFile(pathFile, 'utf8' , (err, data) => {
          if (error) throw error;
          appendFile.write(data + '\n'); // if OK => write to file with newline in the end 
        });
      }
    });
  });

  const appendFile = fs.createWriteStream(path.join(newStylesDirectoryPath, 'style.css'), { flags: 'a' }, {encoding: 'utf-8'}, function (err) {
    if (err) throw err;
  });
};


// replacing tags in index.html using RegExp
async function replaceTag(data) {
  let htmlString = data.toString(); // convert html file to string for .replace
  for (let tag of htmlString.match(/{{.+}}/gi)) { //find tag brackets in index.html file
    let componentFile = await fs.promises.readFile(path.join(components, `${tag.match(/[a-zA-Z0-9]+/)[0]}.html`)); // find file with name tag in components
    htmlString = htmlString.replace(new RegExp(tag, 'gi'), componentFile.toString());} // replce tag with file content case insensitive
  return htmlString;
}


// copy directories with static files
const copyDir = async (src, dest) => {
  const entries = await fsp.readdir(src, {withFileTypes: true}); // rad source dir
  await fsp.mkdir(dest); // make new dir in destination folder
  for (let entry of entries) { // for every file and folder in source dir 
    const srcPath = path.join(src, entry.name); // create start path
    const destPath = path.join(dest, entry.name); // create destination path
    if (entry.isDirectory()) { // in entry is folder 
      await copyDir(srcPath, destPath); // start this func recursively
    } else {
      await fsp.copyFile(srcPath, destPath); // else copy file
    }
  }
};


// delete files from new directory on start 
const clearDir = async () => {
  await fsp.rm(newDirectoryPath, { force: true, recursive: true }, () => console.log('done'));
};


// initialisation
const init = async () => {
  await clearDir();
  await createFolder();
  await copyFileToFolder();
  await replaceInIndexFile();
  await collectCSS();
  await copyDir(assetsPath, newAssetsPath);
};


init();
