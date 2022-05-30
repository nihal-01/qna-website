import Link from 'next/link';
import React from 'react';
import { IoClose } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { updateQuestionBox } from '../redux/slices/layoutSlice';

import { navLinks } from '../utils/constants';

const styles = {
    container: `fixed top-0 left-0 w-[100%] h-[100%] bg-[#000b] z-20 lg:hidden`,
    sidebar: `relative flex flex-col gap-[1.5em] w-[19em] max-w-[90%] h-[100%] bg-[#f2f2f2] p-[15px] transition-all`,
    closeBtn: `absolute top-[12px] right-[12px] text-grayColor text-[26px] transition-all hover:text-secondaryColor`,
    navList: `grow mt-[1.5em] overflow-y-auto`,
    navListItem: `border-b border-borderColor`,
    navListItemLink: `group flex items-center gap-[15px] py-[0.65em]`,
    navListIcon: `text-lg text-[#26333b] transition-colors group-hover:text-secondaryColor`,
    navListText: `text-base font-semibold text-[#26333b] transition-colors group-hover:text-secondaryColor`,
    askBtn: `w-[100%] h-[45px] min-h-[45px] bg-secondaryColor text-white rounded-sm font-semibold transition-all hover:bg-grayColor`,
};

export default function MobileSidebar({ isSidebarOpen, setIsSIdebarOpen }) {
    const dispatch = useDispatch();

    return (
        <div
            className={
                styles.container + ` ${isSidebarOpen ? 'visible' : 'invisible'}`
            }
            id='mobile-sidebar'
            onClick={(e) => {
                if (e.target == document.querySelector('#mobile-sidebar')) {
                    setIsSIdebarOpen(false);
                }
            }}
        >
            <div
                className={
                    styles.sidebar +
                    ` ${
                        isSidebarOpen
                            ? 'opacity-100 translate-x-0'
                            : 'opacity-0 translate-x-[-100%]'
                    }`
                }
            >
                <button
                    className={styles.closeBtn}
                    onClick={() => {
                        setIsSIdebarOpen(false);
                    }}
                >
                    <IoClose />
                </button>

                <ul className={styles.navList}>
                    {navLinks.map(({ icon, name, url }, index) => {
                        return (
                            <li key={index} className={styles.navListItem}>
                                <Link href={url}>
                                    <a
                                        href={url}
                                        className={styles.navListItemLink}
                                        onClick={() => {
                                            setIsSIdebarOpen(false);
                                        }}
                                    >
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

                <button
                    className={styles.askBtn}
                    onClick={() => {
                        setIsSIdebarOpen(false);
                        dispatch(updateQuestionBox(true));
                    }}
                >
                    Ask A Question
                </button>
            </div>
        </div>
    );
}
