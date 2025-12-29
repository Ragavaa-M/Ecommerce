import { Router, Request, Response } from 'express';
import { createOrder, getUserOrders, getOrderById, updateOrderStatus } from '../data/orderService.js';
import { getCart, clearCart } from '../data/cartService.js';
import { products } from '../data/productService.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Get all orders for a user
router.get('/:userId', (req: Request, res: Response) => {
    const { userId } = req.params;
    const userOrders = getUserOrders(userId);
    res.json({ orders: userOrders });
});

// Get specific order by ID
router.get('/:userId/:orderId', (req: Request, res: Response) => {
    const { userId, orderId } = req.params;
    const order = getOrderById(orderId, userId);

    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ order });
});

// Create new order
router.post('/:userId', (req: Request, res: Response) => {
    const { userId } = req.params;
    const { shippingAddress } = req.body;

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.email ||
        !shippingAddress.address || !shippingAddress.city || !shippingAddress.zipCode ||
        !shippingAddress.country) {
        return res.status(400).json({ error: 'Complete shipping address is required' });
    }

    const cart = getCart(userId);
    if (!cart || cart.items.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
    }

    // Calculate order details
    const orderItems = cart.items.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) {
            throw new Error(`Product ${item.productId} not found`);
        }
        return {
            productId: item.productId,
            quantity: item.quantity,
            price: product.price,
            name: product.name
        };
    });

    const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 10;
    const total = subtotal + shipping;

    const newOrder = {
        id: uuidv4(),
        userId,
        items: orderItems,
        total,
        shippingAddress,
        status: 'pending' as const,
        createdAt: new Date().toISOString()
    };

    createOrder(newOrder);
    clearCart(userId); // Clear cart after order

    console.log(`📦 Order created: ${newOrder.id} for user ${userId} - Total: ${total.toFixed(2)} (${orderItems.length} items)`);

    res.status(201).json({
        message: 'Order created successfully',
        order: newOrder
    });
});

// Update order status (for admin purposes)
router.patch('/:userId/:orderId/status', (req: Request, res: Response) => {
    const { userId, orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    const success = updateOrderStatus(orderId, userId, status);
    if (!success) {
        return res.status(404).json({ error: 'Order not found' });
    }

    console.log(`📋 Order ${orderId} status updated to: ${status}`);

    const order = getOrderById(orderId, userId);
    res.json({
        message: 'Order status updated',
        order
    });
});

export default router;
