
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/submit', (req, res) => {
    const { name, message } = req.body;
    res.send(`Hello ${name}, you said: "${message}"`);
});

const users = [
    { username: 'test', password: 'test' }
];

app.post('/api/login', (req, res) => {
    console.log(req);
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Username dan password wajib diisi.'
        });
    }

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        return res.status(200).json({
            success: true,
            message: 'Login berhasil.',
            data: {
                username: user.username,
                token: 'dummy-jwt-token'
            }
        });
    } else {
        return res.status(401).json({
            success: false,
            message: 'Username atau password salah.'
        });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
