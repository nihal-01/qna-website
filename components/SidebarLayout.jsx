import React from 'react';

import { LeftSidebar, RightSidebar } from '.';

const styles = {
    container: `relative w-[100%] max-w-[750px] mx-auto lg:max-w-[1500px] overflow-hidden lg:px-[30px] lg:flex xl:grid lg:gap-[20px] `,
    leftSidebar: `hidden lg:block lg:flex-[25%]`,
    rightSidebar: `hidden xl:block border-x border-[#e4e5e6]`,
    mainContent: `w-[100%] border-x border-[#e4e5e6] bg-white`,
};

export default function SidebarLayout({ children, right = true }) {
    return (
        <div
            className={
                styles.container +
                (right
                    ? 'xl:grid-cols-[15%,auto,22%]'
                    : 'xl:grid-cols-[15%,auto]')
            }
        >
            <div className={styles.leftSidebar}>
                <LeftSidebar />
            </div>
            <div className={styles.mainContent}>{children}</div>
            {right && (
                <div className={styles.rightSidebar}>
                    <RightSidebar />
                </div>
            )}
        </div>
    );
}
