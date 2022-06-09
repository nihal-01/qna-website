import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiOutlineIdcard } from 'react-icons/ai';
import { BiLink } from 'react-icons/bi';
import { BsCameraFill, BsGlobe2 } from 'react-icons/bs';
import { FaCity } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import { HiLocationMarker, HiMail, HiUser, HiUserCircle } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../axios';

import { BtnLoader, EditProfileLayout } from '../../../components';
import { getSingleUserByUsername } from '../../../helpers/userHelpers';
import { avatarImg } from '../../../public/images';
import { updateUser } from '../../../redux/slices/userSlice';
import { cleanObject } from '../../../utils';
import { countryList } from '../../../utils/constants';

const styles = {
    container: ``,
    section: `max-w-[750px] w-[100%] mx-auto py-[2.5em]`,
    title: `flex items-center font-bold text-[16px] text-primaryColor mb-[1.5em]`,
    titleIcon: `block bg-primaryColor text-white rounded-sm p-[6px] mr-[13px]`,
    label: `text-grayColor text-[14px] lg:text-[15px]`,
    inputWrapper: `flex items-center border border-borderColor rounded-sm h-[45px] mb-[10px] mt-[5px] lg:mb-[20px]`,
    inputIcon: `text-lg text-grayColor mx-[10px]`,
    input: `w-[100%] h-[100%] outline-none`,
    submitBtn: `w-[100%] h-[40px] lg:h-[45px] bg-secondaryColor text-white font-semibold hover:bg-grayColor transition-all cursor-pointer rounded-sm mt-[20px] disabled:cursor-not-allowed`,
    imageWrapper: `w-[120px] min-w-[120px] h-[120px] min-h-[120px] rounded-full border-2 border-secondaryColor p-[4px] transition-all hover:border-primaryColor mx-auto mb-[10px] lg:mb-[20px] `,
    image: `w-[100%] h-[100%] relative rounded-full overflow-hidden`,
    fileInputWrapper: `relative group w-[100%] h-[45px] border border-borderColor rounded-sm flex items-center `,
    fileInput: `file:hidden cursor-pointer w-full h-[100%] py-[8px] pr-[8px] pl-[40px] z-10 text-grayColor`,
    cameraIcon: `text-grayColor absolute top-[10px] left-[10px] text-xl`,
    fileInputBrowseBtn: `absolute top-[7px] right-[10px] bg-primaryColor rounded-sm py-[2px] px-[10px] text-white transition-all group-hover:bg-secondaryColor text-[15px] font-semibold`,
    icon: `text-grayColor text-xl mx-[10px]`,
    select: `bg-transparent w-[100%] h-[100%] outline-none text-grayColor capitalize`,
    radioContainer: `flex items-center gap-[1em] mt-[5px] mb-[10px] lg:mb-[20px] `,
    radioInputWrapper: `flex items-center gap-[0.7em]`,
    radioInput: `w-[17px] min-w-[17px] h-[17px] min-h-[17px]`,
    textarea: `w-[100%] h-[200px] border border-borderColor resize-none mt-[5px] rounded-sm outline-none px-[20px] py-[15px] `,
    uploadingTxt: `text-right text-grayColor mt-[6px]`,
    uploadedTxt: `text-right text-[green] mt-[6px]`,
    errorTxt: `text-[red] text-right mt-[6px]`,
};

