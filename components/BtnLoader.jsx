import React from 'react';

const styles = {
    loadingWrapper: `flex items-center justify-center`,
    loader: `border-r-2 rounded-full border-y-2 border-l-2 border-l-transparent transition-all animate-spin `,
};

export default function BtnLoader({
    color = 'white',
    largeSize = 30,
    smallSize = 25,
}) {
    return (
        <div className={styles.loadingWrapper}>
            <div
                className={
                    styles.loader +
                    ` border-${color} w-[${smallSize}px] lg:w-[${largeSize}px] h-[${smallSize}px] lg:h-[${largeSize}px]`
                }
            ></div>
        </div>
    );
}
