import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { BsPersonFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

import axios from '../../axios';
import {
    Breadcrumbs,
    SidebarLayout,
    SingleAnswer,
    SingleQuestion,
} from '../../components';
import { updateSigninBox } from '../../redux/slices/layoutSlice';
import { updateSingleQuestion } from '../../redux/slices/questionSlice';
import { logout } from '../../redux/slices/userSlice';
import { useEnhancedEffect } from '../../utils';

const styles = {
    header: `block p-[15px] lg:p-[30px] lg:flex items-center justify-between border-b-2 border-borderColor`,
    formWrapper: `px-[15px] py-[30px] lg:p-[30px] border-b border-borderColor`,
    mainBtn: `h-[45px] lg:h-[47px] bg-secondaryColor w-[100%] text-white font-bold rounded-sm lg:text-[17px] transition-all hover:bg-grayColor`,
    answersHeader: `pt-[15px] md:pt-[30px] px-[15px] lg:px-[30px] md:flex md:justify-between md:flex-wrap border-b border-borderColor bg-[#f9f9f9]`,
    answersHeaderTitle: `pb-[15px] md:pb-[30px] text-primaryColor font-bold text-[15px] md:text-[17px]`,
    answersTabsList: `flex items-center flex-wrap h-[100%] relative top-[1px]`,
    answersTabsListItem: `border bg-white flex items-center justify-center h-[47px] md:h-[100%] px-[14px] text-grayColor cursor-pointer transition-all hover:text-secondaryColor text-[15px] md:text-base`,
    activeTab: ` border-b-0 text text-[#222] cursor-default hover:text-[#222]`,
    formTitle: `font-bold text-[17px]`,
    formMeta: `flex items-center gap-[12px] text-grayColor text-base mt-[1em]`,
    formLink: `flex items-center gap-[7px] text-primaryColor transition-all hover:text-secondaryColor`,
    formTextarea: `w-[100%] border border-borderColor outline-none rounded-sm mt-[2em] resize-none p-[10px] mb-[1.2em]`,
};

export default function SingleQuestionPage({ question }) {
    const [answerTxt, setAnswerTxt] = useState('');
    const [answers, setAnswers] = useState([]);
    const [sort, setSort] = useState('');

    const router = useRouter();
    const dispatch = useDispatch();
    const { id } = router.query;
    const { user } = useSelector((state) => state.user);
    const { singleQuestion } = useSelector((state) => state.question);

    const addAnswer = async (e) => {
        try {
            e.preventDefault();

            const response = await axios.post(
                `http://localhost:3000/api/answers/`,
                { answer: answerTxt, questionId: singleQuestion?._id },
                {
                    headers: { Authorization: `Bearer ${user?.token}` },
                }
            );
            console.log(response.data);
        } catch (err) {
            console.log(err.response?.data);
        }
    };

    const fetchAnswers = useCallback(async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/answers/${id}?sortBy=${sort}`
            );
            setAnswers(response.data);
        } catch (err) {
            console.log(err.response?.data);
        }
    }, [sort, id]);

    useEnhancedEffect(() => {
        dispatch(updateSingleQuestion(question));
    }, [question, dispatch]);

    useEffect(() => {
        fetchAnswers();
    }, [fetchAnswers, sort]);

    return (
        <div>
            <div className={styles.header}>
                <Breadcrumbs
                    crumbs={[
                        { name: 'Questions', url: '/questions' },
                        { name: singleQuestion?._id?.slice(0, 5) },
                    ]}
                />
            </div>
            <div>
                <SingleQuestion {...singleQuestion} isFullVisible={true} />
                <div className={styles.formWrapper} id='answer'>
                    {user ? (
                        <form>
                            <h3 className={styles.formTitle}>
                                Leave an answer
                            </h3>
                            <p className={styles.formMeta}>
                                Logged in as{' '}
                                <Link href={'/nihal'}>
                                    <a
                                        href={'/questions'}
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
                            <textarea
                                name=''
                                id=''
                                cols='30'
                                rows='10'
                                className={styles.formTextarea}
                                onChange={(e) => {
                                    setAnswerTxt(e.target.value);
                                }}
                            ></textarea>
                            <button
                                className={styles.mainBtn}
                                onClick={addAnswer}
                            >
                                Leave An Answer
                            </button>
                        </form>
                    ) : (
                        <button
                            className={styles.mainBtn}
                            onClick={() => {
                                dispatch(updateSigninBox(true));
                            }}
                        >
                            Sign In
                        </button>
                    )}
                </div>
                <div className={styles.answersHeader} id='answers'>
                    <h3 className={styles.answersHeaderTitle}>
                        {answers?.length} Answers
                    </h3>
                    <div>
                        <ul className={styles.answersTabsList}>
                            <li
                                className={
                                    styles.answersTabsListItem +
                                    ` ${sort === 'voted' && styles.activeTab}`
                                }
                                onClick={() => {
                                    setSort('voted');
                                }}
                            >
                                Voted
                            </li>
                            <li
                                className={
                                    styles.answersTabsListItem +
                                    ` ${sort === '' && styles.activeTab}`
                                }
                                onClick={() => {
                                    setSort('');
                                }}
                            >
                                Oldest
                            </li>
                            <li
                                className={
                                    styles.answersTabsListItem +
                                    ` ${sort === 'recent' && styles.activeTab}`
                                }
                                onClick={() => {
                                    setSort('recent');
                                }}
                            >
                                Recent
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    {answers.map((answer, index) => {
                        return <SingleAnswer key={index} {...answer} />;
                    })}
                </div>
            </div>
        </div>
    );
}

SingleQuestionPage.getLayout = function getLayout(page) {
    return <SidebarLayout>{page}</SidebarLayout>;
};

export const getServerSideProps = async ({ params }) => {
    const questionRes = await axios.get(
        `http://localhost:3000/api/questions/single/${params.id}`
    );

    return {
        props: {
            question: questionRes.data,
        },
    };
};
