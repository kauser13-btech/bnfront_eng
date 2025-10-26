"use client";

import { useState, useEffect } from 'react';
import CustomLink from "@/components/customLink";
import ViewImg from "@/components/viewImg";

export default function LoadVideoPagination() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPosts = async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        try {
            const response = await fetch(`/api/gallery/photogallery?page=${currentPage}`);
            const data = await response.json();

            if (data.data.length === 0) {
                setHasMore(false);
            } else {
                setPosts(prevPosts => [...prevPosts, ...data.data]);
                setCurrentPage(prevPage => prevPage + 1);
            }
        } catch (error) {
            console.error('এই পোস্টগুলি লোড করতে সমস্যা হয়েছে:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="row">
            {posts.map((row, i) =>
                <div key={i} className="col-12 col-xl-3 mb-3 mb-xl-0">
                    <div className="position-relative">
                        <div className="position-relative">
                            <ViewImg image={row.cover_photo} cls="h-100 w-100 border-bottom-0" alt={row.name} />
                            <div className="position-absolute bottom-0 end-0">
                                <i className="bi bi-youtube text-danger fs-2 me-3"></i>
                            </div>
                        </div>

                        <h5 className="text-limit-2 mt-2">{row.name}</h5>
                        <CustomLink prefetch={false} className="stretched-link" href={`/video/play/${row.id}`}></CustomLink>
                    </div>
                </div>
            )}

            {hasMore && (
                <div className="d-flex justify-content-center mt-4">
                <button onClick={fetchPosts} disabled={isLoading} className="btn btn-secondary w-25">{isLoading ? 'লোড হচ্ছে...' : 'আরো দেখুন'}</button>
                </div>
            )}

            {!hasMore && posts.length > 0 && (
                <p className="mt-6 text-center text-gray-500">সব পোস্ট দেখানো হয়েছে</p>
            )}
        </div>
    );
}