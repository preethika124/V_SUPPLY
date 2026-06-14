const express =
require("express");

const router =
express.Router();

const authController =
require(
 "../controllers/authController"
);

router.post(
 "/register/vendor",
 authController.registerVendor
);

router.post(
 "/register/supplier",
 authController.registerSupplier
);

router.post(
 "/login",
 authController.login
);

module.exports = router;