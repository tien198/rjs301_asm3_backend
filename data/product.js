const { v4: generateId } = require('uuid');

const { NotFoundError } = require('../util/errors');
const { readData, writeData } = require('./util');

async function getAll() {
  const storedData = await readData();
  if (!storedData) {
    throw new NotFoundError('Could not find any products.');
  }
  return storedData;
}

async function get(id) {
  const storedData = await readData();
  if (!storedData || storedData.length === 0) {
    throw new NotFoundError('Could not find any products.');
  }

  const event = storedData.find((ev) => ev._id.$oid === id);
  if (!event) {
    throw new NotFoundError('Could not find event for id ' + id);
  }

  return event;
}

async function add(data) {
  const storedData = await readData();
  storedData.unshift({ ...data, id: generateId() });
  await writeData(storedData);
}

async function replace(id, data) {
  const storedData = await readData();
  if (!storedData || storedData.length === 0) {
    throw new NotFoundError('Could not find any products.');
  }

  const index = storedData.findIndex((ev) => ev.id === id);
  if (index < 0) {
    throw new NotFoundError('Could not find event for id ' + id);
  }

  storedData[index] = { ...data, id };

  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.filter((ev) => ev.id !== id);
  await writeData({ ...storedData, products: updatedData });
}

exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;
