import React from "react";
import styles from "@/css_module/section6.module.css"
import ViewImg from "./viewImg";
import Link from "next/link";
import CustomLink from "./customLink";
import DesktopAd from "@/ads/desktopAd";

const Section6 = ({ title, data, hrf, adPosition, bannerDesktop, bannerMobile }) => {
    const [leadNews, ...leadNewsMore] = data;

    return (
        <section className="section6 mt-4">
            <div className={`container ${styles.titleBgImg} pb-3`}>
                <div className={`p-4`}>
                    <h3 className="mb-4 pb-2 border-bottom">
                        {title}
                        {hrf != '' &&
                            <CustomLink prefetch={false} className="float-end fs-6 mt-3" href={hrf}>More <i className="bi bi-chevron-right"></i></CustomLink>
                        }
                    </h3>

                    <div className={`row ${styles.carArea}`}>
                        <div className="col-12 order-2 order-xl-1">
                            {leadNewsMore.slice(0, 5).map((row, i) =>
                                <div key={i} className="position-relative mb-3 bg-body-tertiary">
                                    <div className="row">
                                        <div className="col-4 position-relative">
                                            <ViewImg image={row.main_image} cls="h-100 w-100" alt={row.n_head} />
                                            {row.main_video != 0 &&
                                                <div className="position-absolute top-50 start-0 ms-3 translate-middle-y">
                                                    <span className="rounded-circle bg-light border border-2 border-danger d-flex justify-content-center align-items-center isVideoIcon-small" >
                                                        <i className="bi bi-play-fill text-danger"></i>
                                                    </span>
                                                </div>
                                            }
                                        </div>
                                        <div className="col-8">
                                            <h5 className="text-limit-2 mt-2">{row.n_head}</h5>
                                        </div>
                                    </div>
                                    <CustomLink prefetch={false} className="stretched-link" href={`${row.cat_name.slug}/news/bd/${row.n_id}.details`}></CustomLink>
                                </div>
                            )}
                        </div>
                        <div className="col-12 order-1 order-xl-2 pb mb-4 mb-xl-0">
                            <div className={`${styles.leadNews} position-relative`}>
                                <ViewImg image={leadNews.main_image} cls="h-100 w-100 border-bottom-0" alt={leadNews.n_head} />
                                {leadNews.main_video != 0 &&
                                    <div className="position-absolute top-50 start-0 ms-3 translate-middle-y">
                                        <span className="rounded-circle bg-light border border-2 border-danger d-flex justify-content-center align-items-center isVideoIcon-big" >
                                            <i className="bi bi-play-fill text-danger"></i>
                                        </span>
                                    </div>
                                }

                                <h3 className="text-limit-2 mt-2">{leadNews.n_head}</h3>
                                <p className="text-secondary mt-3 text-limit-3 homeSubDesc">{leadNews.n_details}</p>
                                <CustomLink prefetch={false} className="stretched-link" href={`${leadNews.cat_name.slug}/news/bd/${leadNews.n_id}.details`}></CustomLink>
                            </div>
                        </div>
                        <div className="col-12 order-3 order-xl-3">
                            <DesktopAd adData={bannerDesktop} position={adPosition} catId="home" w="300" h="250" />

                            {leadNewsMore.slice(5, 9).map((row, i) =>
                                <div key={i} className="position-relative mb-3 bg-body-tertiary">
                                    <div className="row">
                                        <div className="col-4 position-relative">
                                            <ViewImg image={row.main_image} cls="h-100 w-100 object-fit-cover" alt={row.n_head} />
                                            {row.main_video != 0 &&
                                                <div className="position-absolute top-50 start-0 ms-3 translate-middle-y">
                                                    <span className="rounded-circle bg-light border border-2 border-danger d-flex justify-content-center align-items-center isVideoIcon-small" >
                                                        <i className="bi bi-play-fill text-danger"></i>
                                                    </span>
                                                </div>
                                            }
                                        </div>
                                        <div className="col-8">
                                            <h5 className="text-limit-3 mt-2">{row.n_head}</h5>
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

export default Section6;
