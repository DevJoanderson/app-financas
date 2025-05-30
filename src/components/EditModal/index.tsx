import React, { useState, useEffect } from 'react';
import * as C from './styles';
import { Item } from '../../types/Item';
import { categories } from '../../data/categories'; // importa as categorias válidas

type Props = {
  item: Item | null; // a despesa que está sendo editada
  onClose: () => void; // função para fechar o modal
  onSave: (updatedItem: Item) => void; // função para salvar a edição
};

export const EditModal = ({ item, onClose, onSave }: Props) => {
  // estados dos campos do formulário
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  // sempre que o modal abrir com um novo item, preenche os campos
  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setValue(item.value.toString());
      setCategory(item.category);
      setDate(item.date.toISOString().split('T')[0]); // yyyy-mm-dd
    }
  }, [item]);

  // envia os dados atualizados para a função onSave
  const handleSave = () => {
    if (!item) return;
    onSave({
      ...item,
      title,
      value: Number(value),
      category,
      date: new Date(date),
    });
  };

  // se o item ainda não foi carregado, não mostra nada
  if (!item) return null;

  return (
    <C.Overlay>
      <C.Modal>
        <h2>Editar Despesa</h2>

        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Título"
        />

        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Valor"
        />

        {/* select de categoria (evita erros) */}
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">Selecione uma categoria</option>
          {Object.keys(categories).map((key) => (
            <option key={key} value={key}>
              {categories[key].title}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />

        <div>
          <button onClick={handleSave}>Salvar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </C.Modal>
    </C.Overlay>
  );
};
