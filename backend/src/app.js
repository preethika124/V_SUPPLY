const express =
require("express");

const productRoutes =
require(
 "./routes/productRoutes"
);


const cors =
require("cors");

const authRoutes =
require("./routes/authRoutes");

const app =
express();


app.use(cors());
const path = require("path");
const categoryRoutes =
require(
 "./routes/categoryRoutes"
);

app.use(
 "/api/categories",
 categoryRoutes
);
app.use(
 "/uploads",
 express.static(
  path.join(
   __dirname,
   "uploads"
  )
 )
);

app.use(express.json());

app.use(
 "/api/auth",
 authRoutes
);

app.use(
 "/api/products",
 productRoutes
);

const orderRoutes =
require(
 "./routes/orderRoutes"
);

app.use(
 "/api/orders",
 orderRoutes
);

const cartRoutes =
require(
 "./routes/cartRoutes"
);

app.use(
 "/api/cart",
 cartRoutes
);



const adminRoutes =
require(
 "./routes/adminRoutes"
);

app.use(
 "/api/admin",
 adminRoutes
);

module.exports = app;