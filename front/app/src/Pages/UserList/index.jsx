import { Header } from "../../components/Header";
import { isAdmin } from "../../services/authService";
import { useEffect, useState } from "react";
import UserService from "../../services/userService";
import sem_permissao from "../../assets/images/sem_permissao.jpg";

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await UserService.getUsers();
                setUsers(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Erro ao carregar usuários:", error);
                setUsers([]);
            }
        };
        fetchUsers();
    }, []);

    if (!isAdmin()) {
        return (
            <>
                <Header />
                <div className="flex h-screen items-center justify-center bg-blue-50 px-6">
                    <div className="bg-white shadow-2xl rounded-2xl p-10 flex flex-col items-center max-w-3xl border-2 border-blue-400">
                        <img
                            src={sem_permissao}
                            alt="Sem permissão"
                            className="w-80 h-80 mb-10 rounded-full border-8 border-blue-600 object-cover"
                        />
                        <h1 className="text-5xl font-bold text-blue-900 mb-8 text-center">
                            Acesso Negado
                        </h1>
                        <p className="text-2xl text-blue-800 text-center max-w-lg">
                            Apenas administradores podem visualizar usuários.
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
                <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
                        Lista de Usuários
                    </h1>

                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left">ID</th>
                                    <th className="px-6 py-3 text-left">Email</th>
                                    <th className="px-6 py-3 text-left">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="border-b hover:bg-blue-50 transition"
                                        >
                                            <td className="px-6 py-3">{user.id}</td>
                                            <td className="px-6 py-3">{user.email}</td>
                                            <td className="px-6 py-3">
                                                {user.role === 1
                                                    ? "Administrador"
                                                    : "Usuário"}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="3"
                                            className="px-6 py-4 text-center text-gray-500"
                                        >
                                            Nenhum usuário encontrado
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserList;