import React from "react";
import styles from "@/css_module/section9.module.css"
import ViewImg from "./viewImg";
import CustomLink from "./customLink";

const Section9 = ({ title, data, hrf = '', latest, mostRead }) => {
    return (
        <section className="section9 mt-4">
            <div className="container">

                <div className="row">
                    <div className="col-12 col-lg-9 order-2 order-lg-1">
                        <h3 className="mb-4 pb-2 border-bottom">
                            {title}
                            {hrf != '' &&
                                <CustomLink prefetch={false} className="float-end fs-6 mt-3" href={hrf}>More news of {title} <i className="bi bi-chevron-right"></i></CustomLink>
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
                                        <div className="mt-3">
                                            <h5 className={styles.n_head}>{row.n_head}</h5>
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
                    <div className="col-12 col-lg-3 order-2 order-lg-1">
                        <div className="repoTab">
                            <ul className="nav nav-tabs w-100 d-flex" id="myTab" role="tablist">
                                <li className="nav-item flex-fill text-center" role="presentation">
                                    <button
                                        className="nav-link active w-100 fs-5"
                                        id="home-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#home-tab-pane"
                                        type="button"
                                        role="tab"
                                        aria-controls="home-tab-pane"
                                        aria-selected="true"
                                    >
                                        Latest
                                    </button>
                                </li>
                                <li className="nav-item flex-fill text-center" role="presentation">
                                    <button
                                        className="nav-link w-100 fs-5"
                                        id="profile-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#profile-tab-pane"
                                        type="button"
                                        role="tab"
                                        aria-controls="profile-tab-pane"
                                        aria-selected="false"
                                    >
                                        Most Read
                                    </button>
                                </li>
                            </ul>

                            <div className="tab-content border border-top-0 px-3" id="myTabContent">
                                <div
                                    className="tab-pane fade show active"
                                    id="home-tab-pane"
                                    role="tabpanel"
                                    aria-labelledby="home-tab"
                                    tabIndex="0"
                                >
                                    <ul className="list-group list-group-flush">
                                        {latest && latest.map((row, i) =>
                                            <li key={i} className="list-group-item ps-0">
                                                <CustomLink prefetch={false} className={`fs-5`} href={`${row.cat_name.slug}/news/bd/${row.n_id}.details`}>{row.n_head}</CustomLink>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="profile-tab-pane"
                                    role="tabpanel"
                                    aria-labelledby="profile-tab"
                                    tabIndex="0"
                                >
                                    <ul className="list-group list-group-flush">
                                        {mostRead && mostRead.map((row, i) =>
                                            <li key={i} className="list-group-item ps-0">
                                                <CustomLink prefetch={false} className={`fs-5`} href={`${row.cat_name.slug}/news/bd/${row.n_id}.details`}>{row.n_head}</CustomLink>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Section9;
