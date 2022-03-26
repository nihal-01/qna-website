import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { avatarImg } from '../public/images';

const styles = {
    container: `border border-borderColor text-center p-[15px] rounded-sm`,
    imgWrapper: `block w-[85px] h-[85px] mx-auto p-[5px] border-2 border-secondaryColor rounded-full hover:border-primaryColor transition-all mb-[5px]`,
    img: `relative w-[100%] h-[100%] rounded-full overflow-hidden`,
    usernameTxt: `text-secondaryColor transition-colors hover:text-primaryColor text-[17px] font-semibold`,
    followersTxt: `text-grayColor text-[15px]`,
    followBtn: `px-[16px] py-[5px] bg-secondaryColor text-white rounded-sm text-[15px] font-semibold mt-[10px] transition-all hover:bg-grayColor`,
    unfollowBtn: `px-[16px] py-[5px] border border-secondaryColor text-secondaryColor rounded-sm text-[15px] font-semibold mt-[10px] transition-all hover:text-grayColor hover:border-grayColor`,
    answersTxt: `text-[15px] text-primaryColor mt-[5px]`,
};

export default function UserCard({ user }) {
    return (
        <div className={styles.container}>
            <Link href='/'>
                <a href='' className={styles.imgWrapper}>
                    <div className={styles.img}>
                        <Image
                            src={user?.avatar || avatarImg}
                            alt=''
                            layout='fill'
                            objectFit='cover'
                        />
                    </div>
                </a>
            </Link>
            <h4>
                <Link href={'/'}>
                    <a href='' className={styles.usernameTxt}>
                        {user.username}
                    </a>
                </Link>
            </h4>
            <p className={styles.followersTxt}>{user.followers} followers</p>
            <p className={styles.answersTxt}>0 Questions | 12 Answers</p>
            <button
                className={
                    user.following ? styles.unfollowBtn : styles.followBtn
                }
            >
                {user.following ? 'Unfollow' : 'Follow'}
            </button>
        </div>
    );
}
