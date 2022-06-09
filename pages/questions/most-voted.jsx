import React from 'react';
import { useDispatch } from 'react-redux';

import { PagesTopNavbar, QuestionsList, SidebarLayout } from '../../components';
import { updateQuestions } from '../../redux/slices/questionSlice';
import { useEnhancedEffect } from '../../utils';
import { qstnPageLinks } from '../../utils/constants';
import { getAllQuestions } from '../../helpers/questionsHelpers';
import Head from 'next/head';

export default function MostVoted({ questions }) {
    const dispatch = useDispatch();

    useEnhancedEffect(() => {
        dispatch(updateQuestions(JSON.parse(questions)));
    }, [dispatch, questions]);

    return (
        <main>
            <Head>
                <title>Most Voted - QNA</title>
            </Head>
            <PagesTopNavbar links={qstnPageLinks} />
            <QuestionsList />
        </main>
    );
}

MostVoted.getLayout = function (page) {
    return <SidebarLayout>{page}</SidebarLayout>;
};

export async function getServerSideProps() {
    const res = await getAllQuestions({ sort: 'votes:desc' });

    return {
        props: {
            questions: JSON.stringify(res),
        },
    };
}
