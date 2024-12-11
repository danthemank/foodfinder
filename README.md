# FoodFinder 🍽️

Discover your next favorite meal with FoodFinder - a modern restaurant discovery platform that helps users find and decide on restaurants based on preferences, location, and group consensus.

## Features 🌟

- User Authentication
- Location-based Restaurant Search
- Advanced Filtering System
- Group Decision Making
- Restaurant Reviews & Ratings
- User Preferences
- "I'm Feeling Lucky" Randomizer

## Tech Stack 💻

- Frontend:
  - React
  - Redux Toolkit
  - Styled Components
  - Vite
- Backend:
  - Node.js
  - Express
  - JWT Authentication
- Database:
  - SQLite (via libsql)
- APIs:
  - Google Places API
  - Google Maps JavaScript API

## Prerequisites 📋

- Node.js (v16 or higher)
- NPM (v7 or higher)
- Google Cloud Platform account with Places API enabled
- Git (optional)

## Environment Variables 🔑

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d

# Database Configuration
DATABASE_URL=file:./data/food-finder.db

# Google API Keys
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_GOOGLE_PLACES_API_KEY=your_google_places_api_key

# Client URL (for CORS)
CLIENT_URL=http://localhost:5173
```

## Database Schema 📊

```sql
-- Users Table
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- User Preferences Table
CREATE TABLE user_preferences (
  user_id INTEGER PRIMARY KEY,
  dietary TEXT,
  favorite_cuisines TEXT,
  price_range TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Reviews Table
CREATE TABLE reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  restaurant_id TEXT NOT NULL,
  rating INTEGER NOT NULL,
  text TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Group Sessions Table
CREATE TABLE group_sessions (
  id TEXT PRIMARY KEY,
  creator_id INTEGER NOT NULL,
  status TEXT DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (creator_id) REFERENCES users(id)
);

-- Session Participants Table
CREATE TABLE session_participants (
  session_id TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  vote_restaurant_id TEXT,
  joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (session_id, user_id),
  FOREIGN KEY (session_id) REFERENCES group_sessions(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## Installation & Setup 🚀

1. Clone the repository:
```bash
git clone https://github.com/yourusername/food-finder.git
cd food-finder
```

2. Install dependencies:
```bash
npm install
```

3. Initialize the database:
```bash
npm run init-db
```

4. Start the development server:
```bash
npm run dev
```

## Development Scripts 🛠️

```json
{
  "scripts": {
    "dev": "vite",
    "server": "node server/index.js",
    "dev:all": "concurrently \"npm run dev\" \"npm run server\"",
    "build": "vite build",
    "preview": "vite preview",
    "init-db": "node scripts/init-db.js"
  }
}
```

## Deployment 🌐

### Frontend Deployment (Vercel/Netlify)

1. Create a new project in Vercel/Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`

3. Set environment variables in the deployment platform:
   - `VITE_GOOGLE_MAPS_API_KEY`
   - `VITE_GOOGLE_PLACES_API_KEY`

### Backend Deployment

1. Set up a server (e.g., DigitalOcean, AWS, or Heroku)

2. Install dependencies:
```bash
npm install --production
```

3. Configure environment variables on the server

4. Start the server:
```bash
npm start
```

### Database Setup

1. Create the database file:
```bash
mkdir data
touch data/food-finder.db
```

2. Initialize the database schema:
```bash
npm run init-db
```

## API Documentation 📚

### Authentication Endpoints

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

### Restaurant Endpoints

```
GET /api/restaurants/search
GET /api/restaurants/:id
```

### User Preference Endpoints

```
GET /api/preferences
PUT /api/preferences
```

### Review Endpoints

```
GET /api/reviews/:restaurantId
POST /api/reviews/:restaurantId
```

### Group Session Endpoints

```
POST /api/group-sessions
POST /api/group-sessions/:id/join
POST /api/group-sessions/:id/vote
```

## Security Considerations 🔒

1. API Keys Protection:
   - Never commit `.env` files
   - Use environment variables for sensitive data
   - Implement API key rotation

2. Authentication:
   - JWT tokens with expiration
   - Secure password hashing
   - HTTPS enforcement

3. Data Validation:
   - Input sanitization
   - Request rate limiting
   - CORS configuration

## Contributing 🤝

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
