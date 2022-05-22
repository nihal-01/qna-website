import React from 'react';
import { useSelector } from 'react-redux';

import { SingleQuestion, QuestionSkeleton } from '.';

export default function QuestionsList() {
    const { questions, isLoading } = useSelector((state) => state.question);

    return (
        <div>
            {isLoading
                ? Array.from({ length: 5 }).map((_, index) => {
                      return <QuestionSkeleton key={index} />;
                  })
                : questions?.map((question) => {
                      return (
                          <SingleQuestion key={question._id} {...question} />
                      );
                  })}
        </div>
    );
}
