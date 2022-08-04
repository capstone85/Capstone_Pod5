const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");
const security = require("../middleware/security");

class Wishlist {
  static async createWishlist({ productId, email }) {
    console.log("Wishlist model ", productId, email);
    const results = await db.query(
      `
            INSERT INTO wishlist (product_id, user_id)
            VALUES($1, (SELECT id FROM users WHERE email = $2))
            RETURNING id, product_id, user_id
        `,
      [productId, email]
    );

    return results.rows[0];
  }

  static async fetchWishlistByUserId(userId) {
    const results = await db.query(
      `
        SELECT w.id
                p.name AS "product_name",
                p.price AS "product_price",
                p.category AS "product_category",
                p.description AS "product_description",
                s.name AS "store_name",
                u.email AS "user_email",
                w.product_id AS "product_id",
                w.user_id AS "user_id",
                w.store_id AS "store_id",
                p.created_at AS "created_at"
        FROM product AS p
            JOIN users AS u ON u.id = w.user_id
            JOIN product AS p ON p.id = w.product_id
            JOIN store AS s ON s.id = w.store_id
            WHERE p.user_id = $1
        `,
      [userId]
    );
    const wishlist = results.rows;
    if (!wishlist) {
      throw new NotFoundError();
    }
    return results.rows;
  }
}

module.exports = Wishlist;
