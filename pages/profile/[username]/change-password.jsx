import React from 'react';
import { useState } from 'react';
import { HiLockClosed, HiLockOpen } from 'react-icons/hi';
import { EditProfileLayout } from '../../../components';

const styles = {
    container: `py-[2.5em] max-w-[750px] w-[100%] mx-auto`,
    title: `flex items-center font-bold text-[16px] text-primaryColor mb-[1.5em]`,
    titleIcon: `block bg-primaryColor text-white rounded-sm p-[6px] mr-[13px]`,
    label: `text-grayColor text-[14px] lg:text-[15px]`,
    inputWrapper: `flex items-center border border-borderColor rounded-sm h-[45px] mb-[10px] mt-[5px] lg:mb-[20px]`,
    inputIcon: `text-lg text-grayColor mx-[10px]`,
    input: `w-[100%] h-[100%] outline-none`,
    submitBtn: `w-[100%] h-[40px] lg:h-[45px] bg-secondaryColor text-white font-semibold hover:bg-grayColor transition-all cursor-pointer rounded-sm mt-[20px]`,
};

export default function ChangePasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                <i className={styles.titleIcon}>
                    <HiLockClosed />
                </i>
                Change Password
            </h2>
            <form action=''>
                <label htmlFor='change-pass' className={styles.label}>
                    New Password <span className='text-[#f00]'>*</span>
                </label>
                <div className={styles.inputWrapper}>
                    <i className={styles.inputIcon}>
                        <HiLockOpen />
                    </i>
                    <input
                        type='password'
                        id='change-pass'
                        className={styles.input}
                        name='info'
                        value={password || ''}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>

                <label htmlFor='change-cpass' className={styles.label}>
                    Confirm Password <span className='text-[#f00]'>*</span>
                </label>
                <div className={styles.inputWrapper}>
                    <i className={styles.inputIcon}>
                        <HiLockOpen />
                    </i>
                    <input
                        type='password'
                        id='change-cpass'
                        className={styles.input}
                        name='info'
                        value={confirmPass || ''}
                        onChange={(e) => {
                            setConfirmPass(e.target.value);
                        }}
                    />
                </div>

                <input
                    type='submit'
                    value='Save'
                    className={styles.submitBtn}
                />
            </form>
        </div>
    );
}

ChangePasswordPage.getLayout = function getLayout(page) {
    return (
        <EditProfileLayout crumbName='Change Password'>
            {page}
        </EditProfileLayout>
    );
};
