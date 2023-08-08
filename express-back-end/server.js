const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const {
  addToProducts,
  getFromProducts,
  getMensProducts,
  getWomensProducts,
  getKidsProducts,
  getAthleticProducts,
  addToOrderProducts,
  getFromOrderProducts,
  addToOrders,
  getFromOrders,
  getFromUsers,
  getFavourites,
  removeProduct,
  updateProduct,
} = require("./helpers");
const cors = require("cors");
const { findOrCreateUser } = require("../db/queries/users");

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = 8080;

console.log("Starting the server...");

// Express Configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

// Sample GET route
app.get("/api/data", (req, res) =>
  res.json({
    message: "Seems to work!",
  })
);

app.get("/api/products", (req, res) => {
  getFromProducts()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.get("/api/products/mens", (req, res) => {
  getMensProducts()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.get("/api/products/womens", (req, res) => {
  getWomensProducts()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.get("/api/products/kids", (req, res) => {
  getKidsProducts()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.get("/api/products/athletic", (req, res) => {
  getAthleticProducts()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.put("/updateproduct", (req, res) => {
  updateProduct(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.post("/newproduct", (req, res) => {
  addToProducts(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.delete("/api/products/:id", (req, res) => {
  removeProduct(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.get("/api/order_products", (req, res) => {
  getFromOrderProducts()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.get("/api/orders", (req, res) => {
  getFromOrders()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log("test");
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.get("/api/users", (req, res) => {
  getFromUsers()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.post("/api/users", (req, res) => {
  const user = req.body;
  console.log("Received user:", user);
  findOrCreateUser(user)
    .then((userId) => {
      console.log("Responding with userId:", userId);
      res.json({ userId });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while processing your request." });
    });
});

app.get("/api/favourites", (req, res) => {
  getFavourites()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.post('/create-checkout-session', async (req, res) => {
    const products = req.body.products;
    const line_items = await Promise.all(products.map(async (item) => {
      const product = await pool.query('SELECT * FROM products WHERE id = $1', [item.productId]);
      return {
        price_data: {
          currency: 'cad',
          unit_amount: product.rows[0].price * 100,
          product_data: {
            name: product.rows[0].name,
          },
        },
        quantity: item.quantity,
      };
    }));
  
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `http://localhost:3000`, 
      cancel_url: `http://localhost:3000/cart`,
    });
  
    if (session && session.url) {
      res.json({ url: session.url });
    } else {
      console.error('Session URL not found', session);
      res.status(500).send('An error occurred');
    }
});

app.listen(PORT, () => {
  console.log(`Express is listening on port ${PORT}`);
});
