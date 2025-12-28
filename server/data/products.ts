export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    stock: number;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Wireless Headphones',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
        description: 'Premium wireless headphones with noise cancellation',
        category: 'Electronics',
        stock: 50
    },
    {
        id: '2',
        name: 'Smart Watch',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
        description: 'Feature-rich smartwatch with fitness tracking',
        category: 'Electronics',
        stock: 30
    },
    {
        id: '3',
        name: 'Leather Backpack',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
        description: 'Durable leather backpack perfect for daily use',
        category: 'Accessories',
        stock: 25
    },
    {
        id: '4',
        name: 'Sunglasses',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
        description: 'Classic aviator sunglasses with UV protection',
        category: 'Accessories',
        stock: 40
    },
    {
        id: '5',
        name: 'Running Shoes',
        price: 119.99,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
        description: 'Comfortable running shoes with superior cushioning',
        category: 'Footwear',
        stock: 60
    },
    {
        id: '6',
        name: 'Coffee Maker',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop',
        description: 'Programmable coffee maker for perfect brew every time',
        category: 'Home',
        stock: 35
    },
    {
        id: '7',
        name: 'Yoga Mat',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop',
        description: 'Non-slip yoga mat with extra cushioning',
        category: 'Fitness',
        stock: 100
    },
    {
        id: '8',
        name: 'Desk Lamp',
        price: 45.99,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop',
        description: 'LED desk lamp with adjustable brightness',
        category: 'Home',
        stock: 45
    },
    {
        id: '9',
        name: 'Bluetooth Speaker',
        price: 69.99,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
        description: 'Portable speaker with 360-degree sound',
        category: 'Electronics',
        stock: 55
    },
    {
        id: '10',
        name: 'Water Bottle',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop',
        description: 'Insulated stainless steel water bottle',
        category: 'Fitness',
        stock: 80
    },
    {
        id: '11',
        name: 'Notebook Set',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&h=500&fit=crop',
        description: 'Premium notebook set for journaling',
        category: 'Stationery',
        stock: 70
    },
    {
        id: '12',
        name: 'Plant Pot',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&h=500&fit=crop',
        description: 'Ceramic plant pot with drainage',
        category: 'Home',
        stock: 90
    }
];
