import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MdClose } from 'react-icons/md';

import { LoginForm } from '.';
import { loginImg } from '../public/images';

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
    signUpBtn: `grow-0 w-[100%] h-[45px] bg-primaryColor text-white font-semibold`,
    formWrapper: `p-[15px] lg:p-[50px]`,
    closeBtn: `absolute right-0 top-[-37px] text-3xl text-white `,
    signupTxt: `text-center text-white mt-[10px] font-semibold `,
};

export default function LoginCard({ isLoginOpen, setIsLoginOpen }) {
    return (
        <div
            className={
                styles.container + ` ${isLoginOpen ? 'visible' : 'invisible'}`
            }
            id='loginCardContainer'
            onClick={(e) => {
                if (
                    e.target === document.getElementById('loginCardContainer')
                ) {
                    setIsLoginOpen(false);
                }
            }}
        >
            <div
                className={styles.cardWrapper}
                id='loginCard'
                onClick={(e) => {
                    if (e.target === document.getElementById('loginCard')) {
                        setIsLoginOpen(false);
                    }
                }}
            >
                <div
                    className={
                        styles.card +
                        ` ${
                            isLoginOpen
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
                                <h3 className={styles.heading}>Sign In</h3>
                                <p className={styles.para}>
                                    Login to our social questions & Answers
                                    Engine to ask questions answer people&#39;s
                                    questions & connect with other people.
                                </p>
                            </div>
                            <button className={styles.signUpBtn}>
                                Sign Up Here
                            </button>
                        </div>
                    </div>
                    <div className={styles.formWrapper}>
                        <LoginForm />
                    </div>
                    <button
                        className={styles.closeBtn}
                        onClick={() => {
                            setIsLoginOpen(false);
                        }}
                    >
                        <MdClose />
                    </button>
                </div>
                <div className={styles.signupTxt}>
                    Don&#39;t have account,{' '}
                    <span className='text-secondaryColor transition-colors hover:text-white cursor-pointer'>
                        Sign Up Here
                    </span>
                </div>
            </div>
        </div>
    );
}
