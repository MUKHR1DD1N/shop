// const express = require("express");
// const OrderRouter = express.Router();
// const ordersCreate = require("../controllers/order.controller")

// OrderRouter.post("/create", ordersCreate)

// module.exports = OrderRouter


const express = require("express");
const { OrdersCreate } = require("../controllers/order.controller");
const OrderRouter = express.Router();

OrderRouter.post("/create", OrdersCreate);

module.exports = OrderRouter;
