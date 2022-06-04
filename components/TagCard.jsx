import Link from 'next/link';
import React from 'react';
import { AiFillTag } from 'react-icons/ai';

const styles = {
    container: `border border-borderColor`,
    section: `relative p-[15px] border-b border-borderColor before:content-[''] before:absolute before:left-0 before:top-[50%] before:translate-y-[-50%] before:w-[3px] before:h-[25px] before:bg-secondaryColor`,
    seconLink: `flex items-center gap-[10px] text-primaryColor font-semibold text-base transition-all hover:text-secondaryColor`,
    icon: `text-xl`,
};

export default function TagCard({ tag }) {
    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <Link href={`/search/${tag}/tags`}>
                    <a
                        href={`/search/${tag}/tags`}
                        className={styles.seconLink}
                    >
                        <i className={styles.icon}>
                            <AiFillTag />
                        </i>
                        {tag}
                    </a>
                </Link>
            </div>
        </div>
    );
}
