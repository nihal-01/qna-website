import { HomeHero, SidebarLayout } from '../components';

const IS_LOGGEDIN = false;

export default function Home() {
    return <div>Home Page</div>;
}

Home.getLayout = function getLayout(page) {
    return (
        <>
            {!IS_LOGGEDIN && <HomeHero />}
            <SidebarLayout>{page}</SidebarLayout>
        </>
    );
};
