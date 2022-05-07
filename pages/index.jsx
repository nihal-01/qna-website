import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios';

import {
    HomeHero,
    PagesTopNavbar,
    QuestionsList,
    SidebarLayout,
} from '../components';
import {
    fetchQuestions,
    updateIsLoading,
    updateNoanswerFilter,
    updatePollFilter,
    updateSort,
} from '../redux/slices/questionSlice';

const links = [
    {
        name: 'Recent Questions',
        query: 'recent-questions',
    },
    {
        name: 'Most Answered',
        query: 'most-answered',
    },
    {
        name: 'Most Voted',
        query: 'most-voted',
    },
    {
        name: 'Most Visited',
        query: 'most-visited',
    },
    {
        name: 'Polls',
        query: 'polls',
    },
    {
        name: 'Answers',
        query: 'answers',
    },
    {
        name: 'No Answers',
        query: 'no-answers',
    },
];

export default function Home() {
    const { questions, sort, filters } = useSelector((state) => state.question);
    const dispatch = useDispatch();

    const router = useRouter();

    useEffect(() => {
        dispatch(updateIsLoading(true));
        dispatch(fetchQuestions());
    }, [dispatch, sort, filters]);

    useEffect(() => {
        if (
            Object.keys(router.query).length < 1 ||
            router.query.show === 'recent-questions'
        ) {
            dispatch(updateSort('createdAt:desc'));
        } else if (router.query.show === 'most-answered') {
            dispatch(updateSort('numOfAnswers:desc'));
        } else if (router.query.show === 'most-voted') {
            dispatch(updateSort('votes:desc'));
        } else if (router.query.show === 'polls') {
            dispatch(updatePollFilter(true));
        } else if (router.query.show === 'no-answers') {
            dispatch(updateNoanswerFilter(true));
        }
    }, [router.query, dispatch]);

    return (
        <div>
            <PagesTopNavbar links={links} />
            <QuestionsList />
        </div>
    );
}

Home.getLayout = function getLayout(page) {
    return (
        <>
            <HomeHero />
            <SidebarLayout>{page}</SidebarLayout>
        </>
    );
};
