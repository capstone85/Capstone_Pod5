const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");

class Checkout {
  static async createCheckoutOrder({ confirmation, productId, email }) {
    console.log("CheckoutOrder model ", productId, email);
    const results = await db.query(
      `
                INSERT INTO checkout (order_id, product_id, user_id)
                VALUES($1, $2, (SELECT id FROM users WHERE email = $3))
                RETURNING id, order_id, product_id, user_id
            `,
      [confirmation, productId, email]
    );

    return results.rows[0];
  }

  static async fetchCheckoutByOrderId(orderId) {
    const results = await db.query(
      `
          SELECT  w.id,
                  w.product_id AS "product_id",
                  w.user_id AS "user_id",
                  w.order_id AS "order_id",
                  p.name AS "product_name",
                  p.image AS "product_image",
                  p.price AS "product_price",
                  p.category AS "product_category",
                  p.store_id AS "store_id",
                  p.description AS "product_description",
                  u.email AS "user_email",
                  s.name AS "store_name"
          FROM checkout AS w
              JOIN users AS u ON u.id = w.user_id
              JOIN product AS p ON p.id = w.product_id
              JOIN store AS s ON s.id = p.store_id
          WHERE w.order_id = $1
          ORDER BY p.store_id DESC
          `,
      [orderId]
    );
    const checkout = results.rows;
    if (!checkout) {
      throw new NotFoundError();
    }
    return results.rows;
  }

  static async fetchCheckoutByUserId(userId) {
    const results = await db.query(
      `
        SELECT c.id,
               c.order_id AS "order_id",
               c.user_id AS "user_id",
               c.status AS "status",
               c.product_id AS "product_id",
               p.price AS "price",
               c.created_at AS "created_at"
        FROM checkout AS c
            JOIN product AS p ON p.id = c.product_id
        WHERE c.user_id = $1
        ORDER BY c.created_at DESC
        `,
      [userId]
    );
    console.log("THIS IS RESULTS FOR CHECKOUT", results.rows);
    return results.rows;
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
