import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Header, Footer } from '.';
import axios from '../axios';
import {
    fetchCategories,
    updateRightSidebarLoading,
    updateSidebarData,
} from '../redux/slices/questionSlice';

export default function Layout({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const fetchData = useCallback(async () => {
        try {
            const res = await axios.get('/right-sidebar');
            dispatch(updateSidebarData(res.data));
            dispatch(updateRightSidebarLoading(false));
        } catch (err) {
            console.log(err);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}
