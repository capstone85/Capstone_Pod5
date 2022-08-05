const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");


class ShoppingCart {
    static async createShoppingCart({ productId, email }) {
      console.log("Shopping Cart model ", productId, email);
      const results = await db.query(
        `
              INSERT INTO shoppingCart (product_id, user_id)
              VALUES($1, (SELECT id FROM users WHERE email = $2))
              RETURNING id, product_id, user_id
          `,
        [productId, email]
      );
  
      return results.rows[0];
    }
  
    static async fetchShoppingCartByUserId(userId) {
      const results = await db.query(
        `
          SELECT  w.id,
                  w.product_id AS "product_id",
                  w.user_id AS "user_id",
                  p.name AS "product_name",
                  p.price AS "product_price",
                  p.category AS "product_category",
                  p.store_id AS "store_id",
                  p.description AS "product_description",
                  u.email AS "user_email",
                  s.name AS "store_name"
          FROM shoppingCart AS w
              JOIN users AS u ON u.id = w.user_id
              JOIN product AS p ON p.id = w.product_id
              JOIN store AS s ON s.id = p.store_id
          WHERE w.user_id = $1
          ORDER BY p.store_id DESC
          `,
        [userId]
      );
      const shoppingCart = results.rows;
      if (!shoppingCart) {
        throw new NotFoundError();
      }
      return results.rows;
    }
  }
  
  module.exports = ShoppingCart;
  