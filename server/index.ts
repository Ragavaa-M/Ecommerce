import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import './data/db.js'; // Initialize database
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/orders.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

// Logging middleware
app.use(morgan('dev')); // Logs: METHOD URL STATUS RESPONSE_TIME

// Custom detailed logging
app.use((req, res, next) => {
    const start = Date.now();

    // Log incoming request
    console.log(`\n📥 [${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    if (Object.keys(req.query).length > 0) {
        console.log('   Query:', req.query);
    }

    // Capture the original json method
    const originalJson = res.json.bind(res);

    // Override res.json to log response
    res.json = function (data: any) {
        const duration = Date.now() - start;
        console.log(`📤 [${new Date().toLocaleTimeString()}] ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
        if (data && typeof data === 'object') {
            const preview = JSON.stringify(data).substring(0, 100);
            console.log(`   Response: ${preview}${JSON.stringify(data).length > 100 ? '...' : ''}`);
        }
        return originalJson(data);
    };

    next();
});

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('❌ Error:', err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`\n🚀 ========================================`);
    console.log(`🚀 Server is running on port ${port}`);
    console.log(`🚀 API available at http://localhost:${port}/api`);
    console.log(`🚀 Health check: http://localhost:${port}/api/health`);
    console.log(`🚀 ========================================\n`);
});
