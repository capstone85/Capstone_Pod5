const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");

class orderDetails {
  static async createDetails({ orderDetails, user, confirmNum }) {
    const requiredFields = [
      "first_name",
      "last_name",
      "address",
      "zipcode",
      "city",
      "number",
      "email",
    ];
    requiredFields.forEach((field) => {
      if (!orderDetails.hasOwnProperty(field)) {
        throw new BadRequestError(
          `Required field - ${field} - missing from request body`
        );
      }
    });
    const results = await db.query(
      `
                    INSERT INTO orderDetails (first_name, last_name, address, zipcode, city, number, email,user_id, order_id)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                    RETURNING id, first_name, last_name, address, zipcode, city, number, email, user_id, order_id
                    `,
      [
        orderDetails.first_name,
        orderDetails.last_name,
        orderDetails.address,
        orderDetails.zipcode,
        orderDetails.city,
        orderDetails.number,
        orderDetails.email,
        user.id,
        confirmNum,
      ]
    );
    return results.rows[0];
  }

  static async listDetails(order_id) {
    const results = await db.query(
      `
            SELECT id,
                    order_id,
                    user_id,
                    first_name,
                    last_name,
                    address,
                    zipcode,
                    city,
                    number,
                    email
            FROM orderDetails
            WHERE order_id = $1
        `,
      [order_id]
    );
    return results.rows;
  }
}

module.exports = orderDetails;
