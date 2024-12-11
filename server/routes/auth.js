import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// In-memory user storage (replace with actual database)
const users = [];

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  
  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = { id: users.length + 1, email, password };
  users.push(user);

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  res.status(201).json({ token, user: { id: user.id, email: user.email } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  res.json({ token, user: { id: user.id, email: user.email } });
});

export default router;
