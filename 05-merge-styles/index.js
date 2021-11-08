const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, '/styles');
const newDirectoryPath = path.join(__dirname, '/project-dist');

// read directory with *.css files
fs.readdir(directoryPath, (error, files) => {
  if (error) throw error;
  // check every file on *.css extension, if true => read and append to bundle.css
  files.forEach(file => {
    let pathFile = `${directoryPath}/${file}`;
    if (path.extname(file).substr(1) === 'css') {
      fs.readFile(pathFile, 'utf8' , (err, data) => {
        if (error) throw error;
        appendFile.write(data + '\n'); // if OK => write to file with newline in the end 
      });
    }
  });
});
// create write stream for writing bundle.css
const appendFile = fs.createWriteStream(path.join(newDirectoryPath, 'bundle.css'), { flags: 'w' }, {encoding: 'utf-8'}, function (err) {
  if (err) throw err;
});
