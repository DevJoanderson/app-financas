import { useState } from "react";
import * as C from "./styles";
import { Item } from "../../types/Item";

type Props = {
  onAdd: (item: Item) => void;
};

export const InputArea = ({ onAdd }: Props) => {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (date && category && title && value) {
      const newItem: Item = {
        date: new Date(date),
        category,
        title,
        value: parseFloat(value),
      };

      console.log("Item criado para envio:", {
        ...newItem,
        dateFormatada: date, // Para comparação direta
      });

      onAdd(newItem);

      // Limpa os campos após adicionar
      setDate("");
      setCategory("");
      setTitle("");
      setValue("");
    } else {
      alert("Preencha todos os campos");
    }
  };

  return (
    <C.Container>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Selecione a categoria</option>
        <option value="food">Alimentação</option>
        <option value="rent">Aluguel</option>
        <option value="investment">Saúde</option>
        <option value="salary">Salário</option>
        <option value="transport">Transporte</option>
        <option value="education">Educação</option>
        <option value="leisure">Lazer</option>
        <option value="market">Supermercado</option>
        <option value="phone">Telefone/Internet</option>
        <option value="water">Água</option>
        <option value="energy">Energia</option>
        <option value="freelance">Freelance</option>
        <option value="bonus">Bônus</option>
        <option value="gift">Presente</option>
        <option value="pets">Pets</option>
      </select>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Valor"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleAdd}>Adicionar</button>
    </C.Container>
  );
};
