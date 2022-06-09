import Link from 'next/link';
import React, { useState } from 'react';
import { HiLockClosed, HiUser, HiLockOpen, HiMail } from 'react-icons/hi';
import Cookies from 'js-cookie';

import axios from '../axios';
import { useDispatch } from 'react-redux';
import { updateUser } from '../redux/slices/userSlice';
import { updateSignupBox } from '../redux/slices/layoutSlice';
import BtnLoader from './BtnLoader';

const styles = {
    form: ``,
    label: `text-grayColor text-[14px] lg:text-[15px]`,
    inputWrapper: `flex items-center border border-borderColor rounded-sm h-[45px] mb-[10px] mt-[5px] lg:mb-[20px]`,
    inputIcon: `text-lg text-grayColor mx-[10px]`,
    input: `w-[100%] h-[100%] outline-none`,
    submitBtn: `w-[100%] h-[40px] lg:h-[45px] bg-secondaryColor text-white font-semibold hover:bg-grayColor transition-all cursor-pointer rounded-sm mt-[20px] disabled:cursor-not-allowed`,
    checkboxWrapper: `flex items-center gap-[10px] mt-[20px]`,
    checkbox: `w-[16px] min-w-[16px] h-[16px] min-h-[16px] text-[#0f0]`,
    errorMsg: `text-[red] text-[15px] lg:text-base`,
};

export default function SignupForm() {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        cPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isPolicyChecked, setIsPolicyChecked] = useState(true);

    const dispacth = useDispatch();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setError('');

            if (
                !user.username ||
                !user.email ||
                !user.password ||
                !user.cPassword
            ) {
                return setError('* fill all required fields');
            }

            if (user.password !== user.cPassword) {
                return setError(
                    '* password and confirm password should be same'
                );
            }

            if (!isPolicyChecked) {
                return setError('* agree the terms and conditons');
            }

            setLoading(true);

            const response = await axios.post('/auth/signup', {
                username: user.username,
                email: user.email,
                password: user.password,
            });

            setLoading(false);
            setUser({
                ...user,
                username: '',
                email: '',
                password: '',
                cPassword: '',
            });

            dispacth(updateUser(response.data));
            dispacth(updateSignupBox(false));
        } catch (err) {
            setError(
                err.response.data?.error || 'Something went wrong, Try again'
            );
            setLoading(false);
        }
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
                <input
                    type='text'
                    id='signup-username'
                    className={styles.input}
                    name='username'
                    value={user.username || ''}
                    onChange={handleChange}
                />
            </div>

            <label htmlFor='signup-email' className={styles.label}>
                Email <span className='text-[#f00]'>*</span>
            </label>
            <div className={styles.inputWrapper}>
                <i className={styles.inputIcon}>
                    <HiMail />
                </i>
                <input
                    type='email'
                    id='signup-email'
                    className={styles.input}
                    name='email'
                    value={user.email || ''}
                    onChange={handleChange}
                />
            </div>

            <label htmlFor='signup-password' className={styles.label}>
                Password <span className='text-[#f00]'>*</span>
            </label>
            <div className={styles.inputWrapper}>
                <i className={styles.inputIcon}>
                    <HiLockOpen />
                </i>
                <input
                    type='password'
                    id='signup-password'
                    className={styles.input}
                    name='password'
                    value={user.password || ''}
                    onChange={handleChange}
                />
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
                    name='cPassword'
                    value={user.cPassword || ''}
                    onChange={handleChange}
                />
            </div>

            {error && <p className={styles.errorMsg}>{error}</p>}

            <div className={styles.checkboxWrapper}>
                <input
                    type='checkbox'
                    id='signup-checkbox'
                    className={styles.checkbox}
                    name='policyChecked'
                    defaultChecked={isPolicyChecked}
                    onChange={(e) => {
                        setIsPolicyChecked(e.target.checked);
                    }}
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

            <button
                type='submit'
                className={styles.submitBtn}
                disabled={loading}
            >
                {loading ? <BtnLoader /> : 'submit'}
            </button>
        </form>
    );
}
