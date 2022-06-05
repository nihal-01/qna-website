import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { BsCheck } from 'react-icons/bs';
import { HiLockClosed, HiLockOpen } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios';
import { avatarImg } from '../public/images';
import { joinGroup, leaveGroup } from '../redux/slices/groupSlice';
import BtnLoader from './BtnLoader';

const styles = {
    container: `relative w-[100%] h-[300px] lg:h-[400px] max-h-max overflow-hidden bg-[#34373e]`,
    opacity: `absolute inset-0 bg-[#34373e] opacity-60`,
    wrapper: `absolute inset-0`,
    contentWrapper: `max-w-[750px] mx-auto lg:max-w-[1500px] px-[15px] py-[20px] lg:p-[30px] h-[100%] flex items-end`,
    content: `lg:flex items-center w-[100%] justify-between`,
    contentLeft: `flex items-center flex-wrap gap-[6px] mb-[1.2em]`,
    avatarWrapper: `w-[65px] min-w-[65px] h-[65px] min-h-[65px] rounded-full p-[4px] border-2 border-secondaryColor mr-[10px] lg:row-span-2 lg:w-[90px] lg:min-w-[90px] lg:h-[90px] lg:min-h-[90px]`,
    avatarImg: `relative inline-block w-[100%] h-[100%] w-[100%] h-[100%] rounded-full overflow-hidden`,
    authorName: `text-white font-semibold tracking-wide transition-all lg:text-2xl`,
    contentRight: `flex flex-wrap items-center gap-[1em]`,
    contentRigthBtn: `flex items-center bg-white text-grayColor rounded-sm py-[5px] px-[15px] text-[15px] lg:text-base`,
    meta: `flex items-center gap-[8px] text-white mt-[5px] text-[15px]`,
    joinBtn: `bg-secondaryColor transition-all hover:bg-grayColor py-[5px] px-[15px] text-[15px] lg:text-base rounded-sm text-white cursor-pointer font-bold disabled:cursor-not-allowed`,
    coverImg: `relative w-[100%] h-[100%]`,
};

export default function SingleGroupHero() {
    const { user } = useSelector((state) => state.user);
    const { group } = useSelector((state) => state.group);

    const [isLoading, setIsLoading] = useState(false);
    const [dltLoading, setDltLoading] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();

    const handleJoin = async () => {
        try {
            setIsLoading(true);

            if (group?.users?.includes(user._id)) {
                await axios.patch(
                    `/groups/leave/${group._id}`,
                    {},
                    { headers: { Authorization: `Bearer ${user?.token}` } }
                );
                dispatch(leaveGroup(user._id));
            } else {
                await axios.patch(
                    `/groups/join/${group._id}`,
                    {},
                    { headers: { Authorization: `Bearer ${user?.token}` } }
                );
                dispatch(joinGroup(user._id));
            }

            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const isConfirm = confirm('Are you sure to delete?');
            if (isConfirm) {
                setDltLoading(true);
                await axios.delete(`/groups/${group._id}`, {
                    headers: { Authorization: `Bearer ${user?.token}` },
                });
                router.push('/groups');
            }
        } catch (err) {
            console.log(err);
            setDltLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            {group?.cover && (
                <>
                    <Image
                        src={group?.cover}
                        alt=''
                        layout='fill'
                        objectFit='cover'
                    />
                    <div className={styles.opacity}></div>
                </>
            )}
            <div className={styles.wrapper}>
                <div className={styles.contentWrapper}>
                    <div className={styles.content}>
                        <div className={styles.contentLeft}>
                            {group?.profile && (
                                <div className={styles.avatarWrapper}>
                                    <div className={styles.avatarImg}>
                                        <Image
                                            src={group.profile}
                                            alt=''
                                            layout='fill'
                                            objectFit='cover'
                                        />
                                    </div>
                                </div>
                            )}
                            <div>
                                <h3 className={styles.authorName}>
                                    {group?.title}
                                </h3>
                                {group?.postPermission ? (
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
                            </div>
                        </div>
                        <div className={styles.contentRight}>
                            <div className={styles.contentRigthBtn}>
                                {group?.numOfPosts || 0} Posts
                            </div>
                            <div className={styles.contentRigthBtn}>
                                {group?.users?.length || 0} Users
                            </div>
                            {user &&
                                group?.creator?.toString() !==
                                    user._id.toString() && (
                                    <button
                                        className={styles.joinBtn}
                                        onClick={handleJoin}
                                    >
                                        {isLoading ? (
                                            <BtnLoader />
                                        ) : group?.users?.includes(user._id) ? (
                                            'Leave'
                                        ) : (
                                            'Join'
                                        )}
                                    </button>
                                )}
                            {group?.creator?.toString() ===
                                user?._id?.toString() && (
                                <button
                                    className={styles.joinBtn}
                                    onClick={handleDelete}
                                >
                                    {dltLoading ? <BtnLoader /> : 'Delete'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
