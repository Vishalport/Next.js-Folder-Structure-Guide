import React, { useContext } from "react";
import AuthContext from "../context/context";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  return <button onClick={logout}>Logout</button>;
};

export default LogoutButton;
