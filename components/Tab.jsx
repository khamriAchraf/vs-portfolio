import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '@/styles/Tab.module.css';

const Tab = ({ Icon, class: classs, filename, path }) => {
    const router = useRouter();

    return (
        <Link href={path}>
            <div
                className={`${styles.tab} ${router.pathname === path && styles.active}`}
            >
                <Icon className={classs} />
                <p>{filename}</p>
            </div>
        </Link>
    );
};

export default Tab;