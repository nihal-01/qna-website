import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { HiLockClosed, HiUser } from 'react-icons/hi';
import { useDispatch } from 'react-redux';

import axios from '../axios';
import { updateSigninBox } from '../redux/slices/layoutSlice';
import { signUser } from '../redux/slices/userSlice';
import { BtnLoader } from './';

const styles = {
    form: ``,
    label: `text-grayColor text-[14px] lg:text-[15px]`,
    inputWrapper: `flex items-center border border-borderColor rounded-sm h-[45px] mb-[10px] mt-[5px] lg:mb-[20px]`,
    inputIcon: `text-lg text-grayColor mx-[10px]`,
    input: `w-[100%] h-[100%] outline-none`,
    submitBtn: `w-[100%] h-[40px] lg:h-[45px] bg-secondaryColor text-white font-semibold hover:bg-grayColor transition-all cursor-pointer rounded-sm mt-[20px] disabled:cursor-not-allowed`,
    bottomFlex: `flex items-center justify-between mt-[20px]`,
    checkboxWrapper: `flex items-center gap-[10px]`,
    checkbox: `w-[16px] h-[16px] text-[#0f0]`,
    forgotTxt: `text-[14px] lg:text-[15px] text-priamryColor transition-all hover:text-secondaryColor cursor-pointer`,
    errorMsg: `text-[red] text-[15px] lg:text-base `,
};

export default function LoginForm() {
    const [user, setUser] = useState({
        info: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const dispacth = useDispatch();
    const router = useRouter();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setError('');

            if (!user.info || !user.password) {
                return setError('* fill required fields');
            }

            setLoading(true);

            const response = await axios.post('/auth/signin', {
                ...user,
            });

            setLoading(false);

            Cookies.set('user-info', JSON.stringify(response.data));
            dispacth(signUser(response.data));
            dispacth(updateSigninBox(false));
        } catch (err) {
            setError(
                err.response.data?.error || 'Something went wrong, Try again'
            );
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor='info' className={styles.label}>
                Username or email <span className='text-[#f00]'>*</span>
            </label>
            <div className={styles.inputWrapper}>
                <i className={styles.inputIcon}>
                    <HiUser />
                </i>
                <input
                    type='text'
                    id='info'
                    className={styles.input}
                    name='info'
                    value={user.info || ''}
                    onChange={handleChange}
                />
            </div>
            <label htmlFor='password' className={styles.label}>
                Password <span className='text-[#f00]'>*</span>
            </label>
            <div className={styles.inputWrapper}>
                <i className={styles.inputIcon}>
                    <HiLockClosed />
                </i>
                <input
                    type='password'
                    id='password'
                    className={styles.input}
                    name='password'
                    value={user.password || ''}
                    onChange={handleChange}
                />
            </div>

            {error && <p className={styles.errorMsg}>{error}</p>}

            <div className={styles.bottomFlex}>
                <div className={styles.checkboxWrapper}>
                    <input
                        type='checkbox'
                        name=''
                        id='checkbox'
                        // checked
                        className={styles.checkbox}
                    />
                    <label
                        htmlFor='checkbox'
                        className='text-grayColor text-[15px] lg:text-base'
                    >
                        Remember Me!
                    </label>
                </div>
                <p
                    className={styles.forgotTxt}
                    onClick={() => {
                        dispacth(updateSigninBox(false));
                        router.push('/forgot-password');
                    }}
                >
                    Forgot Password?
                </p>
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
