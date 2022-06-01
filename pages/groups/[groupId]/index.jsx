import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import { BsFlagFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';

import {
    Breadcrumbs,
    SidebarLayout,
    SingleGroupHero,
    SinglePost,
} from '../../../components';
import { avatarImg } from '../../../public/images';
import axios from '../../../axios';
import { getGroupPosts, getSingleGroup } from '../../../helpers/groupHelpers';

const styles = {
    container: `h-[100%] w-[100%]`,
    header: `block p-[15px] lg:p-[30px] lg:flex items-center justify-between border-b-2 border-borderColor`,
    notFoundWrapper: `px-[15px] py-[30px] lg:p-[30px]`,
    notFound: `flex items-center gap-[1em] bg-[#fffcdd] text-[#ebc035] font-bold text-[17px] p-[15px] rounded-sm`,
    section: `px-[15px] py-[30px] lg:p-[30px] border-b`,
    form: `border p-[20px] rounded-sm mb-[1em]`,
    formHeader: `flex items-center gap-[1em] mb-[1.5em]`,
    imageWrapper: `relative w-[60px] h-[60px] rounded-full overflow-hidden`,
    formUsername: `text-[17px] font-bold text-primaryColor transition-all hover:text-secondaryColor`,
    label: `text-grayColor text-[14px] lg:text-[15px]`,
    textarea: `w-[100%] h-[200px] border border-borderColor resize-none mt-[5px] rounded-sm outline-none px-[20px] py-[15px]`,
    btnWrapper: `w-[100%] max-w-[300px]  ml-auto`,
    submitBtn: `w-[100%] h-[40px] lg:h-[45px] bg-secondaryColor text-white font-semibold hover:bg-grayColor transition-all cursor-pointer rounded-sm mt-[20px]`,
};

export default function SingleGroupPage({ groupRes, postsRes }) {
    const [description, setDescription] = useState('');

    const group = JSON.parse(groupRes);
    const posts = JSON.parse(postsRes);

    const { user } = useSelector((state) => state.user);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const response = await axios.post(
                '/groups/posts',
                {
                    description: description,
                    groupId: group._id,
                },
                { headers: { Authorization: `Bearer ${user?.token}` } }
            );
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Breadcrumbs
                    crumbs={[
                        { name: 'groups', url: '/groups' },
                        { name: group?.title },
                    ]}
                />
            </div>
            <div className={styles.section}>
                <form action='' className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formHeader}>
                        <Link href={'/profile/nihal'}>
                            <a href={'/profile/nihal'}>
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={avatarImg}
                                        alt=''
                                        objectFit='cover'
                                        layout='fill'
                                    />
                                </div>
                            </a>
                        </Link>
                        <h4 className={styles.formUsername}>
                            <Link href={'/profile/nihal'}>{'nihaln'}</Link>
                        </h4>
                    </div>

                    <label htmlFor='post-desc' className={styles.label}>
                        Description / Content{' '}
                        <span className='text-[#f00]'>*</span>
                    </label>
                    <textarea
                        name=''
                        id='post-desc'
                        cols='30'
                        rows='10'
                        className={styles.textarea}
                        value={description || ''}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    ></textarea>

                    <div className={styles.btnWrapper}>
                        <input
                            type='submit'
                            value='Publish Your Post'
                            className={styles.submitBtn}
                        />
                    </div>
                </form>
            </div>

            <div>
                {posts?.length > 0 ? (
                    <div>
                        {posts?.map((post, index) => {
                            return (
                                <SinglePost
                                    key={index}
                                    post={post}
                                    groupId={group._id}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className={styles.notFoundWrapper}>
                        <div className={styles.notFound}>
                            <i>
                                <BsFlagFill />
                            </i>
                            There are no posts yet
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

SingleGroupPage.getLayout = function getLayout(page) {
    return (
        <>
            <SingleGroupHero group={JSON.parse(page.props.groupRes)} />
            <SidebarLayout>{page}</SidebarLayout>
        </>
    );
};

export async function getServerSideProps(context) {
    const group = await getSingleGroup(context?.query.groupId);
    const posts = await getGroupPosts(context?.query.groupId);

    return {
        props: {
            groupRes: JSON.stringify(group),
            postsRes: JSON.stringify(posts),
        },
    };
}
