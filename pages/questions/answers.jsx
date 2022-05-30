import React from 'react';

import { PagesTopNavbar, SidebarLayout, SingleAnswer } from '../../components';
import { Answer } from '../../models';
import { qstnPageLinks } from '../../utils/constants';

export default function QuestionAnswers({ data }) {
    const answers = JSON.parse(data);

    return (
        <main>
            <PagesTopNavbar links={qstnPageLinks} />
            <div>
                {answers.map((answer, index) => {
                    return <SingleAnswer key={index} {...answer} />;
                })}
            </div>
        </main>
    );
}

QuestionAnswers.getLayout = function (page) {
    return <SidebarLayout>{page}</SidebarLayout>;
};

export async function getServerSideProps() {
    const res = await Answer.find({})
        .populate('author', 'username avatar isVerified badge')
        .sort({ createdAt: -1 });

    return {
        props: {
            data: JSON.stringify(res),
        },
    };
}
