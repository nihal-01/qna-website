import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PagesTopNavbar, SidebarLayout, SingleAnswer } from '../../components';
import { getAllAnswers } from '../../helpers/answerHelpers';
import { updateAnswers } from '../../redux/slices/questionSlice';
import { useEnhancedEffect } from '../../utils';
import { qstnPageLinks } from '../../utils/constants';

const styles = {
    singleAnswer: `border-b-2`,
    answerQstnWrapper: `p-[30px] border-b`,
    answerQuestion: `text-primaryColor font-semibold text-lg transition-all lg:text-[22px] lg:leading-normal hover:text-secondaryColor`,
};

export default function QuestionAnswers({ data }) {
    const dispatch = useDispatch();

    const { answers } = useSelector((state) => state.question);

    useEnhancedEffect(() => {
        dispatch(updateAnswers(JSON.parse(data)));
    }, [dispatch, data]);

    return (
        <main>
            <PagesTopNavbar links={qstnPageLinks} />
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
                                        <h2 className={styles.answerQuestion}>
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
        </main>
    );
}

QuestionAnswers.getLayout = function (page) {
    return <SidebarLayout>{page}</SidebarLayout>;
};

export async function getServerSideProps() {
    const res = await getAllAnswers();

    return {
        props: {
            data: JSON.stringify(res),
        },
    };
}
