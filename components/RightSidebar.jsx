import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillChatRightFill, BsTagsFill } from 'react-icons/bs';
import { HiUsers } from 'react-icons/hi';
import Image from 'next/image';

import {
    updateQuestionBox,
    updateSigninBox,
} from '../redux/slices/layoutSlice';
import { avatarImg } from '../public/images';
import { monthNames } from '../utils/constants';
import axios from '../axios';

const styles = {
    container: `bg-white min-h-[100vh] sticky top-[0px]`,
    askBtnWrapper: `p-[20px] border-b-2 border-[#e4e5e6]`,
    askBtn: `w-[100%] h-[45px] bg-secondaryColor rounded-sm text-white font-semibold transition-colors hover:bg-grayColor`,
    infoWrapper: `relative grid grid-cols-2 bg-[#f9f9f9] px-[20px] py-[25px]`,
    info: `before:content-[''] before:absolute before:w-[2px] before:h-[50%] before:top-[50%] before:translate-y-[-50%] before:left-[1px]`,
    singleInfo: `relative px-[15px] py-[12px] bg-white border border-borderColor text-center rounded-sm `,
    infoHeader: `block text-[15px] mb-[5px] bef `,
    infoTxt: `block font-bold text-2xl`,
    tabWidget: `border-b-2 border-borderColor`,
    tabHeader: `flex items-center px-[20px] bg-[#f9f9f9] border-b`,
    tabHeaderItem: `py-[14px] px-[12px] border-x border-t border-borderColor rounded-sm cursor-pointer hover:text-secondaryColor text-base translate-y-[1px]`,
    tabBody: `py-[10px] px-[20px] transition-all`,
    qstnWrapper: `flex gap-[1em] items-start py-[20px] border-b last:border-b-0 transition-all`,
    qstnImgWrapper: `relative w-[35px] min-w-[35px] h-[35px] min-h-[35px] rounded-full overflow-hidden`,
    qstnTitle: `font-bold transition-all text-primaryColor hover:text-secondaryColor`,
    qstnAnswers: `flex items-center text-grayColor text-[14px] mt-[7px] gap-[10px]`,
    qstnChatIcon: `text-[#677075]`,
    answerWrapper: `flex gap-[1em] items-start transition-all py-[12px]`,
    answerImgWrapper: `relative w-[35px] min-w-[35px] h-[35px] min-h-[35px] rounded-full overflow-hidden`,
    answerTxt: `text-grayColor text-[14px]`,
    answerUsername: `text-secondaryColor transition-all hover:text-primaryColor cursor-pointer`,
    answer: `text-primaryColor`,
    answerDate: `flex text-grayColor text-[14px] mt-[7px]`,
    topUsersWrapper: `px-[20px] py-[30px] border-b-2`,
    topUsersTitle: `flex items-center gap-[12px] text-[19px] font-bold text-[#26333b] mb-[1em]`,
    topUser: `flex gap-[1em] mt-[1.7em]`,
    topUserImgWrapper: `w-[55px] min-h-[55px] min-w-[55px] h-[55px] rounded-full p-[4px] border-2 border-secondaryColor transition-all cursor-pointer hover:border-primaryColor`,
    topUserImg: `relative w-[100%] h-[100%] rounded-full overflow-hidden`,
    topUserName: `font-bold text-[17px] text-secondaryColor mb-[4px] transition-all hover:text-primaryColor`,
    topUserMeta: `flex gap-[14px] text-grayColor mb-[10px]`,
    topUserBadge: `bg-[#d9a34a] text-white rounded-sm py-[3px] px-[10px] text-[15px]`,
    tagsWrapper: `px-[20px] py-[30px]`,
    tagsTitle: `flex items-center gap-[12px] text-[19px] font-bold text-[#26333b] mb-[1em]`,
    tagsList: `flex flex-wrap gap-[10px]`,
    tagsListItem: `border rounded-sm text-grayColor py-[3px] px-[7px] text-[15px] transition-all hover:bg-secondaryColor hover:text-white`,
    loading: `flex items-start gap-[1em] animate-pulse p-[20px]`,
    loadingImg: `w-[55px] min-w-[55px] h-[55px] min-h-[55px] bg-slate-200 rounded-full`,
    loadingTxt: `h-[14px] w-[100%] bg-slate-200 block mb-[7px]`,
    loadingMeta: `h-[10px] w-[50%] bg-slate-200 block`,
};

