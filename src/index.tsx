import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const container = document.getElementById('root');
if (container) { // Verifica se o elemento com o ID 'root' foi encontrado
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <BrowserRouter basename="/DevJoanderson/app-financa">
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error('Não foi possível encontrar o elemento com o ID "root" no documento HTML.');
  // Aqui, você pode adicionar um tratamento de erro alternativo, como exibir uma mensagem para o usuário
  // na tela, informando que a aplicação não pode ser carregada.
}
