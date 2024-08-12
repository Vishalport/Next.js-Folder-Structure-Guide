import React, { useContext, useEffect } from "react";
import AuthContext from "../context/context";
import { useRouter } from "next/router";

const ProtectedPage = () => {
  const { userAuth } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!userAuth) {
      router.push("/login");
    }
  }, [userAuth, router]);

  if (!userAuth) {
    return <p>Loading...</p>;
  }

  return <div>Welcome to the protected page!</div>;
};

export default ProtectedPage;
