import HomeSimulation from "../../components/HomeSimulation";
import styles from "@/styles/Main.module.css";

export default function Main() {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <HomeSimulation />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>Achraf Khamri</h3>
        <p className={styles.bio}>Software Engineer</p>
      </div>
    </div>
  );
}
