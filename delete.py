import sqlite3

conn = sqlite3.connect('data/shophub.db')
cursor = conn.cursor()
cursor.execute("DELETE FROM users WHERE email = 'testuser123@example.com'")
conn.commit()
conn.close()