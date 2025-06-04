import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer} from 'recharts';
import api from "../../services/api";

const cores = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D1495B", "#845EC2"];


type CategoriaData = {
    id: string;
    total: number;
}

interface Props {
  currentMonth: string;
}

export function PieChartComponent({ currentMonth }: Props) {
  const [data, setData] = useState<CategoriaData[]>([]);

  useEffect(() => {
    const [ano, mes] = currentMonth.split('-');

    const fetchData = async () => {
      try {
        const res = await api.get<CategoriaData[]>(`/despesas/gastos-por-categoria?mes=${mes}&ano=${ano}`);
        console.log("Dados recebidos:", res.data);
        setData(res.data);
      } catch (err) {
        console.error("Erro ao carregar gráfico de pizza:", err);
      }
    };
    fetchData();
  }, [currentMonth]);

  return (
  <div style={{ width: "100%", height: 300 }}>
    <h3 style={{ textAlign: "center" }}>Gastos por Categoria</h3>
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"      
          nameKey="name"       
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((_, index) => (
            <Cell key={index} fill={cores[index % cores.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
);
}
