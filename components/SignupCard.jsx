import React from 'react';
import Image from 'next/image';
import { MdClose } from 'react-icons/md';

import { SignupForm } from '.';
import { loginImg } from '../public/images';
import { useDispatch, useSelector } from 'react-redux';
import { updateSigninBox, updateSignupBox } from '../redux/slices/layoutSlice';

const styles = {
    container: `fixed inset-0 bg-[#000b] z-20 flex items-center justify-center`,
    cardWrapper: `w-[850px] max-w-[100%] h-[100%] flex flex-col items-center justify-center p-[15px] `,
    card: `relative w-[100%] rounded-sm bg-white lg:grid lg:grid-cols-2 ease-out duration-100 `,
    leftWrapper: `relative hidden lg:block`,
    imgWrapper: `relative w-[100%] h-[100%] overflow-hidden`,
    imgOverlay: `absolute inset-0 opacity-60 bg-secondaryColor`,
    headerWrapper: `absolute inset-0 h-[100%] p-[50px] flex flex-col`,
    contentWrapper: `grow`,
    heading: `text-white text-2xl font-semibold mb-[10px]`,
    para: `text-white text-[17px]`,
    signInBtn: `grow-0 w-[100%] h-[45px] bg-primaryColor text-white font-semibold`,
    formWrapper: `p-[15px] lg:p-[50px]`,
    closeBtn: `absolute right-0 top-[-37px] text-3xl text-white `,
    signInTxt: `text-center text-white mt-[10px] font-semibold lg:hidden `,
};

export default function SignupCard() {
    const { signupBox } = useSelector((state) => state.layout);
    const dispacth = useDispatch();

    return (
        <div
            className={
                styles.container + ` ${signupBox ? 'visible' : 'invisible'}`
            }
            id='signupCardContainer'
            onClick={(e) => {
                if (
                    e.target === document.getElementById('signupCardContainer')
                ) {
                    dispacth(updateSignupBox(false));
                }
            }}
        >
            <div
                className={styles.cardWrapper}
                id='signupCard'
                onClick={(e) => {
                    if (e.target === document.getElementById('signupCard')) {
                        dispacth(updateSignupBox(false));
                    }
                }}
            >
                <div
                    className={
                        styles.card +
                        ` ${
                            signupBox
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-[-50%]'
                        }`
                    }
                >
                    <div className={styles.leftWrapper}>
                        <div className={styles.imgWrapper}>
                            <Image
                                src={loginImg}
                                alt=''
                                layout='fill'
                                objectFit='cover'
                            />
                        </div>
                        <div className={styles.imgOverlay}></div>
                        <div className={styles.headerWrapper}>
                            <div className={styles.contentWrapper}>
                                <h3 className={styles.heading}>Sign Up</h3>
                                <p className={styles.para}>
                                    Sign Up to our social questions and Answers
                                    Engine to ask questions, answer people&#39;s
                                    questions, and connect with other people.
                                </p>
                            </div>
                            <button
                                className={styles.signInBtn}
                                onClick={() => {
                                    dispacth(updateSignupBox(false));
                                    dispacth(updateSigninBox(true));
                                }}
                            >
                                Sign In Here
                            </button>
                        </div>
                    </div>
                    <div className={styles.formWrapper}>
                        <SignupForm />
                    </div>
                    <button
                        className={styles.closeBtn}
                        onClick={() => {
                            dispacth(updateSignupBox(false));
                        }}
                    >
                        <MdClose />
                    </button>
                </div>
                <div className={styles.signInTxt}>
                    Have an account?{' '}
                    <span className='text-secondaryColor transition-colors hover:text-white cursor-pointer'>
                        Sign In Now
                    </span>
                </div>
            </div>
        </div>
    );
}
