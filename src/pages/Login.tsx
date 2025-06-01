import React, { useState } from "react";
import { Link } from "react-router-dom";
import { apiAuth } from "../services/api"; // ✅ Usando a API correta
import "./Login.css";

interface LoginResponse {
  token: string;
}

interface LoginProps {
  onLogin: (token: string | null) => void;
}

function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await apiAuth.post<LoginResponse>("/login", { email, senha });
      localStorage.setItem("token", res.data.token);
      onLogin(res.data.token);
    } catch (error: any) {
      console.error("Erro no login:", error);

      const status = error?.response?.status;

      if (status === 401) {
        setError("Email ou senha incorretos.");
      } else if (status === 404) {
        setError("Rota de login não encontrada.");
      } else if (!error.response) {
        setError("Servidor offline ou inacessível.");
      } else {
        setError("Erro inesperado ao tentar logar.");
      }

      onLogin(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            required
          />
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
        <p>
          Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}

export { Login };
