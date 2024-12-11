-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- User Preferences Table
CREATE TABLE IF NOT EXISTS user_preferences (
  user_id INTEGER PRIMARY KEY,
  dietary TEXT,
  favorite_cuisines TEXT,
  price_range TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  restaurant_id TEXT NOT NULL,
  rating INTEGER NOT NULL,
  text TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Group Sessions Table
CREATE TABLE IF NOT EXISTS group_sessions (
  id TEXT PRIMARY KEY,
  creator_id INTEGER NOT NULL,
  status TEXT DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (creator_id) REFERENCES users(id)
);

-- Session Participants Table
CREATE TABLE IF NOT EXISTS session_participants (
  session_id TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  vote_restaurant_id TEXT,
  joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (session_id, user_id),
  FOREIGN KEY (session_id) REFERENCES group_sessions(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
