"use client"

import React, { useEffect, useState } from "react";
import ViewImg from "@/components/viewImg";
import axios from "axios";
import styles from "@/css_module/details.module.css";
import { htmlDecode, checkEdition, dateToTimeAgoFormat } from '@/helpers';
import Link from "next/link";
import CustomLink from "@/components/customLink";
import DesktopAd from "@/ads/desktopAd";
import MobileAd from "@/ads/mobileAd";
import gnews_logo from '../../../../../../public/img/gnews_logo.png';
import Image from "next/image";

const ArticleComponent = ({ newsData, desktopAdData, mobileAdData, mID }) => {
    const [newsSlice1, setSlice1] = useState('');
    const [newsSlice2, setSlice2] = useState('');
    const [newsSlice3, setSlice3] = useState('');
    const [newsSlice4, setSlice4] = useState('');
    const [newsSlice5, setSlice5] = useState('');
    const [newsUrl, setNewsUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (newsData.n_id) {
            axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news/hit`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                n_id: newsData.n_id,
            });
        }

        if (newsData.n_details) {
            const newsTxt = htmlDecode(newsData.n_details);
            const splitNews = newsTxt.split('</p>');

            const sliceNews1 = splitNews.slice(0, 4).join('</p>');
            const sliceNews2 = splitNews.slice(4, 8).join('</p>');
            const sliceNews3 = splitNews.slice(8, 12).join('</p>');
            const sliceNews4 = splitNews.slice(12, 16).join('</p>');
            const sliceNews5 = splitNews.slice(16).join('</p>');

            if (newsData) {
                setLoading(false);
            }
            if (sliceNews1) {
                setSlice1(`${sliceNews1}</p>`);
            }
            if (sliceNews2) {
                if (sliceNews3) {
                    setSlice2(`${sliceNews2}</p>`);
                } else {
                    setSlice2(sliceNews2);
                }
            }
            if (sliceNews3) {
                if (sliceNews4) {
                    setSlice3(`${sliceNews3}</p>`);
                } else {
                    setSlice3(sliceNews3);
                }
            }
            if (sliceNews4) {
                if (sliceNews5) {
                    setSlice4(`${sliceNews4}</p>`);
                } else {
                    setSlice4(sliceNews4);
                }
            }
            if (sliceNews5) {
                setSlice5(sliceNews5);
            }
            if (newsData.n_id) {
                setNewsUrl(`${process.env.NEXT_PUBLIC_BASE_URL}/${newsData.cat_name.slug}/news/bd/${newsData.n_id}.details`);
            }
        }
    }, [newsData]);

    if (newsData.length == 0) {
        return '';
    }
    if (loading) {
        return (<div className="loader"></div>);
    }

    const printNews = () => {
        event.preventDefault();
        var a = window.open('', '', 'height=800, width=800');
        a.document.write('<html><body>');
        a.document.write(`<img style="width:250px;display:block;margin:0 auto 15px auto;" src="${process.env.NEXT_PUBLIC_BASE_URL}/img/logo.png" alt="Logo" /> <hr/>`);
        a.document.write(`<h3>${(newsData.n_solder) ? htmlDecode(newsData.n_solder) : ''}</h3>`);
        a.document.write(`<h1>${(newsData.n_head) ? htmlDecode(newsData.n_head) : ''} </h1>`);
        a.document.write(`<h4>${(newsData.n_subhead) ? htmlDecode(newsData.n_subhead) : ''} </h4>`);
        a.document.write(`<time>${htmlDecode(newsData.date_at)} </time>`);
        a.document.write(`<img style="width:100%;margin:15px 0 15px 0;" src="${newsData.main_image}" alt="${newsData.n_head}"/>`);
        a.document.write(`<article>${htmlDecode(newsData.n_details)}</article>`);
        a.document.write('</body></html>');
        a.document.close();
        a.print();
    }

    return (
        <>
            <div className="mt-3 pt-3 border-top">
                {(newsData.main_image && newsData.main_video == 0) ?
                    <figure className="figure w-100">
                        <ViewImg image={newsData.main_image} cls="w-100 h-auto" alt={newsData.n_head} />

                        <figcaption className="figure-caption text-right fs-6 pb-2" dangerouslySetInnerHTML={{ __html: newsData.n_caption }} />
                    </figure>
                    : ''}

                {(newsData.main_video == 1) &&
                    <div className="ratio ratio-16x9 mb-4">
                        <iframe className="embed-responsive-item" src={newsData.embedded_code} allowFullScreen></iframe>
                    </div>
                }

                <MobileAd adData={mobileAdData} position="mobile-details-section-2" catId={mID} w="300" h="250" nid={newsData.n_id} />
            </div>
            <div className={styles.articleArea}>
                {(newsSlice1 != '') &&
                    <>
                        <article dangerouslySetInnerHTML={{ __html: newsSlice1 }} />

                        <DesktopAd adData={desktopAdData} position="desktop-details-section-5" catId={mID} w="300" h="250" nid={newsData.n_id} />

                        <MobileAd adData={mobileAdData} position="mobile-details-section-3" catId={mID} w="300" h="250" nid={newsData.n_id} />
                    </>
                }
                {(newsSlice2 != '') &&
                    <>
                        <article dangerouslySetInnerHTML={{ __html: newsSlice2 }} />
                    </>
                }
                {(newsSlice3 != '') &&
                    <>
                        <article dangerouslySetInnerHTML={{ __html: newsSlice3 }} />

                        <DesktopAd adData={desktopAdData} position="desktop-details-section-6" catId={mID} w="300" h="250" nid={newsData.n_id} />

                        <MobileAd adData={mobileAdData} position="mobile-details-section-4" catId={mID} w="300" h="250" nid={newsData.n_id} />
                    </>
                }
                {(newsSlice4 != '') &&
                    <>
                        <article dangerouslySetInnerHTML={{ __html: newsSlice4 }} />

                        <MobileAd adData={mobileAdData} position="mobile-details-section-5" catId={mID} w="300" h="250" nid={newsData.n_id} />
                    </>
                }
                {(newsSlice5 != '') &&
                    <>
                        <article dangerouslySetInnerHTML={{ __html: newsSlice5 }} />
                    </>
                }
                <DesktopAd adData={desktopAdData} position="desktop-details-section-7" catId={mID} w="300" h="250" nid={newsData.n_id} />

                <MobileAd adData={mobileAdData} position="mobile-details-section-6" catId={mID} w="300" h="250" nid={newsData.n_id} />
            </div>

            <div className="ads my-4 d-flex justify-content-center">
                <a href={`https://news.google.com/publications/CAAqLAgKIiZDQklTRmdnTWFoSUtFR0poYm1kc1lXNWxkM015TkM1amIyMG9BQVAB?hl=bn&gl=BD&ceid=BD%3Abn`} target="_blank"><Image src={gnews_logo} width="32" height="32" className="mw-100 h-auto border-0" alt="banglanews24 Google News channel" /> বাংলানিউজটোয়েন্টিফোর খবর পেতে গুগল নিউজ চ্যানেল ফলো করুন. </a>
            </div>

            <ul className="list-group list-group-horizontal border-top border-bottom">
                <li className="list-group-item border-0 ps-0 pe-3">
                    <span className="mt-1 d-block">শেয়ার করুন :</span>
                </li>
                <li className="list-group-item border-0 ps-0 pe-3">
                    <a className="text-dark fs-5" href={`https://www.facebook.com/sharer/sharer.php?u=${newsUrl}`}><i className="bi bi-facebook"></i></a>
                </li>
                <li className="list-group-item border-0 ps-0 pe-3">
                    <a className="text-dark fs-5" href={`https://api.whatsapp.com/send?text=${newsUrl}`}><i className="bi bi-whatsapp"></i></a>
                </li>
                <li className="list-group-item border-0 ps-0 pe-3">
                    <a className="text-dark fs-5" href={`https://twitter.com/share?url=${newsUrl}`}><i className="bi bi-twitter-x"></i></a>
                </li>
                <li className="list-group-item border-0 ps-0 pe-3">
                    <a className="text-dark fs-5" href={`https://www.linkedin.com/shareArticle?url=${newsUrl}`}><i className="bi bi-linkedin"></i></a>
                </li>
            </ul>

            <MobileAd adData={mobileAdData} position="mobile-details-section-7" catId={mID} w="300" h="250" nid={newsData.n_id} />

            {newsData.meta_keyword &&
                <div className="mt-4">
                    <p className="d-inline-flex gap-1">
                        <a className="btn border-0 disabled" aria-disabled="true" role="button" data-bs-toggle="button">টপিক:</a>
                        {newsData.meta_keyword.split(",").map((row, i) =>
                            <CustomLink key={i} href={`/topic/${row}`} className="btn">{row}</CustomLink>
                        )}
                    </p>
                </div>
            }
        </>
    );
};

export default ArticleComponent;
