import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import { BiHeart, BiTimeFive } from 'react-icons/bi';
import {
    BsCheck,
    BsFillChatRightFill,
    BsFlagFill,
    BsPencil,
    BsPersonFill,
} from 'react-icons/bs';
import { HiOutlineTrash } from 'react-icons/hi';
import moment from 'moment';

import { avatarImg } from '../public/images';
import { useRouter } from 'next/router';
import { SingleComment } from '.';
import axios from '../axios';
import { useSelector } from 'react-redux';

const styles = {
    container: `px-[15px] py-[30px] lg:p-[30px] border-b transition-all`,
    postHeader: `flex items-center justify-between mb-[1.5em]`,
    postHeaderLeft: `flex items-center `,
    imgWrapper: `w-[55px] min-w-[55px] h-[55px] min-h-[55px] mr-[15px] rounded-full border-2 border-secondaryColor transition-all hover:border-primaryColor cursor-pointer p-[4px]`,
    img: `relative w-[100%] h-[100%] rounded-full overflow-hidden`,
    username: `font-bold text-[17px] text-primaryColor transition-all hover:text-secondaryColor`,
    verified: `inline-block bg-secondaryColor rounded-full text-white ml-[10px] text-base w-[15px] h-[15px] lg:w-[18px] lg:h-[18px] lg:text-[16px]`,
    badge: `inline-block ml-[1em] text-white bg-[#d9a34a] capitalize rounded-sm text-xs py-[2px] px-[10px] lg:text-sm`,
    postHeaderRight: `flex items-center gap-[1em]`,
    time: `flex items-center gap-[5px] text-primaryColor text-[15px]`,
    deleteBtn: `flex items-center gap-[5px] text-primaryColor text-[15px] transition-all hover:text-secondaryColor`,
    desc: `text-[#707885] leading-7 mb-[2em]`,
    footer: `bg-[#f5f5f5] flex items-center justify-between p-[20px]`,
    footerLeft: `flex items-center gap-[10px]`,
    footerLeftItem: `flex items-center gap-[10px] border bg-white text-grayColor h-[35px] px-[10px] text-[15px] rounded-sm`,
    footerRight: `flex items-center gap-[10px]`,
    commentBtn: `bg-primaryColor text-white font-bold text-[15px] h-[35px] px-[10px] rounded-sm transition-all hover:bg-secondaryColor`,
    editBtn: `bg-secondaryColor text-white h-[35px] w-[35px] rounded-sm flex items-center justify-center transition-all hover:bg-grayColor`,
    commentForm: `transition-all`,
    formText: `flex items-center gap-[12px] text-primaryColor mb-[1em] pt-[2em]`,
    label: `text-grayColor text-[14px] lg:text-base`,
    textarea: `w-[100%] h-[200px] border border-borderColor resize-none mt-[5px] rounded-sm outline-none px-[20px] py-[15px]`,
    btnWrapper: `w-[100%] max-w-[200px] ml-auto`,
    submitBtn: `w-[100%] h-[40px] lg:h-[45px] bg-secondaryColor text-white font-semibold hover:bg-grayColor transition-all cursor-pointer rounded-sm mt-[20px]`,
    notFoundWrapper: `py-[30px] lg:py-[30px] mt-[1.5em] transition-all`,
    notFound: `flex items-center gap-[1em] bg-[#fffcdd] text-[#ebc035] font-bold text-[17px] p-[15px] rounded-sm`,
};

export default function SinglePost({
    post,
    groupId,
    single = false,
    comments = [],
}) {
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [text, setText] = useState('');

    const router = useRouter();
    const { user } = useSelector((state) => state.user);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(
                '/groups/post-comments',
                { text, postId: post._id },
                {
                    headers: { Authorization: `Bearer ${user?.token}` },
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.postHeader}>
                <div className={styles.postHeaderLeft}>
                    <div className={styles.imgWrapper}>
                        <div className={styles.img}>
                            <Image
                                src={post?.authorId?.avatar || avatarImg}
                                alt=''
                                objectFit='cover'
                                layout='fill'
                            />
                        </div>
                    </div>
                    <h2 className={styles.username}>
                        <Link href={'/profile'}>
                            {post?.authorId?.username}
                        </Link>
                    </h2>

                    {post?.authorId?.isVerified && (
                        <span className={styles.verified}>
                            <span className='flex h-[100%] w-[100%] items-center justify-center'>
                                <BsCheck />
                            </span>
                        </span>
                    )}

                    <span className={styles.badge}>
                        {post?.authorId?.badge}
                    </span>
                </div>
                <div className={styles.postHeaderRight}>
                    <p className={styles.time}>
                        <BiTimeFive />{' '}
                        {moment
                            .utc(post?.createdAt)
                            .local()
                            .startOf('seconds')
                            .fromNow()}
                    </p>
                    <button className={styles.deleteBtn}>
                        <HiOutlineTrash /> Delete
                    </button>
                </div>
            </div>
            <div>
                <p className={styles.desc}>{post.description}</p>
                <div className={styles.footer}>
                    <ul className={styles.footerLeft}>
                        <li className={styles.footerLeftItem}>
                            <BiHeart /> {post?.likes || 0} likes
                        </li>
                        <li className={styles.footerLeftItem}>
                            <BsFillChatRightFill /> {post?.numOfComments || 0}{' '}
                            Comments
                        </li>
                    </ul>
                    <div className={styles.footerRight}>
                        <button
                            className={styles.commentBtn}
                            onClick={() => {
                                if (single) {
                                    setIsCommentOpen(!isCommentOpen);
                                } else {
                                    router.push(
                                        `/groups/${groupId}/post/${post._id}`
                                    );
                                }
                            }}
                        >
                            Comment
                        </button>

                        <Link href={'/hi'}>
                            <a href='' className={styles.editBtn}>
                                <BsPencil />
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
            <form
                className={
                    styles.commentForm +
                    (isCommentOpen
                        ? ' max-h-[390px] visible opacity-100'
                        : ' max-h-0 invisible opacity-0')
                }
                onSubmit={handleSubmit}
            >
                <p className={styles.formText}>
                    Logged in as
                    <span className='flex items-center gap-[5px] font-bold transition-all hover:text-secondaryColor'>
                        <i>
                            <BsPersonFill />
                        </i>
                        <Link href={`/profile/nihal`}>nihaln</Link>
                    </span>
                </p>

                <label htmlFor={`comment-${post._id}`} className={styles.label}>
                    Comment <span className='text-[#f00]'>*</span>
                </label>
                <textarea
                    name=''
                    id={`comment-${post._id}`}
                    cols='30'
                    rows='10'
                    className={styles.textarea}
                    value={text || ''}
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                ></textarea>

                <div className={styles.btnWrapper}>
                    <input
                        type='submit'
                        value='Add Comment'
                        className={styles.submitBtn}
                    />
                </div>
            </form>

            {single && !comments.length > 0 ? (
                <div className={styles.notFoundWrapper}>
                    <div className={styles.notFound}>
                        <i>
                            <BsFlagFill />
                        </i>
                        There are no comments yet
                    </div>
                </div>
            ) : (
                comments.map((comment, index) => {
                    return <SingleComment key={index} comment={comment} />;
                })
            )}
        </div>
    );
}
