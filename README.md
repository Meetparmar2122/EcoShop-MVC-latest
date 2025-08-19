# EcoShop MVC

A minimal EcoShop demo refactored to **MVC** using **Node.js + Express + Mongoose + EJS**.

- **Model**: `/models/productModel.js` (Mongoose schema & data rules)
- **View**: `/views/products.ejs` (server-rendered UI)
- **Controller**: `/controllers/productController.js` (request handlers)
- **Routes**: `/routes/productRoutes.js` (maps URLs to controllers)
- **App entry**: `server.js` (wires everything together)

## Quick Start

1. Ensure MongoDB is running locally (or provide a connection string).
2. Copy `.env.example` to `.env` and adjust values if needed.
3. Install dependencies and start:
   ```bash
   npm install
   npm run dev
   # or: npm start
   ```

Open: http://localhost:3000

## Environment

Create a `.env` file in the project root (or edit the defaults in `server.js`):

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/ecoshop
```

## JSON API

- `GET /products/api` → list products
- `POST /products/add` → create product (form or JSON)
- `POST /products/delete/:id` → delete product

## Notes

- This is intentionally simple for learning MVC. You can add validation, auth, services, repos, etc.
- For production, configure CORS, security headers, logging, and error handling layers.
