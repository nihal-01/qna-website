import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
    BsFillTriangleFill,
    BsFillChatLeftFill,
    BsEyeFill,
    BsCheck,
    BsPlus,
    BsStar,
    BsExclamationTriangle,
    BsShareFill,
} from 'react-icons/bs';
import {
    FaFacebookF,
    FaLinkedinIn,
    FaTwitter,
    FaWhatsapp,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios';

import { avatarImg } from '../public/images';
import {
    updateSingleQstnVotes,
    updateVotesCount,
} from '../redux/slices/questionSlice';
import { logout } from '../redux/slices/userSlice';
import { monthNames } from '../utils/constants';
import BtnLoader from './BtnLoader';

const styles = {
    container: `px-[15px] py-[15px] lg:p-[30px] border-b border-borderColor`,
    header: `grid grid-cols-[auto_1fr] gap-[20px] items-center lg:items-start lg:gap-0 lg:gap-x-[20px]`,
    avatarWrapper: `relative w-[50px] h-[50px] rounded-full p-[4px] border-2 border-secondaryColor lg:row-span-2 lg:w-[55px] lg:h-[55px] transition-all hover:border-primaryColor`,
    avatarImg: `relative inline-block w-[100%] h-[100%] w-[100%] h-[100%] rounded-full overflow-hidden`,
    infoWrapper: `flex items-center gap-[20px]`,
    voteWrapper: `text-center lg:w-[55px] lg:min-w-[55px]`,
    voteBtnUp: `text-[#677075] flex mx-auto transition-all hover:text-[#000] lg:text-[17px] disabled:cursor-not-allowed`,
    voteBtnDown: `text-[#677075] flex mx-auto rotate-180 transition-all hover:text-[#000] lg:text-[17px] disabled:cursor-not-allowed`,
    voteCount: `text-[#677075] text-lg py-[5px] font-semibold lg:text-[22px] lg:py-[10px]`,
    postMeta: `lg:flex lg:flex-wrap lg:items-center lg:gap-[5px]`,
    authorName: `text-secondaryColor font-semibold capitalize tracking-wide transition-all lg:text-[17px]`,
    badge: `inline-block ml-[10px] text-white bg-[#d9a34a] capitalize rounded-sm text-xs py-[2px] px-[10px] lg:text-sm`,
    askedDate: `text-grayColor text-sm lg:ml-[12px]`,
    category: `text-grayColor text-sm capitalize`,
    titleWrapper: `col-span-2 mb-[0.6em] lg:col-span-1 lg:mb-[1em] lg:mt-[8px]`,
    title: `text-primaryColor font-semibold text-lg transition-all lg:text-[22px] lg:leading-normal`,
    body: `lg:flex gap-[20px] `,
    desc: `text-base leading-[28px] mb-[1.2em] lg:text-[18px] lg:leading-loose lg:mb-[2em]`,
    tags: `flex items-center gap-[6px] mb-[1.2em] lg:mb-[2em]`,
    singleTag: `border border-borderColor rounded-sm text-grayColor text-sm py-[2px] px-[10px] cursor-pointer transition-all hover:bg-secondaryColor hover:text-white rounded-sm lg:text-[15px]`,
    articleFooter: `bg-[#f5f5f5] p-[10px] flex items-center gap-[12px] flex-wrap lg:p-[20px]`,
    answersBox: `inline-block text-[#26aa6c] border border-[#26aa6c] bg-white py-[5px] px-[10px] flex items-center gap-[8px] rounded-sm text-sm lg:text-base`,
    footerBtn: `inline-block text-grayColor border border-[#d9dadb] bg-white py-[5px] px-[10px] flex items-center gap-[8px] rounded-sm text-sm lg:text-base cursor-default`,
    answerBtn: `inline-block bg-primaryColor text-white py-[6px] px-[15px] font-semibold text-sm rounded-sm transition-all hover:bg-secondaryColor lg:text-base`,
    verified: `inline-block bg-secondaryColor rounded-full text-white ml-[5px] text-base w-[15px] h-[15px] lg:w-[18px] lg:h-[18px] lg:text-[16px]`,
    socialWrapper: `pt-[15px] lg:pt-[30px] flex items-center justify-between flex-wrap gap-[1em]`,
    report: `flex items-center gap-[7px] text-[#474e7b] text-sm transition-all hover:text-secondaryColor cursor-pointer lg:text-[15px]`,
    socialIconsWrapper: `flex items-center gap-[10px] flex-wrap lg:gap-[1em]`,
    shareIcon: `flex items-center gap-[8px] text-[#707885] text-sm lg:text-[15px]`,
    socilaIconsList: `flex items-center gap-[10px]`,
    socialIcon: `w-[30px] h-[30px] rounded-sm text-base flex items-center justify-center text-white lg:w-[35px] lg:h-[35px] lg:text-[20px] transition-all hover:bg-primaryColor cursor-pointer`,
    errorTxt: `w-[100%] text-[red] bg-[#fbcccc] p-[14px] text-[14px] mb-[1.5em] font-bold rounded-sm tracking-wider`,
};

export default function SingleQuestion({
    _id,
    title,
    details,
    isAnonymous,
    author,
    votes,
    createdAt,
    category,
    tags,
    numOfAnswers,
    views,
    isFullVisible,
}) {
    const [error, setError] = useState('');
    const [voteLoading, setVoteLoading] = useState(false);

    const myDate = new Date(createdAt);

    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleVote = async (isUpvote) => {
        try {
            setError('');
            setVoteLoading(true);

            const response = await axios.patch(
                '/questions/vote',
                {
                    isUpvote,
                    questionId: _id,
                },
                {
                    headers: { Authorization: `Bearer ${user?.token}` },
                }
            );

            setVoteLoading(false);
            if (isFullVisible) {
                dispatch(updateSingleQstnVotes(response.data.votes));
            } else {
                dispatch(
                    updateVotesCount({
                        questionId: _id,
                        votes: response.data.votes,
                    })
                );
            }
        } catch (err) {
            setVoteLoading(false);
            if (err.response.status === 401) {
                dispatch(logout());
                return setError('Please Login to vote');
            }
            setError(
                err.response?.data?.error || 'Something went wrong, Try again'
            );
        }
    };

    useEffect(() => {
        console.log('timeout is here');
        const timeout = setTimeout(() => {
            setError('');
        }, 3000);

        return () => {
            clearTimeout(timeout);
        };
    }, [error]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.avatarWrapper}>
                    <Link
                        href={
                            isAnonymous ? '#' : `/profile/${author?.username}`
                        }
                    >
                        <a
                            href={
                                isAnonymous
                                    ? '#'
                                    : `/profile/${author?.username}`
                            }
                            className={
                                styles.avatarImg +
                                (isAnonymous
                                    ? ' cursor-default'
                                    : ' cursor-pointer')
                            }
                        >
                            <Image
                                src={author?.avatar || avatarImg}
                                alt=''
                                layout='fill'
                                objectFit='cover'
                            />
                        </a>
                    </Link>
                </div>
                <div className={styles.infoWrapper}>
                    <ul className={styles.voteWrapper + ` lg:hidden`}>
                        <li>
                            <button className={styles.voteBtnUp}>
                                <BsFillTriangleFill />
                            </button>
                        </li>
                        <li>
                            <div className={styles.voteCount}>{votes}</div>
                        </li>
                        <li>
                            <button className={styles.voteBtnDown}>
                                <BsFillTriangleFill />
                            </button>
                        </li>
                    </ul>
                    <div className={styles.postMeta}>
                        {isAnonymous ? (
                            <span className={styles.authorName}>Anonymous</span>
                        ) : (
                            <Link href={`/profile/${author?.username}`}>
                                <a
                                    href={`/profile/${author?.username}`}
                                    className={
                                        styles.authorName +
                                        ` hover:text-primaryColor`
                                    }
                                >
                                    {author?.username}
                                </a>
                            </Link>
                        )}
                        {author?.isVerified && (
                            <span className={styles.verified}>
                                <span className='flex h-[100%] w-[100%] items-center justify-center'>
                                    <BsCheck />
                                </span>
                            </span>
                        )}
                        {author?.badge && (
                            <span className={styles.badge}>{author.badge}</span>
                        )}
                        <div className='grid mt-[5px] lg:mt-[0px] lg:grid-cols-2 lg:gap-[12px]'>
                            <span className={styles.askedDate}>
                                Asked:{' '}
                                <span className='text-secondaryColor'>
                                    {monthNames[myDate.getMonth()] +
                                        ' ' +
                                        myDate.getDate() +
                                        ', ' +
                                        myDate.getFullYear()}
                                </span>
                            </span>
                            <span className={styles.category}>
                                In:{' '}
                                <Link href={`/category/${category?.name}`}>
                                    <a href=''>
                                        <span className='text-secondaryColor transition-all hover:text-primaryColor'>
                                            {category?.name}
                                        </span>
                                    </a>
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.titleWrapper}>
                    <h2
                        className={
                            styles.title +
                            ` ${!isFullVisible && 'hover:text-secondaryColor'}`
                        }
                    >
                        {isFullVisible ? (
                            title
                        ) : (
                            <Link href={`/questions/${_id}`}>
                                <a href={`/questions/${_id}`}>{title}</a>
                            </Link>
                        )}
                    </h2>
                </div>
            </div>
            <div
                className={
                    styles.body +
                    ` ${
                        isFullVisible && 'border-b border-borderColor pb-[40px]'
                    }`
                }
            >
                <ul className={styles.voteWrapper + ` hidden lg:block`}>
                    <li>
                        <button
                            className={styles.voteBtnUp}
                            onClick={() => {
                                handleVote(true);
                            }}
                            disabled={voteLoading}
                        >
                            <BsFillTriangleFill />
                        </button>
                    </li>
                    <li>
                        <div className={styles.voteCount}>
                            {voteLoading ? (
                                <BtnLoader color={'secondaryColor'} />
                            ) : (
                                votes
                            )}
                        </div>
                    </li>
                    <li>
                        <button
                            className={styles.voteBtnDown}
                            onClick={() => {
                                handleVote(false);
                            }}
                            disabled={voteLoading}
                        >
                            <BsFillTriangleFill />
                        </button>
                    </li>
                </ul>
                <div className='w-[100%]'>
                    <p
                        className={
                            styles.desc +
                            ` ${
                                isFullVisible
                                    ? ' text-primaryColor'
                                    : ' text-grayColor'
                            }`
                        }
                    >
                        {!isFullVisible
                            ? details.slice(0, 220) +
                              (details.length > 220 && ' ...')
                            : details}
                    </p>
                    {tags && (
                        <ul className={styles.tags}>
                            {tags.map((tag, index) => {
                                return (
                                    <li
                                        key={index}
                                        className={styles.singleTag}
                                    >
                                        {tag}
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    {error && <p className={styles.errorTxt}>{error}</p>}

                    <div className={styles.articleFooter}>
                        <Link href={`/questions/${_id}#answers`}>
                            <a
                                href={`/questions/${_id}#answers`}
                                className={styles.answersBox}
                            >
                                <BsFillChatLeftFill /> {numOfAnswers} Answers
                            </a>
                        </Link>
                        <div className={`${!isFullVisible && ' lg:grow'}`}>
                            <button className={styles.footerBtn}>
                                <BsEyeFill /> {views} views
                            </button>
                        </div>
                        {!isFullVisible && (
                            <Link href={`/questions/${_id}#answer`}>
                                <a
                                    href={`/questions/${_id}#answer`}
                                    className={styles.answerBtn}
                                >
                                    Answer
                                </a>
                            </Link>
                        )}
                        {isFullVisible && (
                            <>
                                <button className={styles.footerBtn}>
                                    <BsPlus /> {author?.followers?.length || 0}{' '}
                                    Followers
                                </button>
                                <button className={styles.footerBtn}>
                                    <BsStar /> 3
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {isFullVisible && (
                <div className={styles.socialWrapper}>
                    <div className={styles.report}>
                        <BsExclamationTriangle /> Report
                    </div>
                    <div className={styles.socialIconsWrapper}>
                        <span className={styles.shareIcon}>
                            <BsShareFill /> Share
                        </span>
                        <ul className={styles.socilaIconsList}>
                            <li className={styles.socialIcon + ' bg-[#4267B2]'}>
                                <a href='https://google.com' target='blank'>
                                    <FaFacebookF />
                                </a>
                            </li>
                            <li className={styles.socialIcon + ' bg-[#00acee]'}>
                                <a href='https://google.com' target='blank'>
                                    <FaTwitter />
                                </a>
                            </li>
                            <li className={styles.socialIcon + ' bg-[#0e76a8]'}>
                                <a href='https://google.com' target='blank'>
                                    <FaLinkedinIn />
                                </a>
                            </li>
                            <li className={styles.socialIcon + ' bg-[#25D366]'}>
                                <a href='https://google.com' target='blank'>
                                    <FaWhatsapp />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
