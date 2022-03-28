import React from 'react';

import { AddGroupForm, Breadcrumbs, SidebarLayout } from '../components';

const styles = {
    container: `h-[100%] w-[100%]`,
    header: `block p-[15px] lg:p-[30px] lg:flex items-center justify-between border-b-2 border-borderColor`,
    mainContent: `px-[15px] py-[30px] lg:p-[30px] `,
};

export default function AddGroup() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Breadcrumbs crumbs={[{ name: 'Add Group' }]} />
            </div>
            <div className={styles.mainContent}>
                <AddGroupForm />
            </div>
        </div>
    );
}

AddGroup.getLayout = function getLayout(page) {
    return <SidebarLayout>{page}</SidebarLayout>;
};
