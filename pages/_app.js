import { Provider, useDispatch } from 'react-redux';

import { Layout } from '../components';
import '../styles/globals.css';
import { store } from '../redux/store';

function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <Provider store={store}>
            <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
        </Provider>
    );
}

export default MyApp;
