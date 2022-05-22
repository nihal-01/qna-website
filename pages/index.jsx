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
    updateQuestions,
} from '../redux/slices/questionSlice';

export default function Home({ questions }) {
    const dispatch = useDispatch();
    dispatch(updateQuestions(questions));

    return (
        <div>
            <PagesTopNavbar />
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

export async function getServerSideProps() {
    const res = await axios.get(`questions?sort=${'createdAt:desc'}`);

    return {
        props: {
            questions: res.data,
        },
    };
}
