import React from "react";
import Link from "next/link";
import { CardSkeleton } from '@/components/skeleton'
import LazySection from "@/components/lazySection";

import styles from "@/css_module/details.module.css";
import Image from 'next/image';
import ViewImg from "@/components/viewImg";
import ArticleComponent from "./article-component";
import MoreNews from "./moreNews";
import CustomLink from "@/components/customLink";
import NewsList from "@/components/newsList";
import WelcomeAd from "@/ads/welcomeAd";
import MobileWelcomeAd from "@/ads/mobileWelcomeAd";
import BottomStickyAd from "@/ads/bottomStickyAd";
import MobileBottomStickyAd from "@/ads/mobileBottomStickyAd";
import DesktopAd from "@/ads/desktopAd";
import MobileAd from "@/ads/mobileAd";

export const revalidate = 60;

const getCategoryData = async (n_id, searchParams) => {
    const res = await fetch(`${process.env.API_URL}/web_details/${n_id}`, {
        headers: { "Accept-Encoding": "gzip,deflate,compress" },
        next: { revalidate: 60 }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch Details data');
    }

    return res.json();
}

export async function generateMetadata({ params, searchParams }) {
    const { details, articleId } = await params;
    const n_id = articleId.endsWith('.details') ? articleId.slice(0, -'.details'.length) : articleId;
    const data = await getCategoryData(n_id);

    const getUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${data.details.cat_name.slug}/news/bd/${articleId}`;

    return {
        title: data.details.n_head,
        description: data.details.meta_description,
        keywords: data.details.meta_keyword,
        alternates: {
            canonical: getUrl,
        },
        openGraph: {
            title: data.details.n_head,
            description: data.details.meta_description,
            url: getUrl,
            siteName: 'banglanews24.com',
            publishedTime: data.details.datePublished,
            images: [
                {
                    url: data.details.openGraphImg,
                    width: 800,
                    height: 600,
                }
            ],
        },
    };
}

const DetailsPage = async ({ params }) => {
    const { category, articleId } = await params;
    const n_id = articleId.endsWith('.details') ? articleId.slice(0, -'.details'.length) : articleId;

    const data = await getCategoryData(n_id);

    let newsData = data.details;
    const mID = data.details.cat_name.m_id

    return (
        <div className="container mt-4">
            <div className="d-none">
                <DesktopAd adData={data.banner_desktop} position="no-ad" catId={mID} w="970" h="90" nid={data.details.n_id} />
                <MobileAd adData={data.banner_mobile} position="no-ad" catId={mID} w="970" h="90" nid={data.details.n_id} />
            </div>

            {/* <WelcomeAd adSlotId="WelcomeADArticlePage" timeOut="13000" /> */}
            {/* <MobileWelcomeAd adSlotId="ArticleMobile" timeOut="13000" /> */}

            {/* <BottomStickyAd adData={data.banner_desktop} position="desktop-details-bottom-sticky" catId={mID} w="970" h="90" nid={data.details.n_id} /> */}
            {/* <MobileBottomStickyAd adData={data.banner_mobile} position="mobile-details-bottom-sticky" catId={mID} w="320" h="100" nid={data.details.n_id} /> */}

            <div className="ad-1x1">
                <DesktopAd adData={data.banner_desktop} position="desktop-details-1x1" catId={mID} w="1" h="1" nid={data.details.n_id} />
                <MobileAd adData={data.banner_mobile} position="mobile-details-1x1" catId={mID} w="1" h="1" nid={data.details.n_id} />
            </div>

            <DesktopAd adData={data.banner_desktop} position="desktop-details-section-1" catId={mID} w="970" h="90" nid={data.details.n_id} />

            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#"><i className="bi bi-house"></i></a></li>
                <li className="breadcrumb-item"><CustomLink href={`/category/${newsData.cat_name.slug}`}>{newsData.cat_name.m_name}</CustomLink></li>
            </ol>

            <MobileAd adData={data.banner_mobile} position="mobile-details-section-1" catId={mID} w="320" h="100" nid={data.details.n_id} />

            {newsData.n_solder &&
                <span className={`${styles.n_solder} text-danger`} dangerouslySetInnerHTML={{ __html: newsData.n_solder }} />
            }

            <h1 className="my-3">{newsData.n_head}</h1>

            {(newsData.n_subhead) &&
                <h6 className={`mb-2 text-secondary ${styles.n_subhead}`} dangerouslySetInnerHTML={{ __html: newsData.n_subhead }} />
            }

            {newsData.writers_name &&
                <div className={`row ${styles.card_profile}`}>
                    <div className="card-profile my-1 d-block">
                        <div className="row">
                            <div className="col-2 col-md-1 pe-0 text-center">
                                {newsData.writers_img ?
                                    <Image src={newsData.writers_img} alt={newsData.writers_name} width={100} height={100} quality={100} />
                                    : ''}
                            </div>
                            <div className="col">
                                {newsData.get_writers ?
                                    <a href={`/author/${newsData.get_writers.id}`} className="m-0 p-0">
                                        <b className="fs-6">{newsData.writers_name} </b>
                                        {newsData.n_author}
                                        <span className="d-block text-muted">{newsData.writers_profession}</span>
                                    </a>
                                    : ''}
                            </div>
                        </div>
                    </div>
                </div>
            }

            {((newsData.reporter_name == '' || newsData.writers_name == '') && newsData.n_author) &&
                <h6 className="fw-bold my-4"><i className="bi bi-pen"></i> {newsData.n_author}</h6>
            }

            <time className="text-black-50">
                <i className="bi bi-stopwatch text-primary me-2"></i>
                Publish: {newsData.date_at}
                {(newsData.updated_by != null && newsData.edit_at != '') && ` | Update: ${newsData.edit_at}`}
            </time>

            <div className="border-top pt-2 mt-2">
                <div className={`row ${styles.detailsArea}`}>
                    <div className="col-12">
                        <ArticleComponent newsData={newsData} desktopAdData={data.banner_desktop} mobileAdData={data.banner_mobile} mID={mID} />

                        <div className="mt-4 border-top">
                            {data.more_news.map((moreNews, i) =>
                                <LazySection key={i} fallback={<CardSkeleton />}>
                                    <MoreNews moreNewsData={moreNews} />
                                </LazySection>
                            )}
                        </div>
                    </div>
                    <div className="col-12">
                        <DesktopAd adData={data.banner_desktop} position="desktop-details-section-2" catId={mID} w="300" h="250" nid={data.details.n_id} />

                        <NewsList data={data.latest} title="Latest News" />

                        <div className="mt-4">
                            <DesktopAd adData={data.banner_desktop} position="desktop-details-section-3" catId={mID} w="300" h="250" nid={data.details.n_id} />
                        </div>

                        <div className="sticky-top">
                            <NewsList data={data.most_read} title="Most Read" />

                            <div className="my-4">
                                <DesktopAd adData={data.banner_desktop} position="desktop-details-section-4" catId={mID} w="300" h="250" nid={data.details.n_id} />
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </div>

    );
}

export default DetailsPage;