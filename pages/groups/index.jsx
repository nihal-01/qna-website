import React from 'react';

import { Breadcrumbs, GroupCard, SidebarLayout } from '../../components';
import { Group } from '../../models';

const styles = {
    container: `h-[100%] w-[100%]`,
    header: `block p-[15px] lg:p-[30px] lg:flex items-center justify-between border-b-2 border-borderColor`,
    groupsWrapper: `grid grid-cols-2 items-center gap-[30px] px-[15px] py-[30px] lg:p-[30px]`,
};

export default function Groups({ data }) {
    const groups = JSON.parse(data);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Breadcrumbs crumbs={[{ name: 'groups' }]} />
            </div>
            <div className={styles.groupsWrapper}>
                {groups.map((group, index) => {
                    return <GroupCard key={index} {...group} />;
                })}
            </div>
        </div>
    );
}

Groups.getLayout = function getLayout(page) {
    return <SidebarLayout>{page}</SidebarLayout>;
};

export async function getServerSideProps(context) {
    const response = await Group.find({})
        .populate('numOfPosts')
        .sort({ createdAt: -1 })
        .lean();

    return {
        props: { data: JSON.stringify(response) },
    };
}
