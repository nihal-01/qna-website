import { useDispatch } from 'react-redux';

import {
    HomeHero,
    PagesTopNavbar,
    QuestionsList,
    SidebarLayout,
} from '../components';
import { updateQuestions } from '../redux/slices/questionSlice';
import { useEnhancedEffect } from '../utils';
import { qstnPageLinks } from '../utils/constants';
import { getAllQuestions } from '../helpers/questionsHelpers';

export default function Home({ questions }) {
    const dispatch = useDispatch();

    useEnhancedEffect(() => {
        dispatch(updateQuestions(JSON.parse(questions)));
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
    const res = await getAllQuestions({ sort: 'createdAt:desc' });

    return {
        props: {
            questions: JSON.stringify(res),
        },
    };
}
