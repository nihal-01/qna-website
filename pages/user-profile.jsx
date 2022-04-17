import React from 'react';
import { BsPencil } from 'react-icons/bs';

import { Breadcrumbs, PagesTopNavbar, SidebarLayout } from '../components';

const styles = {
    container: `h-[100%] w-[100%]`,
    header: `block p-[15px] lg:p-[30px] lg:flex items-center justify-between border-b-2 border-borderColor`,
    headerRight: `block lg:flex items-center gap-[1em] mt-[10px]`,
    editProfileBtn: `flex items-center gap-[7px] border border-borderColor text-grayColor cursor-pointer py-[8px] px-[12px] text-[15px] rounded-sm font-bold transition-all hover:bg-secondaryColor hover:text-white`,
};

export default function UserProfile() {
    return (
        <div>
            <div className={styles.header}>
                <Breadcrumbs crumbs={[{ name: 'nihal' }]} />
                <div className={styles.headerRight}>
                    <button className={styles.editProfileBtn}>
                        <span>
                            <BsPencil />
                        </span>
                        Edit Profile
                    </button>
                </div>
            </div>
            <PagesTopNavbar />
        </div>
    );
}

UserProfile.getLayout = function getLayout(page) {
    return <SidebarLayout>{page}</SidebarLayout>;
};
