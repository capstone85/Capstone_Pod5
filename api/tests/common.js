const {
  createUsers,
  monicaToken,
  adrianaToken,
  micheleToken,
  cynthiaToken,
} = require("./createUsers");
const { createStores } = require("./createStores");
const db = require("../db.js");

const testStoreIds = [];
const testTokens = { monicaToken, adrianaToken, micheleToken, cynthiaToken };

async function commonBeforeAll() {
  //delete current test data
  await db.query(`DELETE FROM store`);
  await db.query(`DELETE FROM users`);

  //insert new test data
  const userIds = await createUsers();
  const listingIds = await createStores(userIds);

  for (let i = 0; i < listingIds.length; i++) {
    testListingIds.push(listingIds[i]);
  }
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterAll,
  commonAfterEach,
  testStoreIds,
  testTokens,
};
