import React from "react";
import ViewImg from "@/components/viewImg";
import Photogallery from "./photoGallery";

export const revalidate = 60;

const getData = async (id) => {
    const res = await fetch(`${process.env.API_URL}/web_photoviewer/${id}`, {
        headers: { "Accept-Encoding": "gzip,deflate,compress" },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch Details data');
    }

    return res.json();
}

export async function generateMetadata({ params, searchParams }) {
    const { id } = await params;
    const data = await getData(id);
    const getUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/photo/view/${data.gallery.id}`;
    return {
        title: data.gallery.name,
        description: data.gallery.caption,
        keywords: data.gallery.meta_keyword,
        alternates: {
            canonical: getUrl,
        },
        openGraph: {
            title: data.gallery.name,
            description: data.gallery.caption,
            url: getUrl,
            siteName: 'banglanews24.com',
            publishedTime: data.gallery.start_at,
            images: [
                {
                    url: data.gallery.cover_photo,
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
    // const getUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/photo/view/${data.gallery.id}`;

    return (
        <div className="container my-5">
            <Photogallery gallery={data.gallery} />

            {/* <div className="mt-5">
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
            </div> */}


        </div>

    );
};

export default Page;
