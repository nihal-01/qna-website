import Link from 'next/link';
import React from 'react';
import { navLinks } from '../utils/constants';

const styles = {
    container: `my-[30px]`,
    navList: ``,
    navListItem: `mb-[1.3em]`,
    navListItemLink: `group flex items-center gap-[13px]`,
    navListIcon: `text-xl text-[#26333b] transition-colors group-hover:text-secondaryColor`,
    navListText: `text-lg font-semibold text-[#26333b] transition-colors group-hover:text-secondaryColor`,
};

function LeftSidebar() {
    return (
        <div className={styles.container}>
            <ul>
                {navLinks.map(({ icon, name, url }, index) => {
                    return (
                        <li key={index} className={styles.navListItem}>
                            <Link href={url}>
                                <a href='' className={styles.navListItemLink}>
                                    <span className={styles.navListIcon}>
                                        {icon}
                                    </span>
                                    <span className={styles.navListText}>
                                        {name}
                                    </span>
                                </a>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default LeftSidebar;
