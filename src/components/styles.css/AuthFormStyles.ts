// src/styles/AuthFormStyles.ts
import styled from 'styled-components';

// Container principal que centraliza o card
export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Garante que ocupe a altura total da viewport */
  background-color: #f0f2f5; /* Cor de fundo cinza claro */
  padding: 20px; /* Adiciona um pequeno padding para telas menores */
  box-sizing: border-box;
`;

// O card branco que contém o formulário
export const AuthCard = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px; /* Largura máxima do card */
`;

// Título do formulário (Login ou Cadastro)
export const FormTitle = styled.h2`
  margin-bottom: 25px;
  color: #333;
  font-size: 24px;
`;

// Agrupamento para cada input
export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

// Estilo para os campos de input
export const Input = styled.input`
  width: calc(100% - 20px); /* 100% menos o padding lateral */
  padding: 12px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box; /* Garante que padding não aumente a largura */

  &:focus {
    outline: none;
    border-color: #007bff; /* Cor ao focar */
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

// Estilo para o botão de submit
export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #28a745; /* Verde do botão da imagem */
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;

  &:hover {
    background-color: #218838; /* Verde um pouco mais escuro ao hover */
  }
`;

// Container para os links "Já tem conta?", "Cadastre-se"
export const AuthLinks = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #666;
`;

// Estilo para os links
export const StyledLink = styled.a` // Renomeado para evitar conflito com 'Link' do react-router-dom
  color: #007bff; /* Azul para links */
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;