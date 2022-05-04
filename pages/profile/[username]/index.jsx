import React from 'react';
import { ProfileHero, SidebarLayout, ProfileLayout } from '../../../components';

export default function About() {
    return <div>Hello</div>;
}

About.getLayout = function getLayout(page) {
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
