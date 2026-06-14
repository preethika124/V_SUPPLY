const db = require("../config/db");

async function findByEmail(email) {

  const result = await db.query(
    `
    SELECT *
    FROM users
    WHERE email = $1
    `,
    [email]
  );

  return result.rows[0];
}

async function createUser(
  name,
  email,
  passwordHash,
  role
) {

  const result = await db.query(
    `
    INSERT INTO users
    (
      name,
      email,
      password_hash,
      role
    )
    VALUES
    (
      $1,$2,$3,$4
    )
    RETURNING *
    `,
    [
      name,
      email,
      passwordHash,
      role
    ]
  );

  return result.rows[0];
}

module.exports = {
  findByEmail,
  createUser
};