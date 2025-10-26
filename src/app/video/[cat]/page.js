import React from "react";
import CustomLink from "@/components/customLink";
import ViewImg from "@/components/viewImg";
import LoadVideoPagination from "./loadVideoPagination";

export const revalidate = 60;

async function getData(id) {
    try {
        const res = await fetch(`${process.env.API_URL}/gallery_cat/${id}`, {
            headers: { "Accept-Encoding": "gzip,deflate,compress" },
            next: { revalidate: 60 }
        });
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        return data || [];
    } catch (error) {
        return [];
    }
}

export async function generateMetadata({ params, searchParams }) {
    const { cat } = await params;
    const data = await getData(cat);

    const getUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/gallery_cat/${cat}`;

    return {
        title: `Banglanews24 Video || ${cat}`,
        description: 'BanglaNews24 is the most popular online Bangla news portal in Bangladesh covering all latest BD News and international news Top and instant 24 7 Live News provider in BD',
        alternates: {
            canonical: getUrl,
        },
        openGraph: {
            title: `Banglanews24 Video || ${cat}`,
            description: 'BanglaNews24 is the most popular online Bangla news portal in Bangladesh covering all latest BD News and international news Top and instant 24 7 Live News provider in BD',
            url: getUrl,
            siteName: 'banglanews24.com',
            images: [
                {
                    url: 'https://www.banglanews24.com/default-img.jpg',
                    width: 800,
                    height: 600,
                }
            ],
            locale: 'bn_BD',
            type: 'article',
        },
    };
}

const Page = async ({ params }) => {
    const { cat } = await params;
    const data = await getData(cat);

    if (!data) {
        return (<div className="loader"></div>);
    }

    return (
        <div className="row">
            {data.data.map((row, i) =>
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

            <LoadVideoPagination cat={cat} />
        </div>
    );
};

export default Page;
