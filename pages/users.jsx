import React from 'react';
import { BsSearch } from 'react-icons/bs';

import { Breadcrumbs, SidebarLayout } from '../components';
import { UserCard } from '../components';

const users = [
    {
        _id: 1,
        avatar: 'https://gansons.com/wp-content/uploads/2019/01/person6.jpg',
        username: 'john',
        followers: 100,
        following: true,
    },
    {
        _id: 2,
        avatar: 'https://www.theportlandclinic.com/wp-content/uploads/2019/07/Person-Curtis_4x5-e1564616444404.jpg',
        username: 'martin',
        followers: 100,
        following: false,
    },
    {
        _id: 3,
        avatar: 'https://dergreif-online.de/www/wp-content/uploads/2016/07/Timothy_hoch.jpg',
        username: 'kane',
        followers: 100,
        following: true,
    },
    {
        _id: 4,
        avatar: '',
        username: 'warner',
        followers: 120,
        following: false,
    },
];

const styles = {
    container: `h-[100%] w-[100%]`,
    header: `block p-[15px] lg:p-[30px] lg:flex items-center justify-between border-b-2 border-[#e1e3e3]`,
    headerRight: `block lg:flex items-center gap-[1em] mt-[10px]`,
    selectOption: `w-[100%] border border-[#e1e3e3] bg-transparent rounded-sm text-grayColor h-[45px] outline-none lg:w-[110px] px-[10px]`,
    searchInputWrapper: `border border-[#e1e3e3] h-[45px] rounded-sm flex items-center mt-[10px] lg:mt-0 lg:w-[220px]`,
    searchInput: `h-[100%] w-[100%] px-[10px] outline-none`,
    searchIcons: `px-[10px] text-grayColor`,
    contentWrapper: `grid gap-[1.5em] px-[15px] py-[30px] lg:p-[30px] lg:grid-cols-2 2xl:grid-cols-3`,
};

export default function Users() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Breadcrumbs crumbs={[{ name: 'users' }]} />
                <div className={styles.headerRight}>
                    <select name='' id='' className={styles.selectOption}>
                        <option value=''>Popular</option>
                        <option value=''>Followers</option>
                        <option value=''>Name</option>
                    </select>
                    <form className={styles.searchInputWrapper}>
                        <input
                            type='text'
                            placeholder='Search Users...'
                            className={styles.searchInput}
                        />
                        <button type='submit' className={styles.searchIcons}>
                            <BsSearch />
                        </button>
                    </form>
                </div>
            </div>
            <div className={styles.contentWrapper}>
                {users.map((user) => {
                    return <UserCard key={user._id} user={user} />;
                })}
            </div>
        </div>
    );
}

Users.getLayout = function getLayout(page) {
    return <SidebarLayout>{page}</SidebarLayout>;
};
