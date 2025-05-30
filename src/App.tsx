import React, { useState, useEffect } from "react";
import * as C from "./App.styles";
import { Item } from "./types/Item";
import { categories } from "./data/categories";
import { getCurrentMonth, filterListByMonth } from "./helpers/dateFilter";
import { TableArea } from "./components/TableArea";
import { InfoArea } from "./components/InfoArea";
import { InputArea } from "./components/InputArea";
import { Login } from "./pages/Login";
import CadastroUsuario from "./pages/CadastroUsuario";
import { Routes, Route, Navigate } from "react-router-dom";
import { EditModal } from "./components/EditModal";
import { Footer } from "./components/Rodape/Footer";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";


const App = () => {
  const [list, setList] = useState<Item[]>([]);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  // Valida o token no carregamento
  useEffect(() => {
  if (!token) return;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      setToken(null);
    }
  } catch {
    localStorage.removeItem("token");
    setToken(null);
  }
}, [token]);

  // Validação recorrente a cada 10s
  useEffect(() => {
    const interval = setInterval(() => {
      if (!token) return;
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.exp < Date.now() / 1000) {
          localStorage.removeItem("token");
          setToken(null);
        }
      } catch {
        localStorage.removeItem("token");
        setToken(null);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [token]);

  // Buscar despesas do backend
  useEffect(() => {
    if (!token) return;
    const [ano, mes] = currentMonth.split("-");
    fetch(`${API_URL}/api/despesas?mes=${parseInt(mes)}&ano=${ano}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const despesasConvertidas: Item[] = data.map((d: any) => ({
          id: d.id,
          date: new Date(d.data),
          category: d.categoria,
          title: d.descricao,
          value: d.valor,
        }));
        setList(despesasConvertidas);
      })
      .catch((err) => {
        if (err instanceof Error) {
          console.error("Erro ao buscar despesas:", err.message);
        } else {
          console.error("Erro desconhecido:", err);
        }
      });
  }, [token, currentMonth]);

  useEffect(() => {
    setFilteredList(filterListByMonth(list, currentMonth));
  }, [list, currentMonth]);

  useEffect(() => {
    let incomeCount = 0;
    let expenseCount = 0;
    filteredList.forEach((item) => {
      categories[item.category]?.expense ? (expenseCount += item.value) : (incomeCount += item.value);
    });
    setIncome(incomeCount);
    setExpense(expenseCount);
  }, [filteredList]);

  const handleMonthChange = (newMonth: string) => setCurrentMonth(newMonth);

  const handleAddItem = async (item: Item) => {
    if (!token) return;
    const [ano, mes] = currentMonth.split("-");
    try {
      const res = await fetch(`${API_URL}/api/despesas?mes=${parseInt(mes)}&ano=${ano}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          descricao: item.title,
          valor: item.value,
          categoria: item.category,
          data: item.date.toISOString(),
        }),
      });
      const nova = await res.json();
      setList((prev) => [...prev, {
        id: nova.id,
        date: new Date(nova.data),
        category: nova.categoria,
        title: nova.descricao,
        value: nova.valor,
      }]);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Erro ao adicionar despesa:", err.message);
      } else {
        console.error("Erro desconhecido ao adicionar despesa:", err);
      }
    }
  };

  const handleDeleteItem = async (item: Item) => {
    if (!token || !window.confirm("Deseja excluir essa despesa?")) return;
    try {
      await fetch(`${API_URL}/api/despesas/${item.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setList((prev) => prev.filter((i) => i.id !== item.id));
    } catch (err) {
      if (err instanceof Error) {
        alert("Erro ao excluir: " + err.message);
      } else {
        alert("Erro desconhecido ao excluir despesa.");
      }
    }
  };

  const handleEditItem = (item: Item) => setEditingItem(item);

  const handleSaveEdit = async (updatedItem: Item) => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/api/despesas/${updatedItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          descricao: updatedItem.title,
          valor: updatedItem.value,
          categoria: updatedItem.category,
          data: updatedItem.date.toISOString(),
        }),
      });
      if (!res.ok) throw new Error("Erro ao editar");
      setList((prev) =>
        prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      );
      setEditingItem(null);
    } catch (err) {
      if (err instanceof Error) {
        alert("Erro ao editar: " + err.message);
      } else {
        alert("Erro desconhecido ao editar.");
      }
    }
  };

  const setTokenAndStore = (newToken: string | null) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={token ? <Navigate to="/dashboard" /> : <Login onLogin={setTokenAndStore} />}
      />
      <Route path="/cadastro" element={<CadastroUsuario />} />
      <Route
        path="/dashboard"
        element={
          token ? (
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
                <TableArea list={filteredList} onDelete={handleDeleteItem} onEdit={handleEditItem} />
              </C.Body>
              <Footer />
              {editingItem && (
                <EditModal item={editingItem} onClose={() => setEditingItem(null)} onSave={handleSaveEdit} />
              )}
            </C.Container>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
