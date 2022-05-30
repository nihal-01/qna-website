import { Provider } from 'react-redux';
import NextNProgress from 'nextjs-progressbar';

import { Layout } from '../components';
import '../styles/globals.css';
import { store } from '../redux/store';

function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <Provider store={store}>
            <NextNProgress color='#2d6ff7' options={{ showSpinner: false }} />
            <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
        </Provider>
    );
}

export default MyApp;
