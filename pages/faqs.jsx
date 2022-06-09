import Head from 'next/head';
import React from 'react';
import { BsInfo } from 'react-icons/bs';

import { Accordion, Breadcrumbs, SidebarLayout } from '../components';
import { faqQuestions } from '../utils/constants';

const styles = {
    container: `h-[100%] w-[100%]`,
    header: `block p-[15px] lg:p-[30px] lg:flex items-center justify-between border-b-2 border-borderColor`,
    mainContent: `px-[15px] py-[30px] lg:p-[30px]`,
    title: `flex items-center font-semibold text-primaryColor gap-[0.7em]`,
    icon: `text-2xl bg-primaryColor w-[20px] h-[20px] flex items-center justify-center rounded-full text-white`,
    paragraph: `text-grayColor pt-[1em] pb-[1.5em] text-[15px] lg:text-[17px]`,
};

export default function Faqs() {
    return (
        <div className={styles.container}>
            <Head>
                <title>FAQs - QNA</title>
            </Head>
            <div className={styles.header}>
                <Breadcrumbs crumbs={[{ name: 'FAQs' }]} />
            </div>
            <div className={styles.mainContent}>
                <h2 className={styles.title}>
                    <div className={styles.icon}>
                        <BsInfo />
                    </div>
                    FAQs
                </h2>
                <p className={styles.paragraph}>
                    Find out everything you need to get started by taking the
                    tour. If you still have questions, come back and check out
                    the pinned articles, if you still need help contact us:{' '}
                    <span className='text-secondaryColor cursor-pointer transition-all hover:text-[#000]'>
                        info@qna.com
                    </span>
                </p>
                <div>
                    {faqQuestions.map((question) => {
                        return (
                            <Accordion key={question._id} question={question} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

Faqs.getLayout = function getLayout(page) {
    return <SidebarLayout right={false}>{page}</SidebarLayout>;
};
