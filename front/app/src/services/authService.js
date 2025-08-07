export const login = (userData)=> {
    localStorage.setItem('user', JSON.stringify(userData.user));
    localStorage.setItem('token', userData.token);
}

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};


export const isAuthenticated = () => {
  const token = localStorage.getItem('token'); // obtém o token do localStorage
  if (!token) return false; // se não houver token, não está autenticado

  try {
    const payloadBase64 = token.split('.')[1]; // pega a parte do payload do JWT 2º Parte
    const payload = JSON.parse(atob(payloadBase64)); // decodifica o payload
    const now = Math.floor(Date.now() / 1000); // tempo atual em segundos

    return payload.exp > now; // true se ainda não expirou
  } catch (e) {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return false;
  }
};