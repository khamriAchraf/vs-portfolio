import "@/styles/themes.css";
import "@/styles/globals.css";
import React from "react";
import Layout from "../../components/Layout";

const currentTabContext = React.createContext(1);

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
