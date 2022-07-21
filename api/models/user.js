const bcrypt = require("bcrypt");
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");

class User {
  static async makePublicUser(user) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  static async login(credentials) {
    const requiredFields = ["email", "password"];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });
    const user = await User.fetchUserByEmail(credentials.email);
    if (user) {
      const isValid = await bcrypt.compare(credentials.password, user.password);
      if (isValid) {
        return this.makePublicUser(user);
      }
    }
    throw new UnauthorizedError("Invalid email/password combo");
  }

  static async register(credentials) {
    const requiredFields = [
      "email",
      "username",
      "first_name",
      "last_name",
      "password",
    ];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });
    if (credentials.email.indexOf("@") <= 0) {
      throw new BadRequestError("Invalid email.");
    }
    const existingUser = await User.fetchUserByEmail(credentials.email);
    if (existingUser) {
      throw new BadRequestError(`Duplicate email: ${credentials.email}`);
    }
    const hashedPassword = await bcrypt.hash(
      credentials.password,
      BCRYPT_WORK_FACTOR
    );
    const lowercasedEmail = credentials.email.toLowerCase();
    const result = await db.query(
      `
            INSERT INTO users (
                email,
                username,
                first_name,
                last_name,
                password
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, email, username, first_name, last_name, created_at, updated_at;
        `,
      [
        lowercasedEmail,
        credentials.username,
        credentials.first_name,
        credentials.last_name,
        hashedPassword,
      ]
    );

    const user = result.rows[0];
    return this.makePublicUser(user);
  }

  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError("No email provided");
    }
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await db.query(query, [email.toLowerCase()]);
    const user = result.rows[0];
    return user;
  }
}

module.exports = User;