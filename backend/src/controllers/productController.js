const Product =
require("../models/productModel");

const Category =
require("../models/categoryModel");

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

            categoryId,

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

                categoryId,

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

    searchProducts

};