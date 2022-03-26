import React, { useState } from 'react';
import { BiPlus, BiMinus } from 'react-icons/bi';

const styles = {
    container: `bg-[#f9f9f9] mb-[20px] border border-borderColor p-[15px] lg:p-[22px] `,
    questionTxt: `flex items-center gap-[1em] text-primaryColor font-semibold cursor-pointer text-[15px] lg:text-[16px] select-none `,
    icon: `min-w-[20px] w-[20px] min-h-[20px] h-[20px] rounded-sm bg-primaryColor text-white flex items-center justify-center `,
    accordion_inner: `max-h-0 overflow-hidden transition-[max-height] duration-500 `,
    answerTxt: `text-grayColor pt-[15px] mt-[15px] border-t border-borderColor text-[15px] leading-relaxed lg:text-[16px] lg:mt-[22px] lg:pt-[18px] `,
};

export default function Accordion({ question }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.container}>
            <h4
                className={styles.questionTxt}
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                <i className={styles.icon}>
                    <BiMinus />
                </i>
                {question.question}
            </h4>
            <div
                className={
                    styles.accordion_inner +
                    (isOpen ? 'max-h-[999px]' : 'max-h-0')
                }
            >
                <p className={styles.answerTxt}>{question.answer}</p>
            </div>
        </div>
    );
}
