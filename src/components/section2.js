import React from "react";
import styles from "@/css_module/section2.module.css"
import ViewImg from "./viewImg";
import Link from "next/link";
import CustomLink from "./customLink";

const Section2 = ({ title, data, hrf }) => {
    const [leadNews, ...leadNewsMore] = data;

    return (
        <section className="section2 mt-4">
            <div className={`container ${styles.titleBgImg} pb-3`}>
                <h3 className="mb-3 pb-2 border-bottom">
                    {title}
                    {hrf != '' &&
                        <CustomLink prefetch={false} className="float-end fs-6 mt-3" href={hrf}>More <i className="bi bi-chevron-right"></i></CustomLink>
                    }
                </h3>

                <div className="row">
                    <div className="col-12 col-lg-6 mb-4 mb-xl-0">
                        <div className={`${styles.leadNews} position-relative`}>
                            <ViewImg image={leadNews.main_image} cls="h-100 w-100 border-bottom-0" alt={leadNews.n_head} />
                            {leadNews.main_video != 0 &&
                                <div className="position-absolute top-50 start-0 ms-3 translate-middle-y">
                                    <span className="rounded-circle bg-light border border-2 border-danger d-flex justify-content-center align-items-center isVideoIcon-big" >
                                        <i className="bi bi-play-fill text-danger"></i>
                                    </span>
                                </div>
                            }
                            <div className={`position-absolute w-100 px-3 pt-4 ${styles.leadnewsTitle}`}>
                                <h5 className="text-white text-limit-2 fw-bold">{leadNews.n_head}</h5>
                            </div>
                            <CustomLink prefetch={false} className="stretched-link" href={`${leadNews.cat_name.slug}/news/bd/${leadNews.n_id}.details`}></CustomLink>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3">
                        {leadNewsMore.slice(0, 4).map((row, i) =>
                            <div key={i} className={`position-relative ${i < 3 && 'mb-3'} bg-body-tertiary`}>
                                <div className="row">
                                    <div className="col-4 position-relative pe-0">
                                        <ViewImg image={row.main_image} cls={`${styles.minImg} h-100 w-100`} alt={row.n_head} />
                                        {row.main_video != 0 &&
                                            <div className="position-absolute top-50 start-0 ms-1 translate-middle-y">
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
                    <div className="col-12 col-lg-3">
                        {leadNewsMore.slice(4, 8).map((row, i) =>
                            <div key={i} className={`position-relative ${i < 3 && 'mb-3'} bg-body-tertiary`}>
                                <div className="row">
                                    <div className="col-4 position-relative">
                                        <ViewImg image={row.main_image} cls={`${styles.minImg} h-100 w-100`} alt={row.n_head} />
                                        {row.main_video != 0 &&
                                            <div className="position-absolute top-50 start-0 ms-1 translate-middle-y">
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
                </div>
            </div>
        </section>
    );
};

export default Section2;
