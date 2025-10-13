import styles from "@/styles/Resume.module.css";
import Link from "next/link";
import { useCallback } from "react";

export default function Resume() {
  const handleDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.setAttribute("download", "resume.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);
  return (
    <div className={styles.resumeContainer}>
      <section className={styles.experience}>
        <h3 className={styles.sectionTitle}>Professional Experience</h3>

        <div className={styles.timelineItem}>
          <div className={styles.itemContent}>
            <div className={styles.itemHeader}>
              <div>
                <h3>Software Engineer</h3>
                <p>DXC Technology, 2024 - 2025</p>
              </div>
              <Link href="https://www.dxc.com/" target="_blank">
                <img src="/dxc.png" alt="dxc" className={styles.image} />
              </Link>
            </div>
            <p>
              Contributed to the development of RADIANCE, a large-scale policy
              administration platform used by ASR, a leading Dutch insurance
              company, for managing life and disability insurance products.
            </p>
            <ul>
              <li>
                Contributed to the RADIANCE parser and lexer, adding support for
                new domain-specific keywords.
              </li>
              <li>
                Participated in the implementation of concurrent database access
                for improved performance.
              </li>
              <li>
                Fixed bugs and added features to the developer graphical
                interface, an Eclipse plugin used by the client.
              </li>
              <li>
                Contributed to three major migrations: from CVS to Git, Maven 1
                to Maven 3, and Hudson to Jenkins.
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.timelineItem}>
          <div className={styles.itemContent}>
            <div className={styles.itemHeader}>
              <div>
                <h3>DevOps Engineer</h3>
                <p>Carrefour France, 2023 - 2024</p>
              </div>
              <Link href="https://carrefour.fr/" target="_blank">
                <img
                  src="/carrefour.png"
                  alt="carrefour"
                  className={styles.image}
                />
              </Link>
            </div>
            <p>
              Member of the vPOD team, responsible for handling cloud
              infrastructure requests such as new tenant provisioning,
              configuration updates, and environment setup, all managed through
              GitOps workflows.
            </p>
            <ul>
              <li>
                Maintained and updated APIs that handled requests as pull
                requests to configuration repos.
              </li>
              <li>
                Rewrote parts of the API during the migration from Bitbucket to
                GitLab.
              </li>
              <li>Set up CI/CD pipelines with Ansible, Jenkins, and GCP.</li>
            </ul>
          </div>
        </div>

        <div className={styles.timelineItem}>
          <div className={styles.itemContent}>
            <div className={styles.itemHeader}>
              <div>
                <h3>Software Engineer</h3>
                <p>Agence de Développement du Digital, 2022 - 2023</p>
              </div>
              <Link href="https://www.add.gov.ma/" target="_blank">
                <img src="/add.png" alt="add" className={styles.image} />
              </Link>
            </div>
            <p>
              Built an internal ticketing system to centralize service requests.
            </p>
            <ul>
              <li>Developed the web app and deployed it on-premise.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.education}>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleDownload}>
            Download PDF Version
          </button>
        </div>
        <div className={styles.badges}>
          <h3 className={styles.sectionTitle}>Badge Collection</h3>
          <div className={styles.badgeContainer}>
            <Link
              href="https://www.credly.com/badges/f0b4cf7c-b745-4efe-a7d0-3f536f1f511b"
              target="_blank"
            >
              <img src="/azure.png" alt="azure" className={styles.badge} />
            </Link>
            <Link
              href="https://www.credly.com/badges/8c5e1715-dd4e-4567-9b2d-524d2af09ca9"
              target="_blank"
            >
              <img src="/powerbi.png" alt="powerbi" className={styles.badge} />
            </Link>
            <Link
              href="https://www.credly.com/badges/b34edc85-4240-4976-9c07-5ecace834572"
              target="_blank"
            >
              <img src="/psd.png" alt="psd" className={styles.badge} />
            </Link>

            <Link
              href="https://www.credly.com/badges/a2519aeb-731e-4d27-8440-6f30136ce6d7"
              target="_blank"
            >
              <img src="/ibm.png" alt="ibm" className={styles.badge} />
            </Link>
            <Link
              href="https://www.credly.com/badges/d1a9f4d5-f2d9-4a8a-b0c0-c2c1f8d3b4f9"
              target="_blank"
            >
              <img src="/itil.png" alt="itil" className={styles.badge} />
            </Link>
            <Link
              href="https://www.credly.com/badges/3213ae57-2b7e-4984-9f4e-47cb972411e5"
              target="_blank"
            >
              <img src="/vertica.png" alt="vertica" className={styles.badge} />
            </Link>
          </div>
        </div>

        <h3 className={styles.sectionTitle}>Education</h3>

        <div className={styles.timelineItem}>
          <div className={styles.itemContent}>
            <h3>State Engineering Degree – Innovation & AMOA</h3>
            <p>
              Institut National des Postes et Télécommunications (INPT),
              Morocco, 2019-2022
            </p>
          </div>
        </div>

        <div className={styles.timelineItem}>
          <div className={styles.itemContent}>
            <h3>Preparatory Classes (MP)</h3>
            <p>Lycée Moulay Youssef, Morocco, 2017-2019</p>
          </div>
        </div>
      </section>
    </div>
  );
}
