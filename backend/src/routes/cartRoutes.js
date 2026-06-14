const express =
require("express");

const router =
express.Router();

const cartController =
require(
 "../controllers/cartController"
);

const authenticate =
require(
 "../middlewares/authMiddleware"
);

const authorizeRole =
require(
 "../middlewares/roleMiddleware"
);

const vendorMiddleware =
require(
 "../middlewares/vendorMiddleware"
);

router.post(
 "/",
 authenticate,
 authorizeRole("VENDOR"),
 vendorMiddleware,
 cartController.addToCart
);

router.get(
 "/",
 authenticate,
 authorizeRole("VENDOR"),
 vendorMiddleware,
 cartController.getCart
);
router.put(
 "/:id",
 authenticate,
 authorizeRole("VENDOR"),
 vendorMiddleware,
 cartController.updateCartItem
);

router.delete(
 "/:id",
 authenticate,
 authorizeRole("VENDOR"),
 vendorMiddleware,
 cartController.removeFromCart
);

module.exports =
router;