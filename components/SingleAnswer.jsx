import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import {
    BsCheck,
    BsThreeDotsVertical,
    BsFillTriangleFill,
    BsShareFill,
    BsPersonFill,
} from 'react-icons/bs';
import { IoMdShareAlt } from 'react-icons/io';
import { useSelector } from 'react-redux';
import axios from '../axios';

import { avatarImg } from '../public/images';
import { logout } from '../redux/slices/userSlice';
import { monthNames } from '../utils/constants';

const styles = {
    container: `py-[15px] lg:py-[30px] border-b border-borderColor last:border-b-0 grid grid-cols-[65px_auto] lg:grid-cols-[75px_auto]`,
    avatarWrapper: `w-[50px] min-w-[50px] h-[50px] min-h-[50px] rounded-full p-[4px] border-2 border-secondaryColor lg:row-span-2 lg:w-[55px] lg:h-[55px] lg:min-w-[55px] lg:min-h-[55px]`,
    avatarImg: `relative inline-block w-[100%] h-[100%] w-[100%] h-[100%] rounded-full overflow-hidden`,
    authorName: `text-secondaryColor font-semibold capitalize tracking-wide transition-all text-[15px] lg:text-[17px]`,
    verified: `inline-block bg-secondaryColor rounded-full text-white ml-[10px] text-base w-[15px] h-[15px] lg:w-[18px] lg:h-[18px] lg:text-[16px]`,
    badge: `inline-block ml-[1em] text-white bg-[#d9a34a] capitalize rounded-sm text-xs py-[2px] px-[10px] lg:text-sm`,
    createdAt: `text-grayColor text-[13px] lg:text-[15px] mt-[4px] lg:mt-[8px]`,
    contentWrapper: `col-span-2 lg:col-span-1`,
    desc: `text-primaryColor text-base leading-[28px] lg:text-[18px] lg:leading-loose mt-[0.8em] mb-[1.2em]`,
    answerFooter: `flex items-center lg:justify-between`,
    answerFooterLeft: `flex items-center`,
    voteWrapper: `flex items-center gap-[10px] mr-[15px] pr-[15px] border-r border-borderColor`,
    voteIcon: `block text-[#677075] cursor-pointer transition-all hover:text-primaryColor text-[15px] lg:text-[16px]`,
    voteTxt: `text-base lg:text-lg font-bold text-[#677075]`,
    replyBtnWrapper: `relative mr-[15px] pr-[15px] border-r border-borderColor`,
    replyBtn: `flex items-center text-[#464e7b] gap-[10px] text-[14px] lg:text-[15px] transition-all hover:text-secondaryColor outline-none`,
    shareBtnWrapper: `group relative py-[10px] `,
    shareBtn: `flex items-center text-[#464e7b] gap-[10px] text-[14px] lg:text-[15px] mr-[15px] pr-[15px] border-r border-borderColor outline-none`,
    shareIconList: `absolute top-[40px] right-0 bg-white shadow-[0_1px_5px_#d0d2d3] rounded-sm overflow-hidden translate-x-[15px] transition-all opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-x-0`,
    shareIcon: `whitespace-nowrap py-[8px] px-[10px] text-grayColor cursor-pointer transition-all hover:text-secondaryColor text-[15px] last:border-b-0 translate-x-[20px] opacity-0 group-hover:opacity-100 group-hover:translate-x-0`,
    formMeta: `flex items-center gap-[12px] text-grayColor text-base mt-[1em]`,
    formLink: `flex items-center gap-[7px] text-primaryColor transition-all hover:text-secondaryColor`,
    formWrapper: `col-span-2 w-[100%] bg-[#f7f7f7] mt-[2em] border border-[#e4e6e6] rounded-sm p-[30px]`,
    formTextarea: `w-[100%] border border-borderColor outline-none rounded-sm mt-[2em] resize-none p-[10px] mb-[1.2em]`,
    formSubmitBtn: `h-[45px] lg:h-[47px] bg-secondaryColor w-[100%] text-white font-bold rounded-sm lg:text-[17px] transition-all hover:bg-grayColor`,
};

