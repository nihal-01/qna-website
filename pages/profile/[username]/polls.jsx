import Head from 'next/head';
import React from 'react';
import { BsFlagFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

import {
    ProfileHero,
    ProfileLayout,
    QuestionsList,
    SidebarLayout,
} from '../../../components';
import { getUserPolls } from '../../../helpers/questionsHelpers';
import { getUserWithInfo } from '../../../helpers/userHelpers';
import { updateQuestions } from '../../../redux/slices/questionSlice';
import { useEnhancedEffect } from '../../../utils';

const styles = {
    notFoundWrapper: `px-[15px] py-[30px] lg:p-[30px] transition-all`,
    notFound: `flex items-center gap-[1em] bg-[#fffcdd] text-[#ebc035] font-bold text-[17px] p-[15px] rounded-sm`,
};

export default function SingleUserPolls({ userData, pollsData }) {
    const dispatch = useDispatch();
    const user = JSON.parse(userData);
    const { questions } = useSelector((state) => state.question);

    useEnhancedEffect(() => {
        dispatch(updateQuestions(JSON.parse(pollsData)));
    }, [dispatch, pollsData]);

    return (
        <div>
            <Head>
                <title>{user.username} - Polls - QNA</title>
            </Head>
            {questions.length < 1 ? (
                <div className={styles.notFoundWrapper}>
                    <div className={styles.notFound}>
                        <i>
                            <BsFlagFill />
                        </i>
                        There are no polls yet
                    </div>
                </div>
            ) : (
                <QuestionsList />
            )}
        </div>
    );
}

SingleUserPolls.getLayout = function getLayout(page) {
    return (
        <>
            <ProfileHero user={JSON.parse(page.props.userData)} />
            <SidebarLayout>
                <ProfileLayout
                    user={JSON.parse(page.props.userData)}
                    crumbName={'questions'}
                />
                {page}
            </SidebarLayout>
        </>
    );
};

export async function getServerSideProps({ params }) {
    const user = await getUserWithInfo(params.username);
    const polls = await getUserPolls(user._id);

    if (!user || !polls) {
        return {
            redirect: {
                permanent: false,
                destination: '/404',
            },
        };
    }

    return {
        props: {
            userData: JSON.stringify(user),
            pollsData: JSON.stringify(polls),
        },
    };
}
