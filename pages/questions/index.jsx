import React from 'react';

import { SidebarLayout } from '../../components';

export default function QuestionsPage() {
    return <div>Questions</div>;
}

QuestionsPage.getLayout = function getLayout(page) {
    return <SidebarLayout>{page}</SidebarLayout>;
};
