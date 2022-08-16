const bcrypt = require("bcrypt");
const db = require("../db");
const tokens = require("../utils/tokens");
const { BCRYPT_WORK_FACTOR } = require("../config");

const createUsers = async () => {
  await db.query(`
    INSERT INTO users(email, first_name, last_name, category, password)
    VALUES (
        'monica@kirabo',
        'Monica',
        'Kirabo',
        'vendor',
        '${await bcrypt.hash("password", BCRYPT_WORK_FACTOR)}',
    ),(
        'adriana@morales',
        'Adriana',
        'Morales',
        'vendor',
        '${await bcrypt.hash("password", BCRYPT_WORK_FACTOR)}',
    ),(
        'michele@foxromero',
        'Michele',
        'Fox-Romero',
        'shopper',
        '${await bcrypt.hash("password", BCRYPT_WORK_FACTOR)}',
    ),(
        'cynthia@delira',
        'Cynthia',
        'De Lira',
        'shopper',
        '${await bcrypt.hash("password", BCRYPT_WORK_FACTOR)}',
    );
    `);
  const results = await db.query(`SELECT id FROM users ORDER BY id ASC`);

  const ids = results.rows.map((row) => row.id);
  return ids;
};

const monicaToken = tokens.createUserJwt({
  email: "monica@kirabo",
  category: "vendor",
});
const adrianaToken = tokens.createUserJwt({
  email: "adriana@morales",
  category: "vendor",
});
const micheleToken = tokens.createUserJwt({
  email: "michele@foxromero",
  category: "shopper",
});
const cynthiaToken = tokens.createUserJwt({
  email: "cynthia@delira",
  category: "shopper",
});

module.exports = {
  createUsers,
  monicaToken,
  adrianaToken,
  micheleToken,
  cynthiaToken,
};
