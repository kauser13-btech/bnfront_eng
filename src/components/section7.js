"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import ViewImg from './viewImg';
import Link from 'next/link';
import CustomLink from './customLink';

export default function Section7() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const isInitialLoad = useRef(true);

    const fetchPosts = useCallback(async (page = currentPage) => {
        if (isLoading || !hasMore) return;
        setIsLoading(true);
        try {
            const response = await fetch(`/api/todayall?page=${page}`);
            const data = await response.json();

            if (data.list.length === 0) {
                setHasMore(false);
            } else {
                setPosts(prevPosts => {
                    // Prevent duplicate posts
                    const newPosts = data.list.data.filter(newPost =>
                        !prevPosts.some(existingPost => existingPost.n_id === newPost.n_id)
                    );
                    return [...prevPosts, ...newPosts];
                });
                setCurrentPage(page + 1);
            }
        } catch (error) {
            console.error('Problem to load those news:', error);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, isLoading, hasMore]);

    useEffect(() => {
        if (isInitialLoad.current) {
            isInitialLoad.current = false;
            fetchPosts(1);
        }
    }, [fetchPosts]);

    const handleLoadMore = () => {
        fetchPosts(currentPage);
    };

    return (
        <div className="container section7">
            <div className="col-12 col-lg-8 mx-auto p-4">
                <h3 className="border-bottom pb-2 mb-3">More News</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {posts.map((row, i) => (
                        <div className="card border-0 bg-transparent rounded-0 mb-3" key={row.n_id || i}>
                            <div className="row g-0">
                                <div className="col-md-4 position-relative">
                                    <ViewImg image={row.main_image} cls="img-fluid mh-auto w-100" alt={row.n_head} />
                                    {row.main_video != 0 &&
                                        <div className="position-absolute top-50 start-0 ms-3 translate-middle-y">
                                            <span className="rounded-circle bg-light border border-2 border-danger d-flex justify-content-center align-items-center isVideoIcon-big" >
                                                <i className="bi bi-play-fill text-danger"></i>
                                            </span>
                                        </div>
                                    }
                                </div>
                                <div className="col-md-8 mt-4 mt-md-0">
                                    <div className="card-body py-0">
                                        <h4 className="card-title">{row.n_head}</h4>
                                        <p className="card-text" dangerouslySetInnerHTML={{ __html: row.n_details }} />
                                        <p className="card-text">
                                            <small className="text-body-secondary">{row.date_at}</small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <CustomLink
                                prefetch={false}
                                className="stretched-link"
                                href={`/${row.cat_name.slug}/news/bd/${row.n_id}.details`}
                            />
                        </div>
                    ))}
                </div>

                {hasMore && (
                    <button
                        onClick={handleLoadMore}
                        disabled={isLoading}
                        className="mt-6 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        {isLoading ? 'Loading...' : 'See More'}
                    </button>
                )}

                {!hasMore && posts.length > 0 && (
                    <p className="mt-6 text-center text-gray-500">All News Displayed</p>
                )}
            </div>
        </div>
    );
}