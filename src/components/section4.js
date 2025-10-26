import React from "react";
import styles from "@/css_module/section4.module.css"
import ViewImg from "./viewImg";
import Link from "next/link";
import CustomLink from "./customLink";

const Section4 = ({ title, data, hrf = '' }) => {
    const [leadNews, ...leadNewsMore] = data;

    return (
        <section>
            <h3 className="mb-3 pb-2 border-bottom">
                {title}
                {hrf != '' &&
                    <CustomLink prefetch={false} className="float-end fs-6 mt-3" href={hrf}>আরও <i className="bi bi-chevron-right"></i></CustomLink>
                }
            </h3>

            <div className="position-relative border-bottom mb-3">
                <ViewImg image={leadNews.main_image} cls="h-100 w-100 border-bottom-0" alt={leadNews.n_head} />
                <h5 className="text-black text-limit-2 mt-3">{leadNews.n_head}</h5>
                <p className="text-secondary mt-3 text-limit-3 homeSubDesc">{leadNews.n_details}</p>
                <CustomLink prefetch={false} className="stretched-link" href={`${leadNews.cat_name.slug}/news/bd/${leadNews.n_id}.details`}></CustomLink>
            </div>

            {leadNewsMore.slice(0, 3).map((row, i) =>
                <div className={`${i < 2 && 'border-bottom'}`} key={i}>
                    <h5 className="text-limit-2 mt-2">{row.n_head}</h5>
                </div>
            )}

        </section>
    );
};

export default Section4;
