import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
    BsCheck,
    BsThreeDotsVertical,
    BsFillTriangleFill,
    BsShareFill,
} from 'react-icons/bs';
import { IoMdShareAlt } from 'react-icons/io';

import { avatarImg } from '../public/images';

const styles = {
    container: `px-[15px] py-[15px] lg:p-[30px] border-b border-borderColor grid grid-cols-[65px_auto] lg:grid-cols-[75px_auto]`,
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
};

export default function SingleAnswer({ _id, answer, avatar }) {
    return (
        <div className={styles.container}>
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
                            Nihal N
                        </a>
                    </Link>
                    {true && (
                        <span className={styles.verified}>
                            <span className='flex h-[100%] w-[100%] items-center justify-center'>
                                <BsCheck />
                            </span>
                        </span>
                    )}
                    {true && <span className={styles.badge}>Beginner</span>}
                </div>
                <p className={styles.createdAt}>
                    Added an answer on April 19, 2018 at 2:00 am
                </p>
            </div>

            <div className={styles.contentWrapper}>
                <p className={styles.desc}>{answer}</p>
                <div className={styles.answerFooter}>
                    <div className={styles.answerFooterLeft}>
                        <div className={styles.voteWrapper}>
                            <span className={styles.voteIcon}>
                                <BsFillTriangleFill />
                            </span>
                            <span className={styles.voteTxt}>79</span>
                            <span className={styles.voteIcon + ' rotate-180'}>
                                <BsFillTriangleFill />
                            </span>
                        </div>
                        <div className={styles.replyBtnWrapper}>
                            <button className={styles.replyBtn}>
                                <span className='scale-x-[-1]'>
                                    <IoMdShareAlt />
                                </span>{' '}
                                Reply
                            </button>
                        </div>
                        <div className={styles.shareBtnWrapper}>
                            <button className={styles.shareBtn}>
                                <BsShareFill /> Share
                            </button>
                            <ul className={styles.shareIconList}>
                                <li className={styles.shareIcon + ' delay-75'}>
                                    Share on Facebook
                                </li>
                                <hr />
                                <li className={styles.shareIcon + ' delay-150'}>
                                    Share on Twitter
                                </li>
                                <hr />
                                <li className={styles.shareIcon + ' delay-200'}>
                                    Share on WhatsApp
                                </li>
                                <hr />
                                <li className={styles.shareIcon + ' delay-300'}>
                                    Share on LinkedIn
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
            </div>
        </div>
    );
}
