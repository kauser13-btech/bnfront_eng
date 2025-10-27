import React from "react";
import styles from "@/css_module/section1.module.css"
import ViewImg from "./viewImg";
import Link from "next/link";
import CustomLink from "./customLink";

const Section1 = ({ title, data, hrf = '' }) => {
    if (!data) {
        return '';
    }
    return (
        <section className="section1 mt-4">
            <div className="container">
                <h3 className="mb-4 pb-2 border-bottom">
                    {title}
                    {hrf != '' &&
                        <CustomLink prefetch={false} className="float-end fs-6 mt-3" href={hrf}>All News of {title} <i className="bi bi-chevron-right"></i></CustomLink>
                    }
                </h3>
                <div className="row">

                    {data.slice(0, 4).map((row, i) =>
                        <div key={i} className="col-6 col-lg-3">
                            <div className="mb-3 border-bottom position-relative">
                                <div className="position-relative">
                                    <ViewImg image={row.main_image} cls="card-img-top w-100 h-auto border-top-0 border-start-0 border-end-0" alt={row.n_head} />
                                    {row.main_video != 0 &&
                                        <div className="position-absolute top-50 start-0 ms-1 translate-middle-y">
                                            <span className="rounded-circle bg-light border border-2 border-danger d-flex justify-content-center align-items-center isVideoIcon-mid" >
                                                <i className="bi bi-play-fill text-danger"></i>
                                            </span>
                                        </div>
                                    }
                                </div>
                                <div className="mt-2">
                                    <h5 className={`lh-base ${styles.n_head}`}>{row.n_head}</h5>
                                    <p className="text-secondary mt-3 text-limit-3 homeSubDesc">{row.n_details}</p>
                                </div>
                                <CustomLink prefetch={false} className="stretched-link" href={`${row.cat_name.slug}/news/bd/${row.n_id}.details`}></CustomLink>
                            </div>
                        </div>
                    )}
                    {data.slice(4, 8).map((row, i) =>
                        <div key={i} className="col-12 col-lg-3">
                            <div className="mb-4 border-bottom border-bottom-xl-0 border-bottom-xxl-0">
                                <CustomLink prefetch={false} className={`fs-5 ${styles.titleHead}`} href={`${row.cat_name.slug}/news/bd/${row.n_id}.details`}>{row.n_head}</CustomLink>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Section1;
