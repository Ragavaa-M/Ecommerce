import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
}

const USERS_FILE = join(__dirname, '../../users.json');

// Load users from file or use default
function loadUsers(): User[] {
    if (existsSync(USERS_FILE)) {
        try {
            const data = readFileSync(USERS_FILE, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error loading users file:', error);
            return getDefaultUsers();
        }
    }
    return getDefaultUsers();
}

function getDefaultUsers(): User[] {
    return [
        {
            id: '1',
            email: 'demo@shophub.com',
            password: 'demo123',
            name: 'Demo User'
        }
    ];
}

// Save users to file
export function saveUsers(users: User[]): void {
    try {
        writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
        console.log('✅ Users saved to file');
    } catch (error) {
        console.error('❌ Error saving users file:', error);
    }
}

export let users: User[] = loadUsers();
