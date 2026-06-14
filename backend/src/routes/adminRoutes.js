const express =
require("express");

const router =
express.Router();

const adminController =
require(
 "../controllers/adminController"
);

const authenticate =
require(
 "../middlewares/authMiddleware"
);

const authorizeRole =
require(
 "../middlewares/roleMiddleware"
);

router.get(

 "/suppliers/pending",

 authenticate,

 authorizeRole("ADMIN"),

 adminController
 .getPendingSuppliers

);

router.put(

 "/suppliers/:id/approve",

 authenticate,

 authorizeRole("ADMIN"),

 adminController
 .approveSupplier

);

router.put(

 "/suppliers/:id/reject",

 authenticate,

 authorizeRole("ADMIN"),

 adminController
 .rejectSupplier

);

module.exports = router;