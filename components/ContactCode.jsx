import styles from "@/styles/ContactCode.module.css";

const contactItems = [
  {
    social: "website",
    link: "achrafkhamri.com",
    href: "https://achrafkhamri.com",
  },
  {
    social: "email",
    link: "achrafkhamri@gmail.com",
    href: "mailto:achrafkhamri@gmail.com",
  },
  {
    social: "github",
    link: "khamriAchraf",
    href: "https://github.com/khamriAchraf",
  },
  {
    social: "linkedin",
    link: "achrafkhamri",
    href: "https://www.linkedin.com/in/achrafkhamri/",
  },
];

const ContactCode = () => {
  return (
    <div className={styles.code}>
      <p className={styles.line}>
        <span className={styles.className}>.socials</span> &#123;
      </p>
      {contactItems.slice(0, 8).map((item, index) => (
        <p className={styles.line} key={index}>
          &nbsp;&nbsp;&nbsp;{item.social}:{" "}
          <a href={item.href} target="_blank" rel="noopener">
            {item.link}
          </a>
          ;
        </p>
      ))}
      {contactItems.slice(8, contactItems.length).map((item, index) => (
        <p className={styles.line} key={index}>
          &nbsp;&nbsp;{item.social}:{" "}
          <a href={item.href} target="_blank" rel="noopener">
            {item.link}
          </a>
          ;
        </p>
      ))}
      <p className={styles.line}>&#125;</p>
    </div>
  );
};

export default ContactCode;
