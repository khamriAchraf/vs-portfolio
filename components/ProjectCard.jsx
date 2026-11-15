import Image from 'next/image';

import styles from '@/styles/ProjectCard.module.css';
import { useTranslation } from "react-i18next";

const ProjectCard = ({ project }) => {
  const { t } = useTranslation();
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      <div className={styles.content}>
        <div className={styles.logoWrapper}>
          <Image
            src={project.logo}
            alt={t("titleLogo", "{{title}} logo", { title: project.title })}
            width={24}
            height={24}
            className={styles.logo}
          />
        </div>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
      </div>
    </a>
  );
};

export default ProjectCard;