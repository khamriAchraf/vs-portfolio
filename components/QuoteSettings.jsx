import React from 'react'
import { useTranslation } from "react-i18next";

const QuoteSettings = () => {
  const { t } = useTranslation();

  return (
    <div>{t("quoteSettings", "Quote settings")}</div>
  )
}

export default QuoteSettings