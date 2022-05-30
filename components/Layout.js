import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

import { Header, Footer } from '.';
import axios from '../axios';
import {
    fetchCategories,
    updateRightSidebarLoading,
    updateSidebarData,
} from '../redux/slices/questionSlice';
import { updateUser } from '../redux/slices/userSlice';
import { useEnhancedEffect } from '../utils';

export default function Layout({ children }) {
    const dispatch = useDispatch();

    useEnhancedEffect(() => {
        dispatch(
            updateUser(
                Cookies.get('user-info')
                    ? JSON.parse(Cookies.get('user-info'))
                    : ''
            )
        );
    });

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
