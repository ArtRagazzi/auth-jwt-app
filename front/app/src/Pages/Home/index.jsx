import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import UserService from "../../services/userService";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registrar os elementos do gráfico
ChartJS.register(ArcElement, Tooltip, Legend);

function Home() {
  const [adminCount, setAdminCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await UserService.getUsers();

        if (Array.isArray(users)) {
          const admins = users.filter((u) => u.role === 1).length;
          const normals = users.filter((u) => u.role !== 1).length;

          setAdminCount(admins);
          setUserCount(normals);
        }
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      }
    };

    fetchData();
  }, []);

  const totalUsers = adminCount + userCount;

  const data = {
    labels: ["Administradores", "Usuários"],
    datasets: [
      {
        label: "Quantidade",
        data: [adminCount, userCount],
        backgroundColor: ["#2563eb", "#60a5fa"], // Azul escuro e azul claro
        borderColor: ["#1e3a8a", "#3b82f6"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 px-4">
        <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center">
          Distribuição de Usuários
        </h1>

        <p className="text-xl text-gray-700 mb-6">
          Total de usuários: <span className="font-bold">{totalUsers}</span>
        </p>

        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
          <Pie data={data} options={options} />
        </div>
      </div>
    </>
  );
}

export default Home;