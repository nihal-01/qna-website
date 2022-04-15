import React from 'react';

import {
    Breadcrumbs,
    SidebarLayout,
    SingleAnswer,
    SingleQuestion,
} from '../../components';

const question = {
    _id: 1,
    question: `Is this statement, “i see him last night” can be understood as “I saw him last night”?`,
    description:
        'In my local language (Bahasa Indonesia) there are no verb-2 or past tense form as time tracker. So, I often forget to use the past form of verb when speaking english. I saw him last night (correct) I see him last night. In my local language (Bahasa Indonesia) there are no verb-2 or past tense form as time tracker. So, I often forget to use the past form of verb when speaking english. I saw him last night (correct) I see him last night',
    isAnonymous: false,
    user: {
        _id: 1,
        fullName: `John Deo`,
        avatar: ``,
        badge: 'beginner',
        isVerified: true,
    },
    likes: 118,
    createdAt: '2022-04-02T03:44:23.700Z',
    category: 'language',
    tags: ['english', 'nihal'],
    answers: 3,
    views: 12000,
};

const answers = [
    {
        _id: 1,
        answer: 'Yes, I understand it. I hear a lot of this incorrect grammar from my wife. I would expect that the person that spoke this was possibly Chinese. In Chinese there are no tenses or plurals. No he or she pronouns. The context tells all. So it might have been a direct translation from Chinese.',
    },
    {
        _id: 2,
        answer: `No, ‘I see him last night’ is always incorrect and will be only just barely understandable. It is a very serious and basic error, and it will be tiring for a native speaker to converse with someone who speaks like this, because they will constantly have to be remembering what the person really means. It will not be ‘immediately obvious without thinking about it’.

        Someone just asked this question recently, and I replied, saying that ‘I see him last night’ is never correct. That is exactly what i meant.`,
    },
    {
        _id: 3,
        answer: `You are correct that both are understandable.

        The only other possible everyday meaning I could think of would be ‘I see him [in my mind’s eye] last night’; that is, I am, at this very moment, imagining him last night. But it should almost always be clear from context which one is intended.
        
        ‘Correct’ doesn’t mean ‘understandable’, though. If I say ‘Me want have fooding’ it’s pretty clear what to understand from that, but it’s not anywhere near correct Standard English grammar. If you lived somewhere where you spoke a dialect of English in which this was acceptable grammar, however, then it would be correct for that dialect.`,
    },
    {
        _id: 4,
        answer: 'Yes, I understand it. I hear a lot of this incorrect grammar from my wife. I would expect that the person that spoke this was possibly Chinese. In Chinese there are no tenses or plurals. No he or she pronouns. The context tells all. So it might have been a direct translation from Chinese.',
    },
    {
        _id: 5,
        answer: 'Yes, I understand it. I hear a lot of this incorrect grammar from my wife. I would expect that the person that spoke this was possibly Chinese. In Chinese there are no tenses or plurals. No he or she pronouns. The context tells all. So it might have been a direct translation from Chinese.',
    },
];

const IS_LOGGEDIN = true;

const styles = {
    header: `block p-[15px] lg:p-[30px] lg:flex items-center justify-between border-b-2 border-borderColor`,
    formWrapper: `px-[15px] py-[30px] lg:p-[30px] border-b border-borderColor`,
    mainBtn: `h-[45px] lg:h-[47px] bg-secondaryColor w-[100%] text-white font-bold rounded-sm lg:text-[17px] transition-all hover:bg-grayColor`,
    answersHeader: `pt-[15px] md:pt-[30px] px-[15px] lg:px-[30px] md:flex md:justify-between md:flex-wrap border-b border-borderColor bg-[#f9f9f9]`,
    answersHeaderTitle: `pb-[15px] md:pb-[30px] text-primaryColor font-bold text-[15px] md:text-[17px]`,
    answersTabsList: `flex items-center h-[100%] relative top-[1px]`,
    answersTabsListItem: `border bg-white flex items-center justify-center h-[47px] md:h-[100%] px-[14px] text-grayColor cursor-pointer transition-all hover:text-secondaryColor text-[15px] md:text-base`,
    activeTab: ` border-b-0 text text-[#222] cursor-default hover:text-[#222]`,
};

export default function SingleQuestionPage() {
    return (
        <div>
            <div className={styles.header}>
                <Breadcrumbs
                    crumbs={[
                        { name: 'Questions', url: '/questions' },
                        { name: 'Q 199' },
                    ]}
                />
            </div>
            <div>
                <SingleQuestion {...question} isFullVisible={true} />
                <div className={styles.formWrapper}>
                    {IS_LOGGEDIN ? (
                        <div>
                            <button className={styles.mainBtn}>
                                Leave An Answer
                            </button>
                        </div>
                    ) : (
                        <button className={styles.mainBtn}>Sign In</button>
                    )}
                </div>
                <div className={styles.answersHeader}>
                    <h3 className={styles.answersHeaderTitle}>350 Answers</h3>
                    <div>
                        <ul className={styles.answersTabsList}>
                            <li className={styles.answersTabsListItem}>
                                Voted
                            </li>
                            <li
                                className={
                                    styles.answersTabsListItem +
                                    ` ${styles.activeTab}`
                                }
                            >
                                Oldest
                            </li>
                            <li className={styles.answersTabsListItem}>
                                Recent
                            </li>
                            <li className={styles.answersTabsListItem}>
                                Random
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    {answers.map((answer, index) => {
                        return <SingleAnswer key={index} {...answer} />;
                    })}
                </div>
            </div>
        </div>
    );
}

SingleQuestionPage.getLayout = function getLayout(page) {
    return <SidebarLayout>{page}</SidebarLayout>;
};
