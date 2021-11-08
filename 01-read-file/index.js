<<<<<<< HEAD
const path = require('path');
const fs = require('fs');

// create ReadStream
const readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf8');

readableStream.on('data', chunk => {
  console.log(chunk);
});
=======
const path = require('path');
const fs = require('fs');

const readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf8');

readableStream.on('data', chunk => {
  console.log(chunk);
});
>>>>>>> 00ade4f39f59a22987e4f1646ba9a088dfdf5493
