const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, '/secret-folder');

//passing directoryPath
fs.readdir(directoryPath, (error, files) => {
  if (error) {
    return console.log('Unable to scan directory: ' + error);
  } 
  // check every file in dir and show info about file by template for files
  files.forEach(file => {
    let pathFile = `${directoryPath}/${file}`;
    fs.stat(pathFile, (error, stats) => {
      if (stats.isFile()){
        console.log(`${path.basename(file, path.extname(file))} - ${path.extname(file).substr(1)} - ${stats.size / 1024}kb`);}
    });
  });
});
