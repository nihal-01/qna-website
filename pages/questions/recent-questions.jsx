import React from 'react';
import { useDispatch } from 'react-redux';

import { PagesTopNavbar, QuestionsList, SidebarLayout } from '../../components';
import { updateQuestions } from '../../redux/slices/questionSlice';
import { useEnhancedEffect } from '../../utils';
import { qstnPageLinks } from '../../utils/constants';
import { getAllQuestions } from '../../helpers/questionsHelpers';
import Head from 'next/head';

export default function RecentQuestions({ questions }) {
    const dispatch = useDispatch();

    useEnhancedEffect(() => {
        dispatch(updateQuestions(JSON.parse(questions)));
    }, [dispatch, questions]);

    return (
        <main>
            <Head>
                <title>Recent questions - QNA</title>
            </Head>
            <PagesTopNavbar links={qstnPageLinks} />
            <QuestionsList questions={questions} />
        </main>
    );
}

RecentQuestions.getLayout = function (page) {
    return <SidebarLayout>{page}</SidebarLayout>;
};

export async function getServerSideProps() {
    const res = await getAllQuestions({ sort: 'createdAt:desc' });

    return {
        props: {
            questions: JSON.stringify(res),
        },
    };
}
