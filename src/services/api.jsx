import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

function createConfig(token) {
  return {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
}

async function createUser(user) {
  await axios.post(`${BASE_URL}/auth/sign-up`, user);
}

async function login(data) {
  const token = await axios.post(`${BASE_URL}/auth/sign-in`, data);
  return token;
}

async function createTransaction(token, entry) {
  const config = createConfig(token);

  await axios.post(`${BASE_URL}/users/transactions`, entry, config);
}

const api ={
    createUser,
    login,
    createTransaction,
}

export default api;