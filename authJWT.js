const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;

app.use(express.json());

const users = [];
const secretKey = 'your_secret_key'; // В реальном проекте используйте что-то более безопасное

// Регистрация
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).send('User registered');
});

// Логин
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Защищённый маршрут
app.get('/profile', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('No token provided');

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(500).send('Failed to authenticate token');
    res.json({ message: 'Welcome to your profile', user: decoded.username });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
