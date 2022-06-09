import Head from 'next/head';
import React from 'react';
import { AiFillTag } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';

import { Breadcrumbs, SidebarLayout, TagCard } from '../components';
import { getAllTags } from '../helpers/questionsHelpers';

const styles = {
    container: `h-[100%] w-[100%]`,
    header: `block p-[15px] lg:p-[30px] lg:flex items-center justify-between border-b-2 border-borderColor`,
    headerRight: `block lg:flex items-center gap-[1em] mt-[10px]`,
    selectOption: `w-[100%] border border-borderColor bg-transparent rounded-sm text-grayColor h-[45px] outline-none lg:w-[110px] px-[10px]`,
    searchInputWrapper: `border border-borderColor h-[45px] rounded-sm flex items-center mt-[10px] lg:mt-0 lg:w-[220px]`,
    searchInput: `h-[100%] w-[100%] px-[10px] outline-none`,
    searchIcons: `px-[10px] text-grayColor`,
    contentWrapper: `px-[15px] py-[30px] grid gap-[1.5em] lg:p-[30px] lg:grid-cols-2`,
};

export default function Tags({ data }) {
    const tags = JSON.parse(data);

    return (
        <div className={styles.container}>
            <Head>
                <title>Tags - QNA</title>
            </Head>
            <div className={styles.header}>
                <Breadcrumbs crumbs={[{ name: 'tags' }]} />
            </div>
            <div className={styles.contentWrapper}>
                {tags.map((tag, index) => {
                    return <TagCard key={index} tag={tag} />;
                })}
            </div>
        </div>
    );
}

Tags.getLayout = function getLayout(page) {
    return <SidebarLayout>{page}</SidebarLayout>;
};

export async function getServerSideProps(context) {
    const tags = await getAllTags();

    return {
        props: {
            data: JSON.stringify(tags),
        },
    };
}
