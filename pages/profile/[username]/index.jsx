import Image from 'next/image';
import React from 'react';
import {
    BiCurrentLocation,
    BiPhoneCall,
    BiLink,
    BiHeart,
    BiGlobe,
} from 'react-icons/bi';
import { FaUsers } from 'react-icons/fa';

import { ProfileHero, SidebarLayout, ProfileLayout } from '../../../components';
import { getUserWithInfo } from '../../../helpers/userHelpers';
import { avatarImg } from '../../../public/images';

const styles = {
    container: `p-[15px] lg:p-[30px]`,
    desc: `text-[#707885] text-base lg:text-[17px] text-center leading-7 mb-[2em]`,
    metaWrapper: `flex items-center justify-center gap-[1.5em] mb-[3em]`,
    metaItem: `flex items-center gap-[10px] text-[#707885]`,
    followWrapper: `flex items-center justify-between gap-[2.5em]`,
    followBox: `w-[100%] border bg-[#f9f9f9] rounded-sm p-[1.5em] `,
    followHeader: `flex items-center gap-[12px] font-bold text-[18px] text-primaryColor mb-[1.5em]`,
    followHeaderIcon: `block bg-primaryColor text-white p-[7px] text-2xl rounded-sm`,
    followImages: `flex items-center`,
    followImg: `relative w-[45px] min-w-[45px] h-[45px] min-h-[45px] rounded-full overflow-hidden first:right-0 border-2 border-white`,
};

export default function About({ data }) {
    const user = JSON.parse(data);

    return (
        <div className={styles.container}>
            {user.description && (
                <p className={styles.desc}>{user.description}</p>
            )}
            <ul className={styles.metaWrapper}>
                {user.city && user.country && (
                    <li className={styles.metaItem}>
                        <i>
                            <BiCurrentLocation />
                        </i>
                        <span>
                            {user.city}, {user.country}
                        </span>
                    </li>
                )}
                {user.phone && (
                    <li className={styles.metaItem}>
                        <i>
                            <BiPhoneCall />
                        </i>
                        <span>{user.phone}</span>
                    </li>
                )}
                {user.website && (
                    <li>
                        <a
                            href={user.website}
                            target='blank'
                            className={
                                styles.metaItem +
                                ' hover:text-secondaryColor transition-all'
                            }
                        >
                            <i>
                                <BiLink />
                            </i>
                            <span>Visit Site</span>
                        </a>
                    </li>
                )}
                {user.gender && (
                    <li className={styles.metaItem}>
                        <i>
                            <BiHeart />
                        </i>
                        <span>{user.gender}</span>
                    </li>
                )}
                {user.age && (
                    <li className={styles.metaItem}>
                        <i>
                            <BiGlobe />
                        </i>
                        <span>{user.age} years old</span>
                    </li>
                )}
            </ul>
            <div className={styles.followWrapper}>
                <div className={styles.followBox}>
                    <h3 className={styles.followHeader}>
                        <i className={styles.followHeaderIcon}>
                            <FaUsers />
                        </i>
                        Followers
                    </h3>
                    {user?.followers?.length > 0 ? (
                        <div className={styles.followImages}>
                            {user.followers
                                .slice(0, 4)
                                .map((follower, index) => {
                                    return (
                                        <div
                                            className={
                                                styles.followImg +
                                                ` right-[${index * 13}px]`
                                            }
                                            key={index}
                                        >
                                            <Image
                                                src={
                                                    follower?.avatar ||
                                                    avatarImg
                                                }
                                                alt=''
                                                objectFit='cover'
                                                layout='fill'
                                            />
                                        </div>
                                    );
                                })}
                            {user.followers.length > 4 && (
                                <span className='text-grayColor ml-[10px]'>
                                    +{user.followers.length - 4} others
                                </span>
                            )}
                        </div>
                    ) : (
                        <p className='text-grayColor mt-[45px]'>
                            user doesn&#39;t have any followers yhet
                        </p>
                    )}
                </div>
                <div className={styles.followBox}>
                    <h3 className={styles.followHeader}>
                        <i className={styles.followHeaderIcon}>
                            <FaUsers />
                        </i>
                        Following
                    </h3>
                    {user?.following?.length > 0 ? (
                        <div className={styles.followImages}>
                            {user.following.map((follower, index) => {
                                return (
                                    <div
                                        className={
                                            styles.followImg +
                                            ` right-[${index * 13}px]`
                                        }
                                        key={index}
                                    >
                                        <Image
                                            src={follower?.avatar || avatarImg}
                                            alt=''
                                            objectFit='cover'
                                            layout='fill'
                                        />
                                    </div>
                                );
                            })}
                            {user.following.length > 4 && (
                                <span className='text-grayColor ml-[10px]'>
                                    +{user.following.length - 4} others
                                </span>
                            )}
                        </div>
                    ) : (
                        <p className='text-grayColor mt-[45px]'>
                            user doesn&#39;t have any following yhet
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

About.getLayout = function getLayout(page) {
    return (
        <>
            <ProfileHero user={JSON.parse(page.props.data)} />
            <SidebarLayout>
                <ProfileLayout user={JSON.parse(page.props.data)} />
                {page}
            </SidebarLayout>
        </>
    );
};

export async function getServerSideProps({ params }) {
    const user = await getUserWithInfo(params?.username);

    if (!user) {
        return {
            redirect: {
                permanent: false,
                destination: '/404',
            },
        };
    }

    return {
        props: { data: JSON.stringify(user) },
    };
}
