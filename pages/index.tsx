import React, { useContext } from "react";
import AuthContext from "../context/context";
import LogoutButton from "../component/LogoutButton";

const HomePage = () => {
  const { userAuth } = useContext(AuthContext);

  return (
    <div>
      <h1>Home Page</h1>
      {userAuth ? <LogoutButton /> : <p>Please log in to see protected content.</p>}
    </div>
  );
};

export default HomePage;
