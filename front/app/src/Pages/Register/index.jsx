import { useState } from 'react';
import registerImage from '../../assets/images/credential.jpg';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('normal');

    return (
        <div className="flex h-screen">
            {/* Painel esquerdo: Imagem e texto (2/3) */}
            <div className="w-1/2 bg-white text-blue-600 flex flex-col items-center justify-center p-8">
                <img
                    src={registerImage}
                    alt="Imagem Cadastro"
                    className="mb-6 rounded w-150 h-auto"
                />
                <h1 className="text-4xl font-bold mb-4">Cadastrar novo usuário</h1>
                <p className="text-lg text-center max-w-md">
                    Cadastre-se para começar a usar a plataforma e aproveitar todos os recursos.
                </p>
            </div>

            {/* Painel direito: Formulário (1/3) */}
            <div className="w-1/2 bg-blue-600 flex items-center justify-center p-8 shadow-xl">
                <form className="w-full max-w-sm space-y-6">
                    <h2 className="text-2xl font-bold text-white text-center">Cadastro de Usuario</h2>

                    <div>
                        <label className="block text-white mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border border-white bg-white text-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-white mb-1">Senha</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-white bg-white text-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-white mb-1">Tipo de usuário</label>
                        <select
                            className="w-full px-4 py-2 border border-white bg-white text-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="normal">Normal</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition"
                    >
                        Cadastrar
                    </button>
                    
                </form>
            </div>
        </div>
    );
}

export default Register;
