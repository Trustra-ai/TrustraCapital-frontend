const API_BASE = 'https://trustracapital-backend.onrender.com/api/auth';
const messageEl = document.getElementById('message');

// Register
document.getElementById('registerForm').addEventListener('submit', async e => {
  e.preventDefault();

  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      messageEl.style.color = 'green';
      messageEl.textContent = 'Registration successful! Redirecting...';
      setTimeout(() => window.location.href = 'dashboard.html', 1000);
    } else {
      messageEl.style.color = 'red';
      messageEl.textContent = data.message || JSON.stringify(data.errors);
    }
  } catch (err) {
    console.error(err);
    messageEl.style.color = 'red';
    messageEl.textContent = 'Server error. Try again later.';
  }
});

// Login
document.getElementById('loginForm').addEventListener('submit', async e => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      messageEl.style.color = 'green';
      messageEl.textContent = 'Login successful! Redirecting...';
      setTimeout(() => window.location.href = 'dashboard.html', 1000);
    } else {
      messageEl.style.color = 'red';
      messageEl.textContent = data.message || JSON.stringify(data.errors);
    }
  } catch (err) {
    console.error(err);
    messageEl.style.color = 'red';
    messageEl.textContent = 'Server error. Try again later.';
  }
});
