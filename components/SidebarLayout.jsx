import React from 'react';
import { LeftSidebar, RightSidebar } from '.';

const styles = {
    container: `max-w-[750px] mx-auto px-[15px] lg:max-w-[1500px] lg:px-[30px] lg:flex xl:grid lg:gap-[20px] xl:grid-cols-[15%,auto,22%]`,
    leftSidebar: `hidden lg:block lg:flex-[25%]`,
    rightSidebar: `hidden xl:block border-x border-[#e4e5e6]`,
    mainContent: `w-[100%] border-x border-[#e4e5e6]`,
};

export default function SidebarLayout({ children }) {
    return (
        <div className={styles.container}>
            <div className={styles.leftSidebar}>
                <LeftSidebar />
            </div>
            <div className={styles.mainContent}>{children}</div>
            <div className={styles.rightSidebar}>
                <RightSidebar />
            </div>
        </div>
    );
}
