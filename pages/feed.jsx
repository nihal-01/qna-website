import React from 'react';
import * as cookie from 'cookie';

import { Breadcrumbs, QuestionsList, SidebarLayout } from '../components';
import { getMyFeed } from '../helpers/questionsHelpers';
import { useEnhancedEffect } from '../utils';
import { useDispatch } from 'react-redux';
import { updateQuestions } from '../redux/slices/questionSlice';
import { BsFlagFill } from 'react-icons/bs';
import Head from 'next/head';

const styles = {
    container: `h-[100%] w-[100%]`,
    header: `block p-[15px] lg:p-[30px] lg:flex items-center justify-between border-b-2 border-borderColor`,
    notFoundWrapper: `px-[15px] py-[30px] lg:p-[30px] transition-all`,
    notFound: `flex items-center gap-[1em] bg-[#fffcdd] text-[#ebc035] font-bold text-[17px] p-[15px] rounded-sm`,
};

export default function FeedPage({ questions }) {
    const dispatch = useDispatch();

    useEnhancedEffect(() => {
        dispatch(updateQuestions(JSON.parse(questions)));
    }, [dispatch, questions]);

    return (
        <div>
            <Head>
                <title>Feed - QNA</title>
            </Head>
            <div className={styles.header}>
                <Breadcrumbs crumbs={[{ name: 'My Feed' }]} />
            </div>
            {JSON.parse(questions).length < 1 ? (
                <div className={styles.notFoundWrapper}>
                    <div className={styles.notFound}>
                        <i>
                            <BsFlagFill />
                        </i>
                        There are no posts on your feed.
                    </div>
                </div>
            ) : (
                <QuestionsList />
            )}
        </div>
    );
}

FeedPage.getLayout = function getLayout(page) {
    return <SidebarLayout>{page}</SidebarLayout>;
};

export async function getServerSideProps(context) {
    let response = [];
    const parsedCookies = context.req.headers.cookie
        ? cookie.parse(context.req.headers.cookie)
        : '';
    if (parsedCookies['user-info'] || parsedCookies['user-info'] !== '') {
        const userInfo = await JSON.parse(parsedCookies['user-info']);
        response = await getMyFeed(userInfo._id);
    }

    return {
        props: {
            questions: JSON.stringify(response),
        },
    };
}
