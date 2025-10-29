import React from "react";
import styles from "@/css_module/section8.module.css"
import ViewImg from "./viewImg";
import CustomLink from "./customLink";
import DesktopAd from "@/ads/desktopAd";

const Section8 = ({ title, data, hrf = '', adPosition, bannerDesktop, bannerMobile }) => {
    const [leadNews, ...leadNewsMore] = data;

    return (
        <section className="section8 mt-4">
            <div className="container">
                <h3 className="mb-4 pb-2 border-bottom">
                    {title}
                    {hrf != '' &&
                        <CustomLink prefetch={false} className="float-end fs-6 mt-3" href={hrf}>More news of {title} <i className="bi bi-chevron-right"></i></CustomLink>
                    }
                </h3>
                <div className={`${styles.carArea} row`}>
                    <div className="col-12 order-2 order-xl-1">
                        <div className="mt-3">
                            {leadNewsMore.slice(0, 5).map((row, i) =>
                                <div key={i} className={`position-relative ${i < 4 && 'mb-3 pb-3 border-bottom'}`}>
                                    <div className="row">
                                        <div className="col-5">
                                            <ViewImg image={row.main_image} cls="card-img-top w-100 h-auto border-top-0 border-start-0 border-end-0" alt={row.n_head} />
                                        </div>
                                        <div className="col-7">
                                            <h5 className={`lh-base ${styles.n_head} text-limit-2`}>{row.n_head}</h5>
                                        </div>
                                    </div>
                                    <CustomLink prefetch={false} className="stretched-link" href={`${row.cat_name.slug}/news/bd/${row.n_id}.details`}></CustomLink>
                                </div>
                            )}
                        </div>

                    </div>
                    <div className="col-12 order-1 order-xl-2">
                        <div className="position-relative">
                            <ViewImg image={leadNews.main_image} cls="card-img-top w-100 h-auto border-top-0 border-start-0 border-end-0" alt={leadNews.n_head} />
                            <div className="mt-3">
                                <h3 className={styles.n_head}>{leadNews.n_head}</h3>
                                <p className="text-secondary mt-3 text-limit-3 homeSubDesc">{leadNews.n_details}</p>
                            </div>
                            <CustomLink prefetch={false} className="stretched-link" href={`${leadNews.cat_name.slug}/news/bd/${leadNews.n_id}.details`}></CustomLink>
                        </div>
                    </div>
                    <div className="col-12 order-3 order-xl-2">
                        <DesktopAd adData={bannerDesktop} position={adPosition} catId="home" w="300" h="250" />

                        <div className="mt-3">
                            {leadNewsMore.slice(5, 10).map((row, i) =>
                                <div key={i} className={`position-relative ${i < 4 && 'mb-3 pb-3 border-bottom'}`}>
                                    <div className="row">
                                        <div className="col-5">
                                            <ViewImg image={row.main_image} cls="card-img-top w-100 h-auto border-top-0 border-start-0 border-end-0" alt={row.n_head} />
                                        </div>
                                        <div className="col-7">
                                            <h5 className={`${styles.n_head} text-limit-2`}>{row.n_head}</h5>
                                        </div>
                                    </div>
                                    <CustomLink prefetch={false} className="stretched-link" href={`${row.cat_name.slug}/news/bd/${row.n_id}.details`}></CustomLink>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Section8;
