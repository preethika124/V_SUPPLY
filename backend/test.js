const db =
require("./src/config/db");

const axios =
require("axios");

async function generateEmbeddings(){

 try{

  const products =
  await db.query(
  `
  SELECT

   p.id,
   p.name,
   p.description,
   c.name AS category_name

  FROM products p

  JOIN categories c
  ON p.category_id = c.id

  WHERE p.is_active = true
  `
  );

  for(
   const product
   of products.rows
  ){

   const text = `

${product.name}

${product.description || ""}

${product.category_name}

`;

   const response =
   await axios.post(

    "http://localhost:8000/generate-embedding",

    {
     text
    }

   );

   await db.query(
   `
   INSERT INTO
   product_embeddings
   (
    product_id,
    embedding
   )
   VALUES
   (
    $1,
    $2
   )

   ON CONFLICT
   (product_id)

   DO UPDATE

   SET embedding =
   EXCLUDED.embedding
   `,
   [
    product.id,
    JSON.stringify(
     response.data.embedding
    )
   ]
   );

   console.log(
    `Embedded: ${product.name}`
   );

  }

  console.log(
   "All products embedded"
  );

  process.exit();

 }
 catch(err){

  console.log(err);

  process.exit();

 }

}

generateEmbeddings();