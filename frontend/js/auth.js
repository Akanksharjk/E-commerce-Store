const handleLogin = async (event) => {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const data = await apiRequest('/auth/login', 'POST', { email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user_name', data.user.name);
    alert('Logged in successfully!');
    window.location.href = 'index.html';
  } catch (error) {
    alert(`Login failed: ${error.message}`);
  }
};

const handleRegister = async (event) => {
  event.preventDefault();
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;

  try {
    await apiRequest('/auth/register', 'POST', { name, email, password });
    alert('Registration successful! Please log in.');
    window.location.href = 'login.html';
  } catch (error) {
    alert(`Registration failed: ${error.message}`);
  }
};

const checkAuthState = () => {
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('user_name');
  const authContainer = document.getElementById('nav-auth');

  if (!authContainer) return;

  if (token && userName) {
    authContainer.innerHTML = `
      <span class="text-sm font-medium text-gray-700">Hello, ${userName}</span>
      <button onclick="logoutUser()" class="text-sm font-semibold text-red-600 hover:text-red-800 ml-4">Logout</button>
    `;
  } else {
    authContainer.innerHTML = `
      <a href="login.html" class="text-sm font-semibold text-indigo-600 hover:text-indigo-800">Login / Register</a>
    `;
  }
};

const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user_name');
  window.location.reload();
};