export default function RightSidebar() {
    const [isPopularTab, setIsPopularTab] = useState(true);

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { sidebarData, rightSidebarLoading } = useSelector(
        (state) => state.question
    );

    const handleAskBtn = () => {
        if (user) {
            return dispatch(updateQuestionBox(true));
        }
        dispatch(updateSigninBox(true));
    };

    return (
        <div className={styles.container}>
            <div className={styles.askBtnWrapper}>
                <button className={styles.askBtn} onClick={handleAskBtn}>
                    Ask A Question
                </button>
            </div>
            <div className={styles.infoWrapper}>
                <div className={styles.singleInfo}>
                    <div className={styles.info + ' before:bg-[#2d6ff7]'}>
                        <span className={styles.infoHeader + ' text-[#2d6ff7]'}>
                            Questions
                        </span>
                        <span className={styles.infoTxt}>
                            {sidebarData?.noOfQuestions || 0}
                        </span>
                    </div>
                </div>
                <div className={styles.singleInfo}>
                    <div className={styles.info + ' before:bg-[#f05555]'}>
                        <span className={styles.infoHeader + ' text-[#f05555]'}>
                            Answers
                        </span>
                        <span className={styles.infoTxt}>
                            {sidebarData?.noOfAnswers || 0}
                        </span>
                    </div>
                </div>
                <div className={styles.singleInfo}>
                    <div className={styles.info + ' before:bg-[#1fae5b]'}>
                        <span className={styles.infoHeader + ' text-[#1fae5b]'}>
                            Best Answers
                        </span>
                        <span className={styles.infoTxt}>
                            {sidebarData?.noOfBestAnswers || 0}
                        </span>
                    </div>
                </div>
                <div className={styles.singleInfo}>
                    <div className={styles.info + ' before:bg-[#2d6ff7]'}>
                        <span className={styles.infoHeader + ' text-[#2d6ff7]'}>
                            Users
                        </span>
                        <span className={styles.infoTxt}>
                            {sidebarData?.noOfUsers || 0}
                        </span>
                    </div>
                </div>
            </div>
            {rightSidebarLoading ? (
                Array.from({ length: 3 }).map((_, index) => {
                    return (
                        <div className={styles.loading} key={index}>
                            <div className={styles.loadingImg}></div>
                            <div className='w-[100%]'>
                                <span className={styles.loadingTxt}></span>
                                <span className={styles.loadingTxt}></span>
                                <span className={styles.loadingMeta}></span>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className={styles.tabWidget}>
                    <ul className={styles.tabHeader}>
                        <li
                            className={
                                styles.tabHeaderItem +
                                ` ${
                                    isPopularTab
                                        ? ' bg-white text-[#26333b]'
                                        : 'bg-[#f9f9f9 text-grayColor '
                                }`
                            }
                            onClick={() => {
                                setIsPopularTab(true);
                            }}
                        >
                            Popular
                        </li>
                        <li
                            className={
                                styles.tabHeaderItem +
                                ` ${
                                    !isPopularTab
                                        ? ' bg-white text-[#26333b]'
                                        : 'bg-[#f9f9f9 text-grayColor '
                                }`
                            }
                            onClick={() => {
                                setIsPopularTab(false);
                            }}
                        >
                            Answers
                        </li>
                    </ul>
                    <div className={styles.tabBody}>
                        {isPopularTab ? (
                            <div>
                                {sidebarData?.popularQuestions?.map((qstn) => {
                                    const { _id, title, author, numOfAnswers } =
                                        qstn;
                                    return (
                                        <div
                                            key={_id}
                                            className={styles.qstnWrapper}
                                        >
                                            <div
                                                className={
                                                    styles.qstnImgWrapper
                                                }
                                            >
                                                <Image
                                                    src={
                                                        author?.avatar ||
                                                        avatarImg
                                                    }
                                                    alt=''
                                                    layout='fill'
                                                    objectFit='cover'
                                                />
                                            </div>
                                            <div>
                                                <Link href={'/about-us'}>
                                                    <a href='/about'>
                                                        <h3
                                                            className={
                                                                styles.qstnTitle
                                                            }
                                                        >
                                                            {title}
                                                        </h3>
                                                    </a>
                                                </Link>
                                                <span
                                                    className={
                                                        styles.qstnAnswers
                                                    }
                                                >
                                                    <span
                                                        className={
                                                            styles.qstnChatIcon
                                                        }
                                                    >
                                                        <BsFillChatRightFill />
                                                    </span>
                                                    {numOfAnswers} Answers
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div>
                                {sidebarData?.answers?.map((singlAnswer) => {
                                    const { _id, answer, author, createdAt } =
                                        singlAnswer;
                                    const myDate = new Date(createdAt);

                                    return (
                                        <div
                                            key={_id}
                                            className={styles.answerWrapper}
                                        >
                                            <div
                                                className={
                                                    styles.answerImgWrapper
                                                }
                                            >
                                                <Image
                                                    src={
                                                        author?.avatar ||
                                                        avatarImg
                                                    }
                                                    alt=''
                                                    objectFit='cover'
                                                    layout='fill'
                                                />
                                            </div>
                                            <div>
                                                <div
                                                    className={styles.answerTxt}
                                                >
                                                    <span
                                                        className={
                                                            styles.answerUsername
                                                        }
                                                    >
                                                        {author?.username ||
                                                            'Anonymous'}
                                                    </span>{' '}
                                                    added an answer{' '}
                                                    <span
                                                        className={
                                                            styles.answer
                                                        }
                                                    >
                                                        {answer}
                                                    </span>
                                                </div>
                                                <span
                                                    className={
                                                        styles.answerDate
                                                    }
                                                >
                                                    {monthNames[
                                                        myDate.getMonth()
                                                    ] +
                                                        ' ' +
                                                        myDate.getDate() +
                                                        ', ' +
                                                        myDate.getFullYear() +
                                                        ' at ' +
                                                        (myDate.getHours() > 12
                                                            ? myDate.getHours() -
                                                              12
                                                            : myDate.getHours()) +
                                                        ':' +
                                                        myDate.getMinutes() +
                                                        ' ' +
                                                        (myDate.getHours() > 11
                                                            ? 'pm'
                                                            : 'am')}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}
            {/* <div>
                <h3>Recent Activities</h3>
            </div> */}
            {!rightSidebarLoading && (
                <>
                    <div className={styles.topUsersWrapper}>
                        <h3 className={styles.topUsersTitle}>
                            <HiUsers /> Top Members
                        </h3>
                        <div>
                            {sidebarData?.topMembers?.map((user) => {
                                const {
                                    _id,
                                    username,
                                    numOfAnswers,
                                    numOfQuestions,
                                    avatar,
                                    badge,
                                } = user;

                                return (
                                    <div key={_id} className={styles.topUser}>
                                        <div
                                            className={styles.topUserImgWrapper}
                                        >
                                            <div className={styles.topUserImg}>
                                                <Link href={'/'}>
                                                    <a href=''>
                                                        <Image
                                                            src={
                                                                avatar ||
                                                                avatarImg
                                                            }
                                                            alt=''
                                                            objectFit='cover'
                                                            layout='fill'
                                                        />
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                        <div>
                                            <Link href={'/'}>
                                                <a
                                                    href={'/'}
                                                    className={
                                                        styles.topUserName
                                                    }
                                                >
                                                    {username}
                                                </a>
                                            </Link>
                                            <p className={styles.topUserMeta}>
                                                <span>
                                                    {numOfQuestions} questions
                                                </span>
                                                <span>
                                                    {numOfAnswers} answers
                                                </span>
                                            </p>
                                            <div>
                                                <span
                                                    className={
                                                        styles.topUserBadge
                                                    }
                                                >
                                                    {badge}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={styles.tagsWrapper}>
                        <h3 className={styles.tagsTitle}>
                            <BsTagsFill /> Trending Tags
                        </h3>
                        <div className={styles.tagsList}>
                            {sidebarData?.trendingTags?.map((tag, index) => {
                                return (
                                    <Link key={index} href={'/'}>
                                        <a
                                            href=''
                                            className={styles.tagsListItem}
                                        >
                                            {tag.tag}
                                        </a>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
