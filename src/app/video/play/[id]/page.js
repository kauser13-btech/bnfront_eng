import React from "react";
import Link from "next/link";
import ViewImg from "@/components/viewImg";

export const revalidate = 60;

const getData = async (id) => {
    const res = await fetch(`${process.env.API_URL}/web_videoviewer/${id}`, {
        headers: { "Accept-Encoding": "gzip,deflate,compress" },
        next: { revalidate: 60 }
    });

    await fetch(`${process.env.API_URL}/web_most_view`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
    });

    if (!res.ok) {
        throw new Error('Failed to fetch Details data');
    }

    return res.json();
}

export async function generateMetadata({ params, searchParams }) {
    const { id } = params;
    const data = await getData(id);
    const getUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/video/play/${data.video.id}`;
    return {
        title: data.video.name,
        description: data.video.caption,
        keywords: data.video.meta_keyword,
        alternates: {
            canonical: getUrl,
        },
        openGraph: {
            title: data.video.name,
            description: data.video.caption,
            url: getUrl,
            siteName: 'banglanews24.com',
            publishedTime: data.video.start_at,
            images: [
                {
                    url: data.video.cover_photo,
                    width: 800,
                    height: 600,
                }
            ],
        },
    };
}

const Page = async ({ params }) => {
    const { id } = await params;

    const data = await getData(id);
    const getUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/video/play/${data.video.id}`;

    return (
        <div className="container mb-5">
            <div className="card border-0 shadow-lg rounded-3 overflow-hidden">
                <div className="ratio ratio-16x9">
                    <iframe
                        src={data.video.embed_code}
                        title={data.video.name}
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="card-body bg-white">
                    <h4 className="card-title fw-semibold mb-2 text-dark">
                        🗞️ {data.video.name}
                    </h4>
                    <p className="card-text text-secondary mb-0">{data.video.caption}</p>
                </div>
            </div>

            <div className="mt-5">
                <h6 className="text-uppercase fw-bold mb-3">🔗 Share this Video</h6>
                <ul className="list-inline">
                    <li className="list-inline-item me-3">
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${getUrl}`} target="_blank" className="text-decoration-none text-primary">
                            <i className="bi bi-facebook fs-4 me-1"></i>
                        </a>
                    </li>
                    <li className="list-inline-item me-3">
                        <a href={`https://twitter.com/intent/tweet?url=${getUrl}`} target="_blank" className="text-decoration-none text-info">
                            <i className="bi bi-twitter fs-4 me-1"></i>
                        </a>
                    </li>
                </ul>
            </div>


        </div>

    );
};

export default Page;
