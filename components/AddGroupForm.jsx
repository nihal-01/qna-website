import React from 'react';
import { IoMdChatbubbles } from 'react-icons/io';
import { BsCameraFill } from 'react-icons/bs';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import axios from '../axios';
import { BtnLoader } from '.';

const styles = {
    formControl: `mb-[1.5em]`,
    label: `text-grayColor text-[14px] lg:text-base`,
    inputWrapper: `border border-borderColor flex items-center rounded-sm h-[45px] mt-[5px]`,
    input: `w-[100%] h-[100%] outline-none `,
    icon: `text-grayColor text-xl mx-[10px]`,
    radioContainer: `flex items-center gap-[1em] mt-[5px]`,
    radioInputWrapper: `flex items-center gap-[0.7em]`,
    radioInput: `w-[16px] min-w-[16px] h-[16px] min-h-[16px]`,
    fileInputWrapper: `relative group w-[100%] h-[45px] border border-borderColor rounded-sm flex items-center mt-[5px] `,
    fileInput: `file:hidden cursor-pointer w-full h-[100%] py-[8px] pr-[8px] pl-[40px] z-10 text-grayColor`,
    cameraIcon: `text-grayColor absolute top-[10px] left-[10px] text-xl`,
    fileInputBrowseBtn: `absolute top-[7px] right-[10px] bg-primaryColor rounded-sm py-[2px] px-[10px] text-white transition-all group-hover:bg-secondaryColor text-[15px] font-semibold`,
    textarea: `w-[100%] h-[200px] border border-borderColor resize-none mt-[5px] rounded-sm outline-none px-[20px] py-[15px]`,
    submitBtn: `w-[100%] h-[45px] text-white font-semibold bg-secondaryColor transition-all hover:bg-grayColor rounded-sm disabled:cursor-not-allowed`,
    uploadingTxt: `text-right text-grayColor mt-[6px]`,
    uploadedTxt: `text-right text-[green] mt-[6px]`,
    errorTxt: `text-[red] text-right mt-[6px]`,
    error: `text-[red] text-[15px] lg:text-base mb-[1em]`,
};

