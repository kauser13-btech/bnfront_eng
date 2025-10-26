'use client'

import { useState, useEffect } from 'react';
import styles from "@/css_module/photogallery.module.css"; // Your CSS module
import ViewImg from "./viewImg";
import axios from 'axios';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CustomLink from "./customLink";


const Photogallery = () => {
    const [posts, setPosts] = useState([]);

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
        slidesToShow: 3,
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    };

    return (
        <section className={`container ${styles.galleryWrapper}`}>
            <div className="mt-4">
                <h3 className="border-bottom pb-2 mb-2 mx-5">
                    ফটো গ্যালারি
                    <CustomLink prefetch={false} className="float-end fs-6 mt-3" href={`/photo`}>আরও <i className="bi bi-chevron-right"></i></CustomLink>
                </h3>

                <Slider {...sliderSettings}>
                    {posts && posts.slice(0, 10).map((row, i) => (
                        <div key={i} className={`${styles.slickSlideItem} position-relative`}>
                            <ViewImg image={row.cover_photo} cls={`${styles.imageStyle} w-100 border-bottom-0`} alt={row.name} />
                            <p className="text-center fs-6 mt-2" style={{ fontSize: '0.9em' }}>{row.name}</p>
                            <CustomLink prefetch={false} className="stretched-link" href={`/photo/view/${row.id}`}></CustomLink>
                        </div>
                    ))}
                </Slider>

                <div className="row mt-5">
                    {posts && posts.slice(10, 4).map((row, i) => (
                        <div key={i} className="col-6 col-xl-3">
                            <div className="position-relative">
                                <ViewImg image={row.cover_photo} cls={`${styles.imageStyle} w-100 border-bottom-0`} alt={row.name} />
                                <p className="text-center fs-6 mt-2" style={{ fontSize: '0.9em' }}>{row.name}</p>
                                <CustomLink prefetch={false} className="stretched-link" href={`/photo/view/${row.id}`}></CustomLink>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Photogallery;