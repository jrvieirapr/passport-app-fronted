import { AuthContext } from "../authcontext/AuthContext";
import "./Login.css";
import React, { useContext, useState } from "react";
import api from "../../conn/Api";

const Login = ({ history }) => {
  // Obtém a função 'login' do contexto de autenticação
  const { login } = useContext(AuthContext);

  // Estados para armazenar o email e senha do usuário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Função para lidar com o processo de login
  const handleLogin = async () => {
    try {
      // Envia uma solicitação POST para a API com as credenciais do usuário
      const response = await api.post("/login", { email, password });

      // Extrai o objeto 'user' e seu token da resposta
      const { user } = response.data;

      if (user && user.token) {
        // Realiza o login ao atualizar o contexto de autenticação com o token
        login(user.token);

        // Redireciona o usuário para a página 'agenda' após o login bem-sucedido
        history.push("/agenda");
      } else {
        // Exibe um alerta em caso de falha na autenticação
        alert("Falha na autenticação");
      }
    } catch (error) {
      // Registra erros no console em caso de falha na solicitação
      console.error("Erro ao logar: ", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
};

export default Login;
