const express =
require("express");

const router =
express.Router();

const orderController =
require(
 "../controllers/orderController"
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

const verifiedSupplier =
require(
 "../middlewares/verifiedSupplier"
);

router.post(
 "/",
 authenticate,
 authorizeRole("VENDOR"),
 vendorMiddleware,
 orderController.placeOrder
);

router.get(
 "/my-orders",
 authenticate,
 authorizeRole("VENDOR"),
 vendorMiddleware,
 orderController.getMyOrders
);
router.get(
 "/supplier",
 authenticate,
 authorizeRole("SUPPLIER"),
 verifiedSupplier,
 orderController.getSupplierOrders
);

router.put(
 "/:id/accept",
 authenticate,
 authorizeRole("SUPPLIER"),
 verifiedSupplier,
 orderController.acceptOrder
);

router.put(
 "/:id/reject",
 authenticate,
 authorizeRole("SUPPLIER"),
 verifiedSupplier,
 orderController.rejectOrder
);
router.put(
 "/:id/ship",
 authenticate,
 authorizeRole("SUPPLIER"),
 verifiedSupplier,
 orderController.shipOrder
);
router.put(
 "/:id/deliver",
 authenticate,
 authorizeRole("SUPPLIER"),
 verifiedSupplier,
 orderController.deliverOrder
);
router.get(
 "/:id/details",
 authenticate,
 orderController
 .getOrderDetails
);


module.exports =
router;