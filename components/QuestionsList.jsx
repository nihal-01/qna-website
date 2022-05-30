import React from 'react';
import { useSelector } from 'react-redux';

import { SingleQuestion } from '.';

export default function QuestionsList() {
    const { questions } = useSelector((state) => state.question);

    return (
        <div>
            {questions?.map((question) => {
                return <SingleQuestion key={question._id} {...question} />;
            })}
        </div>
    );
}
