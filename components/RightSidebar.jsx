import React from 'react';
import Link from 'next/link';
import {
    updateQuestionBox,
    updateSigninBox,
} from '../redux/slices/layoutSlice';
import { useDispatch, useSelector } from 'react-redux';

const styles = {
    container: `bg-white h-[100%]`,
    askBtnWrapper: `p-[20px] border-b-2 border-[#e4e5e6]`,
    askBtn: `w-[100%] h-[45px] bg-secondaryColor rounded-sm text-white font-semibold transition-colors hover:bg-grayColor`,
};

export default function RightSidebar() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const handleAskBtn = () => {
        if (user) {
            return dispatch(updateQuestionBox(true));
        }
        dispatch(updateSigninBox(true));
    };

    return (
        <div className={styles.container}>
            <div className={styles.askBtnWrapper}>
                <button className={styles.askBtn} onClick={handleAskBtn}>
                    Ask A Question
                </button>
            </div>
        </div>
    );
}
