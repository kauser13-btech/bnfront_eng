import React from "react";
import styles from "@/css_module/leadNews.module.css"
import ViewImg from "./viewImg";
import HomeVideo from "./homeVideo";
import CustomLink from "./customLink";
import DesktopAd from "@/ads/desktopAd";
import MobileAd from "@/ads/mobileAd";

const LeadNews = ({ data, bannerDesktop, bannerMobile, specialVideo, homeVideoSlide }) => {
    const [leadNews, ...leadMore] = data;

    return (
        <section className="container mt-3">
            <div className={`row ${styles.newLeadArea}`}>
                <div className="col-12">
                    <div className="row">
                        <div className="col-12 col-xl-7">
                            <div className="position-relative">
                                <div className={`position-relative bg-dark ${styles.leadnewsArea}`}>
                                    <ViewImg image={leadNews.main_image} cls="h-100 w-100 border-bottom-0" alt={leadNews.n_head} />
                                    <div className={`position-absolute w-100 px-3 pt-4 ${styles.leadnewsTitle}`}>
                                        <h1 className="text-white text-limit-2 fs-2 fw-semibold">{leadNews.n_head}</h1>
                                    </div>
                                </div>
                                <p className="text-secondary mt-3 homeSubDesc" dangerouslySetInnerHTML={{ __html: leadNews.n_details }} />
                                <CustomLink className="stretched-link" href={`${leadNews.cat_name.slug}/news/bd/${leadNews.n_id}.details`}></CustomLink>

                                {leadNews.main_video != 0 &&
                                    <div className="position-absolute top-50 start-0 ms-3 translate-middle-y">
                                        <span className="rounded-circle bg-light border border-2 border-danger d-flex justify-content-center align-items-center isVideoIcon-big" >
                                            <i className="bi bi-play-fill text-danger"></i>
                                        </span>
                                    </div>
                                }

                            </div>
                            <MobileAd adData={bannerMobile} position="mobile-home-section-2" catId="home" w="320" h="100" />
                        </div>
                        <div className="col-12 col-xl-5">
                            {leadMore.slice(0, 5).map((row, i) =>
                                <div key={i} className="row position-relative mb-2">
                                    <div className="col-8">
                                        <h5 className="text-limit-3 fw-semibold">{row.n_head}</h5>
                                    </div>
                                    <div className="col-4 ps-0 position-relative">
                                        <h3><ViewImg image={row.main_image} cls="h-100 w-100" alt={row.n_head} /></h3>

                                        {row.main_video != 0 &&
                                            <div className="position-absolute top-50 start-0 ms-1 translate-middle-y">
                                                <span className="rounded-circle bg-light border border-2 border-danger d-flex justify-content-center align-items-center isVideoIcon-small" >
                                                    <i className="bi bi-play-fill text-danger"></i>
                                                </span>
                                            </div>
                                        }

                                    </div>
                                    <CustomLink className="stretched-link" href={`${row.cat_name.slug}/news/bd/${row.n_id}.details`}></CustomLink>
                                    {i < 4 &&
                                        <div className="col-12"><div className="border-bottom"></div></div>
                                    }
                                </div>
                            )}
                            <MobileAd adData={bannerMobile} position="mobile-home-section-3" catId="home" w="320" h="250" />
                        </div>
                    </div>
                    <div className="border-top overflow-hidden">
                        <div className="row pt-2">
                            {leadMore.slice(5, 8).map((row, i) =>
                                <div key={i} className={`col-12 col-xl-4 mb-2 pb-2 mb-lg-0 border-bottom ${i == 1 && 'px-xl-0'}`}>
                                    <div className={`position-relative ${styles.leadMoreUnderline} ${i == 1 && 'pe-xl-2'} ${i < 2 && 'border-end-xl border-end-xxl'}`}>
                                        <p className="fw-semibold text-limit-2 fs-5">{row.n_head}</p>
                                        <span className="text-secondary mt-3 text-limit-3 homeSubDesc" dangerouslySetInnerHTML={{ __html: row.n_details }} />

                                        <CustomLink className="stretched-link" href={`${row.cat_name.slug}/news/bd/${row.n_id}.details`}></CustomLink>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="row mt-3">
                            {leadMore.slice(8, 11).map((row, i) =>
                                <div key={i} className="col-12 col-lg-4">
                                    <div className="mb-3 position-relative">
                                        <div className="row">
                                            <div className="col-4 col-lg-12">
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
                                            </div>
                                            <div className="col-8 col-lg-12">
                                                <div className="mt-2">
                                                    <h5 className={`lh-base ${styles.n_head}`}>{row.n_head}</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <CustomLink prefetch={false} className="stretched-link" href={`${row.cat_name.slug}/news/bd/${row.n_id}.details`}></CustomLink>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                    
                    <DesktopAd adData={bannerDesktop} position="desktop-home-section-2" catId="home" w="728" h="90" />

                </div>
                <div className="col-12">
                    <DesktopAd adData={bannerDesktop} position="desktop-home-section-3" catId="home" w="300" h="250" />
                    
                    <MobileAd adData={bannerMobile} position="mobile-home-section-4" catId="home" w="320" h="250" />

                    <HomeVideo specialVideo={specialVideo} homeVideoSlide={homeVideoSlide} />

                    <DesktopAd adData={bannerDesktop} position="desktop-home-section-4" catId="home" w="300" h="250" />
                </div>
            </div>
        </section>
    );
};

export default LeadNews;
