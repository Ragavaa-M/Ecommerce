# Backend Logging Guide

## Logging Features Added

The backend now includes comprehensive logging to help you monitor all API activity.

### 1. **HTTP Request Logging** (Morgan)
Every HTTP request is logged with:
- HTTP method (GET, POST, PUT, DELETE, PATCH)
- URL path
- Status code
- Response time

**Example:**
```
GET /api/products 200 45ms
POST /api/auth/login 200 12ms
```

### 2. **Custom Detailed Logging**
Each request shows:
- 📥 Incoming request with timestamp
- Query parameters (if any)
- 📤 Outgoing response with status code and duration
- Response preview (first 100 characters)

**Example:**
```
📥 [1:04:47 PM] POST /api/auth/login
📤 [1:04:47 PM] POST /api/auth/login - 200 (15ms)
   Response: {"user":{"id":"1","email":"demo@shophub.com","name":"Demo User"},"message":"Login successful"}
```

### 3. **Action-Specific Logging**

#### Authentication
- 🔐 Login attempts with email
- ✅ Successful logins with user name
- ❌ Failed logins with reason
- 📝 Registration attempts
- ✅ Successful registrations
- ❌ Failed registrations (user exists)
- 👋 Logout events

**Examples:**
```
🔐 Login attempt: demo@shophub.com
✅ Login successful: Demo User

📝 Registration attempt: newuser@example.com
✅ Registration successful: John Doe

❌ Login failed: Invalid credentials for wrong@example.com
```

#### Cart Operations
- 🛒 Items added to cart (product name, quantity, user)
- 🔄 Quantity updates
- 🗑️ Items removed from cart
- 🧹 Cart cleared

**Examples:**
```
🛒 Added to cart: Wireless Headphones x2 for user 1
🛒 Updated cart: Smart Watch quantity now 3 for user 1
🔄 Updated quantity for product 5 to 1
🗑️ Removed product 3 from cart
🧹 Cleared cart for user 1
```

#### Orders
- 📦 Order creation with ID, user, total, and item count
- 📋 Order status updates

**Examples:**
```
📦 Order created: a1b2c3d4-e5f6-7890-abcd-ef1234567890 for user 1 - Total: $159.99 (3 items)
📋 Order a1b2c3d4-e5f6-7890-abcd-ef1234567890 status updated to: shipped
```

### 4. **Error Logging**
- ❌ All errors with stack traces

**Example:**
```
❌ Error: Error: Product not found
    at /path/to/server/routes/cart.ts:42:11
```

### 5. **Server Startup Banner**
When the server starts, you'll see:
```
🚀 ========================================
🚀 Server is running on port 3002
🚀 API available at http://localhost:3002/api
🚀 Health check: http://localhost:3002/api/health
🚀 ========================================
```

## Viewing Logs

### When Running with `npm start`
Logs are color-coded:
- **Cyan** = Frontend (Vite)
- **Magenta** = Backend (Express)

### When Running with `npm run server`
All backend logs appear in the terminal with emojis for easy scanning.

## Log Levels

The current logging includes:
- ✅ **Success** - Green checkmark
- ❌ **Error** - Red X
- 📥 **Incoming** - Inbox
- 📤 **Outgoing** - Outbox
- 🔐 **Auth** - Lock
- 🛒 **Cart** - Shopping cart
- 📦 **Order** - Package
- 🔄 **Update** - Arrows
- 🗑️ **Delete** - Trash
- 🧹 **Clear** - Broom
- 📋 **Status** - Clipboard
- 📝 **Register** - Memo
- 👋 **Logout** - Wave

## Example Full Request Flow

```
📥 [1:05:23 PM] POST /api/auth/login
🔐 Login attempt: demo@shophub.com
✅ Login successful: Demo User
POST /api/auth/login 200 18ms
📤 [1:05:23 PM] POST /api/auth/login - 200 (18ms)
   Response: {"user":{"id":"1","email":"demo@shophub.com","name":"Demo User"},"message":"Login successful"}

📥 [1:05:25 PM] GET /api/products
GET /api/products 200 5ms
📤 [1:05:25 PM] GET /api/products - 200 (5ms)
   Response: {"products":[{"id":"1","name":"Wireless Headphones","price":129.99,"image":"https://images.u...

📥 [1:05:30 PM] POST /api/cart/1/items
🛒 Added to cart: Wireless Headphones x1 for user 1
POST /api/cart/1/items 200 8ms
📤 [1:05:30 PM] POST /api/cart/1/items - 200 (8ms)
   Response: {"message":"Item added to cart","cart":{"items":[{"product":{"id":"1","name":"Wireless Hea...

📥 [1:05:45 PM] POST /api/orders/1
📦 Order created: f8e7d6c5-b4a3-9281-7065-43f2e1d0c9b8 for user 1 - Total: $139.99 (1 items)
POST /api/orders/1 201 12ms
📤 [1:05:45 PM] POST /api/orders/1 - 201 (12ms)
   Response: {"message":"Order created successfully","order":{"id":"f8e7d6c5-b4a3-9281-7065-43f2e1d0c...
```

## Benefits

1. **Easy Debugging** - See exactly what's happening with each request
2. **Performance Monitoring** - Response times for each endpoint
3. **User Activity Tracking** - Know what users are doing
4. **Error Detection** - Quickly spot and diagnose issues
5. **Development Feedback** - Immediate visibility into API behavior

## Customization

To adjust logging levels or add more detailed logging, edit:
- `server/index.ts` - Main logging middleware
- `server/routes/*.ts` - Route-specific logging

You can also add environment-based logging:
```typescript
if (process.env.NODE_ENV === 'development') {
  console.log('Detailed debug info...');
}
```
