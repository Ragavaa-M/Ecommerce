// In-memory storage for carts and orders
export interface CartItem {
    productId: string;
    quantity: number;
}

export interface Cart {
    userId: string;
    items: CartItem[];
}

export interface Order {
    id: string;
    userId: string;
    items: Array<{
        productId: string;
        quantity: number;
        price: number;
        name: string;
    }>;
    total: number;
    shippingAddress: {
        fullName: string;
        email: string;
        address: string;
        city: string;
        zipCode: string;
        country: string;
    };
    status: 'pending' | 'processing' | 'shipped' | 'delivered';
    createdAt: string;
}

export const carts: Map<string, Cart> = new Map();
export const orders: Order[] = [];
