import React from 'react';
import { SidebarLayout } from '../components';

export default function Polls() {
    return <div>Polls</div>;
}

Polls.getLayout = function getLayout(page) {
    return <SidebarLayout>{page}</SidebarLayout>;
};
