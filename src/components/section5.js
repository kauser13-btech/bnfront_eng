import React from "react";
import styles from "@/css_module/section5.module.css"
import ViewImg from "./viewImg";
import Link from "next/link";
import CustomLink from "./customLink";

const Section5 = ({ title, data, hrf }) => {
    const [leadNews, ...leadNewsMore] = data;

    return (
        <section className="section5 mt-4">
            <h3 className="mb-4 pb-2 border-bottom">
                {title}
                <CustomLink prefetch={false} className="float-end fs-6 mt-3" href={hrf}>আরও <i className="bi bi-chevron-right"></i></CustomLink>
            </h3>
            <div className="row">
                <div className="col-12 col-xl-6 mb-5 mb-xl-0">
                    <div className="position-relative mb-5">
                        <ViewImg image={leadNews.main_image} cls="h-100 w-100 border-bottom-0" alt={leadNews.n_head} />

                        {leadNews.main_video != 0 &&
                            <div className="position-absolute top-50 start-0 ms-3 translate-middle-y">
                                <span className="rounded-circle bg-light border border-2 border-danger d-flex justify-content-center align-items-center isVideoIcon-big" >
                                    <i className="bi bi-play-fill text-danger"></i>
                                </span>
                            </div>
                        }

                        <div className="w-100 pt-2">
                            <h5 className="text-limit-2">{leadNews.n_head}</h5>
                            <p className="text-secondary mt-3 text-limit-3 homeSubDesc">{leadNews.n_details}</p>
                        </div>
                        <CustomLink prefetch={false} className="stretched-link" href={`${leadNews.cat_name.slug}/news/bd/${leadNews.n_id}.details`}></CustomLink>
                    </div>
                </div>
                <div className="col-12 col-xl-6 mt-4 mt-xl-0">
                    {leadNewsMore.slice(0, 4).map((row, i) =>
                        <div key={i} className="row position-relative mb-2">
                            <div className="col-8">
                                <h5 className="text-limit-3">{row.n_head}</h5>
                            </div>
                            <div className="col-4 ps-0 position-relative">
                                <h3><ViewImg image={row.main_image} cls="h-100 w-100" alt={row.n_head} /></h3>
                            </div>
                            <CustomLink className="stretched-link" href={`${row.cat_name.slug}/news/bd/${row.n_id}.details`}></CustomLink>
                            {i < 3 &&
                                <div className="col-12"><div className="border-bottom"></div></div>
                            }
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Section5;
