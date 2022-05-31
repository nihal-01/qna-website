import React from 'react';

const styles = {
    loadingWrapper: `flex items-center justify-center`,
    loader: `border-r-2 rounded-full border-y-2 border-l-2 border-l-transparent transition-all animate-spin w-[24px] h-[24px] `,
};

export default function BtnLoader({ color = 'white' }) {
    return (
        <div className={styles.loadingWrapper}>
            <div className={styles.loader + ` border-${color}`}></div>
        </div>
    );
}
