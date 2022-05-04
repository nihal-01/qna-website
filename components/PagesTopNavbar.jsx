import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';

const styles = {
    container: `w-[100%] px-[15px] lg:px-[30px] border-b-2 border-borderColor`,
    navLinks: `hidden w-[100%] lg:flex gap-[1.5em] flex-wrap mt-[30px]`,
    navListItem: `relative pb-[30px] cursor-pointer text-grayColor font-semibold flex items-center justify-center transition-all hover:text-primaryColor after:content-[''] after:absolute after:h-[3px] after:bottom-[-1px] after:bg-primaryColor after:left-0 after:w-[100%] after:transition-all `,
    moreIcon: `relative text-2xl text-primaryColor cursor-pointer pb-[30px]`,
    submenu: `absolute top-[30px] right-0 bg-white shadow-[0_0_5px_rgba(0,0,0,0.2)] hidden group-hover:block rounded-sm`,
    submenuItem: `py-[3px] px-[10px] text-grayColor font-semibold transition-all hover:text-primaryColor whitespace-nowrap`,
    select: `w-[100%] lg:hidden p-[11px] bg-transparent outline-none border border-borderColor text-grayColor rounded-sm my-[15px]`,
    active: `after:content-[''] after:absolute after:h-[3px] after:bottom-[-1px] after:bg-primaryColor after:left-0 after:w-[100%]`,
};

export default function PagesTopNavbar({ query = true, links }) {
    const router = useRouter();
    const { username } = router.query;

    if (query) {
        return (
            <div className={styles.container}>
                <ul className={styles.navLinks}>
                    {links && links.slice(0, 4).map(({ name, query }, index) => {
                        return (
                            <li
                                key={index}
                                className={
                                    styles.navListItem +
                                    `${
                                        router.query?.show === query ||
                                        (Object.keys(router.query).length < 1 &&
                                            query === 'recent-questions')
                                            ? ' after:block'
                                            : ' after:hidden hover:after:block'
                                    }`
                                }
                            >
                                <Link
                                    href={{
                                        pathname: '/',
                                        query: { show: query },
                                    }}
                                >
                                    {name}
                                </Link>
                            </li>
                        );
                    })}
                    <li className='relative group'>
                        <div className={styles.moreIcon}>
                            <FiMoreHorizontal />
                        </div>
                        <ul className={styles.submenu}>
                            {links && links.slice(4).map(({ name, query }, index) => {
                                return (
                                    <li
                                        key={index}
                                        className={styles.submenuItem}
                                    >
                                        <Link
                                            href={{
                                                pathname: '/',
                                                query: { show: query },
                                            }}
                                        >
                                            {name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                </ul>
                <select name='' id='' className={styles.select}>
                    {links && links.map(({ name, url }, index) => {
                        return (
                            <option value='' key={index}>
                                {name}
                            </option>
                        );
                    })}
                </select>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <ul className={styles.navLinks}>
                {links.slice(0, 4).map(({ name, link }, index) => {
                    return (
                        <li
                            key={index}
                            className={
                                styles.navListItem +
                                `${
                                    router.pathname.split('/')[3] === link ||
                                    (router.pathname.split('/')[3] ===
                                        undefined &&
                                        link === '')
                                        ? ' after:block'
                                        : ' after:hidden hover:after:block'
                                }`
                            }
                        >
                            <Link href={`${username}/${link}`}>{name}</Link>
                        </li>
                    );
                })}
                <li className='relative group'>
                    <div className={styles.moreIcon}>
                        <FiMoreHorizontal />
                    </div>
                    <ul className={styles.submenu}>
                        {links.slice(4).map(({ name, link }, index) => {
                            return (
                                <li key={index} className={styles.submenuItem}>
                                    <Link href={`${username}/${link}`}>
                                        {name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </li>
            </ul>
            <select name='' id='' className={styles.select}>
                {links.map(({ name, url }, index) => {
                    return (
                        <option value='' key={index}>
                            {name}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}
