import Link from 'next/link';
import React from 'react';
import { BsHouseFill } from 'react-icons/bs';

const styles = {
    wrapper: `flex items-center gap-[6px]`,
    homeWrapper: `group flex items-center gap-[6px] cursor-pointer`,
    homeIcon: `text-base text-primaryColor transition-colors group-hover:text-secondaryColor`,
    homeText: `font-[600] text-[15px] text-primaryColor transition-colors group-hover:text-secondaryColor`,
    linkCrumb: `font-[600] text-[15px] text-primaryColor mr-[6px] transition-colors hover:text-secondaryColor capitalize`,
    crumb: `font-[600] text-[15px] text-grayColor mr-[6px] capitalize`,
    slash: `text-primaryColor text-[15px] font-semibold`,
};

export default function Breadcrumbs({ crumbs }) {
    return (
        <div className={styles.wrapper}>
            <span className={styles.homeWrapper}>
                <span className={styles.homeIcon}>
                    <BsHouseFill />
                </span>
                <span className={styles.homeText}>
                    <Link href='/'>
                        <a href={'/'}>Home</a>
                    </Link>
                </span>
            </span>
            <span className={styles.slash}>/</span>
            {crumbs.map((crumb, index) => {
                return (
                    <span key={index}>
                        <span
                            className={
                                crumb.url ? styles.linkCrumb : styles.crumb
                            }
                        >
                            {crumb.url ? (
                                <Link href={crumb?.url}>
                                    <a href={crumb?.url}>{crumb?.name}</a>
                                </Link>
                            ) : (
                                crumb?.name
                            )}
                        </span>
                        {index + 1 < crumbs.length && <span>/</span>}
                    </span>
                );
            })}
        </div>
    );
}
