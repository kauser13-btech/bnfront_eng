import React from "react";
import styles from "@/css_module/specialSigmenNews.module.css";
import ViewImg from "./viewImg";
import CustomLink from "./customLink";

async function getData() {
    const res = await fetch(`${process.env.API_URL}/web_specialTagNews`, {
        headers: { "Accept-Encoding": "gzip,deflate,compress" },
        // next: { revalidate: 60 }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

const SpecialSigmenNews = async () => {
    const data = await getData();

    if (data.display != 1) {
        return '';
    }

    const [leadNews, ...leadNewsMore] = data.newsData;

    if (!leadNews.n_head) {
        return '';
    }

    return (
        <div className={`${styles.bg}  mt-4`}>
            <div className="container">
                <CustomLink prefetch={false} className={`${styles.title} text-center d-block position-relative mb-3`} href={`/special/${data.tag_id}`}>
                    <span className="d-none d-xl-block">
                        {(data.desktop_img) ?
                            <>
                                <ViewImg image={data.desktop_img} cls="w-100 h-auto" alt={data.title} />
                            </>
                            :
                            <span className="fs-4 pt-3 d-block">
                                <p><i className="bi bi-circle-fill"></i> {data.title}</p>
                            </span>
                        }
                    </span>

                    <span className="d-block d-xl-none">
                        {(data.desktop_img) ?
                            <>
                                <ViewImg image={data.mobile_img} cls="w-100 h-auto" alt={data.title} />
                            </>
                            :
                            <span className="fs-4 pt-3 d-block">
                                <p><i className="bi bi-circle-fill"></i> {data.title}</p>
                            </span>
                        }
                    </span>


                </CustomLink>

                <div className="row">
                    <div className="col-12 col-xl-4 order-2 order-xl-1">
                        <div className="row">
                            {leadNewsMore.slice(0, 2).map((row, i) =>
                                <div key={i} className="col-6">
                                    <div className="position-relative">
                                        <ViewImg image={row.main_image} cls="w-100 h-auto" alt={row.n_head} />
                                        <h5 className={`text-limit-2 mt-2`}>{row.n_head}</h5>
                                        <CustomLink prefetch={false} className="stretched-link" href={`${row.cat_name.slug}/news/bd/${row.n_id}.details`}></CustomLink>
                                    </div>
                                </div>
                            )}
                            {leadNewsMore.slice(2, 3).map((row, i) =>
                                <div key={i} className="col-12 mb-2 mb-xl-0">
                                    <div className="mt-3 pt-3 border-top"></div>
                                    <div className="position-relative row">
                                        <div className="col-4">
                                            <ViewImg image={row.main_image} cls="w-100 h-auto" alt={row.n_head} />
                                        </div>
                                        <div className="col-8">
                                            <h5 className={`text-limit-2 mt-0 mt-lg-2`}>{row.n_head}</h5>
                                        </div>
                                        <CustomLink prefetch={false} className="stretched-link" href={`${row.cat_name.slug}/news/bd/${row.n_id}.details`}></CustomLink>
                                    </div>
                                    <div className="border-bottom mb-2 pb-2 d-block d-lg-none"></div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-12 col-xl-4 order-1 order-xl-2">
                        <div className="position-relative">
                            <ViewImg image={leadNews.main_image} cls="w-100 h-auto" alt={leadNews.n_head} />
                            <h3 className={`text-limit-2 text-center mt-2`}>{leadNews.n_head}</h3>
                            <CustomLink prefetch={false} className="stretched-link" href={`${leadNews.cat_name.slug}/news/bd/${leadNews.n_id}.details`}></CustomLink>
                        </div>
                    </div>
                    <div className="col-12 col-xl-4 order-3 order-xl-3">
                        <div className="row">
                            {leadNewsMore.slice(3, 5).map((row, i) =>
                                <div key={i} className="col-6">
                                    <div className="position-relative">
                                        <ViewImg image={row.main_image} cls="w-100 h-auto" alt={row.n_head} />
                                        <h5 className={`text-limit-2 mt-2`}>{row.n_head}</h5>
                                        <CustomLink prefetch={false} className="stretched-link" href={`${row.cat_name.slug}/news/bd/${row.n_id}.details`}></CustomLink>
                                    </div>
                                </div>
                            )}
                            {leadNewsMore.slice(5, 6).map((row, i) =>
                                <div key={i} className="col-12 mb-2 mb-xl-0">
                                    <div className="mt-3 pt-3 border-top"></div>
                                    <div className="position-relative row">
                                        <div className="col-4">
                                            <ViewImg image={row.main_image} cls="w-100 h-auto" alt={row.n_head} />
                                        </div>
                                        <div className="col-8">
                                            <h5 className={`text-limit-2 mt-0 mt-lg-2`}>{row.n_head}</h5>
                                        </div>
                                        <CustomLink prefetch={false} className="stretched-link" href={`${row.cat_name.slug}/news/bd/${row.n_id}.details`}></CustomLink>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecialSigmenNews;
