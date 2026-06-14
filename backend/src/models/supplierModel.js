const db = require("../config/db");

async function createSupplier(
  userId,
  companyName,
  gstNumber,
  phone
) {

  const result = await db.query(
    `
    INSERT INTO suppliers
    (
      user_id,
      company_name,
      gst_number,
      phone
    )
    VALUES
    (
      $1,$2,$3,$4
    )
    RETURNING *
    `,
    [
      userId,
      companyName,
      gstNumber,
      phone
    ]
  );

  return result.rows[0];
}

async function getPendingSuppliers(){

 const result =
 await db.query(
 `
 SELECT *
 FROM suppliers
 WHERE status='PENDING'
 `
 );

 return result.rows;
}

async function updateStatus(
 supplierId,
 status
){

 const result =
 await db.query(
 `
 UPDATE suppliers
 SET status=$1
 WHERE id=$2
 RETURNING *
 `,
 [status,supplierId]
 );

 return result.rows[0];
}

module.exports = {
  createSupplier,
 getPendingSuppliers,
 updateStatus
};