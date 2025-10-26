import React from "react";
import ViewImg from "./viewImg";
import styles from "@/css_module/homeVideo.module.css"
import CustomLink from "./customLink";

const HomeVideo = ({ specialVideo, homeVideoSlide }) => {
    return (
        <section className="homeVideo">
            {specialVideo.embed_code &&
                <div className="ratio ratio-16x9 mb-2 mt-3 mb-3">
                    <iframe src={specialVideo.embed_code} title={specialVideo.name} allowFullScreen></iframe>
                </div>
            }

            <div id="carouselhomevideoSlide" className={`carousel slide mb-2 ${styles.homeVideoSlide}`} data-bs-ride="carousel">
                <div className="carousel-inner">
                    {homeVideoSlide && homeVideoSlide.map((row, i) =>
                        <div key={i} className={`carousel-item position-relative ${i == 0 && 'active'}`}>
                            <div className="row">
                                <div className="col-12">
                                    <ViewImg image={row.cover_photo} cls="d-block w-100 h-100" alt={row.name} />
                                </div>
                                <div className="col-12 pt-1">
                                    <p className={`fs-5 text-limit-2 ${styles.videoIcon}`}>{row.name}</p>
                                </div>
                            </div>
                            <CustomLink prefetch={false} className="stretched-link" href={`/video/play/${row.id}`}></CustomLink>
                        </div>
                    )}

                </div>

                <button className={`carousel-control-prev ${styles.carouselBTN}`} type="button" data-bs-target="#carouselhomevideoSlide" data-bs-slide="prev">
                    <span className={`carousel-control-prev-icon ${styles.videoBTN}`} aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className={`carousel-control-next ${styles.carouselBTN}`} type="button" data-bs-target="#carouselhomevideoSlide" data-bs-slide="next">
                    <span className={`carousel-control-next-icon ${styles.videoBTN}`} aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>

            </div>
        </section>
    );
};

export default HomeVideo;
