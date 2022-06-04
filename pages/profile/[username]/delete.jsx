import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../axios';

import { BtnLoader, EditProfileLayout } from '../../../components';
import { logout } from '../../../redux/slices/userSlice';

const styles = {
    container: `py-[2.5em] max-w-[750px] w-[100%] mx-auto`,
    title: `flex items-center font-bold text-[16px] text-primaryColor mb-[1.5em]`,
    titleIcon: `block bg-primaryColor text-white rounded-sm p-[6px] mr-[13px]`,
    label: `text-grayColor text-[14px] lg:text-[15px]`,
    checkboxWrapper: `flex items-center gap-[10px]`,
    checkbox: `w-[16px] h-[16px] text-[#0f0]`,
    submitBtn: `w-[100%] h-[40px] lg:h-[45px] bg-secondaryColor text-white font-semibold hover:bg-grayColor transition-all cursor-pointer rounded-sm mt-[20px] disabled:cursor-not-allowed`,
};

export default function DeleteProfilePage() {
    const [isReady, setIsReady] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => state.user);
    const router = useRouter();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            if (!isReady) {
                return setError('You are not checked the box');
            }

            setError('');

            const isConfirm = confirm(
                'Are you sure?. Once deleted, it will not get back'
            );

            if (isConfirm) {
                setLoading(true);
                await axios.delete('/users/delete-account', {
                    headers: { Authorization: `Bearer ${user?.token}` },
                });

                dispatch(logout());
                router.push('/');
            }
        } catch (err) {
            setError(
                err?.reponse?.data?.error || 'Something went wrong, Try again'
            );
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                <i className={styles.titleIcon}>
                    <HiOutlineTrash />
                </i>
                Delete Account
            </h2>
            <form action='' onSubmit={handleSubmit}>
                <div className={styles.checkboxWrapper}>
                    <input
                        type='checkbox'
                        name=''
                        id='delete'
                        className={styles.checkbox}
                        defaultChecked={false}
                        onChange={(e) => {
                            setIsReady(e.target.checked);
                        }}
                    />
                    <label
                        htmlFor='delete'
                        className='text-grayColor text-[15px] lg:text-base'
                    >
                        Delete Your Account?
                    </label>
                </div>

                {error && (
                    <p className='text-[red] text-[15px] lg:text-base mt-[10px]'>
                        {error}
                    </p>
                )}

                <button
                    type='submit'
                    className={styles.submitBtn}
                    disabled={loading}
                >
                    {loading ? <BtnLoader /> : 'submit'}
                </button>
            </form>
        </div>
    );
}

DeleteProfilePage.getLayout = function getLayout(page) {
    return (
        <EditProfileLayout crumbName='Delete Account'>{page}</EditProfileLayout>
    );
};
