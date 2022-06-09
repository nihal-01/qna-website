import Head from 'next/head';
import React from 'react';
import { FaTelegramPlane, FaUser } from 'react-icons/fa';
import { IoIosCall, IoMdChatbubbles } from 'react-icons/io';
import { IoMail } from 'react-icons/io5';

import { Breadcrumbs, SidebarLayout } from '../components';

const styles = {
    container: `h-[100%] w-[100%]`,
    header: `block p-[15px] lg:p-[30px] lg:flex items-center justify-between border-b-2 border-borderColor`,
    contentWrapper: `py-[30px] px-[15px] lg:p-[30px]`,
    title: `text-[#26333b] flex items-center font-bold text-lg gap-[12px] mb-[0.6em]`,
    desc: `text-[#707885] text-[16px] sm:text-[17px] leading-relaxed mb-[1.5em]`,
    singleLineWrapper: `sm:flex items-center gap-[1.5em]`,
    formControl: `mb-[1.2em] sm:mb-[1.5em] w-[100%] h-[100%]`,
    label: `text-grayColor text-[14px] lg:text-base`,
    inputWrapper: `border border-borderColor flex items-center rounded-sm h-[45px] mt-[5px]`,
    input: `w-[100%] h-[100%] outline-none `,
    icon: `text-grayColor text-xl mx-[10px]`,
    textarea: `w-[100%] h-[200px] lg:h-[270px] border border-borderColor resize-none mt-[5px] rounded-sm outline-none px-[20px] py-[15px]`,
    submitBtn: `w-[100%] h-[45px] text-white font-semibold bg-secondaryColor transition-all hover:bg-grayColor rounded-sm`,
};

export default function Contact() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Contact Us - QNA</title>
            </Head>
            <div className={styles.header}>
                <Breadcrumbs crumbs={[{ name: 'Contact Us' }]} />
            </div>

            <div className={styles.contentWrapper}>
                <h3 className={styles.title}>
                    <span>
                        <FaTelegramPlane />
                    </span>
                    Contact Us
                </h3>
                <p className={styles.desc}>
                    We understand the importance of approaching each work
                    integrally and believe in the power of simple and easy
                    communication. Feel free to contact us for any questions or
                    if you need any help or services ! Please provide a detailed
                    explanation of your problem.
                </p>

                <form action=''>
                    <div className={styles.singleLineWrapper}>
                        <div className={styles.formControl}>
                            <label htmlFor='title' className={styles.label}>
                                Name
                            </label>
                            <div className={styles.inputWrapper}>
                                <i className={styles.icon}>
                                    <FaUser />
                                </i>
                                <input type='text' className={styles.input} />
                            </div>
                        </div>
                        <div className={styles.formControl}>
                            <label htmlFor='title' className={styles.label}>
                                Email
                            </label>
                            <div className={styles.inputWrapper}>
                                <i className={styles.icon}>
                                    <IoMail />
                                </i>
                                <input type='text' className={styles.input} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.singleLineWrapper}>
                        <div className={styles.formControl}>
                            <label htmlFor='title' className={styles.label}>
                                Phone
                            </label>
                            <div className={styles.inputWrapper}>
                                <i className={styles.icon}>
                                    <IoIosCall />
                                </i>
                                <input type='text' className={styles.input} />
                            </div>
                        </div>
                        <div className={styles.formControl}>
                            <label htmlFor='title' className={styles.label}>
                                Subject
                            </label>
                            <div className={styles.inputWrapper}>
                                <i className={styles.icon}>
                                    <IoMdChatbubbles />
                                </i>
                                <input type='text' className={styles.input} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.formControl}>
                        <label htmlFor='message' className={styles.label}>
                            Your Message
                        </label>
                        <textarea
                            name=''
                            id='message'
                            cols='30'
                            rows='10'
                            className={styles.textarea}
                        ></textarea>
                    </div>

                    <button className={styles.submitBtn}>Submit</button>
                </form>
            </div>
        </div>
    );
}

Contact.getLayout = function getLayout(page) {
    return <SidebarLayout right={false}>{page}</SidebarLayout>;
};
