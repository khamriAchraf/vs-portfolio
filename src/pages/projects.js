import ProjectCard from '../../components/ProjectCard';
import { getProjects } from './api/projects';
import styles from '@/styles/ProjectsPage.module.css';
import { useTranslation } from "react-i18next";

const ProjectsPage = ({ projects }) => {
  const { t } = useTranslation();

  return (
    <>
      <h3>{t("stuffIaposveBuiltSoFar", "Stuff I've Built So Far")}</h3>
      <div className={styles.container}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
};

export async function getStaticProps() {
  const projects = getProjects();

  return {
    props: { title: "Projects", projects },
  };
}

export default ProjectsPage;