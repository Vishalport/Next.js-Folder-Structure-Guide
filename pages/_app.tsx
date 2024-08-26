// pages/_app.js
import "@/styles/globals.css";
import AuthContextProvider from "../context/AuthContextProvider";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp;