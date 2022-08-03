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
    const requiredFields = ["user_id", "product_id"];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });
    const results = await db.query(
      `
      INSERT INTO checkout (
            product_id,
            user_id
        )
        VALUES($1, $2)
        RETURNING id, product_id, user_id; 
        `,
      [checkout.id, checkout.product_id, checkout.user_id]
    );
    return results.rows[0];
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
