import Image from 'next/image';
import React from 'react';
import { BsCheck } from 'react-icons/bs';

import { avatarImg } from '../public/images';

const styles = {
    container: `relative w-[100%] h-[300px] lg:h-[400px] max-h-max overflow-hidden`,
    opacity: `absolute inset-0 bg-[#34373e]`,
    wrapper: `absolute inset-0`,
    contentWrapper: `max-w-[750px] mx-auto lg:max-w-[1500px] px-[15px] py-[20px] lg:p-[30px] h-[100%] flex items-end`,
    content: `lg:flex items-center w-[100%] justify-between`,
    contentLeft: `flex items-center flex-wrap gap-[6px] mb-[1.2em]`,
    avatarWrapper: `w-[65px] min-w-[65px] h-[65px] min-h-[65px] rounded-full p-[4px] border-2 border-secondaryColor mr-[10px] lg:row-span-2 lg:w-[90px] lg:min-w-[90px] lg:h-[90px] lg:min-h-[90px]`,
    avatarImg: `relative inline-block w-[100%] h-[100%] w-[100%] h-[100%] rounded-full overflow-hidden`,
    authorName: `text-white font-semibold tracking-wide transition-all lg:text-2xl`,
    badge: `inline-block ml-[10px] text-white bg-[#d9a34a] capitalize rounded-sm text-xs py-[2px] px-[10px] lg:text-sm`,
    verified: `inline-block bg-secondaryColor rounded-full text-white ml-[5px] text-base w-[15px] h-[15px] lg:w-[18px] lg:h-[18px] lg:text-[16px]`,
    contentRight: `flex flex-wrap items-center gap-[1em]`,
    contentRigthBtn: `flex items-center bg-white text-grayColor rounded-sm py-[5px] px-[15px] text-[15px] lg:text-base`,
};

export default function ProfileHero({ user }) {
    return (
        <div className={styles.container}>
            {/* <Image src={heroImg} alt='' layout='fill' objectFit='cover' /> */}
            <div className={styles.opacity}></div>
            <div className={styles.wrapper}>
                <div className={styles.contentWrapper}>
                    <div className={styles.content}>
                        <div className={styles.contentLeft}>
                            <div className={styles.avatarWrapper}>
                                <div className={styles.avatarImg}>
                                    <Image
                                        src={avatarImg}
                                        alt=''
                                        layout='fill'
                                        objectFit='cover'
                                    />
                                </div>
                            </div>
                            <h3 className={styles.authorName}>
                                {user?.username}
                            </h3>
                            {user?.isVerified && (
                                <span className={styles.verified}>
                                    <span className='flex h-[100%] w-[100%] items-center justify-center'>
                                        <BsCheck />
                                    </span>
                                </span>
                            )}
                            <span className={styles.badge}>{user?.badge}</span>
                        </div>
                        <div className={styles.contentRight}>
                            <div className={styles.contentRigthBtn}>
                                {user?.followers?.length || 0} Followers
                            </div>
                            <div className={styles.contentRigthBtn}>
                                {user?.numOfQuestions} Questions
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
