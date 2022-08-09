const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");

class Checkout {
  static async createCheckoutOrder({ checkout, productId, email }) {
    console.log("CheckoutOrder model ", productId, email);
    const results = await db.query(
      `
                INSERT INTO checkout (total, order_id, product_id, user_id)
                VALUES($1, $2, $3, (SELECT id FROM users WHERE email = $4))
                RETURNING id, total, order_id, product_id, user_id
            `,
      [checkout.total, checkout.order_id, productId, email]
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
