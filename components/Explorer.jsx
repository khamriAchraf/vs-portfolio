import React, { useState } from "react";
import styles from "@/styles/Explorer.module.css";
import { FaReact } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3 } from "react-icons/fa";
import { FaJs } from "react-icons/fa";
import { VscChevronRight, VscMarkdown } from "react-icons/vsc";
import Link from "next/link";

const explorerItems = [
  {
    name: "home.jsx",
    path: "/",
    Icon: FaReact,
    class: styles.react
  },
  {
    name: "about.html",
    path: "/about",
    Icon: FaHtml5,
    class: styles.html
  },
  {
    name: "contact.css",
    path: "/contact",
    Icon: FaCss3,
    class: styles.css
  },
  {
    name: "projects.js",
    path: "/projects",
    Icon: FaJs,
    class: styles.js
  },
  {
    name: "github.md",
    path: "/github",
    Icon: VscMarkdown,
    class: styles.md
  },
];

const Explorer = () => {
  const [portfolioOpen, setPortfolioOpen] = useState(true);

  return (
    <div className={styles.explorer}>
      <p className={styles.title}>Explorer</p>
      <div>
        <input
          type="checkbox"
          className={styles.checkbox}
          id="portfolio-checkbox"
          checked={portfolioOpen}
          onChange={() => setPortfolioOpen(!portfolioOpen)}
        />
        <label htmlFor="portfolio-checkbox" className={styles.heading}>
          <VscChevronRight
            className={styles.chevron}
            style={portfolioOpen ? { transform: "rotate(90deg)" } : {}}
          />
          Portfolio
        </label>
        <div
          className={styles.files}
          style={portfolioOpen ? { display: "block" } : { display: "none" }}
        >
          {explorerItems.map(({Icon, ...item}) => (
            <Link href={item.path} key={item.name}>
              <div className={styles.file}>
                <Icon
                  className={item.class}
                  alt={item.name}
                />{" "}
                <p>{item.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explorer;
