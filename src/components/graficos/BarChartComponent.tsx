import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import api from "../../services/api";

type MesData = {
  mes: string;
  total: number;
};

export function BarChartComponent() {
  const [data, setData] = useState<MesData[]>([]);

  useEffect(() => {
    const ano = new Date().getFullYear();
    const fetchData = async () => {
      try {
        const res = await api.get<MesData[]>(
          `/despesas/gastos-por-mes?ano=${ano}`
        );
        console.log("📊 Dados do gráfico de barras:", res.data);
        setData(res.data);
      } catch (err) {
        console.error("Erro ao carregar gráfico de barras:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ width: "100%", height: 300, marginTop: 20 }}>
      <h3 style={{ textAlign: "center" }}>Gastos Mensais</h3>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <Bar dataKey="value" fill="#8884d8" />

          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
