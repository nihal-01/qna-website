import React from 'react';
import { AiFillTag } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';

import { Breadcrumbs, SidebarLayout, TagCard } from '../components';

const tags = [
    {
        _id: '1',
        name: 'Car',
        followers: 100,
    },
    {
        _id: '2',
        name: 'Jeep',
        followers: 1345,
    },
    {
        _id: '3',
        name: 'Bus',
        followers: 487,
    },
    {
        _id: '4',
        name: 'Truck',
        followers: 765,
    },
    {
        _id: '5',
        name: 'Bike',
        followers: 2087,
    },
    {
        _id: '6',
        name: 'Train',
        followers: 60,
    },
    {
        _id: '7',
        name: 'Plane',
        followers: 3404,
    },
    {
        _id: '8',
        name: 'Ship',
        followers: 2600,
    },
];

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

export default function Tags() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Breadcrumbs crumbs={[{ name: 'tags' }]} />
                <div className={styles.headerRight}>
                    <select name='' id='' className={styles.selectOption}>
                        <option value=''>Popular</option>
                        <option value=''>Followers</option>
                        <option value=''>Name</option>
                    </select>
                    <form className={styles.searchInputWrapper}>
                        <input
                            type='text'
                            placeholder='Search Tags...'
                            className={styles.searchInput}
                        />
                        <button type='submit' className={styles.searchIcons}>
                            <BsSearch />
                        </button>
                    </form>
                </div>
            </div>
            <div className={styles.contentWrapper}>
                {tags.map((tag) => {
                    return (
                        <TagCard
                            key={tag._id}
                            data={{ ...tag, icon: <AiFillTag /> }}
                        />
                    );
                })}
            </div>
        </div>
    );
}

Tags.getLayout = function getLayout(page) {
    return <SidebarLayout>{page}</SidebarLayout>;
};
