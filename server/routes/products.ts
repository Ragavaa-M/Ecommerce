import { Router, Request, Response } from 'express';
import { products } from '../data/products.js';

const router = Router();

// Get all products
router.get('/', (req: Request, res: Response) => {
    const { category, search, minPrice, maxPrice } = req.query;

    let filteredProducts = [...products];

    // Filter by category
    if (category && typeof category === 'string') {
        filteredProducts = filteredProducts.filter(p =>
            p.category.toLowerCase() === category.toLowerCase()
        );
    }

    // Filter by search term
    if (search && typeof search === 'string') {
        const searchLower = search.toLowerCase();
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower)
        );
    }

    // Filter by price range
    if (minPrice && typeof minPrice === 'string') {
        filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice && typeof maxPrice === 'string') {
        filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
    }

    res.json({ products: filteredProducts });
});

// Get product by ID
router.get('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ product });
});

// Get all categories
router.get('/categories/list', (req: Request, res: Response) => {
    const categories = [...new Set(products.map(p => p.category))];
    res.json({ categories });
});

export default router;
