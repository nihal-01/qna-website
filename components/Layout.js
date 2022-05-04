import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Header, Footer } from '.';
import { fetchCategories } from '../redux/slices/questionSlice';

export default function Layout({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}
