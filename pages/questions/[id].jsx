import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { BsFlagFill, BsPersonFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import * as cookie from 'cookie';

import axios from '../../axios';
import {
    Breadcrumbs,
    BtnLoader,
    SidebarLayout,
    SingleAnswer,
    SingleQuestion,
} from '../../components';
import { getNumberOfAnswers } from '../../helpers/answerHelpers';
import {
    checkIsFavourited,
    getSingleQuestion,
    updateViews,
} from '../../helpers/questionsHelpers';
import { updateSigninBox } from '../../redux/slices/layoutSlice';
import {
    addAnswerToAnswers,
    updateAnswers,
    updateSingleQuestion,
} from '../../redux/slices/questionSlice';
import { logout } from '../../redux/slices/userSlice';
import { useEnhancedEffect } from '../../utils';

const styles = {
    header: `block p-[15px] lg:p-[30px] lg:flex items-center justify-between border-b-2 border-borderColor`,
    formWrapper: `px-[15px] py-[30px] lg:p-[30px] border-b border-borderColor`,
    mainBtn: `h-[45px] lg:h-[47px] bg-secondaryColor w-[100%] text-white font-bold rounded-sm lg:text-[17px] transition-all hover:bg-grayColor disabled:cursor-not-allowed`,
    answersHeader: `pt-[15px] md:pt-[30px] px-[15px] lg:px-[30px] md:flex md:justify-between md:flex-wrap border-b border-borderColor bg-[#f9f9f9]`,
    answersHeaderTitle: `pb-[15px] md:pb-[30px] text-primaryColor font-bold text-[15px] md:text-[17px]`,
    answersTabsList: `flex items-center flex-wrap h-[100%] relative top-[1px]`,
    answersTabsListItem: `border bg-white flex items-center justify-center h-[47px] md:h-[100%] px-[14px] text-grayColor cursor-pointer transition-all hover:text-secondaryColor text-[15px] md:text-base`,
    activeTab: ` border-b-0 text text-[#222] cursor-default hover:text-[#222]`,
    formTitle: `font-bold text-[17px]`,
    formMeta: `flex items-center gap-[12px] text-grayColor text-base mt-[1em]`,
    formLink: `flex items-center gap-[7px] text-primaryColor transition-all hover:text-secondaryColor`,
    formTextarea: `w-[100%] border border-borderColor outline-none rounded-sm mt-[2em] resize-none p-[10px] mb-[1.2em]`,
    notFoundWrapper: `px-[15px] py-[30px] lg:p-[30px] transition-all`,
    notFound: `flex items-center gap-[1em] bg-[#fffcdd] text-[#ebc035] font-bold text-[17px] p-[15px] rounded-sm`,
};

export default function SingleQuestionPage({ question, numOfAnswers }) {
    const [answerTxt, setAnswerTxt] = useState('');
    const [sort, setSort] = useState('');
    const [answer, setAnswer] = useState({
        loading: false,
        error: '',
        isAdded: false,
    });
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();
    const dispatch = useDispatch();
    const { id } = router.query;
    const { user } = useSelector((state) => state.user);
    const { singleQuestion, answers } = useSelector((state) => state.question);

    const addAnswer = async (e) => {
        try {
            e.preventDefault();

            if (!answerTxt) {
                return setAnswer((prev) => {
                    return { ...prev, error: 'The Answer field is empty..!' };
                });
            }

            setAnswer((prev) => {
                return { ...prev, loading: true, error: '' };
            });

            await axios.post(
                `http://localhost:3000/api/answers/`,
                { answer: answerTxt, questionId: singleQuestion?._id },
                {
                    headers: { Authorization: `Bearer ${user?.token}` },
                }
            );

            setAnswerTxt('');
            setAnswer((prev) => {
                return { ...prev, loading: false, isAdded: true };
            });
        } catch (err) {
            setAnswer((prev) => {
                return {
                    ...prev,
                    loading: false,
                    error:
                        err.response?.data?.error ||
                        'Something went wrong, Try again',
                };
            });
        }
    };

    const fetchAnswers = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                `http://localhost:3000/api/answers/${id}?sortBy=${sort}`
            );
            dispatch(updateAnswers(response.data));
            setIsLoading(false);
        } catch (err) {
            console.log(err.response?.data);
            setIsLoading(false);
        }
    }, [sort, id, dispatch]);

    useEnhancedEffect(() => {
        dispatch(updateSingleQuestion(JSON.parse(question)));
    }, [question, dispatch]);

    useEffect(() => {
        fetchAnswers();
    }, [fetchAnswers, sort]);

    console.log('timeout');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAnswer((prev) => {
                return { ...prev, isAdded: false };
            });
        }, [3000]);

        return () => clearTimeout(timeout);
    }, [answer.isAdded]);

    return (
        <div>
            <div className={styles.header}>
                <Breadcrumbs
                    crumbs={[
                        { name: 'Questions', url: '/questions/most-answered' },
                        { name: singleQuestion?._id?.slice(0, 5) },
                    ]}
                />
            </div>
            <div>
                <SingleQuestion
                    {...singleQuestion}
                    numOfAnswers={JSON.parse(numOfAnswers)}
                    isFullVisible={true}
                />
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
                                value={answerTxt || ''}
                            ></textarea>
                            {answer.error && (
                                <p className='text-[red] text-[15px] lg:text-base mb-[1em]'>
                                    {answer.error}
                                </p>
                            )}
                            <button
                                className={styles.mainBtn}
                                onClick={addAnswer}
                                disabled={answer.loading}
                            >
                                {answer.loading ? (
                                    <BtnLoader />
                                ) : answer.isAdded ? (
                                    'Answer Added Successfully'
                                ) : (
                                    'Leave An Answer'
                                )}
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
                        {JSON.parse(numOfAnswers)} Answers
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
                    {isLoading ? (
                        <div className='my-[30px] '>
                            <BtnLoader color='secondaryColor' />
                        </div>
                    ) : answers.length > 0 ? (
                        answers.map((answer, index) => {
                            return <SingleAnswer key={index} {...answer} />;
                        })
                    ) : (
                        <div className={styles.notFoundWrapper}>
                            <div className={styles.notFound}>
                                <i>
                                    <BsFlagFill />
                                </i>
                                There are no comments yet.
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

SingleQuestionPage.getLayout = function getLayout(page) {
    return <SidebarLayout>{page}</SidebarLayout>;
};

export const getServerSideProps = async ({ params, req }) => {
    updateViews(params.id);
    const question = await getSingleQuestion(params.id);
    const numOfAnswers = await getNumberOfAnswers(params.id);

    const parsedCookies = req.headers.cookie
        ? cookie.parse(req.headers.cookie)
        : '';
    if (!parsedCookies['user-info'] || parsedCookies['user-info'] === '') {
        question.isFavourited = false;
    } else {
        const userInfo = await JSON.parse(parsedCookies['user-info']);
        const isFavourited = await checkIsFavourited(userInfo._id, params.id);
        question.isFavourited = isFavourited;
    }

    return {
        props: {
            question: JSON.stringify(question),
            numOfAnswers: JSON.stringify(numOfAnswers),
        },
    };
};
