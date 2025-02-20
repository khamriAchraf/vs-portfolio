
import { FaCss3, FaHtml5, FaJs, FaReact } from 'react-icons/fa';
import Tab from './Tab';
import styles from '@/styles/Tabsbar.module.css';
import { VscMarkdown } from 'react-icons/vsc';
import explorerStyles from '@/styles/Explorer.module.css';
import { VscJson } from 'react-icons/vsc';


const Tabsbar = () => {
    return (
        <div className={styles.tabs}>
            <Tab Icon={FaReact} class={explorerStyles.react} filename="home.jsx" path="/" />
            <Tab Icon={VscJson} class={explorerStyles.json} filename="resume.json" path="/resume" />
            <Tab Icon={FaHtml5} class={explorerStyles.html} filename="about.html" path="/about" />
            <Tab Icon={FaCss3} class={explorerStyles.css} filename="contact.css" path="/contact" />
            <Tab Icon={FaJs} class={explorerStyles.js} filename="projects.js" path="/projects" />
            <Tab Icon={VscMarkdown} class={explorerStyles.md} filename="github.md" path="/github" />
        </div>
    );
};

export default Tabsbar;
