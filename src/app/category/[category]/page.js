import Link from "next/link";
import React from "react";
import LoadMorePagination from "./loadMorePagination";
import ViewImg from "@/components/viewImg";
import styles from "@/css_module/category.module.css";
import CustomLink from "@/components/customLink";
import DesktopAd from "@/ads/desktopAd";
import MobileAd from "@/ads/mobileAd";
import BottomStickyAd from "@/ads/bottomStickyAd";
import MobileBottomStickyAd from "@/ads/mobileBottomStickyAd";

export const revalidate = 60;

const getCategoryData = async (cat, searchParams) => {
    const params = await searchParams;
    const getYear = params.y ? `?y=${params.y}` : '';
    const res = await fetch(`${process.env.API_URL}/online/${cat}${getYear}`, {
        headers: { "Accept-Encoding": "gzip,deflate,compress" },
        next: { revalidate: 60 }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch category data');
    }

    return res.json();
}

export async function generateMetadata({ params, searchParams }) {
    const { category } = await params;
    const data = await getCategoryData(category, await searchParams);

    if (!data.category.data[0]) { return ''; }

    let cat_data = data.category.data[0].cat_name;
    const getUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/category/${category}`;

    return {
        title: cat_data.m_title,
        description: cat_data.m_desc,
        keywords: cat_data.m_keywords,
        alternates: {
            canonical: getUrl,
        },
        openGraph: {
            title: cat_data.m_title,
            description: cat_data.m_desc,
            url: getUrl,
            siteName: 'banglanews24.com',
            publishedTime: cat_data.start_at,
            images: [
                {
                    url: cat_data.main_image,
                    width: 800,
                    height: 600,
                }
            ],
            locale: 'bn_BD',
            type: 'article',
        },
    };
}

const CategoryPage = async ({ params, searchParams }) => {

    const { category } = await params;
    const data = await getCategoryData(category, await searchParams);
    const [firstItem, secondItem, thirdItem, ...moreNews] = data.category.data;

    if (!firstItem) {
        return <h1 className="text-center my-5">Not Found</h1>
    }
    const mID = firstItem.cat_name.m_id

    return (
        <div className="container mt-4">
            <DesktopAd adData={data.banner_desktop} position="desktop-category-section-1" catId={mID} w="970" h="90" />

            <div className="d-none">
                <DesktopAd adData={data.banner_desktop} position="no-ad" catId="catagory" w="970" h="90" />
                <MobileAd adData={data.banner_mobile} position="no-ad" catId="catagory" w="300" h="90" />
            </div>

            <BottomStickyAd adData={data.banner_desktop} position="desktop-catagory-bottom-sticky" catId={mID} w="970" h="90" />
            <MobileBottomStickyAd adData={data.banner_mobile} position="mobile-catagory-bottom-sticky" catId={mID} w="320" h="100" />

            <div className="ad-1x1">
                <DesktopAd adData={data.banner_desktop} position="desktop-catagory-1x1" catId={mID} w="1" h="1" />
                <MobileAd adData={data.banner_mobile} position="mobile-catagory-1x1" catId={mID} w="1" h="1" />
            </div>

            <div className={`row ${styles.carArea}`}>
                <div className="col-12">
                    <div className="position-relative">
                        <div>
                            <ViewImg image={firstItem.main_image} cls="img-fluid w-100 h-auto" alt={firstItem.n_head} />
                        </div>
                        <div className="pt-2">
                            <h1 className="fs-2">{firstItem.n_head}</h1>
                            <p className="text-limit-3">{firstItem.n_details}</p>
                        </div>
                        <CustomLink className="stretched-link" href={`/${firstItem.cat_name.slug}/news/bd/${firstItem.n_id}.details`}></CustomLink>
                    </div>

                    <MobileAd adData={data.banner_mobile} position="mobile-category-section-1" catId={mID} w="300" h="250" />

                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col-6 col-lg-12">
                            <div className="position-relative">
                                <div>
                                    <ViewImg image={secondItem.main_image} cls="img-fluid w-100 h-auto" alt={secondItem.n_head} />
                                </div>
                                <div className="pt-2">
                                    <h4>{secondItem.n_head}</h4>
                                </div>
                                <CustomLink className="stretched-link" href={`/${secondItem.cat_name.slug}/news/bd/${secondItem.n_id}.details`}></CustomLink>
                            </div>
                        </div>
                        <div className="col-6 col-lg-12">
                            <div className="position-relative">
                                <div>
                                    <ViewImg image={thirdItem.main_image} cls="img-fluid w-100 h-auto" alt={thirdItem.n_head} />
                                </div>
                                <div className="pt-2">
                                    <h4>{thirdItem.n_head}</h4>
                                </div>
                                <CustomLink className="stretched-link" href={`/${thirdItem.cat_name.slug}/news/bd/${thirdItem.n_id}.details`}></CustomLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <DesktopAd adData={data.banner_desktop} position="desktop-category-section-2" catId={mID} w="300" h="250" />
                </div>

            </div>

            <DesktopAd adData={data.banner_desktop} position="desktop-category-section-3" mID={mID} w="970" h="90" />

            <LoadMorePagination cat={category} data={moreNews} searchParams={await searchParams} desktpAdData={data.banner_desktop} mobileAdData={data.banner_mobile} catId={mID} />

            <div className="mt-4">
                <DesktopAd adData={data.banner_desktop} position="desktop-category-section-5" catId={mID} w="970" h="90" />
            <MobileAd adData={data.banner_mobile} position="mobile-category-section-5" catId={mID} w="300" h="250" />
            </div>
        </div>

    );
}

export default CategoryPage;