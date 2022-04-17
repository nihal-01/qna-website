import React from 'react';
import { SidebarLayout } from '../components';

export default function Groups() {
    return <div>Groups</div>;
}

Groups.getLayout = function getLayout(page) {
    return <SidebarLayout>{page}</SidebarLayout>;
};
