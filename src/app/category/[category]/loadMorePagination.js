"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import CustomLink from '@/components/customLink';
import ViewImg from '@/components/viewImg';

import DesktopAd from '@/ads/desktopAd';
import MobileAd from '@/ads/mobileAd';

const LoadMorePagination = ({ cat, data, searchParams, desktpAdData, mobileAdData, mID}) => {
    const router = useRouter();
    const pathname = usePathname();
    const [posts, setPosts] = useState(data);
    const [currentPage, setCurrentPage] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const getYear = searchParams.y;

    const fetchPosts = async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        try {

            let year = (getYear) ? `&y=${getYear}` : '';
            const response = await fetch(`/api/posts?cat=${cat}&page=${currentPage}${year}`, {
                // next: { revalidate: 60 }
            });
            const data = await response.json();

            if (data.category.data.length === 0) {
                setHasMore(false);
            } else {
                setPosts(prevPosts => [...prevPosts, ...data.category.data]);
                setCurrentPage(prevPage => prevPage + 1);
            }
        } catch (error) {
            console.error('Problem to load those News:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = async (event) => {
        let _url = (event.target.value) ? `${pathname}?y=${event.target.value}` : pathname;
        window.location.href = _url;
    }

    return (
        <div className="">

            <div className="row">
                {posts.map((row, i) => (
                    <React.Fragment key={i}>
                        {i == 8 &&
                             <DesktopAd adData={desktpAdData} position="desktop-category-section-4" catId={mID} w="970" h="90" />
                        }
                        
                        {i == 4 &&
                            <MobileAd adData={mobileAdData} position="mobile-category-section-2" catId={mID} w="300" h="250" />
                        }

                        {i == 8 &&
                            <MobileAd adData={mobileAdData} position="mobile-category-section-3" catId={mID} w="300" h="250" />
                        }

                        {i == 12 &&
                            <MobileAd adData={mobileAdData} position="mobile-category-section-4" catId={mID} w="300" h="250" />
                        }
                        <div className="col-lg-3 col-6">
                            <div className="position-relative">
                                <div>
                                    <ViewImg image={row.main_image} cls="img-fluid w-100 h-auto" alt={row.n_head} />
                                </div>
                                <div className="pt-2">
                                    <h5 className="">{row.n_head}</h5>
                                    <p className="text-limit-3">{row.n_details}</p>
                                </div>
                                <CustomLink className="stretched-link" href={`/${row.cat_name.slug}/news/bd/${row.n_id}.details`}></CustomLink>
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </div>

            <div className="col border-bottom pb-4">
                {hasMore && (
                    <div className="d-flex justify-content-center">
                        <button onClick={fetchPosts} disabled={isLoading}
                            className="btn btn-outline-secondary"
                        >
                            {isLoading ? 'Loading...' : 'See More'}
                        </button>
                    </div>
                )}
            </div>

            <div className="row g-3 align-items-center mt-2 justify-content-center">
                <div className="col-auto">
                    <label className="col-form-label text-black-50">Click Here To Read Old News</label>
                </div>
                <div className="col-auto">
                    <select className="form-select w-auto" onChange={async (e) => { await handleChange(e) }} value={getYear}>
                        <option value={(getYear) ? getYear : ''}>{(getYear) ? getYear : '--'}</option>
                        <option value="">Latest</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                    </select>
                </div>
            </div>



            {!hasMore && posts.length > 0 && (
                <p className="mt-6 text-center text-gray-500">সব পোস্ট দেখানো হয়েছে</p>
            )}
        </div>
    );
}


export default LoadMorePagination;