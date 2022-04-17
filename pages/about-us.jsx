import React from 'react';

const styles = {
    container: `max-w-[750px] mx-auto lg:max-w-[1500px] lg:px-[30px]`,
    wrapper: `w-[100%] bg-white text-center px-[15px] py-[30px] lg:p-[30px]`,
    contentWrapper: `w-[100%] lg:max-w-[630px] mx-auto`,
    title: `text-primaryColor text-[20px] lg:text-[22px] font-semibold mb-[1em]`,
    paragrah: `text-[#707885] text-[15px] lg:text-[17px]`,
    iframe: `mx-auto w-[450px] max-w-[100%] aspect-video my-[2em]`,
    subTitle: `text-primaryColor text-[16px] lg:text-[19px] font-semibold mb-[6px]`
};

export default function About() {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.contentWrapper}>
                    <h4 className={styles.title}>
                        Our mission is to share and grow <br />
                        the world&#39;s knowledge.
                    </h4>
                    <p className={styles.paragrah}>
                        QNA mission is to share and grow the world&#39;s
                        knowledge. A vast amount of the knowledge that would be
                        valuable to many people is currently only available to a
                        few — either locked in people&#39;s heads, or only
                        accessible to select groups. We want to connect the
                        people who have knowledge to the people who need it, to
                        bring together people with different perspectives so
                        they can understand each other better, and to empower
                        everyone to share their knowledge for the benefit of the
                        rest of the worldu
                    </p>
                    <br />
                    <p className={styles.paragrah}>
                        The potential of this is huge. If we can execute on our
                        mission, we&#39;re going to make a big impact on the
                        world. We just need to get a smart group of people
                        together that can get us there.
                    </p>
                    <iframe
                        src='https://www.youtube.com/embed/JuyB7NO0EYY'
                        title='YouTube video player'
                        className={styles.iframe}
                    ></iframe>

                    <h4 className={styles.title}>
                        Why Choosing Discy <br />
                        Our Values
                    </h4>

                    <h6 className={styles.subTitle}>1. Maximize long-term value</h6>
                    <p className={styles.paragrah}>
                        We are building a product that we hope lasts forever. We
                        want to be a strong and independent engine, this long
                        term focus guides all of the decisions we make.
                    </p>
                    <br />

                    <h6 className={styles.subTitle}>2. Continuously learn and adapt </h6>
                    <p className={styles.paragrah}>
                        We value experimentation, metrics-driven decisions, and
                        speed of iteration. We push to production with every
                        commit so we launch as soon as work is done and learn as
                        quickly as possible.
                    </p>
                    <br />

                    <h6 className={styles.subTitle}>3. Execute</h6>
                    <p className={styles.paragrah}>
                        We value people who have great ideas but who also can
                        quickly drive them all the way to bring their ideas into
                        life.
                    </p>
                    <br />

                    <h6 className={styles.subTitle}>4. Be direct and respectful</h6>
                    <p className={styles.paragrah}>
                        We expect and welcome constant feedback. We trust each
                        other to be open and straightforward, so if you have
                        anything in mind don&#39;t hesitate to call us.
                    </p>
                </div>
            </div>
        </div>
    );
}
