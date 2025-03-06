const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        errorMessage.textContent = 'Username dan Password tidak boleh kosong.';
        return;
    }

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        if (response.ok) {
            console.log(result.data.username);
            alert('Login berhasil!');
            window.location.href = '/home.html';
            
        } else {
            errorMessage.textContent = result.message || 'Login gagal. Coba lagi.';
        }
    } catch (error) {
        errorMessage.textContent = 'Terjadi kesalahan. Periksa koneksi Anda.';
        console.error('Error:', error);
    }
});
