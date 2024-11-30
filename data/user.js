const { hash } = require('bcryptjs');
const { v4: generateId } = require('uuid');

const { NotFoundError } = require('../util/errors');
const { readUserData, writeUserData } = require('./util');

async function add(data) {
  const storedData = await readUserData();
  const userId = generateId();
  const hashedPw = await hash(data.password, 12);
  if (!storedData) {
    storedData = [];
  }
  storedData.push({ ...data, password: hashedPw, id: userId });
  await writeUserData(storedData);
  return { id: userId, email: data.email, name: data.name, phone: data.phone };
}

async function get(email) {
  const storedData = await readUserData();
  if (!storedData || storedData.length === 0) {
    throw new NotFoundError('Could not find any users.');
  }

  const user = storedData.find((ev) => ev.email === email);
  if (!user) {
    throw new NotFoundError('Could not find user for email ' + email);
  }

  return user;
}

exports.add = add;
exports.get = get;
