import React from "react";
import Conway from "../../components/Conway";
import { useTranslation } from "react-i18next";

const ConwayPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h3>{t("conwayapossGameOfLife", "Conway's Game of Life")}</h3>
      <Conway />
    </div>
  );
};

export default ConwayPage;
