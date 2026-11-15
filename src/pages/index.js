import Link from "next/link";
import HomeSimulation from "../../components/HomeSimulation";
import styles from "@/styles/Main.module.css";
import { useTranslation } from 'react-i18next'

export default function Main() {
  const { t } = useTranslation()
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <HomeSimulation />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{t('achrafKhamri', 'Achraf Khamri')}</h3>
        <p className={styles.bio}>{t('softwareEngineer', 'Software Engineer')}</p>
        <div className={styles.buttons}>
          <Link href="/projects">
            <button className={styles.button}>{t('viewWork', 'View Work')}</button>
          </Link>
          <Link href="/contact">
            <button className={styles.outlined}>{t('contactMe', 'Contact Me')}</button>
          </Link>
        </div>
      </div>
    </div>
  );
}