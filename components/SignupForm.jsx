import Link from 'next/link';
import React from 'react';
import { HiLockClosed, HiUser, HiLockOpen, HiMail } from 'react-icons/hi';

const styles = {
    form: ``,
    label: `text-grayColor text-[14px] lg:text-[15px]`,
    inputWrapper: `flex items-center border border-borderColor rounded-sm h-[45px] mb-[10px] mt-[5px] lg:mb-[20px]`,
    inputIcon: `text-lg text-grayColor mx-[10px]`,
    input: `w-[100%] h-[100%] outline-none`,
    submitBtn: `w-[100%] h-[40px] lg:h-[45px] bg-secondaryColor text-white font-semibold hover:bg-grayColor transition-all cursor-pointer rounded-sm mt-[20px]`,
    checkboxWrapper: `flex items-center gap-[10px] mt-[20px]`,
    checkbox: `w-[16px] min-w-[16px] h-[16px] min-h-[16px] text-[#0f0]`,
};

export default function SignupForm() {
    const handleSubmit = (e) => {
        console.log('object');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor='signup-username' className={styles.label}>
                Username <span className='text-[#f00]'>*</span>
            </label>
            <div className={styles.inputWrapper}>
                <i className={styles.inputIcon}>
                    <HiUser />
                </i>
                <input type='text' id='signup-username' className={styles.input} />
            </div>
            <label htmlFor='signup-email' className={styles.label}>
                Email <span className='text-[#f00]'>*</span>
            </label>
            <div className={styles.inputWrapper}>
                <i className={styles.inputIcon}>
                    <HiMail />
                </i>
                <input type='email' id='signup-email' className={styles.input} />
            </div>
            <label htmlFor='signup-password' className={styles.label}>
                Password <span className='text-[#f00]'>*</span>
            </label>
            <div className={styles.inputWrapper}>
                <i className={styles.inputIcon}>
                    <HiLockOpen />
                </i>
                <input type='password' id='signup-password' className={styles.input} />
            </div>
            <label htmlFor='cpassword' className={styles.label}>
                Confirm Password <span className='text-[#f00]'>*</span>
            </label>
            <div className={styles.inputWrapper}>
                <i className={styles.inputIcon}>
                    <HiLockClosed />
                </i>
                <input
                    type='password'
                    id='cpassword'
                    className={styles.input}
                />
            </div>
            <div className={styles.checkboxWrapper}>
                <input
                    type='checkbox'
                    name=''
                    id='signup-checkbox'
                    // checked
                    className={styles.checkbox}
                />
                <label
                    htmlFor='signup-checkbox'
                    className='text-grayColor text-[14px] lg:text-[15px]'
                >
                    By registering, you agree to the{' '}
                    <span className='text-primaryColor transition-all hover:text-secondaryColor'>
                        <Link href='/faqs'>Terms of Service</Link>
                    </span>{' '}
                    and{' '}
                    <span className='text-primaryColor transition-all hover:text-secondaryColor'>
                        <Link href='/faqs'>Privacy Policy</Link>
                    </span>
                    .<span className='text-[#f00]'>*</span>
                </label>
            </div>
            <input type='submit' name='submit' className={styles.submitBtn} />
        </form>
    );
}
