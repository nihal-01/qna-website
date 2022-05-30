import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsCheck } from 'react-icons/bs';
import { avatarImg } from '../public/images';

const styles = {
    container: `mt-[1.5em] py-[15px] lg:py-[30px] border-b last:border-b-0 grid grid-cols-[65px_auto] lg:grid-cols-[75px_auto]`,
    imgWrapper: `w-[55px] min-w-[55px] h-[55px] min-h-[55px] mr-[15px] rounded-full border-2 border-secondaryColor transition-all hover:border-primaryColor cursor-pointer p-[4px]`,
    img: `relative w-[100%] h-[100%] rounded-full overflow-hidden`,
    header: `flex items-center mb-[5px]`,
    username: `font-bold text-[17px] text-primaryColor transition-all hover:text-secondaryColor`,
    verified: `inline-block bg-secondaryColor rounded-full text-white ml-[10px] text-base w-[15px] h-[15px] lg:w-[18px] lg:h-[18px] lg:text-[16px]`,
    badge: `inline-block ml-[1em] text-white bg-[#d9a34a] capitalize rounded-sm text-xs py-[2px] px-[10px] lg:text-sm`,
    date: `text-[14px] text-grayColor mb-[1em]`,
    text: `text-[#707885] text-base`,
};

export default function SingleComment() {
    return (
        <div className={styles.container}>
            <div className={styles.imgWrapper}>
                <div className={styles.img}>
                    <Image
                        src={avatarImg}
                        alt=''
                        objectFit='cover'
                        layout='fill'
                    />
                </div>
            </div>
            <div>
                <div className={styles.header}>
                    <h2 className={styles.username}>
                        <Link href={'/profile'}>nihal</Link>
                    </h2>

                    <span className={styles.verified}>
                        <span className='flex h-[100%] w-[100%] items-center justify-center'>
                            <BsCheck />
                        </span>
                    </span>

                    <span className={styles.badge}>Beginner</span>
                </div>
                <p className={styles.date}>Added a comment on Jun 22</p>
                <p className={styles.text}>Good post</p>
            </div>
        </div>
    );
}
