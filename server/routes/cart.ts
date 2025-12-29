import { Router, Request, Response } from 'express';
import { getCart, addToCart, updateCartItemQuantity, removeFromCart, clearCart } from '../data/cartService.js';
import { products } from '../data/productService.js';

const router = Router();

// Get cart for user
router.get('/:userId', (req: Request, res: Response) => {
    const { userId } = req.params;
    const cart = getCart(userId);

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

    // Add to cart using database service
    addToCart(userId, productId, quantity);
    console.log(`🛒 Added to cart: ${product.name} x${quantity} for user ${userId}`);

    // Get updated cart
    const cart = getCart(userId);
    const enrichedItems = cart.items.map(item => {
        const p = products.find(pr => pr.id === item.productId);
        return { product: p, quantity: item.quantity };
    });

    res.json({
        message: 'Item added to cart',
        cart: {
            items: enrichedItems
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

    const success = updateCartItemQuantity(userId, productId, quantity);
    if (!success) {
        return res.status(404).json({ error: 'Item not found in cart' });
    }

    console.log(`🔄 Updated quantity for product ${productId} to ${quantity}`);

    // Get updated cart
    const cart = getCart(userId);
    const enrichedItems = cart.items.map(item => {
        const p = products.find(pr => pr.id === item.productId);
        return { product: p, quantity: item.quantity };
    });

    res.json({
        message: 'Quantity updated',
        cart: {
            items: enrichedItems
        }
    });
});

// Remove item from cart
router.delete('/:userId/items/:productId', (req: Request, res: Response) => {
    const { userId, productId } = req.params;

    const success = removeFromCart(userId, productId);
    if (!success) {
        return res.status(404).json({ error: 'Cart not found or item not in cart' });
    }

    console.log(`🗑️ Removed product ${productId} from cart`);

    // Get updated cart
    const cart = getCart(userId);
    const enrichedItems = cart.items.map(item => {
        const p = products.find(pr => pr.id === item.productId);
        return { product: p, quantity: item.quantity };
    });

    res.json({
        message: 'Item removed from cart',
        cart: {
            items: enrichedItems
        }
    });
});

// Clear cart
router.delete('/:userId', (req: Request, res: Response) => {
    const { userId } = req.params;
    clearCart(userId);
    console.log(`🧹 Cleared cart for user ${userId}`);
    res.json({ message: 'Cart cleared' });
});

export default router;
