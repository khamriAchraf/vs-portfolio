import "@/styles/themes.css";
import "@/styles/globals.css";
import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { SelectedQuoteThemesProvider } from "../../context/selectedQuoteThemes";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (localStorage.getItem("theme")) {
      document.body.setAttribute("data-theme", localStorage.getItem("theme"));
    } else {
      document.body.setAttribute("data-theme", "github-dark");
    }
  }, []);
  return (
    <SelectedQuoteThemesProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SelectedQuoteThemesProvider>
  );
}
