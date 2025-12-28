import { Router, Request, Response } from 'express';
import { carts } from '../data/storage.js';
import { products } from '../data/products.js';

const router = Router();

// Get cart for user
router.get('/:userId', (req: Request, res: Response) => {
    const { userId } = req.params;
    const cart = carts.get(userId);

    if (!cart) {
        return res.json({ items: [] });
    }

    // Enrich cart items with product details
    const enrichedItems = cart.items.map(item => {
        const product = products.find(p => p.id === item.productId);
        return {
            product,
            quantity: item.quantity
        };
    }).filter(item => item.product !== undefined);

    res.json({ items: enrichedItems });
});

// Add item to cart
router.post('/:userId/items', (req: Request, res: Response) => {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity < 1) {
        return res.status(400).json({ error: 'Invalid product or quantity' });
    }

    const product = products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    let cart = carts.get(userId);
    if (!cart) {
        cart = { userId, items: [] };
        carts.set(userId, cart);
    }

    const existingItem = cart.items.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
        console.log(`🛒 Updated cart: ${product.name} quantity now ${existingItem.quantity} for user ${userId}`);
    } else {
        cart.items.push({ productId, quantity });
        console.log(`🛒 Added to cart: ${product.name} x${quantity} for user ${userId}`);
    }

    res.json({
        message: 'Item added to cart',
        cart: {
            items: cart.items.map(item => {
                const p = products.find(pr => pr.id === item.productId);
                return { product: p, quantity: item.quantity };
            })
        }
    });
});

// Update item quantity
router.put('/:userId/items/:productId', (req: Request, res: Response) => {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
        return res.status(400).json({ error: 'Quantity must be at least 1' });
    }

    const cart = carts.get(userId);
    if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
    }

    const item = cart.items.find(i => i.productId === productId);
    if (!item) {
        return res.status(404).json({ error: 'Item not found in cart' });
    }

    item.quantity = quantity;
    console.log(`🔄 Updated quantity for product ${productId} to ${quantity}`);

    res.json({
        message: 'Quantity updated',
        cart: {
            items: cart.items.map(item => {
                const p = products.find(pr => pr.id === item.productId);
                return { product: p, quantity: item.quantity };
            })
        }
    });
});

// Remove item from cart
router.delete('/:userId/items/:productId', (req: Request, res: Response) => {
    const { userId, productId } = req.params;

    const cart = carts.get(userId);
    if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.productId !== productId);
    console.log(`🗑️ Removed product ${productId} from cart`);

    res.json({
        message: 'Item removed from cart',
        cart: {
            items: cart.items.map(item => {
                const p = products.find(pr => pr.id === item.productId);
                return { product: p, quantity: item.quantity };
            })
        }
    });
});

// Clear cart
router.delete('/:userId', (req: Request, res: Response) => {
    const { userId } = req.params;
    carts.delete(userId);
    console.log(`🧹 Cleared cart for user ${userId}`);
    res.json({ message: 'Cart cleared' });
});

export default router;
