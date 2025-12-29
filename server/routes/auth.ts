import { Router, Request, Response } from 'express';
import { users, saveUsers } from '../data/userService.js';

const router = Router();

// Login endpoint
router.post('/login', (req: Request, res: Response) => {
    const { email, password } = req.body;

    console.log('🔐 Login attempt:', email);

    if (!email || !password) {
        console.log('❌ Login failed: Missing credentials');
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        console.log('❌ Login failed: Invalid credentials for', email);
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('✅ Login successful:', user.name);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    res.json({
        userId: user.id, // Include userId in response
        user: userWithoutPassword,
        message: 'Login successful'
    });
});

// Register endpoint (for demo purposes)
router.post('/register', (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    console.log('📝 Registration attempt:', email);

    if (!email || !password || !name) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        console.log('❌ Registration failed: User already exists');
        return res.status(409).json({ error: 'User already exists' });
    }

    const newUser = {
        id: String(Date.now()), // Use timestamp for unique ID
        email,
        password,
        name
    };

    users.push(newUser);
    saveUsers(users); // Persist to file
    console.log('✅ Registration successful:', name);

    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({
        userId: newUser.id, // Include userId in response
        user: userWithoutPassword,
        message: `Welcome to ShopHub, ${name}! Your account has been created successfully. Start exploring our amazing products!`
    });
});

// Logout endpoint
router.post('/logout', (req: Request, res: Response) => {
    console.log('👋 User logged out');
    res.json({ message: 'Logout successful' });
});

export default router;
