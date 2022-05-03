import React from 'react';
import Image from 'next/image';
import { heroImg } from '../public/images';
import { useSelector } from 'react-redux';

const styles = {
    container: `relative w-[100%] h-[320px] lg:h-[280px] max-h-max overflow-hidden`,
    opacity: `absolute inset-0 bg-[#0006]`,
    wrapper: `absolute inset-0`,
    content: `max-w-[750px] mx-auto lg:max-w-[1500px] p-[15px] lg:px-[30px] h-[100%] flex flex-col items-center justify-center lg:flex-row lg:justify-between gap-[1.5em]`,
    title: `text-white text-[20px] lg:text-[25px] font-bold mb-[7px] lg:mb-[10px]`,
    desc: `text-white max-w-[650px] text-[15px] lg:text-lg`,
    btn: `py-[10px] px-[25px] lg:px-[30px] bg-secondaryColor text-white font-bold rounded-sm transition-all hover:bg-grayColor text-[15px] lg:text-[17px] mr-auto lg:mr-0`,
};

export default function HomeHero() {
    const { user } = useSelector((state) => state.user);

    return (
        <div>
            {user ? (
                <></>
            ) : (
                <div className={styles.container}>
                    <Image
                        src={heroImg}
                        alt=''
                        layout='fill'
                        objectFit='cover'
                    />
                    <div className={styles.opacity}></div>
                    <div className={styles.wrapper}>
                        <div className={styles.content}>
                            <div>
                                <h3 className={styles.title}>
                                    Share & grow the world&#39;s knowledge!
                                </h3>
                                <p className={styles.desc}>
                                    We want to connect the people who have
                                    knowledge to the people who need it, to
                                    bring together people with different
                                    perspectives so they can understand each
                                    other better, and to empower everyone to
                                    share their knowledge.
                                </p>
                            </div>
                            <button className={styles.btn}>
                                Create A New Account
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
