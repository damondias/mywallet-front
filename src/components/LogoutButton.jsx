import React from 'react';
import { BiExit } from "react-icons/bi";
import { useAuth } from '../hooks';

function LogoutButton() {
  const { logOut } = useAuth();

  return <BiExit color="#FFF" size="24px" onClick={() => logOut()} />
}

export default LogoutButton;