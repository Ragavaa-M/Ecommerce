# API Documentation

## OpenAPI Specification

The complete API documentation is available in OpenAPI 3.0 format: **[openapi.json](./openapi.json)**

## Viewing the Documentation

### Option 1: Swagger UI (Recommended)

Visit [Swagger Editor](https://editor.swagger.io/) and paste the contents of `openapi.json` to view interactive documentation.

Or use Swagger UI locally:

```bash
npm install -g swagger-ui-watcher
swagger-ui-watcher openapi.json
```

### Option 2: Redoc

```bash
npx @redocly/cli preview-docs openapi.json
```

### Option 3: VS Code Extension

Install the **OpenAPI (Swagger) Editor** extension in VS Code and open `openapi.json`.

## API Overview

### Base URL
```
http://localhost:3002/api
```

### Endpoints Summary

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout

#### Products
- `GET /products` - Get all products (with filtering)
- `GET /products/{id}` - Get product by ID
- `GET /products/categories/list` - Get all categories

#### Cart
- `GET /cart/{userId}` - Get user's cart
- `POST /cart/{userId}/items` - Add item to cart
- `PUT /cart/{userId}/items/{productId}` - Update item quantity
- `DELETE /cart/{userId}/items/{productId}` - Remove item from cart
- `DELETE /cart/{userId}` - Clear entire cart

#### Orders
- `GET /orders/{userId}` - Get all user orders
- `GET /orders/{userId}/{orderId}` - Get specific order
- `POST /orders/{userId}` - Create new order
- `PATCH /orders/{userId}/{orderId}/status` - Update order status

#### Health
- `GET /health` - Health check

## Quick Examples

### Login
```bash
curl -X POST http://localhost:3002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@shophub.com",
    "password": "demo123"
  }'
```

### Get Products
```bash
curl http://localhost:3002/api/products
```

### Filter Products by Category
```bash
curl "http://localhost:3002/api/products?category=Electronics"
```

### Search Products
```bash
curl "http://localhost:3002/api/products?search=headphones"
```

### Add to Cart
```bash
curl -X POST http://localhost:3002/api/cart/1/items \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "1",
    "quantity": 2
  }'
```

### Create Order
```bash
curl -X POST http://localhost:3002/api/orders/1 \
  -H "Content-Type: application/json" \
  -d '{
    "shippingAddress": {
      "fullName": "John Doe",
      "email": "john@example.com",
      "address": "123 Main St",
      "city": "New York",
      "zipCode": "10001",
      "country": "USA"
    }
  }'
```

## Data Models

### User
```json
{
  "id": "1",
  "email": "demo@shophub.com",
  "name": "Demo User"
}
```

### Product
```json
{
  "id": "1",
  "name": "Wireless Headphones",
  "price": 129.99,
  "image": "https://...",
  "description": "Premium wireless headphones...",
  "category": "Electronics",
  "stock": 50
}
```

### Cart Item
```json
{
  "product": { /* Product object */ },
  "quantity": 2
}
```

### Order
```json
{
  "id": "f8e7d6c5-b4a3-9281-7065-43f2e1d0c9b8",
  "userId": "1",
  "items": [
    {
      "productId": "1",
      "quantity": 2,
      "price": 129.99,
      "name": "Wireless Headphones"
    }
  ],
  "total": 269.98,
  "shippingAddress": { /* Address object */ },
  "status": "pending",
  "createdAt": "2025-11-20T13:15:00.000Z"
}
```

## Response Codes

- `200` - Success
- `201` - Created (for POST requests)
- `400` - Bad Request (invalid input)
- `401` - Unauthorized (invalid credentials)
- `404` - Not Found
- `409` - Conflict (e.g., user already exists)
- `500` - Internal Server Error

## Error Format

All errors follow this format:
```json
{
  "error": "Error message description"
}
```

## Testing with Postman

1. Import the `openapi.json` file into Postman
2. Postman will automatically create a collection with all endpoints
3. Set the base URL to `http://localhost:3002/api`
4. Start testing!

## Additional Resources

- **[BACKEND_SUMMARY.md](./BACKEND_SUMMARY.md)** - Backend implementation details
- **[server/README.md](./server/README.md)** - API usage examples
- **[server/LOGGING.md](./server/LOGGING.md)** - Logging documentation
- **[INTEGRATION.md](./INTEGRATION.md)** - Frontend-backend integration guide
