const db = require("../config/db");

async function createVendor(
  userId,
  shopName,
  phone
) {

  const result = await db.query(
    `
    INSERT INTO vendors
    (
      user_id,
      shop_name,
      phone
    )
    VALUES
    (
      $1,$2,$3
    )
    RETURNING *
    `,
    [
      userId,
      shopName,
      phone
    ]
  );

  return result.rows[0];
}

module.exports = {
  createVendor
};