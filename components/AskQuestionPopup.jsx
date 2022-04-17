import React, { useState } from 'react';
import { IoMdChatbubbles } from 'react-icons/io';
import { IoFolderOpenSharp } from 'react-icons/io5';
import { AiFillTag } from 'react-icons/ai';
import { MdClose, MdOutlineChatBubble } from 'react-icons/md';

const styles = {
    overlay: `fixed inset-0 bg-[#000b] z-20`,
    container: `absolute top-[3em] left-[50%] translate-x-[-50%] z-20 w-[100%] min-h-fit max-w-[850px] p-[15px] `,
    formWrapper: `relative w-[100%] h-[100%] bg-white p-[30px] rounded-sm`,
    formControl: `mb-[1.5em]`,
    label: `text-grayColor text-[14px] lg:text-base`,
    inputWrapper: `border border-borderColor flex items-center rounded-sm h-[45px] mt-[5px]`,
    input: `w-[100%] h-[100%] outline-none `,
    icon: `text-grayColor text-xl mx-[10px]`,
    select: `bg-transparent w-[100%] h-[100%] outline-none text-grayColor`,
    spanTxt: `inline-block text-[#707885] mt-[5px] text-[15px]`,
    closeBtn: `absolute right-0 top-[-37px] text-3xl text-white `,
    submitBtn: `w-[100%] h-[45px] text-white font-semibold bg-secondaryColor transition-all hover:bg-grayColor rounded-sm mt-[1em]`,
    tagsList: `flex items-center flex-wrap gap-[15px] mb-[1em] mt-[0.7em]`,
    tagsListItem: `flex items-center gap-[5px] bg-secondaryColor text-white text-[14px] px-[5px] py-[2px] tracking-wide rounded-sm break-all`,
    tagsListItemClose: `hover:text-[red] cursor-pointer`,
    textarea: `w-[100%] h-[200px] border border-borderColor resize-none mt-[5px] rounded-sm outline-none px-[20px] py-[15px]`,
    checkboxWrapper: `flex items-center gap-[1em] mb-[10px]`,
    pollWrapper: `mb-[1.5em]`,
    pollInputClose: `bg-[red] text-white rounded-sm text-[14px] hover:bg-primaryColor cursor-pointer p-[1px]`,
    addMoreBtn: `px-[10px] text-white bg-primaryColor transition-all hover:bg-secondaryColor font-bold py-[10px] rounded-sm mt-[1.5em]`,
};

