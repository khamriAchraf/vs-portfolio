import "@/styles/themes.css";
import "@/styles/globals.css";
import React, { useEffect } from "react";
import i18next from "../i18n";
import Layout from "../../components/Layout";
import { SelectedQuoteThemesProvider } from "../../context/selectedQuoteThemes";
import { Analytics } from "@vercel/analytics/next";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    const language =
      savedLanguage === "en" || savedLanguage === "fr" ? savedLanguage : "fr";

    i18next.changeLanguage(language);
    localStorage.setItem("language", language);
    document.documentElement.lang = language;

    if (localStorage.getItem("theme")) {
      document.body.setAttribute("data-theme", localStorage.getItem("theme"));
    } else {
      document.body.setAttribute("data-theme", "github-dark");
    }
  }, []);
  return (
    <>
      <SelectedQuoteThemesProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SelectedQuoteThemesProvider>
      <Analytics />
    </>
  );
}
