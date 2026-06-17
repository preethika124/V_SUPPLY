const express =
require("express");

const router =
express.Router();

const productController =
require(
 "../controllers/productController"
);

const authenticate =
require(
 "../middlewares/authMiddleware"
);

const authorizeRole =
require(
 "../middlewares/roleMiddleware"
);

const verifiedSupplier =
require(
 "../middlewares/verifiedSupplier"
);

const upload =
require(
 "../middlewares/uploadMiddleware"
);

router.post(

 "/",

 authenticate,

 authorizeRole(
  "SUPPLIER"
 ),

 verifiedSupplier,

 upload.single(
  "image"
 ),

 productController
 .createProduct

);

router.get(

 "/my-products",

 authenticate,

 authorizeRole(
  "SUPPLIER"
 ),

 verifiedSupplier,

 productController
 .getMyProducts

);

router.put(

 "/:id",

 authenticate,

 authorizeRole(
  "SUPPLIER"
 ),

 verifiedSupplier,

 upload.single(
  "image"
 ),

 productController
 .updateProduct

);

router.delete(

 "/:id",

 authenticate,

 authorizeRole(
  "SUPPLIER"
 ),

 verifiedSupplier,

 productController
 .deleteProduct

);

router.get(

 "/semantic-search",

 productController
 .semanticSearch

);
router.post(

 "/generate-description",

 authenticate,

 authorizeRole(
  "SUPPLIER"
 ),

 productController
 .generateDescription

);

router.get(

 "/",

 productController
 .getAllProducts

);

router.get(

 "/search",

 productController
 .searchProducts

);

router.get(

 "/:id",

 productController
 .getProductById

);

module.exports =
router;