# Database Migration Guide

## What Changed?

Your e-commerce application now uses **SQLite database** for persistent data storage instead of in-memory storage and JSON files.

## Benefits

✅ **Persistent Storage** - Data survives server restarts
✅ **Better Performance** - Indexed queries for faster lookups
✅ **Data Integrity** - Foreign keys and constraints ensure data consistency
✅ **Scalability** - Easy to migrate to PostgreSQL/MySQL later
✅ **No Logic Changes** - All existing routes work exactly the same

## What Was Added

### New Dependencies
- `better-sqlite3` - Fast SQLite3 library for Node.js
- `@types/better-sqlite3` - TypeScript definitions

### New Files
```
server/data/
├── db.ts              # Database initialization and schema
├── userService.ts     # User database operations
├── productService.ts  # Product database operations
├── cartService.ts     # Cart database operations
├── orderService.ts    # Order database operations
└── README.md          # Database documentation

data/
└── shophub.db        # SQLite database file (auto-created)
```

### Modified Files
- `server/routes/auth.ts` - Now imports from `userService.ts`
- `server/routes/cart.ts` - Now imports from `cartService.ts` and `productService.ts`
- `server/routes/orders.ts` - Now imports from `orderService.ts`, `cartService.ts`, and `productService.ts`
- `server/routes/products.ts` - Now imports from `productService.ts`
- `server/index.ts` - Initializes database on startup
- `.gitignore` - Excludes database files from git

## How to Use

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm run server
# or
npm start
```

### 3. Automatic Setup
On first run, the server will:
- Create the `data/` directory
- Initialize the SQLite database
- Create all necessary tables
- Migrate users from `users.json` (if exists)
- Seed default products

You'll see output like:
```
🗄️  Initializing database...
✅ Database schema initialized
🔄 Checking for existing data to migrate...
✅ Migrated 1 users from users.json
✅ Migrated 12 products
🚀 Server is running on port 3002
```

## Data Migration

### Existing Users
If you have a `users.json` file, all users will be automatically migrated to the database on first run.

### Existing Products
The 12 default products are automatically seeded into the database.

### Carts and Orders
These were previously in-memory only, so they start fresh (which is expected behavior).

## No Code Changes Required

All your existing route handlers work exactly the same because the service modules maintain the same interface:

**Before:**
```typescript
import { users } from '../data/users.js';
import { products } from '../data/products.js';
import { carts, orders } from '../data/storage.js';
```

**After:**
```typescript
import { users } from '../data/userService.js';
import { products } from '../data/productService.js';
import { carts } from '../data/cartService.js';
import { orders } from '../data/orderService.js';
```

The interfaces remain identical, so all your logic continues to work!

## Database Location

The database file is created at: `data/shophub.db`

This directory is excluded from git (added to `.gitignore`).

## Viewing the Database

You can inspect the database using:

### Option 1: DB Browser for SQLite (GUI)
1. Download from https://sqlitebrowser.org/
2. Open `data/shophub.db`

### Option 2: SQLite CLI
```bash
sqlite3 data/shophub.db
.tables
.schema users
SELECT * FROM users;
.quit
```

### Option 3: VS Code Extension
Install "SQLite Viewer" or "SQLite" extension in VS Code

### Option 4: NPM Scripts (Easiest)
```bash
# Show database statistics
npm run db:stats

# List all users
npm run db:users

# List all products
npm run db:products
```

## Database Management Commands

### View Statistics
```bash
npm run db:stats
```
Shows counts of users, products, carts, orders, and database size.

### Create Backup
```bash
npm run db:backup
```
Creates a timestamped backup in `data/backups/` directory.

### Reset Database
```bash
npm run db:reset
```
Deletes the database. It will be recreated on next server start.

## Resetting the Database

### Method 1: Using NPM Script (Recommended)
```bash
npm run db:reset
npm run server
```

### Method 2: Manual Deletion
```bash
# Stop the server
# Delete the database
rm -rf data/

# Restart the server - database will be recreated
npm run server
```

## Backup the Database

### Method 1: Using NPM Script (Recommended)
```bash
npm run db:backup
```

### Method 2: Manual Copy
```bash
# Create a backup
cp data/shophub.db data/shophub.backup.db

# Restore from backup
cp data/shophub.backup.db data/shophub.db
```

## Testing

Test that everything works:

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Test the API:**
   - Login: `POST http://localhost:3002/api/auth/login`
   - Get products: `GET http://localhost:3002/api/products`
   - Add to cart: `POST http://localhost:3002/api/cart/:userId/items`
   - Create order: `POST http://localhost:3002/api/orders/:userId`

3. **Check the database:**
   ```bash
   sqlite3 data/shophub.db "SELECT * FROM users;"
   sqlite3 data/shophub.db "SELECT * FROM products;"
   ```

## Troubleshooting

### Database file not created
- Check that the server has write permissions
- Check console for error messages

### Migration errors
- Check that `users.json` is valid JSON
- Check console for specific error messages

### Data not persisting
- Ensure the server is running
- Check that `data/` directory exists
- Verify database file exists: `ls -la data/`

### Performance issues
- The database includes indexes for common queries
- For large datasets, consider adding more indexes

## Future Enhancements

This SQLite setup makes it easy to:
- Add user authentication with sessions
- Implement admin panels
- Add analytics and reporting
- Migrate to PostgreSQL/MySQL for production
- Add full-text search
- Implement caching strategies

## Questions?

Check the detailed documentation in `server/data/README.md`
