import React from 'react';
import { SingleQuestion } from '.';

export default function QuestionsList({ questions }) {
    return (
        <div>
            {questions.map((question) => {
                return <SingleQuestion key={question._id} {...question} />;
            })}
        </div>
    );
}
