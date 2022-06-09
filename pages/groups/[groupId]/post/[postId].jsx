import Head from 'next/head';
import React from 'react';
import {
    Breadcrumbs,
    SidebarLayout,
    SingleGroupHero,
    SinglePost,
} from '../../../../components';
import {
    getGroupPostComments,
    getSingleGroup,
    getSingleGroupPost,
} from '../../../../helpers/groupHelpers';

const styles = {
    container: `h-[100%] w-[100%]`,
    header: `block p-[15px] lg:p-[30px] lg:flex items-center justify-between border-b-2 border-borderColor`,
};

export default function SinglePostPage({ groupRes, postRes, commentsRes }) {
    const group = JSON.parse(groupRes);
    const post = JSON.parse(postRes);
    const comments = JSON.parse(commentsRes);

    return (
        <div className={styles.container}>
            <Head>
                <title>{post.title} - QNA</title>
            </Head>
            <div className={styles.header}>
                <Breadcrumbs
                    crumbs={[
                        { name: group?.title, url: `/groups/${group?._id}` },
                        { name: 'View Post' },
                    ]}
                />
            </div>

            <SinglePost
                post={post}
                groupId={group._id}
                single={true}
                comments={comments}
            />
        </div>
    );
}

SinglePostPage.getLayout = function getLayout(page) {
    return (
        <>
            <SingleGroupHero group={JSON.parse(page.props.groupRes)} />
            <SidebarLayout>{page}</SidebarLayout>
        </>
    );
};

export async function getServerSideProps(context) {
    const group = await getSingleGroup(context?.query.groupId);
    const post = await getSingleGroupPost(context.query.postId);
    const comments = await getGroupPostComments(context.query.postId);

    return {
        props: {
            groupRes: JSON.stringify(group),
            postRes: JSON.stringify(post),
            commentsRes: JSON.stringify(comments),
        },
    };
}
