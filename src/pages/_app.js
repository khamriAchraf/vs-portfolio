import "@/styles/themes.css";
import "@/styles/globals.css";
import React from "react";
import Layout from "../../components/Layout";
import { SelectedQuoteThemesProvider } from "../../context/selectedQuoteThemes";

export default function App({ Component, pageProps }) {
  return (
    <SelectedQuoteThemesProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SelectedQuoteThemesProvider>
  );
}
