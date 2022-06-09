import React from 'react';
import { useDispatch } from 'react-redux';

import { PagesTopNavbar, QuestionsList, SidebarLayout } from '../../components';
import { updateQuestions } from '../../redux/slices/questionSlice';
import { useEnhancedEffect } from '../../utils';
import { qstnPageLinks } from '../../utils/constants';
import { getAllQuestions } from '../../helpers/questionsHelpers';
import Head from 'next/head';

export default function MostAnswered({ questions }) {
    const dispatch = useDispatch();

    useEnhancedEffect(() => {
        dispatch(updateQuestions(JSON.parse(questions)));
    }, [dispatch, questions]);

    return (
        <main>
            <Head>
                <title>Most Answered - QNA</title>
            </Head>
            <PagesTopNavbar links={qstnPageLinks} />
            <QuestionsList questions={questions} />
        </main>
    );
}

MostAnswered.getLayout = function (page) {
    return <SidebarLayout>{page}</SidebarLayout>;
};

export async function getServerSideProps() {
    const res = await getAllQuestions({ sort: 'numOfAnswers:desc' });

    return {
        props: {
            questions: JSON.stringify(res),
        },
    };
}
