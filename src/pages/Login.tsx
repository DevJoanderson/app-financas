import React, { useState } from "react";
import { Link } from "react-router-dom";
import { apiAuth } from "../services/api"; // ✅ usa o serviço correto
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
      const errorMessage =
        error.response?.data?.message || "Login falhou. Verifique seu email e senha.";
      setError(errorMessage);
      onLogin(null);
      console.error("Erro no login:", error);
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
