// auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const PORT = 3001;

app.use(express.json());

const users = []; // Массив для хранения пользователей

const SECRET_KEY = 'your-secret-key'; // Ключ для подписи JWT

// Регистрация пользователя
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ username, password: hashedPassword });
    res.status(201).json({ message: 'Пользователь зарегистрирован' });
});

// Вход в систему
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Неверные данные для входа' });
    }

    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

// Защищённый маршрут
app.get('/profile', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return res.status(403).json({ message: 'Нет доступа' });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({ message: `Добро пожаловать, ${decoded.username}` });
    } catch (error) {
        res.status(401).json({ message: 'Неверный токен' });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
