import React from 'react';
import { useSelector } from 'react-redux';
import { Breadcrumbs, PagesTopNavbar } from '.';
import { editProfilePageLinks } from '../utils/constants';

const styles = {
    container: `max-w-[750px] lg:max-w-[1500px] mx-auto h-[100%] bg-white border-x`,
    header: `border-b-2 p-[30px]`,
};

export default function EditProfileLayout({ children, crumbName }) {
    const { user } = useSelector((state) => state.user);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Breadcrumbs
                    crumbs={[
                        {
                            name: user?.username,
                            url: `/profile/${user?.username}`,
                        },
                        { name: crumbName || 'Edit Profile' },
                    ]}
                />
            </div>
            <div className='border-b-2'>
                <div className='w-fit mx-auto'>
                    <PagesTopNavbar
                        links={editProfilePageLinks}
                        isProfilePage={true}
                        border={false}
                    />
                </div>
            </div>
            <main>{children}</main>
        </div>
    );
}
