import { useState } from "react";
import api from "../services/api";

type LoginResponse = {
  token: string;
};

type LoginProps = {
  onLogin: (token: string) => void;
};

function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post<LoginResponse>("/login", { email, senha });
      localStorage.setItem("token", res.data.token);
      onLogin(res.data.token);
    } catch (error) {
      alert("Login falhou. Verifique seu email e senha.");
      console.error("Erro no login:", error);
    }
  };

  return (
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
      <button type="submit">Entrar</button>
    </form>
  );
}

export { Login };
