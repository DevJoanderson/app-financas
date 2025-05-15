import { useState, useEffect } from "react";
import * as C from "./App.styles";
import { Item } from "./types/Item";
import { categories } from "./data/categories";
import { getCurrentMonth, filterListByMonth } from "./helpers/dateFilter";
import { TableArea } from "./components/TableArea";
import { InfoArea } from "./components/InfoArea";
import { InputArea } from "./components/InputArea";
import { Login } from "./pages/Login";

const App = () => {
  const [list, setList] = useState<Item[]>([]);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  // Buscar despesas do backend após login e quando mudar o mês
  useEffect(() => {
    if (!token) return;

    const [ano, mes] = currentMonth.split('-');

    fetch(`http://localhost:4000/despesas?mes=${parseInt(mes)}&ano=${ano}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.trim()}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Erro ao buscar despesas");
        }
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error("Resposta inválida: não é um array");
        }

        const despesasConvertidas: Item[] = data.map((despesa: any) => ({
          date: new Date(despesa.data),
          category: despesa.categoria,
          title: despesa.descricao,
          value: despesa.valor,
        }));

        setList(despesasConvertidas);
      })
      .catch((err) => console.error("Erro ao buscar despesas:", err.message));
  }, [token, currentMonth]);

  // Atualizar lista filtrada
  useEffect(() => {
    const listaFiltrada = filterListByMonth(list, currentMonth);
    setFilteredList(listaFiltrada);
  }, [list, currentMonth]);

  // Calcular receitas e despesas
  useEffect(() => {
    let incomeCount = 0;
    let expenseCount = 0;

    for (let item of filteredList) {
      if (categories[item.category]?.expense) {
        expenseCount += item.value;
      } else {
        incomeCount += item.value;
      }
    }

    setIncome(incomeCount);
    setExpense(expenseCount);
  }, [filteredList]);

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
  };

  const handleAddItem = (item: Item) => {
    if (!token) return;

    const [ano, mes] = currentMonth.split("-");

    fetch(`http://localhost:4000/despesas?mes=${parseInt(mes)}&ano=${ano}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.trim()}`,
      },
      body: JSON.stringify({
        descricao: item.title,
        valor: item.value,
        categoria: item.category,
        data: item.date.toISOString(), // formato padrão aceito
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Erro ao adicionar despesa");
        }
        return res.json();
      })
      .then((novaDespesa) => {
        const novoItem: Item = {
          date: new Date(novaDespesa.data),
          category: novaDespesa.categoria,
          title: novaDespesa.descricao,
          value: novaDespesa.valor,
        };

        setList((prev) => {
          const novaLista = [...prev, novoItem];
          setFilteredList(filterListByMonth(novaLista, currentMonth));
          return novaLista;
        });
      })
      .catch((err) => console.error("Erro ao adicionar despesa:", err.message));
  };

  // Se não estiver logado, mostra tela de login
  if (!token) {
    return (
      <Login
        onLogin={(t) => {
          setToken(t);
          localStorage.setItem("token", t);
        }}
      />
    );
  }

  // Se estiver logado, mostra sistema
  return (
    <C.Container>
      <C.Header>
        <C.HeaderText>Sistema Financeiro</C.HeaderText>
      </C.Header>
      <C.Body>
        <InfoArea
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
          income={income}
          expense={expense}
        />
        <InputArea onAdd={handleAddItem} />
        <TableArea list={filteredList} />
      </C.Body>
    </C.Container>
  );
};

export default App;
