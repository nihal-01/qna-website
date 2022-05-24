import React from 'react';
import { HiOutlineTrash } from 'react-icons/hi';

import { EditProfileLayout } from '../../../components';

const styles = {
    container: `py-[2.5em] max-w-[750px] w-[100%] mx-auto`,
    title: `flex items-center font-bold text-[16px] text-primaryColor mb-[1.5em]`,
    titleIcon: `block bg-primaryColor text-white rounded p-[6px] mr-[13px]`,
    label: `text-grayColor text-[14px] lg:text-[15px]`,
    checkboxWrapper: `flex items-center gap-[10px]`,
    checkbox: `w-[16px] h-[16px] text-[#0f0]`,
    submitBtn: `w-[100%] h-[40px] lg:h-[45px] bg-secondaryColor text-white font-semibold hover:bg-grayColor transition-all cursor-pointer rounded-sm mt-[20px]`,
};

export default function DeleteProfilePage() {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                <i className={styles.titleIcon}>
                    <HiOutlineTrash />
                </i>
                Delete Account
            </h2>
            <form action=''>
                <div className={styles.checkboxWrapper}>
                    <input
                        type='checkbox'
                        name=''
                        id='delete'
                        // checked
                        className={styles.checkbox}
                    />
                    <label
                        htmlFor='delete'
                        className='text-grayColor text-[15px] lg:text-base'
                    >
                        Delete Your Account?
                    </label>
                </div>

                <input
                    type='submit'
                    value='Delete'
                    className={styles.submitBtn}
                />
            </form>
        </div>
    );
}

DeleteProfilePage.getLayout = function getLayout(page) {
    return (
        <EditProfileLayout crumbName='Delete Account'>{page}</EditProfileLayout>
    );
};
