import { useEffect, useState } from "react";
import api from "../services/api";
import { InfoArea } from "../components/InfoArea";

// Tipo para definir o que é uma despesa
type Despesa = {
  id: string;
  descricao: string;
  valor: number;
  data: string;
  categoria: string;
};

export default function Despesas() {
  // Estados do formulário
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [categoria, setCategoria] = useState("");

  // Estados de controle de data e despesas
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [mesAtual, setMesAtual] = useState<number>(new Date().getMonth() + 1);
  const [anoAtual, setAnoAtual] = useState<number>(new Date().getFullYear());

  // Função para formatar o mês e ano como "YYYY-MM"
  const formatMesAno = (mes: number, ano: number) => {
    const mesStr = mes < 10 ? `0${mes}` : `${mes}`;
    return `${ano}-${mesStr}`;
  };
  const currentMonth = formatMesAno(mesAtual, anoAtual);

  // Função chamada pelo componente InfoArea para alterar o mês manualmente
  const handleMonthChange = (novoMes: string) => {
    const [ano, mes] = novoMes.split("-").map(Number);
    setAnoAtual(ano);
    setMesAtual(mes);
  };

  // Função para buscar as despesas do backend com base no mês/ano atual
  const fetchDespesas = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("fetchDespesas - mes:", mesAtual, "ano:", anoAtual);
      const res = await api.get<Despesa[]>("/despesas", {
        params: {
          mes: mesAtual,
          ano: anoAtual,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      setDespesas(res.data);
      console.log('Despesas carregadas:', res.data);
    } catch {
      alert("Erro ao carregar despesas");
    }
  };

  // Atualiza as despesas sempre que o mês ou ano mudar
  useEffect(() => {
    fetchDespesas();
  }, [mesAtual, anoAtual]);

  // Adiciona nova despesa
 const handleAdd = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await api.post<Despesa>(
      "/despesas",
      {
        descricao,
        valor: parseFloat(valor),
        data,
        categoria,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Atualiza a lista consultando novamente do backend (mais seguro)
    await fetchDespesas();

    // Limpa os campos
    setDescricao("");
    setValor("");
    setData("");
    setCategoria("");
  } catch {
    alert("Erro ao adicionar despesa");
  }
};


  return (
    <div>
      {/* Área superior com informações do mês e resumo */}
      <InfoArea
        currentMonth={currentMonth}
        onMonthChange={handleMonthChange}
        income={0} // Substitua depois pelo valor real
        expense={despesas.reduce((total, d) => total + d.valor, 0)}
      />

      <h2>Minhas Despesas</h2>

      {/* Formulário para nova despesa */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Data"
        />
        <input
          placeholder="Categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />
        <input
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <input
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        <button onClick={handleAdd}>Adicionar</button>
      </div>

      {/* Lista de despesas */}
      <ul>
        {despesas.map((d) => (
          <li key={d.id}>
            {d.data} — {d.categoria} — {d.descricao} — R$ {d.valor.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
