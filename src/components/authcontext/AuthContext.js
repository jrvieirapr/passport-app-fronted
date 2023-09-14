import React, { createContext, useState } from "react";

// Criação do contexto de autenticação
export const AuthContext = createContext();

// Componente provedor de autenticação
export const AuthProvider = ({ children }) => {
  // Estado para armazenar o token de autenticação, inicializado a partir do armazenamento local
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Função para realizar o login do usuário
  const login = (newToken) => {
    setToken(newToken);
    // Armazena o token no armazenamento local para persistência
    localStorage.setItem("token", newToken);
  };

  // Função para efetuar o logout do usuário
  const logout = () => {
    setToken(null);
    // Remove o token do armazenamento local ao fazer logout
    localStorage.removeItem("token");
  };

  // Renderiza o provedor de contexto com os valores relevantes
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
