import React, { useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import styles from "./index.module.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      alert("Login failed!");
    }
  };

  return (
    <div className={styles.bgGradient}>
      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            className={styles.formInput}
            required
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className={styles.formInput}
            required
          />
          <button type="submit" className={styles.formButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
