import { useState } from 'react';
import registerImage from '../../assets/images/credential.jpg';
import sem_permissao from '../../assets/images/sem_permissao.jpg';
import { isAdmin, isAuthenticated } from '../../services/authService';
import UserService from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { Header } from "../../components/Header";

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('2'); // Default to 'Normal' user
    const navigate = useNavigate();


    async function handleSubmit(e) {
            e.preventDefault();
            if (!isAdmin()) {
                alert('Usuário não autorizado');
                return;
            }
            const userData = { email, password, role: parseInt(role,10) };
            try {
                const result = await UserService.register(userData);
                alert('Usuário registrado com sucesso');
                navigate('/');
            } catch (err) {
                alert('Erro ao registrar: ' + err.message);
            }
    }

    if (!isAdmin()) {
    return (
        <>
            <Header />
            <div className="flex h-screen items-center justify-center bg-blue-50 px-6">
                <div className="bg-white shadow-2xl rounded-2xl p-32 flex flex-col items-center max-w-3xl border-2 border-blue-400">
                    <img
                        src={sem_permissao}
                        alt="Sem permissão"
                        className="w-80 h-80 mb-10 rounded-full border-8 border-blue-600 object-cover"
                    />
                    <h1 className="text-5xl font-bold text-blue-900 mb-8 text-center">
                        Acesso Negado
                    </h1>
                    <p className="text-2xl text-blue-800 text-center max-w-lg">
                        Apenas administradores podem registrar novos usuários.
                    </p>
                </div>
            </div>
        </>
    );
}
    return (
    <>
        <Header />
        <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <img
            src={registerImage}
            alt="Imagem Cadastro"
            className="w-58 h-58 rounded-full mb-8 object-cover border-3 border-blue-600"
            />
            <h1 className="text-3xl font-bold text-blue-700 mb-2 text-center">
            Cadastrar Novo Usuário
            </h1>
            <p className="text-center text-blue-600 mb-8 px-4">
            Cadastre-se para começar a usar a plataforma e aproveitar todos os recursos.
            </p>

            <form className="w-full space-y-6" onSubmit={handleSubmit}>
            <div>
                <label className="block text-blue-700 mb-2 font-semibold">Email</label>
                <input
                type="email"
                className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplo@dominio.com"
                />
            </div>

            <div>
                <label className="block text-blue-700 mb-2 font-semibold">Senha</label>
                <input
                type="password"
                className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                />
            </div>

            <div>
                <label className="block text-blue-700 mb-2 font-semibold">Tipo de usuário</label>
                <select
                className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={role}
                onChange={(e) => setRole(parseInt(e.target.value, 10))}
                >
                <option value={1}>Admin</option>
                <option value={2}>Normal</option>
                </select>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
                Cadastrar
            </button>
            </form>
        </div>
        </div>
    </>
    );
}

export default Register;
