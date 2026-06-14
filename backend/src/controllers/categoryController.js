const Category =
require("../models/categoryModel");

async function getCategories(
    req,
    res
){

    try{

        const categories =
        await Category
        .getAllCategories();

        res.json(
            categories
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

module.exports = {

    getCategories

};