export default function SingleAnswer({
    _id,
    answer,
    avatar,
    author,
    votes,
    createdAt,
    questionId,
    replies,
    isReply = false,
}) {
    const [error, setError] = useState('');
    const [replayFormOpen, setReplayFormOpen] = useState(false);
    const [replayTxt, setReplayTxt] = useState('');

    const myDate = new Date(createdAt);
    const { user } = useSelector((state) => state.user);

    const handleVote = async (isUpvote) => {
        try {
            setError('');
            const response = await axios.patch(
                '/answers/vote',
                {
                    isUpvote,
                    answerId: _id,
                },
                {
                    headers: { Authorization: `Bearer ${user?.token}` },
                }
            );
            console.log(response.data);
        } catch (err) {
            // if (err.response.status === 401) {
            //     dispatch(logout());
            //     return setError('Please Login to vote');
            // }
            // setError(
            //     err.response?.data?.error || 'Something went wrong, Try again'
            // );
            console.log(err?.response?.data);
        }
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const response = await axios.post(
                '/answers/replay',
                {
                    answer: replayTxt,
                    questionId: questionId,
                    answerId: _id,
                },
                {
                    headers: { Authorization: `Bearer ${user?.token}` },
                }
            );

            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div
            className={
                styles.container +
                ` ${isReply ? 'px-0 first:border-t first:mt-[1.5em]' : 'px-[15px] lg:px-[30px]'}`
            }
        >
            <div className={styles.avatarWrapper}>
                <Link href={'/'}>
                    <a href='' className={styles.avatarImg}>
                        <Image
                            src={avatar || avatarImg}
                            alt=''
                            layout='fill'
                            objectFit='cover'
                        />
                    </a>
                </Link>
            </div>

            <div className='col-auto'>
                <div>
                    <Link href={'/'}>
                        <a
                            href={'/'}
                            className={
                                styles.authorName + ` hover:text-primaryColor`
                            }
                        >
                            {author?.username}
                        </a>
                    </Link>
                    {author?.isVerified && (
                        <span className={styles.verified}>
                            <span className='flex h-[100%] w-[100%] items-center justify-center'>
                                <BsCheck />
                            </span>
                        </span>
                    )}
                    {author?.badge && (
                        <span className={styles.badge}>{author?.badge}</span>
                    )}
                </div>
                <p className={styles.createdAt}>
                    Added an answer on{' '}
                    {monthNames[myDate.getMonth()] +
                        ' ' +
                        myDate.getDate() +
                        ', ' +
                        myDate.getFullYear() +
                        ' at ' +
                        (myDate.getHours() > 12
                            ? myDate.getHours() - 12
                            : myDate.getHours()) +
                        ':' +
                        myDate.getMinutes() +
                        ' ' +
                        (myDate.getHours() > 11 ? 'pm' : 'am')}
                </p>
            </div>

            <div className={styles.contentWrapper}>
                <p className={styles.desc}>{answer}</p>
                <div className={styles.answerFooter}>
                    <div className={styles.answerFooterLeft}>
                        <div className={styles.voteWrapper}>
                            <span
                                className={styles.voteIcon}
                                onClick={() => {
                                    handleVote(true);
                                }}
                            >
                                <BsFillTriangleFill />
                            </span>
                            <span className={styles.voteTxt}>{votes}</span>
                            <span
                                className={styles.voteIcon + ' rotate-180'}
                                onClick={() => {
                                    handleVote(false);
                                }}
                            >
                                <BsFillTriangleFill />
                            </span>
                        </div>

                        {/* REPLAY BUTTON */}
                        {!isReply && (
                            <div className={styles.replyBtnWrapper}>
                                <button
                                    className={styles.replyBtn}
                                    onClick={() => {
                                        setReplayFormOpen(!replayFormOpen);
                                    }}
                                >
                                    <span className='scale-x-[-1]'>
                                        <IoMdShareAlt />
                                    </span>{' '}
                                    Reply
                                </button>
                            </div>
                        )}

                        <div className={styles.shareBtnWrapper}>
                            <button className={styles.shareBtn}>
                                <BsShareFill /> Share
                            </button>
                            <ul className={styles.shareIconList}>
                                <li className={styles.shareIcon + ' delay-75'}>
                                    <a
                                        href={`http://www.facebook.com/share.php?u=${process.env.BASE_URL}/questions/${questionId}#answers`}
                                        target='blank'
                                    >
                                        Share on Facebook
                                    </a>
                                </li>
                                <hr />
                                <li className={styles.shareIcon + ' delay-150'}>
                                    <a
                                        href={`http://twitter.com/share?url=${process.env.BASE_URL}/questions/${questionId}#answers&hashtags=qna,nihal`}
                                        target='blank'
                                    >
                                        Share on Twitter
                                    </a>
                                </li>
                                <hr />
                                <li className={styles.shareIcon + ' delay-200'}>
                                    <a
                                        href={`whatsapp://send?text=${process.env.BASE_URL}/questions/${questionId}#answers`}
                                        data-action='share/whatsapp/share'
                                        target='blank'
                                    >
                                        Share on WhatsApp
                                    </a>
                                </li>
                                <hr />
                                <li className={styles.shareIcon + ' delay-300'}>
                                    <a
                                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${process.env.BASE_URL}/questions/${questionId}#answers`}
                                        target='blank'
                                    >
                                        Share on LinkedIn
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <button>
                            <BsThreeDotsVertical />
                        </button>
                    </div>
                </div>

                {replies && (
                    <div>
                        {replies.map((reply, index) => {
                            return (
                                <SingleAnswer
                                    key={index}
                                    {...reply}
                                    isReply={true}
                                />
                            );
                        })}
                    </div>
                )}
            </div>

            {/* REPLAY FORM */}
            {replayFormOpen && (
                <div className={styles.formWrapper}>
                    <p className={styles.formReplayTxt}>
                        Replay to {author.username}
                    </p>
                    <p className={styles.formMeta}>
                        Logged in as{' '}
                        <Link href={`/profile/${user.username}`}>
                            <a
                                href={`/profile/${user.username}`}
                                className={styles.formLink}
                            >
                                <i>
                                    <BsPersonFill />
                                </i>
                                {user?.username}
                            </a>
                        </Link>
                        <button
                            className={styles.formLink}
                            onClick={() => {
                                dispatch(logout());
                            }}
                        >
                            <i>
                                <BiLogOut />
                            </i>
                            Logout
                        </button>
                    </p>
                    <form action='' onSubmit={handleSubmit}>
                        <textarea
                            name=''
                            id=''
                            cols='30'
                            rows='10'
                            className={styles.formTextarea}
                            onChange={(e) => {
                                setReplayTxt(e.target.value);
                            }}
                        ></textarea>
                        <button className={styles.formSubmitBtn}>submit</button>
                    </form>
                </div>
            )}
        </div>
    );
}
