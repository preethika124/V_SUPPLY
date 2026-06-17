const db =
require("../config/db");

async function saveEmbedding(

 productId,

 embedding

){

 const result =
 await db.query(
 `
 INSERT INTO product_embeddings
 (
  product_id,
  embedding
 )
 VALUES
 (
  $1,$2
 )

 ON CONFLICT
 (product_id)

 DO UPDATE

 SET embedding =
 EXCLUDED.embedding

 RETURNING *
 `,
 [
  productId,
  JSON.stringify(
   embedding
  )
 ]
 );

 return result.rows[0];

}

async function getAllEmbeddings(){

 const result =
 await db.query(
 `
 SELECT *
 FROM product_embeddings
 `
 );

 return result.rows;

}

module.exports = {

 saveEmbedding,

 getAllEmbeddings

};