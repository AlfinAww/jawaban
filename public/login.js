// Tangkap elemen HTML
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

// Tambahkan event listener untuk form
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Cegah reload halaman

    // Ambil nilai input
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validasi input kosong
    if (!username || !password) {
        errorMessage.textContent = 'Username dan Password tidak boleh kosong.';
        return;
    }

    try {
        // Kirim request ke backend dengan Fetch API
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json(); // Parsing respons JSON

        // Tangani respons dari server
        if (response.ok) {
            console.log(result.data.username);
            alert('Login berhasil!');
            
        } else {
            errorMessage.textContent = result.message || 'Login gagal. Coba lagi.';
        }
    } catch (error) {
        errorMessage.textContent = 'Terjadi kesalahan. Periksa koneksi Anda.';
        console.error('Error:', error);
    }
});
