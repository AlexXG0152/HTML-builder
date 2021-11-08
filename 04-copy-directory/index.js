const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, '/files');
const newDirectoryPath = path.join(__dirname, '/files-copy');


// make new directory
fs.mkdir(newDirectoryPath, { recursive: true }, (error) => {
  if (error) throw error;
});


// delete files from new directory for up to date state with original directory
fs.readdir(newDirectoryPath, (error, files) => {
  if (error) throw error;

  files.forEach(file => {
    let newPathFile = `${newDirectoryPath}/${path.basename(file)}`;
    fs.unlink(newPathFile, () => {});
  });
});


//copy filers to new directory
fs.readdir(directoryPath, (error, files) => {
  if (error) {
    return console.log('Unable to scan directory: ' + error);
  }
  // path for copy files
  files.forEach(file => {
    let pathFile = `${directoryPath}/${file}`;
    let newPathFile = `${newDirectoryPath}/${path.basename(file)}`;
    // copy files with success message in console  
    fs.copyFile(pathFile, newPathFile, err => {
      if (!err) {
        console.log(file + ' has been copied!');
      }
    });
  });
});
