import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios';

import { avatarImg } from '../public/images';
import { updateIsFollowing } from '../redux/slices/userSlice';

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

export default function UserCard({
    _id,
    username,
    followers,
    avatar,
    numOfQuestions,
    numOfAnswers,
    isFollowing,
}) {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleFollow = async () => {
        try {
            if (isFollowing) {
                const response = await axios.patch(
                    `http://localhost:3000/api/users/unfollow/${_id}`,
                    {},
                    { headers: { Authorization: `Bearer ${user?.token}` } }
                );
                console.log(response.data);
                dispatch(updateIsFollowing({ _id, isFollowing: false }));
            } else {
                const response = await axios.patch(
                    `http://localhost:3000/api/users/follow/${_id}`,
                    {},
                    { headers: { Authorization: `Bearer ${user?.token}` } }
                );
                console.log(response.data);
                dispatch(updateIsFollowing({ _id, isFollowing: true }));
            }
        } catch (err) {
            console.log(err.response);
        }
    };

    return (
        <div className={styles.container}>
            <Link href='/'>
                <a href='' className={styles.imgWrapper}>
                    <div className={styles.img}>
                        <Image
                            src={avatar || avatarImg}
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
                        {username}
                    </a>
                </Link>
            </h4>
            <p className={styles.followersTxt}>{followers} followers</p>
            <p className={styles.answersTxt}>
                {numOfQuestions} Questions | {numOfAnswers} Answers
            </p>
            {user && (
                <button
                    className={
                        isFollowing ? styles.unfollowBtn : styles.followBtn
                    }
                    onClick={handleFollow}
                >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
            )}
        </div>
    );
}
