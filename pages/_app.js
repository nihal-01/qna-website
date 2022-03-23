import { Layout } from '../components';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page);

    return <Layout>{getLayout(<Component {...pageProps} />)}</Layout>;
}

export default MyApp;
