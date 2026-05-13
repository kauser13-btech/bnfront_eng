'use client'

import { useState, useEffect, useRef } from 'react';
import styles from "@/css_module/photogallery.module.css";
import ViewImg from "./viewImg";
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CustomLink from "./customLink";

const Photogallery = () => {
    const [posts, setPosts] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [slidesToShow, setSlidesToShow] = useState(3);
    const sliderRef = useRef(null);

    // Window width detect করার জন্য
    useEffect(() => {
        setIsMounted(true);

        const handleResize = () => {
            const width = window.innerWidth;

            if (width < 576) {
                setSlidesToShow(1); // Mobile - 1টা
            } else if (width < 768) {
                setSlidesToShow(2); // Small Tablet - 2টা
            } else if (width < 992) {
                setSlidesToShow(2); // Tablet - 2টা
            } else if (width < 1200) {
                setSlidesToShow(3); // Medium Desktop - 3টা
            } else {
                setSlidesToShow(3); // Large Desktop - 3টা
            }
        };

        // Initial call
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gallery/homephotos`, {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            setPosts(response.data);
        }).catch(function (res) {
            console.log('error', res)
        });
    }, []);

    const sliderSettings = {
        centerMode: true,
        centerPadding: '0',
        slidesToShow: slidesToShow, // Dynamic value
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        speed: 500,
    };

    if (!isMounted) {
        return null;
    }

    return (
        <section className={`container ${styles.galleryWrapper}`}>
            <style jsx global>{`
                .slick-slider {
                    width: 100%;
                    position: relative;
                }
                
                .slick-list {
                    overflow: hidden;
                }
                
                .slick-slide {
                    padding: 0 10px;
                }
                
                .slick-slide > div {
                    width: 100%;
                }
                
                /* Arrow Buttons Style */
                .slick-prev,
                .slick-next {
                    width: 40px;
                    height: 40px;
                    z-index: 10;
                    background-color: #dc3545 !important;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }
                
                .slick-prev:hover,
                .slick-next:hover {
                    background-color: #c82333 !important;
                    transform: scale(1.1);
                }
                
                .slick-prev:before,
                .slick-next:before {
                    font-size: 20px;
                    color: white !important;
                    opacity: 1;
                }
                
                .slick-prev {
                    left: -45px;
                }
                
                .slick-next {
                    right: -45px;
                }
                
                /* Dots Style */
                .slick-dots {
                    bottom: -35px;
                }
                
                .slick-dots li button:before {
                    font-size: 12px;
                    color: #dc3545;
                    opacity: 0.5;
                }
                
                .slick-dots li.slick-active button:before {
                    opacity: 1;
                    color: #dc3545;
                }
                
                /* Mobile এ arrows container এর inside */
                @media (max-width: 991px) {
                    .slick-prev {
                        left: 10px;
                    }
                    
                    .slick-next {
                        right: 10px;
                    }
                }
                
                @media (max-width: 575px) {
                    .slick-slide {
                        padding: 0 5px;
                    }
                    
                    .slick-prev,
                    .slick-next {
                        width: 35px;
                        height: 35px;
                    }
                    
                    .slick-prev:before,
                    .slick-next:before {
                        font-size: 18px;
                    }
                }
                
                .${styles.slickSlideItem} {
                    width: 100%;
                    display: block !important;
                }
            `}</style>

            <div className="mt-4">
                <h3 className="border-bottom pb-2 mb-2 mx-5">
                    Photo Gallery
                    <CustomLink prefetch={false} className="float-end fs-6 mt-3" href={`/photo`}>
                        More <i className="bi bi-chevron-right"></i>
                    </CustomLink>
                </h3>

                {posts.length > 0 && (
                    <Slider key={slidesToShow} ref={sliderRef} {...sliderSettings}>
                        {posts.slice(0, 10).map((row, i) => (
                            <div key={i}>
                                <div className={`${styles.slickSlideItem} position-relative`}>
                                    <ViewImg
                                        image={row.cover_photo}
                                        cls={`${styles.imageStyle} w-100 border-bottom-0`}
                                        alt={row.name}
                                    />
                                    <p className="text-center fs-6 mt-2" style={{ fontSize: '0.9em' }}>
                                        {row.name}
                                    </p>
                                    <CustomLink
                                        prefetch={false}
                                        className="stretched-link"
                                        href={`/photo/view/${row.id}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </Slider>
                )}

                <div className="row mt-5">
                    {posts && posts.slice(10, 14).map((row, i) => (
                        <div key={i} className="col-6 col-xl-3">
                            <div className="position-relative">
                                <ViewImg
                                    image={row.cover_photo}
                                    cls={`${styles.imageStyle} w-100 border-bottom-0`}
                                    alt={row.name}
                                />
                                <p className="text-center fs-6 mt-2" style={{ fontSize: '0.9em' }}>
                                    {row.name}
                                </p>
                                <CustomLink
                                    prefetch={false}
                                    className="stretched-link"
                                    href={`/photo/view/${row.id}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Photogallery;