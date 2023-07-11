import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import { Container, Flex, Title, Button, NoTransactions, Span } from './HomeStyle';
import useAuth from '../../hooks/useAuth';

import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import LogoutButton from '../../components/LogoutButton';

function formatAmount(amount) {
  return (amount / 100).toFixed(2);
}

function HomePage() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  async function loadPage() {
    try {
      const { data } = await api.getTransactions(user);
      console.log(data);
      setProfile(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      alert("Erro, recarregue a página em alguns segundos");
      setProfile({});
    }
  }

  useEffect(() => {
    loadPage();
  }, [user])

  if (isLoading || !profile) {
    return <h2>Carregando...</h2>
  }

  return (
    <Container alignSelf="flex-start" padding="0px 25px">
      <Flex direction="row" justifyContent="space-between" alignItems="center">
        <Title data-test="user-name">Olá, {profile.name}</Title>
        <LogoutButton data-test="logout" />
      </Flex>
      <Transactions transactions={profile.transactions} totalSum={profile.totalSum} />
      <Flex direction="row" gap="15px">
        <Button data-test="new-income" to="/nova-transacao/entrada">
          <AiOutlinePlusCircle />
          Nova entrada
        </Button>
        <Button data-test="new-expense" to="/nova-transacao/saida">
          <AiOutlineMinusCircle />
          Nova saída
        </Button>
      </Flex>
    </Container>
  );
}

function Transactions({ transactions, totalSum }) {
  if (!transactions || transactions.length === 0) {
    return (
      <Container
        background="#FFF"
        borderRadius="5px"
        margin="0px 0px 15px 0px"
        minHeight="450px"
        justifyContent="center"
      >
        <NoTransactions>
          Não há registros de <br />
          entrada ou saída
        </NoTransactions>
      </Container>
    )
  }

  return (
    <Container
      background="#FFF"
      borderRadius="5px"
      margin="0px 0px 15px 0px"
      padding="20px 10px 10px 10px"
      minHeight="450px"
      justifyContent="space-between"
    >
      <Flex direction="column">
        {transactions.map(transaction => <Transaction key={transaction.id} {...transaction} />)}
      </Flex>
      <Flex direction="row" justifyContent="space-between" alignItems="center">
        <Span color="#000" bold>
          SALDO
        </Span>
        <Span  data-test="total-amount" align="right" color={totalSum > 0 ? '#03AC00' : '#C70000'}>
          {formatAmount(totalSum)}
        </Span>
      </Flex>
    </Container>
  )
}

function Transaction({ id, amount, description, type, createdAt }) {
  return (
    <Flex direction="row" justifyContent="space-between" alignItems="center">
      <Flex direction="row" alignItems="center" gap="10px">
        <Span color="#C6C6C6">
          {createdAt}
        </Span>
        <Span data-test="registry-name" color="#000">
          {description}
        </Span>
      </Flex>
      <Span  data-test="registry-amount" align="right" color={type === 'entrada' ? '#03AC00' : '#C70000'}>{formatAmount(amount)}</Span>
    </Flex>
  )
}

export default HomePage;