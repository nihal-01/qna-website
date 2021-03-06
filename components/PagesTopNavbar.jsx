import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';

const styles = {
    container: `w-[100%] px-[15px] lg:px-[30px] border-borderColor`,
    navLinks: `hidden w-[100%] lg:flex gap-[1.5em] flex-wrap mt-[30px]`,
    navListItem: `relative pb-[30px] cursor-pointer font-semibold flex items-center justify-center transition-all hover:text-primaryColor after:content-[''] after:absolute after:h-[3px] after:bottom-[-1px] after:bg-primaryColor after:left-0 after:w-[100%] after:transition-all `,
    moreIcon: `relative text-2xl text-primaryColor cursor-pointer pb-[30px]`,
    submenu: `absolute top-[30px] right-0 bg-white shadow-[0_0_5px_rgba(0,0,0,0.2)] hidden group-hover:block rounded-sm`,
    submenuItem: `py-[3px] px-[10px] text-grayColor font-semibold transition-all hover:text-primaryColor whitespace-nowrap`,
    select: `w-[100%] lg:hidden p-[11px] bg-transparent outline-none border border-borderColor text-grayColor rounded-sm my-[15px]`,
    active: `after:content-[''] after:absolute after:h-[3px] after:bottom-[-1px] after:bg-primaryColor after:left-0 after:w-[100%]`,
};

export default function PagesTopNavbar({
    isProfilePage = false,
    links,
    border = true,
}) {
    const router = useRouter();
    const { username } = router.query;

    return (
        <div
            className={
                styles.container + (border ? ' border-b-2' : ' border-b-0')
            }
        >
            <ul className={styles.navLinks}>
                {links?.slice(0, 4).map(({ name, link }, index) => {
                    return (
                        <li
                            key={index}
                            className={
                                styles.navListItem +
                                `${
                                    router.pathname === link
                                        ? ' after:block text-primaryColor'
                                        : ' after:hidden hover:after:block text-grayColor'
                                }`
                            }
                        >
                            <Link
                                href={
                                    !isProfilePage
                                        ? link
                                        : `${link}?username=${username}`
                                }
                            >
                                {name}
                            </Link>
                        </li>
                    );
                })}
                {links.length > 4 && (
                    <li className='relative group'>
                        <div className={styles.moreIcon}>
                            <FiMoreHorizontal />
                        </div>
                        <ul className={styles.submenu}>
                            {links?.slice(4).map(({ name, link }, index) => {
                                return (
                                    <li
                                        key={index}
                                        className={styles.submenuItem}
                                    >
                                        <Link href={`${link}`}>{name}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                )}
            </ul>
            <select name='' id='' className={styles.select}>
                {links?.map(({ name, url }, index) => {
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
