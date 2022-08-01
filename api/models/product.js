const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");

class Product {
  static async createProduct({ product, store }) {
    const requiredFields = ["name"];
    requiredFields.forEach((field) => {
      if (!product.hasOwnProperty(field)) {
        throw new BadRequestError(
          `Required field - ${field} - missing from request body`
        );
      }
    });
    const results = await db.query(
      `
                INSERT INTO product (name, store_id)
                VALUES ($1, (SELECT id FROM store WHERE name = $2))
                RETURNING id, name, store_id, created_at
                `,
      [product.name, store.name]
    );
    return results.rows[0];
  }

  static async fetchProductById(productId) {
    const results = await db.query(
      `
        SELECT  p.id,
                p.name,
                s.name AS "store_name",
                u.email AS "user_email",
                p.store_id AS "store_id",
                p.user_id AS "user_id",
                p.created_at AS "created_at"
        FROM product AS p
            JOIN users AS u ON u.id = p.user_id
            JOIN store AS s ON s.id = p.store_id
            WHERE p.id = $1
        `,
      [productId]
    );
    const product = results.rows[0];
    if (!product) {
      throw new NotFoundError();
    }
    return product;
  }

  static async listProductForStore({ store_id }) {
    const results = await db.query(
      `
            SELECT  p.id,
                    p.name,
                    s.name AS "store_name",
                    u.email AS "user_email",
                    p.store_id AS "store_id",
                    p.user_id AS "user_id",
                    p.created_at AS "created_at"
            FROM product AS p
                JOIN users AS u ON u.id = p.user_id
                JOIN store AS s ON s.id = p.store_id
                
            WHERE p.store_id = $1
            ORDER BY p.created_at DESC
            `,
      [store_id]
    );
    console.log(results.rows);
    return results.rows;
  }

  static async listAllProducts() {
    const results = await db.query(
      `
        SELECT  p.id,
                p.name,
                s.name AS "store_name",
                u.email AS "user_email",
                p.store_id AS "store_id",
                p.user_id AS "user_id",
                p.created_at AS "created_at"
        FROM product AS p
            JOIN users AS u ON u.id = p.user_id
            JOIN store AS s ON s.id = p.store_id
        ORDER BY p.created_at DESC
        `
    );
    console.log(results.rows);
    return results.rows;
  }
}

module.exports = Product;
