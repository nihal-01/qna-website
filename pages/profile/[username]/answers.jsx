import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { BsFlagFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

import {
    ProfileHero,
    ProfileLayout,
    SidebarLayout,
    SingleAnswer,
} from '../../../components';
import { getUserAnswers } from '../../../helpers/answerHelpers';
import { getUserWithInfo } from '../../../helpers/userHelpers';
import { updateAnswers } from '../../../redux/slices/questionSlice';
import { useEnhancedEffect } from '../../../utils';

const styles = {
    singleAnswer: `border-b-2`,
    answerQstnWrapper: `p-[30px] border-b`,
    answerQuestion: `text-primaryColor font-semibold text-lg transition-all lg:text-[22px] lg:leading-normal hover:text-secondaryColor`,
    notFoundWrapper: `px-[15px] py-[30px] lg:p-[30px] transition-all`,
    notFound: `flex items-center gap-[1em] bg-[#fffcdd] text-[#ebc035] font-bold text-[17px] p-[15px] rounded-sm`,
};

export default function SingleUserAnswers({ answersData, userData }) {
    const dispatch = useDispatch();
    const user = JSON.parse(userData);

    const { answers } = useSelector((state) => state.question);

    useEnhancedEffect(() => {
        dispatch(updateAnswers(JSON.parse(answersData)));
    }, [dispatch, answersData]);

    return (
        <div>
            <Head>
                <title>{user.username} - Answers - QNA</title>
            </Head>
            {answers.length < 1 ? (
                <div className={styles.notFoundWrapper}>
                    <div className={styles.notFound}>
                        <i>
                            <BsFlagFill />
                        </i>
                        There are no answers yet
                    </div>
                </div>
            ) : (
                <div>
                    {answers.map((answer, index) => {
                        return (
                            <div key={index} className={styles.singleAnswer}>
                                <div className={styles.answerQstnWrapper}>
                                    <Link
                                        href={`/questions/${answer?.questionId?._id}`}
                                    >
                                        <a
                                            href={`/questions/${answer?.questionId?._id}`}
                                        >
                                            <h2
                                                className={
                                                    styles.answerQuestion
                                                }
                                            >
                                                {answer?.questionId?.title}
                                            </h2>
                                        </a>
                                    </Link>
                                </div>
                                <SingleAnswer
                                    key={index}
                                    {...answer}
                                    showReplies={false}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

SingleUserAnswers.getLayout = function getLayout(page) {
    return (
        <>
            <ProfileHero user={JSON.parse(page.props.userData)} />
            <SidebarLayout>
                <ProfileLayout
                    user={JSON.parse(page.props.userData)}
                    crumbName={'answers'}
                />
                {page}
            </SidebarLayout>
        </>
    );
};

export async function getServerSideProps({ params }) {
    const user = await getUserWithInfo(params.username);

    if (!user) {
        return {
            redirect: {
                permanent: false,
                destination: '/404',
            },
        };
    }

    const answers = await getUserAnswers(user?._id);

    return {
        props: {
            userData: JSON.stringify(user),
            answersData: JSON.stringify(answers),
        },
    };
}
