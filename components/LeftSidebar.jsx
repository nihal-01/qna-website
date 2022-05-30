import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { navLinks } from '../utils/constants';
import { useSelector } from 'react-redux';

const styles = {
    container: `my-[30px] sticky top-[30px]`,
    navListItem: `mb-[1.3em]`,
    navListItemLink: `group flex items-center gap-[13px]`,
    navListIcon: `text-xl text-[#26333b] transition-colors group-hover:text-secondaryColor `,
    navListText: `text-lg font-semibold text-[#26333b] transition-colors group-hover:text-secondaryColor`,
    subLinks: `ml-[35px] my-[15px]`,
    subLinkItem: `mb-[10px] last:mb-0 transition-all hover:text-primaryColor`,
};

export default function LeftSidebar() {
    const router = useRouter();
    const { user } = useSelector((state) => state.user);

    return (
        <div className={styles.container}>
            <ul>
                {navLinks.map(({ icon, name, url, sub }, index) => {
                    if (
                        (url === '/profile/[username]' ||
                            url === '/feed' ||
                            url === '/add-group') &&
                        !user
                    ) {
                        return;
                    }
                    return (
                        <li key={index} className={styles.navListItem}>
                            <Link
                                href={
                                    url === '/profile/[username]'
                                        ? `${url}?username=${user.username}`
                                        : url
                                }
                            >
                                <a
                                    href={url}
                                    className={styles.navListItemLink}
                                >
                                    <span
                                        className={
                                            styles.navListIcon +
                                            ` ${
                                                router.pathname === url &&
                                                'text-secondaryColor'
                                            }`
                                        }
                                    >
                                        {icon}
                                    </span>
                                    <span
                                        className={
                                            styles.navListText +
                                            ` ${
                                                router.pathname === url &&
                                                'text-secondaryColor'
                                            }`
                                        }
                                    >
                                        {name}
                                    </span>
                                </a>
                            </Link>
                            {sub && (
                                <ul className={styles.subLinks}>
                                    {sub.map(({ name, url }, index) => {
                                        return (
                                            <li
                                                key={index}
                                                className={
                                                    styles.subLinkItem +
                                                    (url === router.pathname
                                                        ? ' text-secondaryColor'
                                                        : ' text-grayColor')
                                                }
                                            >
                                                <Link href={url}>
                                                    <a href=''>{name}</a>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
