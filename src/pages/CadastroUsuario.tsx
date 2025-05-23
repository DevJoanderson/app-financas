import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Importar os estilos compartilhados
import {
  AuthContainer,
  AuthCard,
  FormTitle,
  FormGroup,
  Input,
  SubmitButton,
  AuthLinks,
  StyledLink,
} from '../components/styles.css/AuthFormStyles'; // Ajuste o caminho se necessário

const CadastroUsuario: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleCadastro = async () => {
    try {
      const ageAsNumber = parseInt(age, 10);
      
      if (isNaN(ageAsNumber)) {
        alert('Por favor, insira uma idade válida.');
        return; // Sai da função se a idade não for um número
      }


      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, age: ageAsNumber, senha }),
      });

      const data = await response.json(); // Sempre converta a resposta para JSON

      if (response.status === 201) {
        alert('Cadastro realizado com sucesso! Faça login.');
        navigate('/login');
      } else {
        // Se a resposta não for 201, mostre a mensagem de erro da API
        alert(data.message || 'Erro ao cadastrar usuário');
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao conectar ao servidor. Verifique sua conexão.');
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <FormTitle>Cadastro de Usuário</FormTitle>
        <form onSubmit={(e) => { e.preventDefault(); handleCadastro(); }}>
          <FormGroup>
            <Input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="number"
              placeholder="Idade"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </FormGroup>
          <SubmitButton type="submit">Cadastrar</SubmitButton>
        </form>
        <AuthLinks>
          <p>
            Já tem uma conta?{' '}
            <StyledLink onClick={() => navigate('/login')}>
              Fazer login
            </StyledLink>
          </p>
        </AuthLinks>
      </AuthCard>
    </AuthContainer>
  );
};

export default CadastroUsuario;