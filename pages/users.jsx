import React, { useCallback, useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios';

import { Breadcrumbs, SidebarLayout } from '../components';
import { UserCard } from '../components';
import { updateUsers } from '../redux/slices/userSlice';

const styles = {
    container: `h-[100%] w-[100%]`,
    header: `block p-[15px] lg:p-[30px] lg:flex items-center justify-between border-b-2 border-borderColor`,
    headerRight: `block lg:flex items-center gap-[1em] mt-[10px]`,
    selectOption: `w-[100%] border border-borderColor bg-transparent rounded-sm text-grayColor h-[45px] outline-none lg:w-[110px] px-[10px]`,
    searchInputWrapper: `border border-borderColor h-[45px] rounded-sm flex items-center mt-[10px] lg:mt-0 lg:w-[220px]`,
    searchInput: `h-[100%] w-[100%] px-[10px] outline-none`,
    searchIcons: `px-[10px] text-grayColor`,
    contentWrapper: `grid gap-[1.5em] px-[15px] py-[30px] lg:p-[30px] lg:grid-cols-2 2xl:grid-cols-3`,
};

export default function Users(props) {
    const { user, users } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const fetchData = useCallback(async () => {
        try {
            if (user) {
                const response = await axios.get(`/users`, {
                    headers: { Authorization: `Bearer ${user?.token}` },
                });
                dispatch(updateUsers(response.data));
            } else {
                const response = await axios.get(`/users/all-users`);
                dispatch(updateUsers(response.data));
            }
        } catch (err) {
            console.log(err.response.data);
        }
    }, [user, dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);
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
                    return <UserCard key={user._id} {...user} />;
                })}
            </div>
        </div>
    );
}

Users.getLayout = function getLayout(page) {
    return <SidebarLayout>{page}</SidebarLayout>;
};
