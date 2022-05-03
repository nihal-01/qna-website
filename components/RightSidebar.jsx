import React from 'react';
import Link from 'next/link';
import { updateQuestionBox } from '../redux/slices/layoutSlice';
import { useDispatch } from 'react-redux';

const styles = {
    container: `bg-white h-[100%]`,
    askBtnWrapper: `p-[20px] border-b-2 border-[#e4e5e6]`,
    askBtn: `w-[100%] h-[45px] bg-secondaryColor rounded-sm text-white font-semibold transition-colors hover:bg-grayColor`,
};

export default function RightSidebar() {
    const dispatch = useDispatch();

    return (
        <div className={styles.container}>
            <div className={styles.askBtnWrapper}>
                <button
                    className={styles.askBtn}
                    onClick={() => {
                        dispatch(updateQuestionBox(true));
                    }}
                >
                    Ask A Question
                </button>
            </div>
        </div>
    );
}
