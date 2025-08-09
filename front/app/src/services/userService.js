const BASE_ENPOINT = 'http://localhost:5119/api/v1';


const UserService = {
    register: async (userData) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BASE_ENPOINT}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Falha ao registrar usuário');
            }
            return await response.text();
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    }
}

export default UserService;