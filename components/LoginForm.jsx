import Link from 'next/link';
import React from 'react';
import { HiLockClosed, HiUser } from 'react-icons/hi';

const styles = {
    form: ``,
    label: `text-grayColor text-[14px] lg:text-[15px]`,
    inputWrapper: `flex items-center border border-borderColor rounded-sm h-[45px] mb-[10px] mt-[5px] lg:mb-[20px]`,
    inputIcon: `text-lg text-grayColor mx-[10px]`,
    input: `w-[100%] h-[100%] outline-none`,
    submitBtn: `w-[100%] h-[40px] lg:h-[45px] bg-secondaryColor text-white font-semibold hover:bg-grayColor transition-all cursor-pointer rounded-sm mt-[20px]`,
    bottomFlex: `flex items-center justify-between mt-[20px]`,
    checkboxWrapper: `flex items-center gap-[10px]`,
    checkbox: `w-[16px] h-[16px] text-[#0f0]`,
    forgotTxt: `text-[14px] lg:text-[15px] text-priamryColor transition-all hover:text-secondaryColor`
};

export default function LoginForm() {
    const handleSubmit = () => {
        console.log('object');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor='username' className={styles.label}>
                Username or email <span className='text-[#f00]'>*</span>
            </label>
            <div className={styles.inputWrapper}>
                <i className={styles.inputIcon}>
                    <HiUser />
                </i>
                <input type='text' id='username' className={styles.input} />
            </div>
            <label htmlFor='password' className={styles.label}>
                Password <span className='text-[#f00]'>*</span>
            </label>
            <div className={styles.inputWrapper}>
                <i className={styles.inputIcon}>
                    <HiLockClosed />
                </i>
                <input type='password' id='password' className={styles.input} />
            </div>
            <div className={styles.bottomFlex}>
                <div className={styles.checkboxWrapper}>
                    <input
                        type='checkbox'
                        name=''
                        id='checkbox'
                        // checked
                        className={styles.checkbox}
                    />
                    <label htmlFor='checkbox' className='text-grayColor text-[15px] lg:text-base'>Remember Me!</label>
                </div>
                <p className={styles.forgotTxt}>
                    <Link href={'/'}>Forgot Password?</Link>
                </p>
            </div>
            <input type='submit' name='submit' className={styles.submitBtn} />
        </form>
    );
}
