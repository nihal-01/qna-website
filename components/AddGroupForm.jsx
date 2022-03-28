import React from 'react';
import { IoMdChatbubbles } from 'react-icons/io';
import { BsCameraFill, BsFillCameraFill } from 'react-icons/bs';

const styles = {
    formControl: `mb-[1.5em]`,
    label: `text-grayColor text-[14px] lg:text-base`,
    inputWrapper: `border border-borderColor flex items-center rounded-sm h-[45px] mt-[5px]`,
    input: `w-[100%] outline-none `,
    icon: `text-grayColor text-xl mx-[10px]`,
    radioContainer: `flex items-center gap-[1em] mt-[5px]`,
    radioInputWrapper: `flex items-center gap-[0.7em]`,
    checkbox: `mr-[0.7em]`,
    fileInputWrapper: `relative group w-[100%] h-[45px] border border-borderColor rounded-sm flex items-center mt-[5px] `,
    fileInput: `file:hidden cursor-pointer w-full h-[100%] py-[8px] pr-[8px] pl-[40px] z-10 text-grayColor`,
    cameraIcon: `text-grayColor absolute top-[10px] left-[10px] text-xl`,
    fileInputBrowseBtn: `absolute top-[7px] right-[10px] bg-primaryColor rounded-sm py-[2px] px-[10px] text-white transition-all group-hover:bg-secondaryColor text-[15px] font-semibold`,
    textarea: `w-[100%] h-[150px] border border-borderColor resize-none mt-[5px] rounded-sm outline-none px-[20px] py-[15px]`,
   submitBtn: `w-[100%] h-[45px] text-white font-semibold bg-secondaryColor transition-all hover:bg-grayColor rounded-sm`
};

export default function AddGroupForm() {
    return (
        <form action=''>
            <div className={styles.formControl}>
                <label htmlFor='title' className={styles.label}>
                    Group Title <span className='text-[#f00]'>*</span>
                </label>
                <div className={styles.inputWrapper}>
                    <i className={styles.icon}>
                        <IoMdChatbubbles />
                    </i>
                    <input type='text' className={styles.input} />
                </div>
            </div>

            <div className={styles.formControl}>
                <label className={styles.label}>
                    Group privacy <span className='text-[#f00]'>*</span>
                </label>
                <div className={styles.radioContainer}>
                    <div className={styles.radioInputWrapper}>
                        <input type='radio' name='group-privacy' id='public' />
                        <label htmlFor='public' className={styles.label}>
                            Public
                        </label>
                    </div>
                    <div className={styles.radioInputWrapper}>
                        <input type='radio' name='group-privacy' id='private' />
                        <label htmlFor='private' className={styles.label}>
                            Private
                        </label>
                    </div>
                </div>
            </div>

            <div className={styles.formControl}>
                <label className={styles.label}>
                    Group posts <span className='text-[#f00]'>*</span>
                </label>
                <div className={styles.radioContainer}>
                    <div className={styles.radioInputWrapper}>
                        <input type='radio' name='group-posts' id='group-all' />
                        <label htmlFor='group-all' className={styles.label}>
                            All group members
                        </label>
                    </div>
                    <div className={styles.radioInputWrapper}>
                        <input
                            type='radio'
                            name='group-posts'
                            id='group-admin'
                        />
                        <label htmlFor='group-admin' className={styles.label}>
                            Admin only
                        </label>
                    </div>
                </div>
            </div>

            <div className={styles.formControl}>
                <input
                    type='checkbox'
                    name=''
                    id='posts-auto-approve'
                    className={styles.checkbox}
                />
                <label htmlFor='posts-auto-approve' className={styles.label}>
                    Auto approval for the posts in this group?
                </label>
            </div>

            <div className={styles.formControl}>
                <input
                    type='checkbox'
                    name=''
                    id='comments'
                    className={styles.checkbox}
                />
                <label htmlFor='comments' className={styles.label}>
                    Activate comments in this group?
                </label>
            </div>

            <div className={styles.formControl}>
                <label htmlFor='group-photo' className={styles.label}>
                    Upload the group photo, that represents this group
                </label>
                <div className={styles.fileInputWrapper}>
                    <input
                        type='file'
                        id='group-photo'
                        className={styles.fileInput}
                    />
                    <i className={styles.cameraIcon}>
                        <BsCameraFill />
                    </i>
                    <button
                        type='button'
                        id='group-photo'
                        className={styles.fileInputBrowseBtn}
                    >
                        Browse
                    </button>
                </div>
            </div>

            <div className={styles.formControl}>
                <label htmlFor='group-cover' className={styles.label}>
                    Upload the group cover
                </label>
                <div className={styles.fileInputWrapper}>
                    <input
                        type='file'
                        id='group-cover'
                        className={styles.fileInput}
                    />
                    <i className={styles.cameraIcon}>
                        <BsCameraFill />
                    </i>
                    <button type='button' className={styles.fileInputBrowseBtn}>
                        Browse
                    </button>
                </div>
            </div>

            <div className={styles.formControl}>
                <label htmlFor='group-rules' className={styles.label}>
                    Group Rules
                </label>
                <textarea
                    name=''
                    id='group-rules'
                    cols='30'
                    rows='10'
                    className={styles.textarea}
                ></textarea>
            </div>

            <button type='submit' className={styles.submitBtn}>Add Group</button>
        </form>
    );
}
