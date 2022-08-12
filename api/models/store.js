const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");

class Store {
  static async createStore({ store, user }) {
    const requiredFields = ["name", "location", "logo", "description"];
    requiredFields.forEach((field) => {
      if (!store.hasOwnProperty(field)) {
        throw new BadRequestError(
          `Required field - ${field} - missing from request body`
        );
      }
    });
    const results = await db.query(
      `
            INSERT INTO store (name, location, zipcode, logo, description, user_id)
            VALUES ($1, $2, $3, $4, $5,(SELECT id FROM users WHERE email = $6))
            RETURNING id, name, location, zipcode,logo, description, user_id, created_at
            `,
      [store.name, store.location, store.zipcode, store.logo, store.description, user.email]
    );
    return results.rows[0];
  }

  static async fetchStoreById(storeId) {
    const results = await db.query(
      `
            SELECT  s.id,
                    s.name,
                    s.location,
                    s.zipcode,
                    s.logo,
                    s.description,
                    u.email AS "user_email",
                    s.user_id AS "user_id",
                    s.created_at AS "created_at"
            FROM store AS s
                JOIN users AS u ON u.id = s.user_id
            WHERE s.id = $1
            `,
      [storeId]
    );
    const store = results.rows[0];
    if (!store) {
      throw new NotFoundError();
    }
    return store;
  }

  static async listStoreForUser({ user_id }) {
    const results = await db.query(
      `
            SELECT  s.id,
                    s.name,
                    s.location,
                    s.zipcode,
                    s.logo,
                    s.description,
                    u.email AS "user_email",
                    s.user_id AS "user_id",
                    s.created_at AS "created_at"
            FROM store AS s
                JOIN users AS u ON u.id = s.user_id
            WHERE s.user_id = $1
            ORDER BY s.created_at DESC
            `,
      [user_id]
    );
    console.log(results.rows);
    return results.rows;
  }

  static async listAllStores() {
    const results = await db.query(
      `SELECT  s.id,
                s.name,
                s.location,
                s.zipcode,
                s.logo,
                s.description,
                s.created_at 
        FROM store AS s
        ORDER BY s.created_at DESC`
    );
    console.log(results.rows);
    return results.rows;
  }
}

module.exports = Store;
