const express = require('express');
const app = express();
const PORT = 3000;

// Используем express.json() для обработки JSON-запросов
app.use(express.json());

// Пример массива задач
let tasks = [];

// Маршрут для получения всех задач
app.get('/tasks', (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8'); // Убедитесь, что кодировка UTF-8
  res.json(tasks);
});

// Маршрут для добавления новой задачи
app.post('/tasks', (req, res) => {
  const { name, description } = req.body;

  // Создаём новую задачу с русскими символами
  const newTask = { id: tasks.length + 1, name, description };
  tasks.push(newTask);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(201).json(newTask);
});

// Маршрут для обновления задачи по ID
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  // Ищем задачу по ID
  const task = tasks.find(t => t.id == id);
  if (task) {
    task.name = name;
    task.description = description;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.json(task); // Отправляем обновлённую задачу
  } else {
    res.status(404).send('Task not found');
  }
});

// Маршрут для удаления задачи по ID
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(t => t.id != id);
  res.status(204).send(); // Отправляем пустой ответ, задача удалена
});

// Настройка сервера на порту 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
