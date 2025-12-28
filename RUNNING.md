# Running the E-Commerce Application

## Quick Start (Recommended)

Run both frontend and backend together with a single command:

```bash
npm start
```

This will start:
- **Frontend** (Vite dev server) on `http://localhost:5173`
- **Backend** (Express API) on `http://localhost:3002`

The output will be color-coded:
- 🔵 **Cyan** = Frontend logs
- 🟣 **Magenta** = Backend logs

---

## Running Separately

If you prefer to run them in separate terminals:

### Terminal 1 - Backend
```bash
npm run server
```
- Runs on `http://localhost:3002`
- Hot-reload enabled (auto-restarts on file changes)

### Terminal 2 - Frontend
```bash
npm run dev
```
- Runs on `http://localhost:5173`
- Hot Module Replacement (HMR) enabled
- API calls are proxied to `http://localhost:3002/api`

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run both frontend and backend together |
| `npm run dev` | Run frontend only (Vite dev server) |
| `npm run server` | Run backend only (Express API) |
| `npm run build` | Build frontend for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## How It Works

1. **Frontend** runs on port `5173` (Vite default)
2. **Backend** runs on port `3002`
3. **Vite proxy** forwards all `/api/*` requests from frontend to backend
4. This means in your frontend code, you can call `/api/products` and it will automatically go to `http://localhost:3002/api/products`

---

## Testing the Setup

Once both are running, you can:

1. **Open the app**: `http://localhost:5173`
2. **Test API directly**: 
   ```bash
   curl http://localhost:3002/api/health
   curl http://localhost:3002/api/products
   ```

---

## Stopping the Application

- If using `npm start`: Press `Ctrl+C` once to stop both
- If running separately: Press `Ctrl+C` in each terminal

---

## Troubleshooting

### Port Already in Use
If port 3002 or 5173 is already in use:

**For Backend (3002):**
- Edit `server/index.ts` and change the default port
- Or set `PORT` environment variable

**For Frontend (5173):**
- Vite will automatically try the next available port
- Or specify port in `vite.config.ts`

### API Calls Not Working
- Make sure both frontend and backend are running
- Check that Vite proxy is configured in `vite.config.ts`
- Verify backend is on port 3002

### Hot Reload Not Working
- **Backend**: Uses `tsx watch` - should auto-restart on file changes
- **Frontend**: Uses Vite HMR - should update instantly
- If not working, try stopping and restarting
