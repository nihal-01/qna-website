import React from 'react';
import { ProfileHero, SidebarLayout, ProfileLayout } from '../../components';

export default function Profile() {
    return <div>Hello</div>;
}

Profile.getLayout = function getLayout(page) {
    return (
        <>
            <ProfileHero />
            <SidebarLayout>
                <ProfileLayout />
                {page}
            </SidebarLayout>
        </>
    );
};
