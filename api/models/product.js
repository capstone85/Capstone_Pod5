/* move wishlist stuff to wishlist route/models*/

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");

class Product {
  static async createProduct({ product }) {
    const requiredFields = [
      "name",
      "description",
      "price",
      "image",
      "category",
      "store_id",
    ];
    requiredFields.forEach((field) => {
      if (!product.hasOwnProperty(field)) {
        throw new BadRequestError(
          `Required field - ${field} - missing from request body`
        );
      }
    });
    const results = await db.query(
      `
                INSERT INTO product (name, image, description, price, category, store_id)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id, name, image, description, price, category, store_id, created_at
                `,
      [
        product.name,
        product.image,
        product.description,
        product.price,
        product.category,
        product.store_id,
      ]
    );
    return results.rows[0];
  }

  static async fetchProductById(productId) {
    const results = await db.query(
      `
        SELECT  p.id,
                p.name,
                p.description,
                p.price,
                p.image,
                p.wishlist,
                p.category,
                s.name AS "store_name",
                p.store_id AS "store_id",
                p.created_at AS "created_at"
        FROM product AS p
            JOIN store AS s ON s.id = p.store_id
            WHERE p.id = $1
        `,
      [productId]
    );
    const product = results.rows[0];
    console.log("product found in db (models page) ", product);
    if (!product) {
      throw new NotFoundError();
    }
    return product;
  }

  static async fetchProductByStoreId(storeId) {
    const results = await db.query(
      `
        SELECT  p.id,
                p.name,
                p.description,
                p.price,
                p.image,
                p.wishlist,
                p.category,
                s.name AS "store_name",
                p.store_id AS "store_id",
                p.created_at AS "created_at"
        FROM product AS p
            JOIN store AS s ON s.id = p.store_id
            WHERE p.store_id = $1
        `,
      [storeId]
    );
    const product = results.rows;
    if (!product) {
      throw new NotFoundError();
    }
    return results.rows;
  }

  static async listProductForStore({ store_id }) {
    const results = await db.query(
      `
            SELECT  p.id,
                    p.name,
                    p.description,
                    p.price,
                    p.image,
                    p.wishlist,
                    p.category,
                    s.name AS "store_name",
                    p.store_id AS "store_id",
                    p.created_at AS "created_at"
            FROM product AS p
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
                p.description,
                p.price,
                p.image,
                p.wishlist,
                p.category,
                s.name AS "store_name",
                p.store_id AS "store_id",
                p.created_at AS "created_at"
        FROM product AS p
            JOIN store AS s ON s.id = p.store_id
        ORDER BY p.created_at DESC
        `
    );
    console.log(results.rows);
    return results.rows;
  }

  static async addToWishlist(userId, productId) {
    const results = await db.query(
      `
      INSERT INTO wishlist (user_id, product_id)
      VALUES ($1, $2)
    `,
      [userId, productId]
    );
    return results.rows;
  }

  static async listAllWishlist() {
    const results = await db.query(
      `
      SELECT        p.id,
                    p.name,
                    p.description,
                    p.price,
                    p.image,
                    p.wishlist,
                    p.category,
                    s.name AS "store_name",
                    p.store_id AS "store_id",
                    p.created_at AS "created_at"
            FROM product AS p
                JOIN store AS s ON s.id = p.store_id
                
            WHERE p.wishlist = true
            ORDER BY p.created_at DESC
      `
    );
    console.log(results.rows);
    return results.rows;
  }
}

module.exports = Product;
