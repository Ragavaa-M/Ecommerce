#!/usr/bin/env node

/**
 * Database Utility Script
 * 
 * Usage:
 *   node scripts/db-utils.js stats    - Show database statistics
 *   node scripts/db-utils.js reset    - Reset database (delete and recreate)
 *   node scripts/db-utils.js backup   - Create database backup
 *   node scripts/db-utils.js users    - List all users
 *   node scripts/db-utils.js products - List all products
 */

import Database from 'better-sqlite3';
import { existsSync, copyFileSync, unlinkSync, mkdirSync } from 'fs';
import { join } from 'path';

const DB_PATH = './data/shophub.db';
const BACKUP_DIR = './data/backups';

const command = process.argv[2];

if (!command) {
    console.log('Usage: node scripts/db-utils.js <command>');
    console.log('Commands: stats, reset, backup, users, products');
    process.exit(1);
}

function showStats() {
    if (!existsSync(DB_PATH)) {
        console.log('❌ Database not found. Run the server first to create it.');
        return;
    }

    const db = new Database(DB_PATH);
    
    console.log('\n📊 Database Statistics\n');
    console.log('━'.repeat(50));
    
    const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
    console.log(`👥 Users:        ${userCount.count}`);
    
    const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get();
    console.log(`📦 Products:     ${productCount.count}`);
    
    const cartCount = db.prepare('SELECT COUNT(*) as count FROM carts').get();
    console.log(`🛒 Cart Items:   ${cartCount.count}`);
    
    const orderCount = db.prepare('SELECT COUNT(*) as count FROM orders').get();
    console.log(`📋 Orders:       ${orderCount.count}`);
    
    const orderItemCount = db.prepare('SELECT COUNT(*) as count FROM order_items').get();
    console.log(`📦 Order Items:  ${orderItemCount.count}`);
    
    console.log('━'.repeat(50));
    
    // Database size
    const stats = db.prepare("SELECT page_count * page_size as size FROM pragma_page_count(), pragma_page_size()").get();
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`💾 Database Size: ${sizeKB} KB`);
    console.log('━'.repeat(50) + '\n');
    
    db.close();
}

function resetDatabase() {
    if (!existsSync(DB_PATH)) {
        console.log('ℹ️  Database does not exist. Nothing to reset.');
        return;
    }

    console.log('⚠️  WARNING: This will delete all data!');
    console.log('🗑️  Deleting database...');
    
    unlinkSync(DB_PATH);
    
    // Also delete WAL and SHM files if they exist
    if (existsSync(DB_PATH + '-wal')) unlinkSync(DB_PATH + '-wal');
    if (existsSync(DB_PATH + '-shm')) unlinkSync(DB_PATH + '-shm');
    
    console.log('✅ Database deleted. Restart the server to recreate it.\n');
}

function backupDatabase() {
    if (!existsSync(DB_PATH)) {
        console.log('❌ Database not found. Nothing to backup.');
        return;
    }

    if (!existsSync(BACKUP_DIR)) {
        mkdirSync(BACKUP_DIR, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const backupPath = join(BACKUP_DIR, `shophub-${timestamp}.db`);
    
    console.log('💾 Creating backup...');
    copyFileSync(DB_PATH, backupPath);
    console.log(`✅ Backup created: ${backupPath}\n`);
}

function listUsers() {
    if (!existsSync(DB_PATH)) {
        console.log('❌ Database not found.');
        return;
    }

    const db = new Database(DB_PATH);
    const users = db.prepare('SELECT id, email, name, created_at FROM users ORDER BY created_at DESC').all();
    
    console.log('\n👥 Users\n');
    console.log('━'.repeat(80));
    console.log('ID'.padEnd(10) + 'Name'.padEnd(25) + 'Email'.padEnd(30) + 'Created');
    console.log('━'.repeat(80));
    
    users.forEach(user => {
        const created = new Date(user.created_at).toLocaleDateString();
        console.log(
            user.id.padEnd(10) +
            user.name.padEnd(25) +
            user.email.padEnd(30) +
            created
        );
    });
    
    console.log('━'.repeat(80));
    console.log(`Total: ${users.length} users\n`);
    
    db.close();
}

function listProducts() {
    if (!existsSync(DB_PATH)) {
        console.log('❌ Database not found.');
        return;
    }

    const db = new Database(DB_PATH);
    const products = db.prepare('SELECT id, name, price, category, stock FROM products ORDER BY category, name').all();
    
    console.log('\n📦 Products\n');
    console.log('━'.repeat(90));
    console.log('ID'.padEnd(5) + 'Name'.padEnd(30) + 'Price'.padEnd(12) + 'Category'.padEnd(20) + 'Stock');
    console.log('━'.repeat(90));
    
    products.forEach(product => {
        console.log(
            product.id.padEnd(5) +
            product.name.padEnd(30) +
            `$${product.price.toFixed(2)}`.padEnd(12) +
            product.category.padEnd(20) +
            product.stock
        );
    });
    
    console.log('━'.repeat(90));
    console.log(`Total: ${products.length} products\n`);
    
    db.close();
}

// Execute command
switch (command) {
    case 'stats':
        showStats();
        break;
    case 'reset':
        resetDatabase();
        break;
    case 'backup':
        backupDatabase();
        break;
    case 'users':
        listUsers();
        break;
    case 'products':
        listProducts();
        break;
    default:
        console.log(`❌ Unknown command: ${command}`);
        console.log('Available commands: stats, reset, backup, users, products');
        process.exit(1);
}
