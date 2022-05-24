import Image from 'next/image';
import React, { useState } from 'react';
import { AiOutlineIdcard } from 'react-icons/ai';
import { BiLink } from 'react-icons/bi';
import { BsCameraFill } from 'react-icons/bs';
import { FaCity } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import { HiLocationMarker, HiMail, HiUser, HiUserCircle } from 'react-icons/hi';
import { EditProfileLayout } from '../../../components';
import { avatarImg } from '../../../public/images';
import { countryList } from '../../../utils/constants';

const styles = {
    container: ``,
    section: `max-w-[750px] w-[100%] mx-auto py-[2.5em]`,
    title: `flex items-center font-bold text-[16px] text-primaryColor mb-[1.5em]`,
    titleIcon: `block bg-primaryColor text-white rounded p-[6px] mr-[13px]`,
    label: `text-grayColor text-[14px] lg:text-[15px]`,
    inputWrapper: `flex items-center border border-borderColor rounded-sm h-[45px] mb-[10px] mt-[5px] lg:mb-[20px]`,
    inputIcon: `text-lg text-grayColor mx-[10px]`,
    input: `w-[100%] h-[100%] outline-none`,
    submitBtn: `w-[100%] h-[40px] lg:h-[45px] bg-secondaryColor text-white font-semibold hover:bg-grayColor transition-all cursor-pointer rounded-sm mt-[20px]`,
    imageWrapper: `w-[120px] min-w-[120px] h-[120px] min-h-[120px] rounded-full border-2 border-secondaryColor p-[4px] transition-all hover:border-primaryColor mx-auto mb-[10px] lg:mb-[20px] `,
    image: `w-[100%] h-[100%] relative rounded-full overflow-hidden`,
    fileInputWrapper: `relative group w-[100%] h-[45px] border border-borderColor rounded-sm flex items-center mt-[5px] mb-[10px] lg:mb-[20px] `,
    fileInput: `file:hidden cursor-pointer w-full h-[100%] py-[8px] pr-[8px] pl-[40px] z-10 text-grayColor`,
    cameraIcon: `text-grayColor absolute top-[10px] left-[10px] text-xl`,
    fileInputBrowseBtn: `absolute top-[7px] right-[10px] bg-primaryColor rounded-sm py-[2px] px-[10px] text-white transition-all group-hover:bg-secondaryColor text-[15px] font-semibold`,
    icon: `text-grayColor text-xl mx-[10px]`,
    select: `bg-transparent w-[100%] h-[100%] outline-none text-grayColor capitalize`,
    radioContainer: `flex items-center gap-[1em] mt-[5px] mb-[10px] lg:mb-[20px] `,
    radioInputWrapper: `flex items-center gap-[0.7em]`,
    radioInput: `w-[17px] min-w-[17px] h-[17px] min-h-[17px]`,
    textarea: `w-[100%] h-[200px] border border-borderColor resize-none mt-[5px] rounded-sm outline-none px-[20px] py-[15px] `,
};

export default function EditProfile() {
    const [user, setUser] = useState({});

    const handleChange = (e) => {};

    return (
        <div className={styles.container}>
            <form action=''>
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
                            value={user.username || ''}
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
                            value={user.fname || ''}
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
                            value={user.lname || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.imageWrapper}>
                        <div className={styles.image}>
                            <Image
                                src={avatarImg}
                                alt=''
                                objectFit='cover'
                                layout='fill'
                            />
                        </div>
                    </div>

                    <label htmlFor='edit-profilepic' className={styles.label}>
                        Profile Picture
                    </label>
                    <div className={styles.fileInputWrapper}>
                        <input
                            type='file'
                            id='edit-profilepic'
                            className={styles.fileInput}
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

                    <label htmlFor='edit-coverpic' className={styles.label}>
                        Cover Picture
                    </label>
                    <div className={styles.fileInputWrapper}>
                        <input
                            type='file'
                            id='edit-coverpic'
                            className={styles.fileInput}
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

                    <label htmlFor='edit-country' className={styles.label}>
                        Country
                    </label>
                    <div className={styles.inputWrapper}>
                        <i className={styles.icon}>
                            <HiLocationMarker />
                        </i>
                        <select
                            name='category'
                            id='edit-country'
                            className={styles.select}
                            value={user.category || ''}
                            onChange={handleChange}
                        >
                            <option value='' hidden>
                                Select Country
                            </option>
                            {countryList.map((country, index) => {
                                return (
                                    <option
                                        value={country.toLowerCase()}
                                        key={index}
                                    >
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
                            value={user.city || ''}
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
                            value={user.phone || ''}
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
                            <FiPhoneCall />
                        </i>
                        <input
                            type='date'
                            id='edit-age'
                            className={styles.input}
                            name='age'
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
                            value={user.website || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <label htmlFor='edit-description' className={styles.label}>
                        Description
                    </label>
                    <textarea
                        name=''
                        id='edit-description'
                        cols='30'
                        rows='10'
                        className={styles.textarea}
                    ></textarea>

                    <input
                        type='submit'
                        value='Save'
                        className={styles.submitBtn}
                    />
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
