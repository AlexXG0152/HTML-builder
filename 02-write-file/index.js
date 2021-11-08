const path = require('path');
const fs = require('fs');
const readline = require('readline');

// interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// create write stream with appending mode
const appendFile = fs.createWriteStream(path.join(__dirname, 'text.txt'), { flags: 'a' }, {encoding: 'utf-8'}, function (err) {
  if (err) throw err;
});

// write stream listhening and check user input
rl.question('Hello! \nWhat do you think about Node.js? \n', (answer) => {
  if (answer == 'exit') { quit(); }
  rl.on('line', data => {
    if (data == 'exit') { quit(); }
    appendFile.write(data + '\n');
  });
  appendFile.write(answer + '\n');
});

rl.on('close', () => {
  quit();
});

// quit function
const quit = () => {
  console.log('\nThank you and bye-bye!!!');
  process.exit(0);
};