export default function AddGroupForm() {
    const [data, setData] = useState({
        title: '',
        postPermission: true,
        profile: '',
        cover: '',
        rules: '',
    });
    const [cover, setCover] = useState({ uploading: '', error: '' });
    const [profile, setProfile] = useState({ uploading: '', error: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => state.user);
    const router = useRouter();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setError('');

            if (!data.title) {
                return setError('* Fill all required fields');
            }

            setLoading(true);

            await axios.post(
                '/groups',
                {
                    ...data,
                    postPermission:
                        data.postPermission === 'all' ? true : false,
                },
                {
                    headers: { Authorization: `Bearer ${user?.token}` },
                }
            );

            router.push('/groups');
        } catch (err) {
            setError(
                err?.response?.data?.error || 'Something Went wrong, Try again'
            );
            setLoading(false);
        }
    };

    const uploadImage = async (file, name) => {
        try {
            if (!file.type.match(/image\/(png|jpg|jpeg)/gm)) {
                if (name == 'profile') {
                    return setProfile((prev) => {
                        return {
                            ...prev,
                            uploading: '',
                            error: 'only png, jpg or jpeg images are supported',
                        };
                    });
                } else if (name === 'cover') {
                    return setCover((prev) => {
                        return {
                            ...prev,
                            uploading: '',
                            error: 'only png, jpg or jpeg images are supported',
                        };
                    });
                }
            }

            if (name == 'profile') {
                setProfile((prev) => {
                    return { ...prev, error: '', uploading: true };
                });
            } else if (name === 'cover') {
                setCover((prev) => {
                    return { ...prev, error: '', uploading: true };
                });
            }

            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'vc4xbhed');

            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/djjgnoyg4/image/upload',
                formData
            );

            if (name == 'profile') {
                setProfile((prev) => {
                    return { ...prev, uploading: false };
                });
            } else if (name === 'cover') {
                setCover((prev) => {
                    return { ...prev, uploading: false };
                });
            }

            setData({ ...data, [name]: response.data.url });
        } catch (err) {
            if (name == 'profile') {
                setProfile((prev) => {
                    return {
                        ...prev,
                        uploading: '',
                        error: 'Something went wrong, Try again',
                    };
                });
            } else if (name === 'cover') {
                setCover((prev) => {
                    return {
                        ...prev,
                        uploading: '',
                        error: 'Something went wrong, Try again',
                    };
                });
            }
        }
    };

    return (
        <form action='' onSubmit={handleSubmit}>
            <div className={styles.formControl}>
                <label htmlFor='title' className={styles.label}>
                    Group Title <span className='text-[#f00]'>*</span>
                </label>
                <div className={styles.inputWrapper}>
                    <i className={styles.icon}>
                        <IoMdChatbubbles />
                    </i>
                    <input
                        type='text'
                        className={styles.input}
                        name='title'
                        value={data.title || ''}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className={styles.formControl}>
                <label className={styles.label}>
                    Group posts <span className='text-[#f00]'>*</span>
                </label>
                <div className={styles.radioContainer}>
                    <div className={styles.radioInputWrapper}>
                        <input
                            type='radio'
                            name='postPermission'
                            id='group-all'
                            className={styles.radioInput}
                            value='all'
                            onChange={handleChange}
                        />
                        <label htmlFor='group-all' className={styles.label}>
                            All group members
                        </label>
                    </div>
                    <div className={styles.radioInputWrapper}>
                        <input
                            type='radio'
                            name='postPermission'
                            id='group-admin'
                            value='admin'
                            className={styles.radioInput}
                            onChange={handleChange}
                        />
                        <label htmlFor='group-admin' className={styles.label}>
                            Admin only
                        </label>
                    </div>
                </div>
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
                        onChange={(e) => {
                            if (e.target.files.length > 0) {
                                uploadImage(e.target.files[0], 'profile');
                            }
                        }}
                    />
                    <i className={styles.cameraIcon}>
                        <BsCameraFill />
                    </i>
                    <button type='button' className={styles.fileInputBrowseBtn}>
                        Browse
                    </button>
                </div>

                {profile.uploading === true && (
                    <p className={styles.uploadingTxt}>uploading...</p>
                )}
                {profile.uploading === false && (
                    <p className={styles.uploadedTxt}>&#10004; uploaded</p>
                )}
                {profile.error && (
                    <p className={styles.errorTxt}>{profile.error}</p>
                )}
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
                        onChange={(e) => {
                            if (e.target.files.length > 0) {
                                uploadImage(e.target.files[0], 'cover');
                            }
                        }}
                    />
                    <i className={styles.cameraIcon}>
                        <BsCameraFill />
                    </i>
                    <button type='button' className={styles.fileInputBrowseBtn}>
                        Browse
                    </button>
                </div>

                {cover.uploading === true && (
                    <p className={styles.uploadingTxt}>uploading...</p>
                )}
                {cover.uploading === false && (
                    <p className={styles.uploadedTxt}>&#10004; uploaded</p>
                )}
                {cover.error && (
                    <p className={styles.errorTxt}>{cover.error}</p>
                )}
            </div>

            <div className={styles.formControl}>
                <label htmlFor='group-rules' className={styles.label}>
                    Group Rules
                </label>
                <textarea
                    name='rules'
                    id='group-rules'
                    cols='30'
                    rows='10'
                    className={styles.textarea}
                    value={data.rules || ''}
                    onChange={handleChange}
                ></textarea>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button
                type='submit'
                className={styles.submitBtn}
                disabled={loading}
            >
                {loading ? <BtnLoader /> : 'Add Group'}
            </button>
        </form>
    );
}
