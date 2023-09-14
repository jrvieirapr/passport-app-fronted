import React, { useState, useContext } from "react";
import { AuthContext } from "../authcontext/AuthContext";
import api from "../../conn/Api";

const Register = () => {
  const [formulario, setFormulario] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const handleRegister = async () => {
    try {
      await api.post("/register", formulario);
      alert("Usuário registrado com sucesso!");
    } catch (error) {
      console.error("Erro ao fazer registro:", error);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <input
        type="text"
        placeholder="Digite seu nome"
        value={formulario.name}
        onChange={handleInputChange}
      />
      <input
        type="email"
        placeholder="Digite seu E-mail"
        value={formulario.email}
        onChange={handleInputChange}
      />
      <input
        type="password"
        placeholder="Digite seu senha"
        value={formulario.password}
        onChange={handleInputChange}
      />
      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
};
