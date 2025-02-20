const express = require("express");
const router = express.Router();

const tokenMiddleware = require("../middleware/token.middleware");
const languageMiddleware = require("../middleware/language.middleware");

const user = require("../controllers/user/user.controller");
const storeController = require("../controllers/store.controller");
const orderController = require("../controllers/order.controller");
const storeProductController = require("../controllers/storeProduct.controller");

const paymentController = require("../controllers/payment/payment.controller");

//User-Routes
router.post("/user", [languageMiddleware], user.create);
router.post("/login", [languageMiddleware], user.login);

//store-Routes
router.post("/store", [languageMiddleware], storeController.create);
router.get("/store", [languageMiddleware], storeController.list);

//order-Routes
router.post(
  "/order",
  [languageMiddleware, tokenMiddleware],
  orderController.create
);
router.get("/order", [languageMiddleware], orderController.list);
//order-detail
router.get("/order/:id", [languageMiddleware], orderController.detail);

//storeProduct-Routes
router.post(
  "/storeProduct",
  [languageMiddleware],
  storeProductController.create
);
router.get("/storeProduct", [languageMiddleware], storeProductController.list);

//make-payment
router.post(
  "/payment",
  [languageMiddleware, tokenMiddleware],
  paymentController.create
);

module.exports = router;
