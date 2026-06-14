const db =
require("../config/db");

async function vendorMiddleware(
    req,
    res,
    next
) {

    try {

        const result =
        await db.query(
            `
            SELECT *
            FROM vendors
            WHERE user_id = $1
            `,
            [req.user.id]
        );

        const vendor =
        result.rows[0];

        if(!vendor){

            return res
            .status(404)
            .json({
                message:
                "Vendor profile not found"
            });

        }

        req.vendor =
        vendor;

        next();

    }
    catch(err){

        return res
        .status(500)
        .json({
            message:
            err.message
        });

    }

}

module.exports =
vendorMiddleware;