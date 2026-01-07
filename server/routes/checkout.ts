import { Router, Request, Response } from 'express';
import { createOrder, getUserOrders } from '../data/orderService.js';
import { getCart, clearCart } from '../data/cartService.js';
import { products } from '../data/productService.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Checkout - Process cart and create order
router.post('/:userId', (req: Request, res: Response) => {
    const { userId } = req.params;
    const { shippingAddress, paymentMethod } = req.body;

    // Validate shipping address
    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.email ||
        !shippingAddress.address || !shippingAddress.city || !shippingAddress.zipCode ||
        !shippingAddress.country) {
        return res.status(400).json({ error: 'Complete shipping address is required' });
    }

    // Validate payment method
    const validPaymentMethods = ['credit_card', 'debit_card', 'paypal', 'cash_on_delivery'];
    if (!paymentMethod || !validPaymentMethods.includes(paymentMethod)) {
        return res.status(400).json({ 
            error: 'Valid payment method is required',
            validMethods: validPaymentMethods
        });
    }

    // Get user's cart
    const cart = getCart(userId);
    if (!cart || cart.items.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
    }

    // Validate stock availability and calculate order details
    const orderItems: { productId: string; quantity: number; price: number; name: string }[] = [];
    for (const item of cart.items) {
        const product = products.find(p => p.id === item.productId);
        if (!product) {
            return res.status(400).json({ error: `Product ${item.productId} not found` });
        }
        if (product.stock < item.quantity) {
            return res.status(400).json({ 
                error: `Insufficient stock for ${product.name}. Available: ${product.stock}` 
            });
        }
        orderItems.push({
            productId: item.productId,
            quantity: item.quantity,
            price: product.price,
            name: product.name
        });
    }

    // Calculate totals
    const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 100 ? 0 : 10; // Free shipping over $100
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    // Create order
    const newOrder = {
        id: uuidv4(),
        userId,
        items: orderItems,
        subtotal: Math.round(subtotal * 100) / 100,
        shipping: Math.round(shipping * 100) / 100,
        tax: Math.round(tax * 100) / 100,
        total: Math.round(total * 100) / 100,
        shippingAddress,
        paymentMethod,
        status: 'pending' as const,
        createdAt: new Date().toISOString()
    };

    createOrder(newOrder);
    clearCart(userId);

    console.log(`✅ Checkout completed: Order ${newOrder.id} for user ${userId} - Total: $${newOrder.total.toFixed(2)}`);

    res.status(201).json({
        message: 'Checkout successful',
        order: newOrder,
        summary: {
            itemCount: orderItems.length,
            subtotal: newOrder.subtotal,
            shipping: newOrder.shipping,
            tax: newOrder.tax,
            total: newOrder.total
        }
    });
});

// Get checkout summary (preview before confirming)
router.get('/:userId/summary', (req: Request, res: Response) => {
    const { userId } = req.params;

    const cart = getCart(userId);
    if (!cart || cart.items.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
    }

    const items = cart.items.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return null;
        return {
            productId: item.productId,
            name: product.name,
            price: product.price,
            quantity: item.quantity,
            lineTotal: product.price * item.quantity,
            inStock: product.stock >= item.quantity
        };
    }).filter(item => item !== null);

    const subtotal = items.reduce((sum, item) => sum + item!.lineTotal, 0);
    const shipping = subtotal >= 100 ? 0 : 10;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    res.json({
        items,
        subtotal: Math.round(subtotal * 100) / 100,
        shipping: Math.round(shipping * 100) / 100,
        tax: Math.round(tax * 100) / 100,
        total: Math.round(total * 100) / 100,
        freeShippingThreshold: 100,
        availablePaymentMethods: ['credit_card', 'debit_card', 'paypal', 'cash_on_delivery']
    });
});

export default router;
