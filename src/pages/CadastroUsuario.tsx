import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const CadastroUsuario: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleCadastro = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, age, senha }),
      });

      if (response.status === 201) {
        alert('Cadastro realizado com sucesso! Faça login.');
        navigate('/login');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Erro ao cadastrar usuário');
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao conectar ao servidor');
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="number" placeholder="Idade" value={age} onChange={(e) => setAge(e.target.value)} />
      <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
      <button onClick={handleCadastro}>Cadastrar</button>
      <p>
        Já tem uma conta? <Link to="/login">Fazer login</Link>
      </p>
    </div>
  );
};

export default CadastroUsuario;