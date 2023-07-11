import React, { useState } from 'react';
import { useParams } from "react-router-dom"
import api from '../../services/api';

import { Container, Form, Input, Button } from '../../components/FormComponents';
import { Title } from './TransactionStyle';
import useAuth from '../../hooks/useAuth';

function TransactionPage() {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
  });
  const { user } = useAuth();
  const { tipo } = useParams();

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
          placeholder="Valor"
          type="number"
          onChange={(e) => handleChange(e)}
          name="amount"
          value={formData.amount}
          required
        />
        <Input
          placeholder="Descrição"
          type="text"
          onChange={(e) => handleChange(e)}
          name="description"
          value={formData.description}
          required
        />
        <Button type="submit">Salvar {tipo}</Button>
      </Form>
    </Container>
  );
}

export default TransactionPage;