import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiFillEye, AiFillTrophy } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { HiLockClosed, HiLockOpen, HiUsers } from 'react-icons/hi';
import moment from 'moment';

const styles = {
    container: `border rounded-sm w-[100%] p-[6px]`,
    coverWrapper: `relative w-[100%] h-[160px] bg-primaryColor rounded-t-sm`,
    profileWrapper: `absolute bottom-[-45px] left-[20px] w-[110px] h-[110px] rounded-full overflow-hidden bg-secondaryColor border-2 border-white`,
    contentWrapper: `mt-[45px] p-[20px]`,
    title: `text-lg font-bold tex-primaryColor pb-[8px] transition-all hover:text-secondaryColor`,
    meta: `text-grayColor flex items-center gap-[8px] text-[15px] mb-[1.5em]`,
    list: `flex items-center flex-wrap gap-[10px]`,
    listItem: `relative group w-[35px] min-w-[35px] h-[35px] min-h-[35px] bg-[#e4e6e6] rounded-sm flex items-center justify-center text-primaryColor text-[15px] transition-all hover:bg-white hover:border hover:text-secondaryColor`,
    listInfo: `absolute hidden group-hover:block whitespace-nowrap bg-primaryColor top-[-40px] text-white px-[7px] py-[3px] after:content-[''] after:absolute after:w-0 after:h-0 after:border-x-[8px] after:border-t-[8px] after:border-x-transparent after:border-t-primaryColor after:left-[50%] after:top-[100%] after:translate-x-[-50%] `,
};

export default function GroupCard({
    _id,
    title,
    postPermission,
    profile,
    cover,
    numOfPosts,
    createdAt,
    users,
    views,
}) {
    return (
        <div className={styles.container}>
            <div className={styles.coverWrapper}>
                {cover && (
                    <Image src={cover} alt='' objectFit='cover' layout='fill' />
                )}
                <div className={styles.profileWrapper}>
                    {profile && (
                        <Image
                            src={profile}
                            alt=''
                            layout='fill'
                            objectFit='cover'
                        />
                    )}
                </div>
            </div>
            <div className={styles.contentWrapper}>
                <Link href={`/groups/${_id}`}>
                    <a href={`/groups/${_id}`}>
                        <h3 className={styles.title}>{title}</h3>
                    </a>
                </Link>
                {postPermission ? (
                    <p className={styles.meta}>
                        <i>
                            <HiLockOpen />
                        </i>
                        Public group
                    </p>
                ) : (
                    <p className={styles.meta}>
                        <i>
                            <HiLockClosed />
                        </i>
                        Private group
                    </p>
                )}

                <ul className={styles.list}>
                    <li className={styles.listItem}>
                        <AiFillTrophy />
                        <span className={styles.listInfo}>
                            {numOfPosts} Posts
                        </span>
                    </li>
                    <li className={styles.listItem}>
                        <HiUsers />
                        <span className={styles.listInfo}>
                            {users?.length || 0} Users
                        </span>
                    </li>
                    <li className={styles.listItem}>
                        <AiFillEye />
                        <span className={styles.listInfo}>{views} Views</span>
                    </li>
                    <li className={styles.listItem}>
                        <BiTimeFive />
                        <span className={styles.listInfo}>
                            {moment
                                .utc(createdAt)
                                .local()
                                .startOf('seconds')
                                .fromNow()}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
