# 🎯 Complete Setup Guide

## Prerequisites

Make sure you have installed:
- Node.js (v18 or higher)
- npm (comes with Node.js)

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

This installs all required packages for both frontend and backend.

### 2. Start the Application

You have **two options**:

#### Option A: Run Everything Together (Recommended)

```bash
npm start
```

**What happens:**
- ✅ Backend starts on `http://localhost:3002`
- ✅ Frontend starts on `http://localhost:5173`
- ✅ Both run in the same terminal with color-coded logs
- ✅ Both have hot-reload enabled

**Terminal Output:**
```
[backend] Server is running on port 3002
[frontend] VITE v6.3.5 ready in 234 ms
[frontend] ➜ Local: http://localhost:5173/
```

#### Option B: Run Separately

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 3. Access the Application

Open your browser and go to:
```
http://localhost:5173
```

### 4. Login

Use the demo credentials (displayed on the login screen):
- **Email:** `demo@shophub.com`
- **Password:** `demo123`

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Browser                              │
│              http://localhost:5173                      │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ User interacts with UI
                     │
┌────────────────────▼────────────────────────────────────┐
│              Vite Dev Server (Frontend)                 │
│                   Port: 5173                            │
│  ┌──────────────────────────────────────────────────┐  │
│  │  React Components                                │  │
│  │  - Login, Products, Cart, Checkout               │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ API calls to /api/*
                     │ (proxied by Vite)
                     │
┌────────────────────▼────────────────────────────────────┐
│            Express Server (Backend)                     │
│                   Port: 3002                            │
│  ┌──────────────────────────────────────────────────┐  │
│  │  API Routes                                      │  │
│  │  - /api/auth     (login, register)              │  │
│  │  - /api/products (browse, search, filter)       │  │
│  │  - /api/cart     (add, update, remove)          │  │
│  │  - /api/orders   (create, track)                │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  In-Memory Storage                               │  │
│  │  - Users, Products, Carts, Orders                │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
e-commerce-demo-stor-main/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── Login.tsx
│   │   ├── ProductCard.tsx
│   │   ├── Cart.tsx
│   │   ├── CheckoutDialog.tsx
│   │   └── ui/                   # Radix UI components
│   ├── lib/                      # Utilities and types
│   │   ├── data.ts               # Frontend data
│   │   └── types.ts              # TypeScript types
│   ├── App.tsx                   # Main app component
│   └── main.tsx                  # Entry point
│
├── server/                       # Backend source code
│   ├── data/                     # Data storage
│   │   ├── products.ts           # Product catalog
│   │   ├── users.ts              # User credentials
│   │   └── storage.ts            # Carts & orders
│   ├── routes/                   # API endpoints
│   │   ├── auth.ts               # Authentication
│   │   ├── products.ts           # Products API
│   │   ├── cart.ts               # Cart API
│   │   └── orders.ts             # Orders API
│   ├── index.ts                  # Server entry point
│   └── README.md                 # API documentation
│
├── package.json                  # Dependencies & scripts
├── vite.config.ts                # Vite configuration (with proxy)
├── tsconfig.json                 # TypeScript config
├── tailwind.config.js            # Tailwind CSS config
│
├── README.md                     # Main documentation
├── RUNNING.md                    # Running guide
├── BACKEND_SUMMARY.md            # Backend overview
└── PRD.md                        # Product requirements
```

---

## Development Workflow

### Making Changes

**Frontend Changes:**
- Edit files in `src/`
- Changes appear instantly (HMR)
- No restart needed

**Backend Changes:**
- Edit files in `server/`
- Server auto-restarts (tsx watch)
- Takes ~1 second to restart

### Testing API Endpoints

While the server is running, test endpoints:

```bash
# Health check
curl http://localhost:3002/api/health

# Get products
curl http://localhost:3002/api/products

# Login
curl -X POST http://localhost:3002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@shophub.com","password":"demo123"}'
```

### Stopping the Application

- **If using `npm start`**: Press `Ctrl+C` once
- **If running separately**: Press `Ctrl+C` in each terminal

---

## Common Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install all dependencies |
| `npm start` | Run frontend + backend together |
| `npm run dev` | Run frontend only |
| `npm run server` | Run backend only |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## Next Steps

Now that you have the backend running, you can:

1. **Integrate the frontend** with backend APIs
2. **Add authentication tokens** (JWT)
3. **Connect to a database** (MongoDB, PostgreSQL)
4. **Add more features** (reviews, wishlist, etc.)
5. **Deploy** to production (Vercel, Railway, etc.)

Happy coding! 🚀
