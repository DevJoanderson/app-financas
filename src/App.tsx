// Importações principais
import React, { useState, useEffect } from "react";
import * as C from "./App.styles"; // Estilos com styled-components
import { Item } from "./types/Item"; // Tipo dos itens da lista
import { categories } from "./data/categories"; // Categorias de despesas
import { getCurrentMonth, filterListByMonth } from "./helpers/dateFilter"; // Funções auxiliares
import { TableArea } from "./components/TableArea"; // Tabela de despesas
import { InfoArea } from "./components/InfoArea"; // Área com resumo financeiro
import { InputArea } from "./components/InputArea"; // Formulário para adicionar despesas
import { Login } from "./pages/Login"; // Página de login
import CadastroUsuario from "./pages/CadastroUsuario"; // Página de cadastro
import { Routes, Route, Navigate } from 'react-router-dom'; // Rotas da aplicação

const App = () => {
  // Estado geral do app
  const [list, setList] = useState<Item[]>([]); // Lista completa de despesas
  const [filteredList, setFilteredList] = useState<Item[]>([]); // Lista filtrada por mês
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth); // Mês atual selecionado
  const [income, setIncome] = useState(0); // Total de receitas
  const [expense, setExpense] = useState(0); // Total de despesas

  // Token JWT armazenado no navegador (localStorage)
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  // Verificação inicial do token (expiração)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica o payload
      const now = Date.now() / 1000; // Tempo atual em segundos

      // Se token expirou, remove do localStorage e reseta estado
      if (payload.exp < now) {
        localStorage.removeItem("token");
        setToken(null);
      }
    } catch (error) {
      localStorage.removeItem("token");
      setToken(null);
    }
  }, []);
  useEffect(() => {
  const interval = setInterval(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      // Decodifica o token para acessar o payload (dados internos)
      const payload = JSON.parse(atob(token.split(".")[1]));
      const now = Date.now() / 1000; // Tempo atual em segundos

      // Se o token estiver expirado, remove e limpa do estado
      if (payload.exp < now) {
        localStorage.removeItem("token");
        setToken(null);
        console.log("Token expirado - usuário será desconectado.");
      }
    } catch (error) {
      // Em caso de erro (ex: token malformado), também remove e limpa
      localStorage.removeItem("token");
      setToken(null);
      console.log("Erro ao decodificar token - usuário desconectado.");
    }
  }, 10000); // Verifica a cada 10 segundos (10.000 milissegundos)

  // Limpa o intervalo quando o componente for desmontado
  return () => clearInterval(interval);
}, []);


  // Buscar despesas do backend com base no mês atual
  useEffect(() => {
    if (!token) return;

    const [ano, mes] = currentMonth.split("-");

    fetch(`http://localhost:4000/api/despesas?mes=${parseInt(mes)}&ano=${ano}`, {
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

        // Mapeia as despesas recebidas para o formato usado no app
        const despesasConvertidas: Item[] = data.map((despesa: any) => ({
          date: new Date(despesa.data),
          category: despesa.categoria,
          title: despesa.descricao,
          value: despesa.valor,
        }));

        setList(despesasConvertidas); // Salva lista no estado
      })
      .catch((err) =>
        console.error("Erro ao buscar despesas:", err.message)
      );
  }, [token, currentMonth]);

  // Sempre que a lista mudar, atualiza a versão filtrada pelo mês
  useEffect(() => {
    const listaFiltrada = filterListByMonth(list, currentMonth);
    setFilteredList(listaFiltrada);
  }, [list, currentMonth]);

  // Sempre que a lista filtrada mudar, recalcula totais
  useEffect(() => {
    let incomeCount = 0;
    let expenseCount = 0;

    for (let item of filteredList) {
      if (categories[item.category]?.expense) {
        expenseCount += item.value; // Soma despesas
      } else {
        incomeCount += item.value; // Soma receitas
      }
    }

    setIncome(incomeCount);
    setExpense(expenseCount);
  }, [filteredList]);

  // Atualiza o mês atual visualizado
  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
  };

  // Adiciona uma nova despesa no backend
  const handleAddItem = (item: Item) => {
    if (!token) return;

    const [ano, mes] = currentMonth.split("-");

    fetch(`http://localhost:4000/api/despesas?mes=${parseInt(mes)}&ano=${ano}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.trim()}`,
      },
      body: JSON.stringify({
        descricao: item.title,
        valor: item.value,
        categoria: item.category,
        data: item.date.toISOString(),
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
        // Converte resposta do backend para o formato do app
        const novoItem: Item = {
          date: new Date(novaDespesa.data),
          category: novaDespesa.categoria,
          title: novaDespesa.descricao,
          value: novaDespesa.valor,
        };

        // Atualiza a lista com o novo item
        setList((prev) => {
          const novaLista = [...prev, novoItem];
          setFilteredList(filterListByMonth(novaLista, currentMonth));
          return novaLista;
        });
      })
      .catch((err) => console.error("Erro ao adicionar despesa:", err.message));
  };

  // Função para atualizar o token no estado e no localStorage
  const setTokenAndStore = (newToken: string | null) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
  };

  // Rotas do sistema com base no login
  return (
    <Routes>
      {/* Rota de login */}
      <Route
        path="/login"
        element={
          token ? <Navigate to="/dashboard" /> : <Login onLogin={setTokenAndStore} />
        }
      />

      {/* Página de cadastro */}
      <Route path="/cadastro" element={<CadastroUsuario />} />

      {/* Página principal (Dashboard) */}
      <Route
        path="/dashboard"
        element={
          token ? (
            <C.Container>
              <C.Header>
                <C.HeaderText>Sistema Financeiro</C.HeaderText>
              </C.Header>
              <C.Body>
                {/* Área de resumo */}
                <InfoArea
                  currentMonth={currentMonth}
                  onMonthChange={handleMonthChange}
                  income={income}
                  expense={expense}
                />
                {/* Formulário para adicionar item */}
                <InputArea onAdd={handleAddItem} />
                {/* Tabela com despesas */}
                <TableArea list={filteredList} />
              </C.Body>
            </C.Container>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Rota raiz redireciona para login */}
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
