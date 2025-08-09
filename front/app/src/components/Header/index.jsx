import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";
import { BiLogOut,BiHome,BiSolidUserPlus,BiSolidUserDetail    } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function Header() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            try {
                const parsed = JSON.parse(userData);
                setUserEmail(parsed.email);
            } catch (err) {
                console.error("Erro ao ler usuário do localStorage:", err);
            }
        }
    }, []);

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <header className="w-full">
            <nav className="w-full bg-blue-600 h-16 flex items-center justify-between px-22 shadow-md">
                {/* Links */}
                <div className="flex gap-6 text-lg font-semibold text-white">
                    <Link to="/" className="hover:underline">
                        <BiHome size={32} />
                    </Link>
                    <Link to="/register" className="hover:underline">
                        <BiSolidUserPlus size={32} />
                    </Link>
                    <Link to="/users" className="hover:underline">
                        <BiSolidUserDetail size={32}/>
                    </Link>
                </div>

                {/* Saudação + Logout */}
                <div className="flex items-center gap-4 text-white">
                    {userEmail && (
                        <span className="text-sm sm:text-base">
                            Bem-vindo, <strong>{userEmail}</strong>
                        </span>
                    )}
                    <button onClick={handleLogout} style={{ cursor: "pointer" }} title="Sair">
                        <BiLogOut size={28} color="#FFF" />
                    </button>
                </div>
            </nav>
        </header>
    );
}