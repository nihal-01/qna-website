import { useDispatch } from 'react-redux';

import axios from '../axios';
import {
    HomeHero,
    PagesTopNavbar,
    QuestionsList,
    SidebarLayout,
} from '../components';
import { updateQuestions } from '../redux/slices/questionSlice';
import { useEnhancedEffect } from '../utils';
import { qstnPageLinks } from '../utils/constants';

export default function Home({ questions }) {
    const dispatch = useDispatch();

    useEnhancedEffect(() => {
        dispatch(updateQuestions(questions));
    }, [dispatch, questions]);

    return (
        <div>
            <PagesTopNavbar links={qstnPageLinks} />
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
