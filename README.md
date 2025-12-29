# 🛍️ E-Commerce Demo Store

A full-stack e-commerce demonstration platform showcasing the complete shopping journey from authentication through checkout.

## 🚀 Quick Start

> **New!** This application now uses SQLite for persistent data storage. See [QUICK_START_DATABASE.md](./QUICK_START_DATABASE.md) for database-specific information.

### Run the Full Application

```bash
npm install
npm start
```

This will start both:
- **Frontend** on `http://localhost:5173`
- **Backend API** on `http://localhost:3002`

### Run Separately

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run dev
```

## 📚 Documentation

- **[RUNNING.md](./RUNNING.md)** - Detailed guide for running the application
- **[DATABASE_MIGRATION.md](./DATABASE_MIGRATION.md)** - Database setup and migration guide
- **[BACKEND_SUMMARY.md](./BACKEND_SUMMARY.md)** - Backend implementation overview
- **[server/README.md](./server/README.md)** - Complete API documentation
- **[server/data/README.md](./server/data/README.md)** - Database schema and operations
- **[PRD.md](./PRD.md)** - Product requirements and design specifications

## ✨ Features

### Frontend
- 🔐 User authentication (demo login)
- 🛒 Product catalog with filtering
- 🛍️ Shopping cart management
- 💳 Checkout flow with order confirmation
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS and Radix UI

### Backend API
- ✅ RESTful API with Express.js
- ✅ SQLite database for persistent storage
- ✅ Authentication endpoints
- ✅ Product management with search & filters
- ✅ Cart operations (add, update, remove)
- ✅ Order creation and tracking
- ✅ TypeScript for type safety
- ✅ Hot-reload with tsx watch
- ✅ Automatic database initialization and migration

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Radix UI
- **Backend**: Express.js, TypeScript, Node.js
- **Database**: SQLite with better-sqlite3
- **State Management**: React hooks with KV storage
- **API**: RESTful with JSON
- **Dev Tools**: tsx, concurrently, ESLint

## 📄 License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.
