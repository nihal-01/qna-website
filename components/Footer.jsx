import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
    FaRss,
} from 'react-icons/fa';

import { logoImg } from '../public/images';

const styles = {
    wrapper: `bg-primaryColor`,
    container: `px-[15px] max-w-[750px] mx-auto lg:max-w-[1500px] lg:px-[30px]`,
    footerTop: `py-[20px] lg:grid lg:grid-cols-5 lg:pt-[80px] lg:py-[60px]`,
    infoWrapper: `text-center`,
    logoWrapper: `w-[65px] mx-auto`,
    description: `text-[#707885] mt-[8px] mb-[1.5em] text-[15px] lg:text-base`,
    linksWrapper: `mb-[1.2em] text-center`,
    linksTitle: `text-white text-[17px] font-semibold mb-[10px] lg:text-[18px]`,
    linksList: ``,
    linksListItem: `text-grayColor hover:text-secondaryColor transition-colors text-[15px] mb-[7px] lg:text-base`,
    socialIconsWrapper: `flex items-center justify-center gap-[10px] flex-wrap`,
    socialIcon: `bg-[#1e2128] w-[40px] h-[40px] flex items-center justify-center rounded-full text-grayColor transition-colors hover:bg-secondaryColor hover:text-white`,
    footerBottom: `text-[#707885] text-center py-[20px] border-t border-[#33353c] text-[15px] lg:py-[35px] lg:text-base`,
};

export default function Footer() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.footerTop}>
                    <div className={styles.infoWrapper}>
                        <div className={styles.logoWrapper}>
                            <Image src={logoImg} alt='logo' />
                        </div>
                        <p className={styles.description}>
                            Qna website is a social questions & Answers Engine
                            which will help you establis your community and
                            connect with other people.
                        </p>
                    </div>
                    <div className={styles.linksWrapper}>
                        <h2 className={styles.linksTitle}>About us</h2>
                        <ul className={styles.linksList}>
                            <li className={styles.linksListItem}>
                                <Link href='/users'>Meet the team</Link>
                            </li>
                            <li className={styles.linksListItem}>
                                <Link href='/blog'>BLog</Link>
                            </li>
                            <li className={styles.linksListItem}>
                                <Link href='/about-us'>About us</Link>
                            </li>
                            <li className={styles.linksListItem}>
                                <Link href='/contact-us'>Contact us</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.linksWrapper}>
                        <h2 className={styles.linksTitle}>Legal Stuff</h2>
                        <ul className={styles.linksList}>
                            <li className={styles.linksListItem}>
                                <Link href='/faqs'>Terms of use</Link>
                            </li>
                            <li className={styles.linksListItem}>
                                <Link href='/faqs'>Privacy policy</Link>
                            </li>
                            <li className={styles.linksListItem}>
                                <Link href='/faqs'>Cookie policy</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.linksWrapper}>
                        <h2 className={styles.linksTitle}>Help</h2>
                        <ul className={styles.linksList}>
                            <li className={styles.linksListItem}>
                                <Link href='/faqs'>Knowledge base</Link>
                            </li>
                            <li className={styles.linksListItem}>
                                <Link href='/about-us'>Support</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.linksWrapper}>
                        <h2 className={styles.linksTitle}>Follow</h2>
                        <div className={styles.socialIconsWrapper}>
                            <a href='' className={styles.socialIcon}>
                                <FaFacebookF />
                            </a>
                            <a href='' className={styles.socialIcon}>
                                <FaInstagram />
                            </a>
                            <a href='' className={styles.socialIcon}>
                                <FaTwitter />
                            </a>
                            <a href='' className={styles.socialIcon}>
                                <FaLinkedinIn />
                            </a>
                            <a href='' className={styles.socialIcon}>
                                <FaRss />
                            </a>
                        </div>
                    </div>
                </div>
                <div className={styles.footerBottom}>
                    © {new Date().getFullYear()} QNA. All Rights Reserved <br />
                    With Love by <span style={{ color: '#2f6ff7' }}>Nihal</span>
                </div>
            </div>
        </div>
    );
}
