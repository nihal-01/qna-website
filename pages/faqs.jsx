import React from 'react';
import { BsInfo } from 'react-icons/bs';

import { Accordion, Breadcrumbs, SidebarLayout } from '../components';
import { questions } from '../utils/constants';

const styles = {
    container: `h-[100%] w-[100%]`,
    header: `block p-[15px] lg:p-[30px] lg:flex items-center justify-between border-b-2 border-[#e1e3e3]`,
    mainContent: `px-[15px] py-[30px] lg:p-[30px]`
};

export default function Faqs() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Breadcrumbs crumbs={[{ name: 'FAQs' }]} />
            </div>
            <div>
                {/* <h2>
                    <span>
                        <BsInfo />
                    </span>
                    FAQs
                </h2>
                <p>
                    Find out everything you need to get started by taking the
                    tour. If you still have questions, come back and check out
                    the pinned articles, if you still need help contact us:
                    info@qna.com
                </p> */}
                <div className={styles.mainContent}>
                    {questions.map((question) => {
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
