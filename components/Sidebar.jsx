import React from 'react'
import styles from "@/styles/Sidebar.module.css";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { VscAccount, VscCode, VscFiles, VscGithubAlt, VscMention, VscSettingsGear, VscTerminal } from 'react-icons/vsc';
import { GiConwayLifeGlider } from "react-icons/gi";
import { PiReadCvLogoLight } from "react-icons/pi";


const tabsItemsTop = [
    {
        id: 1,
        Icon: VscFiles,
        path: '/',
    },
    {
        id: 7,
        Icon: PiReadCvLogoLight,
        path: '/resume',
    },
    {
        id: 2,
        Icon: VscGithubAlt,
        path: '/github',
    },
    {
        id: 3,
        Icon: VscCode,
        path: '/projects',
    },
    {
        id: 4,
        Icon: VscMention,
        path: '/contact',
    },
    {
        id: 5,
        Icon: VscTerminal,
        path: '/terminal',
    },
    {
        id: 6,
        Icon: GiConwayLifeGlider,
        path: '/conway',
    }
]

const tabsItemsBottom = [{
    id: 98,
    Icon: VscAccount,
    path: '/about',
},
{
    id: 99,
    Icon: VscSettingsGear,
    path: '/settings',
}
]

const Sidebar = () => {

    const router = useRouter();

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarTop}>
                {tabsItemsTop.map(({ Icon, path }) => (
                    <Link href={path} key={path}>
                        <div
                            className={`${styles.iconContainer} ${router.pathname === path && styles.active
                                }`}
                        >
                            <Icon
                                fill={
                                    router.pathname === path
                                        ? 'rgb(225, 228, 232)'
                                        : 'rgb(106, 115, 125)'
                                }
                                className={styles.icon}
                            />
                        </div>
                    </Link>
                ))}
            </div>
            <div className={styles.sidebarBottom}>
                {tabsItemsBottom.map(({ Icon, path }) => (
                    <div className={styles.iconContainer}>
                        <Link href={path} key={path}>
                            <Icon
                                fill={
                                    router.pathname === path
                                        ? 'rgb(225, 228, 232)'
                                        : 'rgb(106, 115, 125)'
                                }
                                className={styles.icon}
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </aside>
    )
}

export default Sidebar