export default function AskQuestionPopup() {
    const [tags, setTags] = useState([]);
    const [isPollQuestion, setIsPollQuestion] = useState(false);

    const addTag = (tag) => {
        if (tags.includes(tag.toLowerCase())) {
            return;
        }
        setTags((prev) => {
            return [...prev, tag.toLowerCase()];
        });
    };

    const removeTag = (myIndex) => {
        setTags((prev) => {
            return prev.filter((myTag, index) => index != myIndex);
        });
    };

    const handleTagAdd = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (e.target.value) {
                addTag(e.target.value);
                e.target.value = '';
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit qstn');
    };

    console.log('ask qstn');

    return (
        <div>
            <div className={styles.overlay}></div>
            <div className={styles.container}>
                <form
                    action=''
                    className={styles.formWrapper}
                    onSubmit={handleSubmit}
                >
                    <button className={styles.closeBtn}>
                        <MdClose />
                    </button>

                    <div className={styles.formControl}>
                        <label htmlFor='title' className={styles.label}>
                            Question Title{' '}
                            <span className='text-[#f00]'>*</span>
                        </label>
                        <div className={styles.inputWrapper}>
                            <i className={styles.icon}>
                                <IoMdChatbubbles />
                            </i>
                            <input type='text' className={styles.input} />
                        </div>
                    </div>

                    <div className={styles.formControl}>
                        <label htmlFor='title' className={styles.label}>
                            Category <span className='text-[#f00]'>*</span>
                        </label>
                        <div className={styles.inputWrapper}>
                            <i className={styles.icon}>
                                <IoFolderOpenSharp />
                            </i>
                            <select name='' id='' className={styles.select}>
                                <option value=''>Analytics</option>
                                <option value=''>Communication</option>
                                <option value=''>Company</option>
                            </select>
                        </div>
                        <span className={styles.spanTxt}>
                            Please choose the appropriate section so the
                            question can be searched easily.
                        </span>
                    </div>

                    <div className={styles.formControl}>
                        <label htmlFor='title' className={styles.label}>
                            Tags
                        </label>
                        {tags.length > 0 && (
                            <ul className={styles.tagsList}>
                                {tags.map((tag, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className={styles.tagsListItem}
                                        >
                                            {tag}
                                            <span
                                                className={
                                                    styles.tagsListItemClose
                                                }
                                                onClick={() => {
                                                    removeTag(index);
                                                }}
                                            >
                                                <MdClose />
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                        <div className={styles.inputWrapper}>
                            <i className={styles.icon}>
                                <AiFillTag />
                            </i>
                            <input
                                type='text'
                                className={styles.input}
                                onKeyDown={handleTagAdd}
                            />
                        </div>
                        <span className={styles.spanTxt}>
                            Please choose suitable Keywords Ex:{' '}
                            <span
                                className='text-secondaryColor cursor-pointer'
                                onClick={() => {
                                    addTag('language');
                                }}
                            >
                                Language
                            </span>
                            ,{' '}
                            <span
                                className='text-secondaryColor cursor-pointer'
                                onClick={() => {
                                    addTag('coding');
                                }}
                            >
                                Coding
                            </span>
                        </span>
                    </div>

                    <div className={styles.pollWrapper}>
                        <div className={styles.checkboxWrapper + ' mb-0'}>
                            <input
                                type='checkbox'
                                name=''
                                id='isPollQstn'
                                onChange={(e) => {
                                    setIsPollQuestion(!isPollQuestion);
                                }}
                            />
                            <label
                                htmlFor='isPollQstn'
                                className={styles.label}
                            >
                                Is this question is a poll? If you want to be
                                doing a poll click here.
                            </label>
                        </div>

                        {isPollQuestion && (
                            <>
                                <div
                                    className={
                                        styles.formControl + ' mb-0 mt-[1em]'
                                    }
                                >
                                    <div className={styles.inputWrapper}>
                                        <i className={styles.icon}>
                                            <MdOutlineChatBubble />
                                        </i>
                                        <input
                                            type='text'
                                            className={styles.input}
                                        />
                                        <i
                                            className={
                                                styles.icon +
                                                ` ${styles.pollInputClose}`
                                            }
                                        >
                                            <MdClose />
                                        </i>
                                    </div>
                                </div>

                                <div
                                    className={
                                        styles.formControl + ' mb-0 mt-[1.3em]'
                                    }
                                >
                                    <div className={styles.inputWrapper}>
                                        <i className={styles.icon}>
                                            <MdOutlineChatBubble />
                                        </i>
                                        <input
                                            type='text'
                                            className={styles.input}
                                        />
                                        <i
                                            className={
                                                styles.icon +
                                                ` ${styles.pollInputClose}`
                                            }
                                        >
                                            <MdClose />
                                        </i>
                                    </div>
                                </div>
                            </>
                        )}

                        <button className={styles.addMoreBtn}>
                            Add More Answers
                        </button>
                    </div>

                    <div className={styles.formControl}>
                        <label htmlFor='group-rules' className={styles.label}>
                            Details <span className='text-[#f00]'>*</span>
                        </label>
                        <textarea
                            name=''
                            id='group-rules'
                            cols='30'
                            rows='10'
                            className={styles.textarea}
                        ></textarea>
                    </div>

                    <div className={styles.checkboxWrapper}>
                        <input type='checkbox' name='' id='isAnonymous' />
                        <label htmlFor='isAnonymous' className={styles.label}>
                            Ask Anonymously
                        </label>
                    </div>
                    <div className={styles.checkboxWrapper}>
                        <input
                            type='checkbox'
                            name=''
                            id='emailSub'
                            defaultChecked
                        />
                        <label htmlFor='emailSub' className={styles.label}>
                            Get notified by email when someone answers this
                            question.
                        </label>
                    </div>
                    <div className={styles.checkboxWrapper}>
                        <input
                            type='checkbox'
                            name=''
                            id='policy'
                            defaultChecked
                        />
                        <label htmlFor='policy' className={styles.label}>
                            By asking your question, you agree to the{' '}
                            <span>Terms of Service</span> and{' '}
                            <span>Privacy Policy</span>.{' '}
                            <span className='text-[#f00]'>*</span>
                        </label>
                    </div>

                    <button type='submit' className={styles.submitBtn}>
                        Publish Your Question
                    </button>
                </form>
            </div>
        </div>
    );
}
