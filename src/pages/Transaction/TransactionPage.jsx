import React, { useState } from 'react';
import { useParams } from "react-router-dom"
import api from '../../services/api';

import { Container, Form, Input, Button } from '../../components/FormComponents';
import { Title } from './TransactionStyle';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router';

function TransactionPage() {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
  });
  const { user } = useAuth();
  const { tipo } = useParams();
  const navigate = useNavigate();

  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const transaction = { ...formData, type: tipo };

    try {
      await api.createTransaction(user, transaction);
      setFormData({
        amount: '',
        description: '',
      })
      navigate('/home');
    } catch (error) {
      console.log(error);
      alert("Erro, tente novamente");
    }
  }

  return (
    <Container alignSelf="flex-start">
      <Title>Nova {tipo} </Title>
      <Form onSubmit={handleSubmit}>
        <Input
          data-test="registry-amount-input"
          placeholder="Valor"
          type="number"
          onChange={(e) => handleChange(e)}
          name="amount"
          value={formData.amount}
          required
        />
        <Input
          data-test="registry-name-input"
          placeholder="Descrição"
          type="text"
          onChange={(e) => handleChange(e)}
          name="description"
          value={formData.description}
          required
        />
        <Button data-test="registry-save" type="submit">Salvar {tipo}</Button>
      </Form>
    </Container>
  );
}

export default TransactionPage;