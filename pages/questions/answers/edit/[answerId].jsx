import React from 'react';

import { getSingleAnswer } from '../../../../helpers/answerHelpers';
import { Breadcrumbs, BtnLoader, SidebarLayout } from '../../../../components';
import { useState } from 'react';
import axios from '../../../../axios';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const styles = {
    container: `h-[100%] w-[100%]`,
    header: `block p-[15px] lg:p-[30px] lg:flex items-center justify-between border-b-2 border-borderColor`,
    formWrapper: `px-[15px] py-[30px] lg:p-[30px]`,
    formTextarea: `w-[100%] border border-borderColor outline-none rounded-sm resize-none p-[10px] mb-[1.2em]`,
    mainBtn: `h-[45px] lg:h-[47px] bg-secondaryColor w-[100%] text-white font-bold rounded-sm lg:text-[17px] transition-all hover:bg-grayColor disabled:cursor-not-allowed`,
};

export default function EditAnswer({ answerRes }) {
    const answer = JSON.parse(answerRes);
    const [answerTxt, setAnswerTxt] = useState(answer?.answer || '');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { user } = useSelector((state) => state.user);
    const router = useRouter();

    const handleEdit = async (e) => {
        try {
            e.preventDefault();
            if (!answerTxt) {
                return setError('Answer field is empty.');
            }

            setError('');
            setIsLoading(true);

            await axios.patch(
                `/answers/single/${answer._id}`,
                { answer: answerTxt },
                {
                    headers: { Authorization: `Bearer ${user?.token}` },
                }
            );
            router.back();
        } catch (err) {
            setError(
                err?.response?.data?.error || 'Something went wrong, Try again'
            );
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Breadcrumbs crumbs={[{ name: 'Edit Answer' }]} />
            </div>

            <form
                action=''
                className={styles.formWrapper}
                onSubmit={handleEdit}
            >
                <textarea
                    name=''
                    id='answerEdit'
                    cols='30'
                    rows='10'
                    className={styles.formTextarea}
                    value={answerTxt || ''}
                    onChange={(e) => {
                        setAnswerTxt(e.target.value);
                    }}
                ></textarea>
                {error && (
                    <p
                        className={`text-[red] mb-[12px] text-[15px] lg:text-base`}
                    >
                        {error}
                    </p>
                )}
                <button
                    type='submit'
                    className={styles.mainBtn}
                    disabled={isLoading}
                >
                    {isLoading ? <BtnLoader /> : 'Edit Answer'}
                </button>
            </form>
        </div>
    );
}

EditAnswer.getLayout = function getLayout(page) {
    return <SidebarLayout>{page}</SidebarLayout>;
};

export async function getServerSideProps(context) {
    const answer = await getSingleAnswer(context?.query?.answerId);

    return {
        props: {
            answerRes: JSON.stringify(answer),
        },
    };
}
