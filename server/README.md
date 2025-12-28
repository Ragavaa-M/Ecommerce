# E-Commerce Backend API

Express.js backend server for the e-commerce demo application.

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### Authentication

#### POST `/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "demo@shophub.com",
  "password": "demo123"
}
```

**Response:**
```json
{
  "user": {
    "id": "1",
    "email": "demo@shophub.com",
    "name": "Demo User"
  },
  "message": "Login successful"
}
```

#### POST `/auth/register`
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### POST `/auth/logout`
Logout current user.

---

### Products

#### GET `/products`
Get all products with optional filters.

**Query Parameters:**
- `category` (optional): Filter by category
- `search` (optional): Search in name and description
- `minPrice` (optional): Minimum price
- `maxPrice` (optional): Maximum price

**Response:**
```json
{
  "products": [
    {
      "id": "1",
      "name": "Wireless Headphones",
      "price": 129.99,
      "image": "...",
      "description": "...",
      "category": "Electronics",
      "stock": 50
    }
  ]
}
```

#### GET `/products/:id`
Get a specific product by ID.

#### GET `/products/categories/list`
Get all available categories.

---

### Cart

#### GET `/cart/:userId`
Get cart for a specific user.

**Response:**
```json
{
  "items": [
    {
      "product": { ... },
      "quantity": 2
    }
  ]
}
```

#### POST `/cart/:userId/items`
Add item to cart.

**Request Body:**
```json
{
  "productId": "1",
  "quantity": 1
}
```

#### PUT `/cart/:userId/items/:productId`
Update item quantity in cart.

**Request Body:**
```json
{
  "quantity": 3
}
```

#### DELETE `/cart/:userId/items/:productId`
Remove item from cart.

#### DELETE `/cart/:userId`
Clear entire cart.

---

### Orders

#### GET `/orders/:userId`
Get all orders for a user.

#### GET `/orders/:userId/:orderId`
Get specific order details.

#### POST `/orders/:userId`
Create a new order from cart.

**Request Body:**
```json
{
  "shippingAddress": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St",
    "city": "New York",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

**Response:**
```json
{
  "message": "Order created successfully",
  "order": {
    "id": "uuid",
    "userId": "1",
    "items": [...],
    "total": 159.99,
    "shippingAddress": {...},
    "status": "pending",
    "createdAt": "2025-11-20T..."
  }
}
```

#### PATCH `/orders/:userId/:orderId/status`
Update order status.

**Request Body:**
```json
{
  "status": "processing" // pending | processing | shipped | delivered
}
```

---

## Running the Server

```bash
npm run server
```

The server will start on port 3000 (or the port specified in .env).

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
```
