const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");

class Checkout {
  static async makeCheckoutForm(user) {
    return {
      id: checkout.id,
      product_id: checkout.product_id,
      user_id: checkout.user_id,
    };
  }
  static async checkout(credentials) {
    const requiredFields = ["name", "user_id", "product_id"];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });
    const result = await db.query(
      `
      INSERT INTO checkout (
            name,
            product_id,
            user_id
        )
        VALUES($1, $2, $3)
        RETURNING id, name, product_id, user_id; 
        `
    );
    const user = result.rows[0];
    return this.makeCheckoutForm(user);
  }

  //   `INSERT INTO checkout (
  //     c.id,
  //     c.store_id AS "store_id",
  //     c.user_id AS "user_id",
  //     c.product_id AS "product_id",
  //     FROM checkout AS c
  //         JOIN users as u on u.id = c.user_id
  //         JOIN store as s on s.id = c.store_id
  //         JOIN product as p on p.id = c.product_id
  // )`
}

module.exports = Checkout;
