// Import Express dan Body-Parser
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Tambahkan modul path

// Inisialisasi aplikasi Express
const app = express();

// Middleware untuk parsing data JSON dan URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware untuk melayani file statis
app.use(express.static(path.join(__dirname, 'public'))); // Arahkan ke folder public

// Rute GET untuk root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html')); // Arahkan ke login.html
});

// Rute POST untuk menerima data
app.post('/submit', (req, res) => {
    const { name, message } = req.body; // Ambil data dari request body
    res.send(`Hello ${name}, you said: "${message}"`);
});

// Simulasi data user di database
const users = [
    { username: 'test', password: 'test' } // Username dan password contoh
];

// Endpoint Login
app.post('/api/login', (req, res) => {
    console.log(req);
    const { username, password } = req.body;

    // Validasi input kosong
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Username dan password wajib diisi.'
        });
    }

    // Cek username dan password
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        return res.status(200).json({
            success: true,
            message: 'Login berhasil.',
            data: {
                username: user.username,
                token: 'dummy-jwt-token' // Gantikan dengan token yang di-generate
            }
        });
    } else {
        return res.status(401).json({
            success: false,
            message: 'Username atau password salah.'
        });
    }
});

// Menentukan port
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
