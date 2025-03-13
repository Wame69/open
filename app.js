const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Подключаем bodyParser для обработки POST-запросов с формами
app.use(bodyParser.urlencoded({ extended: true }));

// 1. "Привет, Express!"
app.get('/', (req, res) => {
  res.send('Привет, мир!');
});

// 2. Маршруты и параметры
app.get('/about', (req, res) => {
  res.send('Информация о сайте');
});

app.get('/user/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Привет, ${name}!`);
});

// 3. Форма обратной связи
app.get('/form', (req, res) => {
  res.sendFile(__dirname + '/form.html');
});

app.post('/submit', (req, res) => {
  const { name, message } = req.body;
  res.send(`Спасибо за сообщение, ${name}! Мы получили: ${message}`);
});

// 4. API JSON
const users = [
  { id: 1, name: 'Иван' },
  { id: 2, name: 'Мария' },
  { id: 3, name: 'Дмитрий' }
];

app.get('/api/users', (req, res) => {
  res.json(users);
});

// 5. Простой шаблонизатор с EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const products = [
  { id: 1, name: 'Товар 1', price: 100 },
  { id: 2, name: 'Товар 2', price: 200 },
  { id: 3, name: 'Товар 3', price: 300 }
];

app.get('/products', (req, res) => {
  res.render('products', { products });
});

app.listen(port, () => {
  console.log(`Сервер работает на http://localhost:${port}`);
});