export default function EditProfile({ userRes }) {
    const myUser = JSON.parse(userRes);

    const [data, setData] = useState({
        username: myUser.username || '',
        fname: myUser.fname || '',
        lname: myUser.lname || '',
        avatar: myUser.avatar || '',
        coverPhoto: myUser.coverPhoto || '',
        country: myUser.country || '',
        city: myUser.city || '',
        phone: myUser.phone || '',
        gender: myUser.gender || '',
        age: myUser.age || '',
        email: myUser.email || '',
        website: myUser.website || '',
        description: myUser.description || '',
    });
    const [coverPhoto, setCoverPhoto] = useState({ uploading: '', error: '' });
    const [avatar, setAvatar] = useState({ uploading: '', error: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            if (!data.username || !data.email) {
                return setError('* Fill required fields');
            }

            setError('');
            setLoading(true);

            const obj = cleanObject(data);
            const response = await axios.patch(
                '/users/update-profile',
                {
                    ...obj,
                },
                {
                    headers: { Authorization: `Bearer ${user?.token}` },
                }
            );
            dispatch(updateUser(response.data));
            router.push(`/profile/${data.username}`);
            setLoading(false);
        } catch (err) {
            setError(
                err?.response?.data?.error || 'Something went wrong, Try again'
            );
            setLoading(false);
        }
    };

    const uploadImage = async (file, name) => {
        try {
            if (!file.type.match(/image\/(png|jpg|jpeg)/gm)) {
                if (name == 'avatar') {
                    return setAvatar((prev) => {
                        return {
                            ...prev,
                            uploading: '',
                            error: 'only png, jpg or jpeg images are supported',
                        };
                    });
                } else if (name === 'coverPhoto') {
                    return setCoverPhoto((prev) => {
                        return {
                            ...prev,
                            uploading: '',
                            error: 'only png, jpg or jpeg images are supported',
                        };
                    });
                }
            }

            if (name == 'avatar') {
                setAvatar((prev) => {
                    return { ...prev, error: '', uploading: true };
                });
            } else if (name === 'coverPhoto') {
                setCoverPhoto((prev) => {
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

            if (name == 'avatar') {
                setAvatar((prev) => {
                    return { ...prev, uploading: false };
                });
            } else if (name === 'coverPhoto') {
                setCoverPhoto((prev) => {
                    return { ...prev, uploading: false };
                });
            }

            setData({ ...data, [name]: response.data.url });
        } catch (err) {
            console.log(err);
            if (name == 'avatar') {
                setAvatar((prev) => {
                    return {
                        ...prev,
                        uploading: '',
                        error: 'Something went wrong, Try again',
                    };
                });
            } else if (name === 'coverPhoto') {
                setCoverPhoto((prev) => {
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
        <div className={styles.container}>
            <Head>
                <title>{user.username} - Edit Profile - QNA</title>
            </Head>
            <form action='' onSubmit={handleSubmit}>
                <div className={styles.section}>
                    <h2 className={styles.title}>
                        <i className={styles.titleIcon}>
                            <AiOutlineIdcard />
                        </i>
                        Basic Information
                    </h2>

                    <label htmlFor='edit-username' className={styles.label}>
                        Username <span className='text-[#f00]'>*</span>
                    </label>
                    <div className={styles.inputWrapper}>
                        <i className={styles.inputIcon}>
                            <HiUser />
                        </i>
                        <input
                            type='text'
                            id='edit-username'
                            className={styles.input}
                            name='username'
                            value={data.username || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <label htmlFor='edit-fname' className={styles.label}>
                        Fist Name
                    </label>
                    <div className={styles.inputWrapper}>
                        <i className={styles.inputIcon}>
                            <HiUserCircle />
                        </i>
                        <input
                            type='text'
                            id='edit-fname'
                            className={styles.input}
                            name='fname'
                            value={data.fname || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <label htmlFor='edit-lname' className={styles.label}>
                        Last Name
                    </label>
                    <div className={styles.inputWrapper}>
                        <i className={styles.inputIcon}>
                            <HiUserCircle />
                        </i>
                        <input
                            type='text'
                            id='edit-lname'
                            className={styles.input}
                            name='lname'
                            value={data.lname || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.imageWrapper}>
                        <div className={styles.image}>
                            <Image
                                src={data.avatar || avatarImg}
                                alt=''
                                objectFit='cover'
                                layout='fill'
                            />
                        </div>
                    </div>

                    <div className='mt-[5px] mb-[10px] lg:mb-[20px]'>
                        <label
                            htmlFor='edit-profilepic'
                            className={styles.label}
                        >
                            Profile Picture
                        </label>
                        <div className={styles.fileInputWrapper}>
                            <input
                                type='file'
                                id='edit-profilepic'
                                className={styles.fileInput}
                                onChange={(e) => {
                                    if (e.target.files.length > 0) {
                                        uploadImage(
                                            e.target.files[0],
                                            'avatar'
                                        );
                                    }
                                }}
                            />
                            <i className={styles.cameraIcon}>
                                <BsCameraFill />
                            </i>
                            <button
                                type='button'
                                className={styles.fileInputBrowseBtn}
                            >
                                Browse
                            </button>
                        </div>

                        {avatar.uploading === true && (
                            <p className={styles.uploadingTxt}>uploading...</p>
                        )}
                        {avatar.uploading === false && (
                            <p className={styles.uploadedTxt}>
                                &#10004; uploaded
                            </p>
                        )}
                        {avatar.error && (
                            <p className={styles.errorTxt}>{avatar.error}</p>
                        )}
                    </div>

                    <div className='mt-[5px] mb-[10px] lg:mb-[20px]'>
                        <label htmlFor='edit-coverpic' className={styles.label}>
                            Cover Picture
                        </label>
                        <div className={styles.fileInputWrapper}>
                            <input
                                type='file'
                                id='edit-coverpic'
                                className={styles.fileInput}
                                onChange={(e) => {
                                    if (e.target.files.length > 0) {
                                        uploadImage(
                                            e.target.files[0],
                                            'coverPhoto'
                                        );
                                    }
                                }}
                            />
                            <i className={styles.cameraIcon}>
                                <BsCameraFill />
                            </i>
                            <button
                                type='button'
                                className={styles.fileInputBrowseBtn}
                            >
                                Browse
                            </button>
                        </div>
                    </div>

                    {coverPhoto.uploading === true && (
                        <p className={styles.uploadingTxt}>uploading...</p>
                    )}
                    {coverPhoto.uploading === false && (
                        <p className={styles.uploadedTxt}>&#10004; uploaded</p>
                    )}
                    {coverPhoto.error && (
                        <p className={styles.errorTxt}>{coverPhoto.error}</p>
                    )}

                    <label htmlFor='edit-country' className={styles.label}>
                        Country
                    </label>
                    <div className={styles.inputWrapper}>
                        <i className={styles.icon}>
                            <HiLocationMarker />
                        </i>
                        <select
                            name='country'
                            id='edit-country'
                            className={styles.select}
                            value={data.country || ''}
                            onChange={handleChange}
                        >
                            <option value='' hidden>
                                Select Country
                            </option>
                            {countryList.map((country, index) => {
                                return (
                                    <option value={country} key={index}>
                                        {country}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <label htmlFor='edit-city' className={styles.label}>
                        City
                    </label>
                    <div className={styles.inputWrapper}>
                        <i className={styles.inputIcon}>
                            <FaCity />
                        </i>
                        <input
                            type='text'
                            id='edit-city'
                            className={styles.input}
                            name='city'
                            value={data.city || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <label htmlFor='edit-phone' className={styles.label}>
                        Phone
                    </label>
                    <div className={styles.inputWrapper}>
                        <i className={styles.inputIcon}>
                            <FiPhoneCall />
                        </i>
                        <input
                            type='number'
                            id='edit-phone'
                            className={styles.input}
                            name='phone'
                            value={data.phone || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <label className={styles.label}>Gender</label>
                    <div className={styles.radioContainer}>
                        <div className={styles.radioInputWrapper}>
                            <input
                                type='radio'
                                name='gender'
                                id='gender-male'
                                className={styles.radioInput}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setData({ ...data, gender: 'male' });
                                    }
                                }}
                                defaultChecked={
                                    data.gender === 'male' ? true : false
                                }
                            />
                            <label
                                htmlFor='gender-male'
                                className={styles.label}
                            >
                                Male
                            </label>
                        </div>
                        <div className={styles.radioInputWrapper}>
                            <input
                                type='radio'
                                name='gender'
                                id='gender-femail'
                                className={styles.radioInput}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setData({ ...data, gender: 'female' });
                                    }
                                }}
                                defaultChecked={
                                    data.gender === 'female' ? true : false
                                }
                            />
                            <label
                                htmlFor='gender-femail'
                                className={styles.label}
                            >
                                Femail
                            </label>
                        </div>
                        <div className={styles.radioInputWrapper}>
                            <input
                                type='radio'
                                name='gender'
                                id='gender-others'
                                className={styles.radioInput}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setData({ ...data, gender: 'others' });
                                    }
                                }}
                                defaultChecked={
                                    data.gender === 'others' ? true : false
                                }
                            />
                            <label
                                htmlFor='gender-others'
                                className={styles.label}
                            >
                                Others
                            </label>
                        </div>
                    </div>

                    <label className={styles.label} htmlFor='edit-age'>
                        Age
                    </label>
                    <div className={styles.inputWrapper}>
                        <i className={styles.inputIcon}>
                            <BsGlobe2 />
                        </i>
                        <input
                            type='number'
                            id='edit-age'
                            className={styles.input}
                            name='age'
                            onChange={handleChange}
                            value={data.age || ''}
                        />
                    </div>

                    <label htmlFor='edit-email' className={styles.label}>
                        Email <span className='text-[#f00]'>*</span>
                    </label>
                    <div className={styles.inputWrapper}>
                        <i className={styles.inputIcon}>
                            <HiMail />
                        </i>
                        <input
                            type='email'
                            id='edit-email'
                            className={styles.input}
                            name='email'
                            value={data.email || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <hr />
                <div className={styles.section}>
                    <h2 className={styles.title}>
                        <i className={styles.titleIcon}>
                            <HiUser />
                        </i>
                        Basic Information
                    </h2>

                    <label htmlFor='edit-website' className={styles.label}>
                        Website
                    </label>
                    <div className={styles.inputWrapper}>
                        <i className={styles.inputIcon}>
                            <BiLink />
                        </i>
                        <input
                            type='text'
                            id='edit-website'
                            className={styles.input}
                            name='website'
                            value={data.website || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <label htmlFor='edit-description' className={styles.label}>
                        Description
                    </label>
                    <textarea
                        name='description'
                        id='edit-description'
                        cols='30'
                        rows='10'
                        className={styles.textarea}
                        onChange={handleChange}
                        value={data.description || ''}
                    ></textarea>

                    {error && (
                        <p className='text-[red] text-[15px] lg:text-base mt-[8px]'>
                            {error}
                        </p>
                    )}

                    <button
                        className={styles.submitBtn}
                        type='submit'
                        disabled={loading}
                    >
                        {loading ? <BtnLoader /> : 'Edit Profile'}
                    </button>
                </div>
            </form>
        </div>
    );
}

EditProfile.getLayout = function getLayout(page) {
    return (
        <EditProfileLayout crumbName={'Edit Profile'}>{page}</EditProfileLayout>
    );
};

export async function getServerSideProps(context) {
    const user = await getSingleUserByUsername(context?.query?.username);

    if (!user) {
        return {
            redirect: {
                permanent: false,
                destination: '/404',
            },
        };
    }

    return {
        props: {
            userRes: JSON.stringify(user),
        },
    };
}
