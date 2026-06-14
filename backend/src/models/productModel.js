const db = require("../config/db");


async function createProduct(
    supplierId,
    categoryId,
    name,
    description,
    imageUrl,
    price,
    stock,
    unit,
    minimumOrderQuantity
) {

    const result = await db.query(
        `
        INSERT INTO products
        (
            supplier_id,
            category_id,
            name,
            description,
            image_url,
            price,
            stock,
            unit,
            minimum_order_quantity
        )
        VALUES
        (
            $1,$2,$3,$4,$5,$6,$7,$8,$9
        )
        RETURNING *
        `,
        [
            supplierId,
            categoryId,
            name,
            description,
            imageUrl,
            price,
            stock,
            unit,
            minimumOrderQuantity
        ]
    );

    return result.rows[0];
}

async function reduceStock(
    productId,
    quantity
) {

    const result =
    await db.query(
        `
        UPDATE products
        SET stock = stock - $1
        WHERE id = $2
        RETURNING *
        `,
        [
            quantity,
            productId
        ]
    );

    return result.rows[0];

}
async function getSupplierProducts(
    supplierId
) {

    const result = await db.query(
        `
        SELECT
            p.*,
            c.name AS category_name
        FROM products p
        JOIN categories c
            ON p.category_id = c.id
        WHERE p.supplier_id = $1
        AND p.is_active = true
        ORDER BY p.created_at DESC
        `,
        [supplierId]
    );

    return result.rows;
}


async function getProductById(
    productId
) {

    const result = await db.query(
        `
        SELECT
            p.*,
            c.name AS category_name
        FROM products p
        JOIN categories c
            ON p.category_id = c.id
        WHERE p.id = $1
        AND p.is_active = true
        `,
        [productId]
    );

    return result.rows[0];
}


async function getProductByIdAndSupplier(
    productId,
    supplierId
) {

    const result = await db.query(
        `
        SELECT *
        FROM products
        WHERE id = $1
        AND supplier_id = $2
        AND is_active = true
        `,
        [
            productId,
            supplierId
        ]
    );

    return result.rows[0];
}


async function updateProduct(
    productId,
    categoryId,
    name,
    description,
    imageUrl,
    price,
    stock,
    unit,
    minimumOrderQuantity
) {

    const result = await db.query(
        `
        UPDATE products
        SET

            category_id = $1,
            name = $2,
            description = $3,
            image_url = $4,
            price = $5,
            stock = $6,
            unit = $7,
            minimum_order_quantity = $8

        WHERE id = $9

        RETURNING *
        `,
        [
            categoryId,
            name,
            description,
            imageUrl,
            price,
            stock,
            unit,
            minimumOrderQuantity,
            productId
        ]
    );

    return result.rows[0];
}


async function softDeleteProduct(
    productId
) {

    const result = await db.query(
        `
        UPDATE products
        SET is_active = false
        WHERE id = $1
        RETURNING *
        `,
        [productId]
    );

    return result.rows[0];
}


async function getAllProducts() {

    const result = await db.query(
        `
        SELECT

            p.*,

            c.name AS category_name,

            s.company_name

        FROM products p

        JOIN categories c
            ON p.category_id = c.id

        JOIN suppliers s
            ON p.supplier_id = s.id

        WHERE p.is_active = true
        AND s.status = 'VERIFIED'

        ORDER BY p.created_at DESC
        `
    );

    return result.rows;
}


async function searchProducts(
    search
) {

    const result = await db.query(
        `
        SELECT

            p.*,

            c.name AS category_name,

            s.company_name

        FROM products p

        JOIN categories c
            ON p.category_id = c.id

        JOIN suppliers s
            ON p.supplier_id = s.id

        WHERE

            p.is_active = true

            AND

            (
                LOWER(p.name)
                LIKE LOWER($1)

                OR

                LOWER(c.name)
                LIKE LOWER($1)
            )

        ORDER BY p.created_at DESC
        `,
        [`%${search}%`]
    );

    return result.rows;
}

module.exports = {

    createProduct,

    getSupplierProducts,

    getProductById,

    getProductByIdAndSupplier,

    updateProduct,

    softDeleteProduct,

    getAllProducts,

    searchProducts,
    reduceStock
};