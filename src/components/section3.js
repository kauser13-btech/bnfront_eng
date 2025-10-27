'use client'

import { useState, useEffect } from 'react';
import styles from "@/css_module/section3.module.css";
import ViewImg from "./viewImg";
import Link from "next/link";
import axios from 'axios';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CustomLink from "./customLink";

const Section3 = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gallery/homevideos`, {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            setPosts(response.data);
        }).catch(function (res) {
            console.log('error', res)
        });
    }, []);

    const sliderSettings = {
        dots: false, // নিচে ডট (পেইজ ইনডিকেটর) দেখাবে
        infinite: true, // স্লাইডগুলো লুপ করবে
        speed: 500, // স্লাইড ট্রানজিশনের স্পিড
        slidesToShow: 6, // একবারে কয়টি স্লাইড দেখাবে
        slidesToScroll: 1, // একবারে কয়টি স্লাইড স্ক্রল করবে
        autoplay: true, // অটো প্লে হবে কি না
        autoplaySpeed: 3000, // অটো প্লে স্পিড (মিলিসেকেন্ডে)
        arrows: true, // নেভিগেশন তীর দেখাবে কি না
        responsive: [ // রেসপনসিভ সেটিংস
            {
                breakpoint: 1024, // 1024px এর নিচে
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600, // 600px এর নিচে
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480, // 480px এর নিচে
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    return (
        <section className="container section3 mt-4">
            <div className="">
                <h3 className="border-bottom  pb-2 mb-2">Video Gallery</h3>
                <div className="row">
                    {posts && posts.slice(0, 2).map((row, i) =>
                        <div key={i} className="col-12 col-xl-6 mb-4 mb-xl-0">
                            <div className="position-relative">
                                <div className="position-relative">
                                    <ViewImg image={row.cover_photo} cls="h-100 w-100 border-0" alt={row.name} />
                                    <div className="position-absolute shadow top-50 start-50 translate-middle">
                                        <span className="rounded-circle bg-light d-flex justify-content-center align-items-center isVideoIcon-big" >
                                            <i className="bi bi-play-fill text-danger"></i>
                                        </span>
                                    </div>
                                </div>
                                <h5 className=" mt-3">{row.name}</h5>
                                <CustomLink prefetch={false} className="stretched-link" href={`/video/play/${row.id}`}></CustomLink>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-4">
                    <Slider {...sliderSettings}>
                        {posts.slice(2).map((row, i) =>
                            <div className={`${styles.slickSlideItem} position-relative`} key={i}>
                                <ViewImg image={row.cover_photo} cls={`rounded h-100 w-100 border-bottom-0 ${styles.mainImage}`} alt={row.name} />
                                <div className={`position-absolute w-100 px-3 pt-4 ${styles.leadnewsTitle}`}>
                                    <h5 className="text-white text-limit-2">{row.name}</h5>
                                </div>

                                <CustomLink prefetch={false} className="stretched-link" href={`/video/play/${row.id}`}></CustomLink>
                            </div>

                        )}
                    </Slider>
                </div>

            </div>
        </section>
    );
};

export default Section3;