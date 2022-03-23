import { SidebarLayout } from '../components';

export default function Home() {
    return <div>Home Page</div>;
}

Home.getLayout = function getLayout(page) {
    return <SidebarLayout>{page}</SidebarLayout>;
};
