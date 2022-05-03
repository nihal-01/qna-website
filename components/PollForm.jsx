import React from 'react';
import { MdClose, MdOutlineChatBubble } from 'react-icons/md';

const styles = {
    inputWrapper: `border border-borderColor flex items-center rounded-sm h-[45px] mt-[5px]`,
    input: `w-[100%] h-[100%] outline-none `,
    icon: `text-grayColor text-xl mx-[10px]`,
    pollInputClose: `bg-[red] text-white rounded-sm text-[14px] hover:bg-primaryColor cursor-pointer p-[1px]`,
    addMoreBtn: `px-[10px] text-white bg-primaryColor transition-all hover:bg-secondaryColor font-bold py-[8px] rounded-sm mt-[1.2em] text-[15px]`,
};

export default function PollForm({ optionsList, setOptionsList }) {
    const handleOptionAdd = () => {
        if (optionsList.length < 5) {
            setOptionsList((prev) => {
                return [...prev, { option: '' }];
            });
        }
    };

    const handleOptionRemove = (index) => {
        if (optionsList.length > 1) {
            const list = [...optionsList];
            list.splice(index, 1);
            setOptionsList(list);
        }
    };

    const handleOptionChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...optionsList];
        list[index][name] = value;
        setOptionsList(list);
    };

    return (
        <div>
            {optionsList.map((singleOption, index) => {
                return (
                    <div className='mb-0 mt-[1.2em]' key={index}>
                        <div className={styles.inputWrapper}>
                            <i className={styles.icon}>
                                <MdOutlineChatBubble />
                            </i>
                            <input
                                type='text'
                                className={styles.input}
                                name='option'
                                value={singleOption.option || ''}
                                onChange={(e) => {
                                    handleOptionChange(e, index);
                                }}
                            />
                            <i
                                className={
                                    styles.icon + ` ${styles.pollInputClose}`
                                }
                                onClick={() => {
                                    handleOptionRemove(index);
                                }}
                            >
                                <MdClose />
                            </i>
                        </div>
                        {optionsList.length - 1 === index && (
                            <button
                                type='button'
                                className={styles.addMoreBtn}
                                onClick={handleOptionAdd}
                            >
                                Add More Answers
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
