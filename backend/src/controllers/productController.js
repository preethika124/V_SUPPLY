const Product =
require("../models/productModel");

const Category =
require("../models/categoryModel");

const axios =
require("axios");

const ProductEmbedding =
require(
 "../models/productEmbeddingModel"
);

async function semanticSearch(
 req,
 res
){

 try{

  const search =
  req.query.search;

  const queryEmbedding =
  await axios.post(

   "http://localhost:8000/generate-embedding",

   {
    text: search
   }

  );

  const queryVector =
  queryEmbedding
  .data
  .embedding;

  const embeddings =
  await ProductEmbedding
  .getAllEmbeddings();

  const similarities =
  embeddings.map(
   item=>{

    const storedVector =
    item.embedding;

    let dot = 0;

    let normA = 0;

    let normB = 0;

    for(
     let i=0;
     i<queryVector.length;
     i++
    ){

     dot +=
     queryVector[i] *
     storedVector[i];

     normA +=
     queryVector[i] *
     queryVector[i];

     normB +=
     storedVector[i] *
     storedVector[i];

    }

    const score =
    dot /
    (
     Math.sqrt(normA)
     *
     Math.sqrt(normB)
    );

    return {

     productId:
     item.product_id,

     score

    };

   }
  );

  similarities.sort(
   (a,b)=>

   b.score -
   a.score
  );

  const productIds =
similarities

 .filter(
  item =>
  item.score > 0.5
 )

 .slice(0,20)

 .map(
  item =>
  item.productId
 );
  const products =
  await Product
  .getProductsByIds(
   productIds
  );

  res.json(
   products
  );

 }
 catch(err){

  res.status(500)
  .json({
   message:
   err.message
  });

 }

}

async function generateDescription(
 req,
 res
){

 try{

  const response =
  await axios.post(

   "http://localhost:8000/generate-description",

   req.body

  );

  res.json(
   response.data
  );

 }
 catch(err){

  res.status(500)
  .json({
   message:
   err.message
  });

 }

}


async function createProduct(
    req,
    res
) {

    try {

        const {
            categoryId,
            name,
            description,
            price,
            stock,
            unit,
            minimumOrderQuantity
        } = req.body;

        const category =
            await Category.findCategoryById(
                categoryId
            );

        if (!category) {

            return res.status(404)
                .json({
                    message:
                        "Category not found"
                });

        }

        const imageUrl =
            req.file
                ? `/uploads/products/${req.file.filename}`
                : null;

        const product =
            await Product.createProduct(

                req.supplier.id,

                categoryId,

                name,

                description,

                imageUrl,

                price,

                stock,

                unit,

                minimumOrderQuantity
            );
        const text = `

${name}

${description}

${category.name}

`;

const embeddingResponse =
await axios.post(

 "http://localhost:8000/generate-embedding",

 {
  text
 }

);

await ProductEmbedding
.saveEmbedding(

 product.id,

 embeddingResponse
 .data
 .embedding

);

        res.status(201)
            .json(product);

    }
    catch (err) {

        res.status(500)
            .json({
                message:
                    err.message
            });

    }

}

async function getMyProducts(
    req,
    res
) {

    try {

        const products =
            await Product
                .getSupplierProducts(
                    req.supplier.id
                );

        res.json(products);

    }
    catch (err) {

        res.status(500)
            .json({
                message:
                    err.message
            });

    }

}
async function updateProduct(
    req,
    res
) {

    try {

        const productId =
            req.params.id;

        const existingProduct =
            await Product
                .getProductByIdAndSupplier(
                    productId,
                    req.supplier.id
                );

        if (!existingProduct) {

            return res.status(404)
                .json({
                    message:
                        "Product not found"
                });

        }

        const {

           

            name,

            description,

            price,

            stock,

            unit,

            minimumOrderQuantity

        } = req.body;

        let imageUrl =
            existingProduct.image_url;

        if (req.file) {

            imageUrl =
                `/uploads/products/${req.file.filename}`;

        }

        const updatedProduct =
            await Product.updateProduct(

                productId,

          

                name,

                description,

                imageUrl,

                price,

                stock,

                unit,

                minimumOrderQuantity

            );

        res.json(
            updatedProduct
        );

    }
    catch (err) {

        res.status(500)
            .json({
                message:
                    err.message
            });

    }

}
async function deleteProduct(
    req,
    res
) {

    try {

        const productId =
            req.params.id;

        const existingProduct =
            await Product
                .getProductByIdAndSupplier(
                    productId,
                    req.supplier.id
                );

        if (!existingProduct) {

            return res.status(404)
                .json({
                    message:
                        "Product not found"
                });

        }

        await Product
            .softDeleteProduct(
                productId
            );

        res.json({
            message:
                "Product deleted successfully"
        });

    }
    catch (err) {

        res.status(500)
            .json({
                message:
                    err.message
            });

    }

}
async function getAllProducts(
    req,
    res
) {

    try {

        const products =
            await Product
                .getAllProducts();

        res.json(products);

    }
    catch (err) {

        res.status(500)
            .json({
                message:
                    err.message
            });

    }

}

async function getProductById(
    req,
    res
) {

    try {

        const product =
            await Product
                .getProductById(
                    req.params.id
                );

        if (!product) {

            return res.status(404)
                .json({
                    message:
                        "Product not found"
                });

        }

        res.json(product);

    }
    catch (err) {

        res.status(500)
            .json({
                message:
                    err.message
            });

    }

}
async function searchProducts(
    req,
    res
) {

    try {

        const search =
            req.query.search;

        const products =
            await Product
                .searchProducts(
                    search
                );

        res.json(products);

    }
    catch (err) {

        res.status(500)
            .json({
                message:
                    err.message
            });

    }

}


module.exports = {

    createProduct,

    getMyProducts,

    updateProduct,

    deleteProduct,

    getAllProducts,

    getProductById,

    searchProducts,
    semanticSearch,
    generateDescription

};