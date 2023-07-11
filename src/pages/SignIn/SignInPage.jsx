import React, { useState } from 'react';
import api from '../../services/api.jsx';

import { Container, Form, Input, Button, StyledLink } from '../../components/FormComponents';
import Logo from '../../components/Logo';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router';

function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { setUser } = useAuth();
  const navigate = useNavigate();

  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const user = { ...formData };

    try {
      const { data } = await api.login(user);
      setUser(data);
      navigate('/home');
    } catch (error) {
      console.log(error);
      alert("Erro, tente novamente");
    }
  } 

  return (
    <Container>
      <Logo>MyWallet</Logo>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="E-mail"
          type="email"
          onChange={(e) => handleChange(e)}
          name="email"
          value={formData.email}
          required
        />
        <Input
          placeholder="Senha"
          type="password"
          onChange={(e) => handleChange(e)}
          name="password"
          value={formData.password}
          required
        />
        <Button type="submit">Entrar</Button>
      </Form>
      <StyledLink to="/cadastro">Primeira vez? Cadastre-se!</StyledLink>
    </Container>
  );
}

export default SignInPage;