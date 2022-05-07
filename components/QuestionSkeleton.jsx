import React from 'react';

const styles = {
    container: `relative w-[100%] h-auto animate-pulse px-[15px] py-[15px] lg:p-[30px] border-b border-borderColor`,
    header: `flex gap-[20px]`,
    avatar: `min-w-[50px] w-[50px] min-h-[50px] h-[50px] rounded-full p-[4px] bg-slate-300 `,
    name: `block w-[150px] h-[20px] bg-slate-200`,
    badge: `block w-[100px] h-[20px] bg-slate-200`,
    title1: `w-[100%] h-[25px] bg-slate-200`,
    title2: `w-[30%] h-[25px] bg-slate-200 mt-[10px]`,
    body: `flex gap-[20px]`,
    desc: `w-[100%] h-[16px] bg-slate-200 mb-[14px]`,
    descl: `w-[50%] h-[16px] bg-slate-200`,
    tag: `block w-[100px] h-[30px] bg-slate-200`,
};

export default function QuestionSkeleton() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.avatar}></div>
                <div className='w-[100%]'>
                    <div className='flex gap-[16px] mb-[12px]'>
                        <span className={styles.name}></span>
                        <span className={styles.badge}></span>
                        <span className={styles.badge}></span>
                    </div>
                    <div className={styles.title1}></div>
                    <div className={styles.title2}></div>
                </div>
            </div>
            <div className={styles.body}>
                <div className='min-w-[50px] w-[50px]'></div>
                <div className='w-[100%] mt-[1.5em]'>
                    <div className={styles.desc}></div>
                    <div className={styles.desc}></div>
                    <div className={styles.descl}></div>

                    <div className='flex items-center gap-[16px] mt-[1em]'>
                        <span className={styles.tag}></span>
                        <span className={styles.tag}></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
