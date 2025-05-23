import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importe o Link do react-router-dom
import api from "../services/api";

interface LoginResponse {
    token: string;
}

interface LoginProps {
    onLogin: (token: string | null) => void; // Permita passar null para o token
}

function Login({ onLogin }: LoginProps) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState<string | null>(null); // Estado para armazenar mensagens de erro
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Limpa qualquer erro anterior
        setLoading(true);

        try {
            const res = await api.post<LoginResponse>("/login", { email, senha });
            localStorage.setItem("token", res.data.token);
            onLogin(res.data.token); // Passa o token para o componente App
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Login falhou. Verifique seu email e senha.";
            setError(errorMessage); // Atualiza o estado de erro
            onLogin(null);
            console.error("Erro no login:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail"
                    required
                />
            </div>
            <div>
                <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Senha"
                    required
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibe a mensagem de erro */}
            <p>
                Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
            </p>
        </form>
    );
}

export { Login };
