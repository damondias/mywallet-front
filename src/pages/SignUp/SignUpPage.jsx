import React, { useState } from 'react';
import api from '../../services/api.jsx';

import { Container, Form, Input, Button, StyledLink } from '../../components/FormComponents';
import Logo from '../../components/Logo';
import { useNavigate } from 'react-router';

function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("As senhas devem ser iguais");
      return;
    }

    const user = { ...formData };
    delete user.confirmPassword;

    try {
      await api.createUser(user);
      navigate('/');
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
          data-test="name"
          placeholder="Nome"
          type="text"
          onChange={(e) => handleChange(e)}
          name="name"
          value={formData.name}
          required
        />
        <Input
          data-test="email"
          placeholder="E-mail"
          type="email"
          onChange={(e) => handleChange(e)}
          name="email"
          value={formData.email}
          required
        />
        <Input
          data-test="password"
          placeholder="Senha"
          type="password"
          onChange={(e) => handleChange(e)}
          name="password"
          value={formData.password}
          required
        />
        <Input
          data-test="conf-password"
          placeholder="Confirme a senha"
          type="password"
          onChange={(e) => handleChange(e)}
          name="confirmPassword"
          value={formData.confirmPassword}
          required
        />
        <Button data-test="sign-up-submit" type="submit">Cadastrar</Button>
      </Form>
      <StyledLink to="/">Já tem uma conta? Entre agora!</StyledLink>
    </Container>
  );
}

export default SignUpPage;