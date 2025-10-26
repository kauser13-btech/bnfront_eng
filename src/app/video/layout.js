import React from "react";
import CustomLink from "@/components/customLink";

export const revalidate = 60;

async function getData() {
    try {
        const res = await fetch(`${process.env.API_URL}/web_videogallery`, {
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

const VideoLayout = async ({ children }) => {
    const data = await getData();

    if (!data.gallery_cat) {
        return (<div className="loader"></div>);
    }

    return (
        <div className="container mt-4">
            <div className="row flex-column flex-md-row">
                <div className="col-12 col-md-3">
                    <nav className="bg-light p-3 border-end sticky-md-top" style={{ top: '3rem', zIndex: 1020 }}>
                        <h5 className="mb-3 text-center text-md-start fs-4 border-bottom pb-2"><i className="bi bi-tv"></i> ভিডিও</h5>
                        <ul className="nav flex-row flex-md-column text-md-start">
                            <CustomLink className="nav-link fs-5 active" href={`/video`}>হোম</CustomLink>
                            {data.gallery_cat.map((row, i) =>
                                <li key={i} className="nav-item me-3 me-md-0 mb-md-2">
                                    <CustomLink className="nav-link fs-5 active" href={`/video/${row.id}`}>{row.name}</CustomLink>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
                <div className="col-12 col-md-9">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default VideoLayout;
