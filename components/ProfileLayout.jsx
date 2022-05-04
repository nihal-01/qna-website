import React from 'react';
import { BsPencil } from 'react-icons/bs';
import { Breadcrumbs, PagesTopNavbar } from '.';

const styles = {
    header: `p-[15px] lg:p-[30px] flex flex-wrap items-center justify-between border-b-2 border-borderColor`,
    headerRight: `block lg:flex items-center gap-[1em] mt-[10px]`,
    editProfileBtn: `flex items-center gap-[7px] border border-borderColor text-grayColor cursor-pointer py-[8px] px-[12px] text-[15px] rounded-sm font-bold transition-all hover:bg-secondaryColor hover:text-white`,
};

export default function ProfileLayout() {
    return (
        <>
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
            <PagesTopNavbar query={false} />
        </>
    );
}
