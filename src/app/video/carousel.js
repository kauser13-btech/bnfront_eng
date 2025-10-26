"use client"

import ViewImg from '@/components/viewImg';
import { useEffect } from 'react';
import Script from 'next/script';
import CustomLink from '@/components/customLink';

export default function Carousel({ most_view }) {
    useEffect(() => {
        const startCarousel = () => {
            const el = document.querySelector('#carouselExampleDark');
            if (el && window.bootstrap) {
                new window.bootstrap.Carousel(el, {
                    interval: 5000,
                    ride: 'carousel'
                });
            }
        };

        if (window.bootstrap) {
            startCarousel();
        } else {
            window.addEventListener('bootstrapLoaded', startCarousel);
        }

        return () => window.removeEventListener('bootstrapLoaded', startCarousel);
    }, [most_view]);

    return (
        <>
            <Script
                src="/js/bootstrap.bundle.min.js"
                strategy="afterInteractive"
                onLoad={() => {
                    window.dispatchEvent(new Event('bootstrapLoaded'));
                }}
            />

            <div id="carouselExampleDark" className="carousel carousel-dark slide mb-4" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {most_view.map((row, i) =>
                        <div className={`carousel-item position-relative ${i === 0 ? 'active' : ''}`} key={i} data-bs-interval="5000">
                            <ViewImg image={row.cover_photo} cls="h-100 d-block w-100" alt={row.name} />
                            <div className="carousel-caption bg-secondary-subtle w-100 start-0 bottom-0 py-2">
                                <h3>{row.name}</h3>
                                <p>{row.description}</p>
                            </div>
                            <CustomLink prefetch={false} className="stretched-link" href={`/video/play/${row.id}`}></CustomLink>
                        </div>
                    )}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    );
}
