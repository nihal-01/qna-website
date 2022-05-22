import React from 'react';
import { ProfileHero, ProfileLayout, SidebarLayout } from '../../../components';
import { User } from '../../../models';

export default function SingleUserQuestions() {
    return <div>Questions</div>;
}

SingleUserQuestions.getLayout = function getLayout(page) {
    return (
        <>
            <ProfileHero user={JSON.parse(page.props.data)} />
            <SidebarLayout>
                <ProfileLayout user={JSON.parse(page.props.data)} crumbName={'questions'} />
                {page}
            </SidebarLayout>
        </>
    );
};

export async function getServerSideProps({ params }) {
    const user = await User.findOne({ username: params?.username })
        .populate('numOfQuestions')
        .populate('numOfAnswers')
        .populate('following', 'username avatar')
        .populate('followers', 'username avatar')
        .select(
            'username following followers avatar badge isVerified numOfQuestions numOfAnswers'
        )
        .lean();
    return {
        props: { data: JSON.stringify(user) },
    };
}
