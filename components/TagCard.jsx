import Link from 'next/link';
import React from 'react';
import { HiUsers } from 'react-icons/hi';

const styles = {
    container: `border border-borderColor`,
    section: `relative p-[15px] border-b border-borderColor before:content-[''] before:absolute before:left-0 before:top-[50%] before:translate-y-[-50%] before:w-[3px] before:h-[25px] before:bg-secondaryColor`,
    seconLink: `flex items-center gap-[10px] text-primaryColor font-semibold text-base`,
    icon: `text-xl`,
    sectionFollow: `p-[10px] flex items-center gap-[1em]`,
    followersWrapper: `flex items-center border text-grayColor text-sm px-[10px] h-[35px] rounded-sm`,
    followersIcon: `text-lg mr-[6px]`,
    followBtn: `px-[15px] h-[35px] border border-grayColor rounded-sm text-grayColor font-semibold transition-colors hover:text-secondaryColor hover:border-secondaryColor`,
};

export default function TagCard({ data }) {
    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <Link href='/'>
                    <a href='' className={styles.seconLink}>
                        <i className={styles.icon}>{data.icon}</i>
                        {data.name}
                    </a>
                </Link>
            </div>
            <div className={styles.sectionFollow}>
                <div className={styles.followersWrapper}>
                    <i className={styles.followersIcon}>
                        <HiUsers />
                    </i>
                    {data.followers} Followers
                </div>
                <button className={styles.followBtn}>Follow</button>
            </div>
        </div>
    );
}
