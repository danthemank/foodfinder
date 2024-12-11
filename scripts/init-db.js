import { Database } from 'sqlite3';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '../data/food-finder.db');

const db = new Database(dbPath);

const schema = readFileSync(join(__dirname, '../database/schema.sql'), 'utf8');

db.serialize(() => {
  schema.split(';').forEach((statement) => {
    if (statement.trim()) {
      db.run(statement, (err) => {
        if (err) {
          console.error('Error executing statement:', statement);
          console.error(err);
        }
      });
    }
  });
});

db.close((err) => {
  if (err) {
    console.error('Error closing database:', err);
  } else {
    console.log('Database initialized successfully!');
  }
});
