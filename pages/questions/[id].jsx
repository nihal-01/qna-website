import React from 'react';

import { Breadcrumbs, SidebarLayout, SingleQuestion } from '../../components';

const question = {
    _id: 1,
    question: `Is this statement, “i see him last night” can be understood as “I saw him last night”?`,
    description:
        'In my local language (Bahasa Indonesia) there are no verb-2 or past tense form as time tracker. So, I often forget to use the past form of verb when speaking english. I saw him last night (correct) I see him last night. In my local language (Bahasa Indonesia) there are no verb-2 or past tense form as time tracker. So, I often forget to use the past form of verb when speaking english. I saw him last night (correct) I see him last night',
    isAnonymous: false,
    user: {
        _id: 1,
        fullName: `John Deo`,
        avatar: ``,
        badge: 'beginner',
    },
    likes: 118,
    createdAt: '2022-04-02T03:44:23.700Z',
    category: 'language',
    tags: ['english', 'nihal'],
    answers: 3,
    views: 12000,
};

const styles = {
    header: `block p-[15px] lg:p-[30px] lg:flex items-center justify-between border-b-2 border-borderColor`,
};

export default function SingleQuestionPage() {
    return (
        <div>
            <div className={styles.header}>
                <Breadcrumbs
                    crumbs={[
                        { name: 'Questions', url: '/questions' },
                        { name: 'Q 199' },
                    ]}
                />
            </div>
            <div>
                <SingleQuestion {...question} isFullVisible={true} />
            </div>
        </div>
    );
}

SingleQuestionPage.getLayout = function getLayout(page) {
    return <SidebarLayout>{page}</SidebarLayout>;
};
