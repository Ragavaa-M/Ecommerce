# 🚀 Quick Start - Database Edition

Your e-commerce application now has **persistent SQLite database storage**!

## ✅ What You Get

- **Persistent data** - Survives server restarts
- **12 products** - Pre-loaded and ready
- **User accounts** - Stored in database
- **Shopping carts** - Persistent across sessions
- **Order history** - All orders saved
- **Zero configuration** - Works out of the box

## 🎯 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Application
```bash
npm start
```

That's it! The database is automatically created and initialized.

## 📊 Database Commands

```bash
# View database statistics
npm run db:stats

# List all users
npm run db:users

# List all products  
npm run db:products

# Create a backup
npm run db:backup

# Reset database
npm run db:reset
```

## 📁 Database Location

The SQLite database is stored at: `data/shophub.db`

## 🔍 What Happens on First Run

1. ✅ Creates `data/` directory
2. ✅ Initializes SQLite database
3. ✅ Creates all tables (users, products, carts, orders)
4. ✅ Migrates users from `users.json` (if exists)
5. ✅ Seeds 12 default products
6. ✅ Creates indexes for performance
7. ✅ Server starts on port 3002

## 📝 Example Output

```
🗄️  Initializing database...
✅ Database schema initialized
🔄 Checking for existing data to migrate...
✅ Migrated 1 users from users.json
✅ Migrated 12 products
🚀 Server is running on port 3002
```

## 🛠️ Testing the Database

### Check Statistics
```bash
npm run db:stats
```

Output:
```
📊 Database Statistics
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👥 Users:        1
📦 Products:     12
🛒 Cart Items:   0
📋 Orders:       0
📦 Order Items:  0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💾 Database Size: 60.00 KB
```

### View Products
```bash
npm run db:products
```

### View Users
```bash
npm run db:users
```

## 🔐 Default Login

- **Email**: demo@shophub.com
- **Password**: demo123

## 🎨 Features

- ✅ User registration and login
- ✅ Browse 12 products across 6 categories
- ✅ Add items to cart (persisted)
- ✅ Place orders (saved to database)
- ✅ View order history

## 📚 More Information

- **[DATABASE_MIGRATION.md](./DATABASE_MIGRATION.md)** - Complete migration guide
- **[server/data/README.md](./server/data/README.md)** - Database schema documentation
- **[RUNNING.md](./RUNNING.md)** - Detailed running instructions

## 🆘 Troubleshooting

### Database not created?
```bash
# Check if server started successfully
npm run server

# Look for initialization messages
```

### Want to start fresh?
```bash
npm run db:reset
npm run server
```

### Need a backup?
```bash
npm run db:backup
```

## 🎉 That's It!

Your application now has a fully functional database. All your data is automatically saved and will persist across server restarts.

Happy coding! 🚀
