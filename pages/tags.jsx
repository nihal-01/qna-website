import React from 'react';
import { Breadcrumbs, SidebarLayout } from '../components';

const styles = {
    container: `bg-white h-[100%] w-[100%]`,
    header: `p-[30px] flex items-center justify-between border-b-2 border-[#e1e3e3]`,
};

export default function Tags() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Breadcrumbs crumbs={[{ name: 'tags' }]} />
                <div>Hi</div>
            </div>
        </div>
    );
}

Tags.getLayout = function getLayout(page) {
    return <SidebarLayout>{page}</SidebarLayout>;
};
