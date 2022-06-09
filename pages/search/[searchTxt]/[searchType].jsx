import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as cookie from 'cookie';

import {
    Breadcrumbs,
    GroupCard,
    QuestionsList,
    SidebarLayout,
    UserCard,
} from '../../../components';
import { Question, User, Group } from '../../../models';
import { updateQuestions } from '../../../redux/slices/questionSlice';
import { updateUsers } from '../../../redux/slices/userSlice';
import { useEnhancedEffect } from '../../../utils';
import Head from 'next/head';

const styles = {
    container: `h-[100%] w-[100%]`,
    header: `block p-[15px] lg:p-[30px] lg:flex items-center justify-between border-b-2 border-borderColor`,
    formContainer: `px-[15px] py-[30px] lg:p-[30px] border-b-2`,
    inputWrapper: `grid grid-cols-2 gap-[2em]`,
    input: `border border-borderColor rounded-sm h-[40px] lg:h-[45px] outline-none p-[10px]`,
    select: `border border-borderColor bg-transparent rounded-sm p-[10px] outline-none h-[40px] lg:h-[45px]`,
    searchBtn: `w-[100%] h-[40px] lg:h-[45px] bg-secondaryColor text-white font-semibold hover:bg-grayColor transition-all cursor-pointer rounded-sm mt-[1.5em] disabled:cursor-not-allowed`,
};

export default function SearchPage({ query, data }) {
    const { searchTxt, searchType } = query;
    const [groups, setGroups] = useState([]);

    const [searchData, setSearchData] = useState({
        text: searchTxt,
        type: searchType.toLowerCase(),
    });

    const { users } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const router = useRouter();

    const handleChange = (e) => {
        setSearchData({ ...searchData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push(`/search/${searchData.text}/${searchData.type}`);
    };

    useEnhancedEffect(() => {
        if (
            searchType.toLowerCase() === 'questions' ||
            searchType.toLowerCase() === 'tags'
        ) {
            dispatch(updateQuestions(JSON.parse(data)));
        } else if (searchType.toLowerCase() === 'users') {
            dispatch(updateUsers(JSON.parse(data)));
        } else if (searchType.toLowerCase() === 'groups') {
            setGroups(JSON.parse(data));
        }
    }, [dispatch, searchTxt, searchData]);

    return (
        <div>
            <Head>
                <title>Search - QNA</title>
            </Head>
            <div className={styles.header}>
                <Breadcrumbs
                    crumbs={[{ name: `search results for "${searchTxt}"` }]}
                />
            </div>

            <form
                action=''
                className={styles.formContainer}
                onSubmit={handleSubmit}
            >
                <div className={styles.inputWrapper}>
                    <input
                        type='text'
                        value={searchData.text || ''}
                        onChange={handleChange}
                        name='text'
                        className={styles.input}
                        placeholder='Enter your search'
                    />
                    <select
                        name='type'
                        id='search-type'
                        onChange={handleChange}
                        className={styles.select}
                        value={searchData.type || ''}
                    >
                        <option value='questions'>Questions</option>
                        <option value='tags'>Tags</option>
                        <option value='groups'>Groups</option>
                        <option value='users'>Users</option>
                    </select>
                </div>
                <button className={styles.searchBtn}>Search</button>
            </form>

            <div>
                {searchType.toLowerCase() === 'questions' ||
                searchType.toLowerCase() === 'tags' ? (
                    <QuestionsList />
                ) : searchType.toLowerCase() === 'users' ? (
                    <div>
                        {users.map((user) => {
                            return <UserCard key={user._id} {...user} />;
                        })}
                    </div>
                ) : searchType.toLowerCase() === 'groups' ? (
                    <div>
                        {groups.map((group, index) => {
                            return <GroupCard key={index} {...group} />;
                        })}
                    </div>
                ) : (
                    <></>
                )}
            </div>

            <div></div>
        </div>
    );
}

SearchPage.getLayout = function getLayout(page) {
    return <SidebarLayout>{page}</SidebarLayout>;
};

export async function getServerSideProps({ query, req }) {
    const { searchTxt, searchType } = query;
    let data = [];

    if (searchType.toLowerCase() === 'questions') {
        data = await Question.find({
            title: { $regex: searchTxt, $options: 'i' },
        })
            .populate('category')
            .populate('author', 'username avatar isVerified badge')
            .populate('numOfAnswers')
            .lean();
    } else if (searchType.toLowerCase() === 'users') {
        const parsedCookies = cookie.parse(req.headers.cookie);
        if (!parsedCookies['user-info'] || parsedCookies['user-info'] === '') {
            data = await User.find({
                username: { $regex: searchTxt, $options: 'i' },
            })
                .populate('numOfQuestions')
                .populate('numOfAnswers')
                .lean();

            data.forEach((user) => {
                user.followers = user?.followers?.length || 0;
                user.following = user?.following?.length || 0;
            });
        } else {
            const userInfo = JSON.parse(parsedCookies['user-info']);
            const myUser = await User.findOne({ _id: userInfo._id });

            data = await User.find({
                username: { $regex: searchTxt, $options: 'i' },
                _id: { $ne: userInfo._id },
            })
                .populate('numOfQuestions')
                .populate('numOfAnswers')
                .select(
                    'username avatar followers following numOfQuestions numOfAnswers'
                )
                .lean();
            data.forEach((user) => {
                user.followers = user?.followers?.length || 0;
                user.following = user?.following?.length || 0;
                user.isFollowing = myUser?.following?.includes(user._id);
            });
        }
    } else if (searchType.toLowerCase() === 'tags') {
        data = await Question.find({
            tags: searchTxt,
        })
            .populate('category')
            .populate('author', 'username avatar isVerified badge')
            .populate('numOfAnswers')
            .lean();
    } else if (searchType.toLowerCase() === 'groups') {
        data = await Group.find({ title: { $regex: searchTxt, $options: 'i' } })
            .populate('numOfPosts')
            .sort({ createdAt: -1 })
            .lean();
    }

    return {
        props: { query, data: JSON.stringify(data) },
    };
}
