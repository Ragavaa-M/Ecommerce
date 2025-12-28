import { Router, Request, Response } from 'express';
import { orders, carts } from '../data/storage.js';
import { products } from '../data/products.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Get all orders for a user
router.get('/:userId', (req: Request, res: Response) => {
    const { userId } = req.params;
    const userOrders = orders.filter(order => order.userId === userId);
    res.json({ orders: userOrders });
});

// Get specific order by ID
router.get('/:userId/:orderId', (req: Request, res: Response) => {
    const { userId, orderId } = req.params;
    const order = orders.find(o => o.id === orderId && o.userId === userId);

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

    const cart = carts.get(userId);
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

    orders.push(newOrder);
    carts.delete(userId); // Clear cart after order

    console.log(`📦 Order created: ${newOrder.id} for user ${userId} - Total: $${total.toFixed(2)} (${orderItems.length} items)`);

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

    const order = orders.find(o => o.id === orderId && o.userId === userId);
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    console.log(`📋 Order ${orderId} status updated to: ${status}`);

    res.json({
        message: 'Order status updated',
        order
    });
});

export default router;
