const fs = require('node:fs/promises');

async function readData() {
  const data = await fs.readFile('databaseDocs/products.json', 'utf8');
  return JSON.parse(data);
}

async function writeData(data) {
  await fs.writeFile('databaseDocs/products.json', JSON.stringify(data));
}

async function readUserData() {
  const data = await fs.readFile('databaseDocs/users.json', 'utf8');
  return JSON.parse(data);
}

async function writeUserData(data) {
  await fs.writeFile('databaseDocs/users.json', JSON.stringify(data));
}

exports.readData = readData;
exports.writeData = writeData;
exports.readUserData = readUserData;
exports.writeUserData = writeUserData;