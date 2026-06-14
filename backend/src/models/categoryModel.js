const db = require("../config/db");

async function getAllCategories(){

    const result =
    await db.query(
        `
        SELECT *
        FROM categories
        ORDER BY name
        `
    );

    return result.rows;

}
async function createCategory(name) {

    const result = await db.query(
        `
        INSERT INTO categories
        (
            name
        )
        VALUES
        (
            $1
        )
        RETURNING *
        `,
        [name]
    );

    return result.rows[0];
}


async function getAllCategories() {

    const result = await db.query(
        `
        SELECT *
        FROM categories
        ORDER BY name
        `
    );

    return result.rows;
}


async function findCategoryById(id) {

    const result = await db.query(
        `
        SELECT *
        FROM categories
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
}


async function findCategoryByName(name) {

    const result = await db.query(
        `
        SELECT *
        FROM categories
        WHERE name = $1
        `,
        [name]
    );

    return result.rows[0];
}

module.exports = {
    createCategory,
    getAllCategories,
    findCategoryById,
    findCategoryByName,
    getAllCategories
};