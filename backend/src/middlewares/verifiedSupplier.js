const db = require("../config/db");

async function verifiedSupplier(
    req,
    res,
    next
) {

    try {

        const userId = req.user.id;

        const result = await db.query(
            `
            SELECT *
            FROM suppliers
            WHERE user_id = $1
            `,
            [userId]
        );

        const supplier =
            result.rows[0];

        if (!supplier) {

            return res.status(404)
                .json({
                    message:
                        "Supplier profile not found"
                });

        }

        if (
            supplier.status !==
            "VERIFIED"
        ) {

            return res.status(403)
                .json({
                    message:
                        "Supplier is not verified"
                });

        }

        req.supplier =
            supplier;

        next();

    }
    catch (err) {

        return res.status(500)
            .json({
                message:
                    err.message
            });

    }

}

module.exports =
    verifiedSupplier;