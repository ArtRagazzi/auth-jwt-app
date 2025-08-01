import { useState } from 'react';
import loginImage from '../../assets/images/software-people.png';

function Login() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className="flex h-screen">
            {/* Painel esquerdo: Imagem e texto (2/3) */}
            <div className="w-2/3 bg-blue-600 text-white flex flex-col items-center justify-center p-8">
                <img
                    src={loginImage}
                    alt="Imagem Login"
                    className="mb-6 rounded w-200 h-auto"
                />
                <h1 className="text-4xl font-bold mb-4">Bem-vindo de volta!</h1>
                <p className="text-lg text-center max-w-md">
                    Acesse sua conta e aproveite todos os recursos da nossa plataforma.
                </p>
            </div>

            {/* Painel direito: Formulário (1/3) */}
            <div className="w-1/3 bg-white flex items-center justify-center p-8 shadow-xl">
                <form className="w-full max-w-sm space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>
                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Senha</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Entrar
                    </button>

                    <h2>Não tem conta? <a href="/register" className="text-blue-600 hover:underline">Cadastre-se</a></h2>
                </form>
            </div>
        </div>
    );
}

export default Login;