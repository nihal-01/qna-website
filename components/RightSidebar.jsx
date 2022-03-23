import React from 'react';
import Link from 'next/link';

const styles = {
    container: `bg-white h-[100%]`,
    askBtnWrapper: `p-[20px] border-b-2 border-[#e4e5e6]`,
    askBtn: `w-[100%] h-[45px] bg-secondaryColor rounded-sm text-white font-semibold transition-colors hover:bg-grayColor`,
};

export default function RightSidebar() {
    return (
        <div className={styles.container}>
            <div className={styles.askBtnWrapper}>
                <Link href='add-question'>
                    <a href=''>
                        <button className={styles.askBtn}>
                            Ask A Question
                        </button>
                    </a>
                </Link>
            </div>
        </div>
    );
}
