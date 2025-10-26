import React from "react";
import CustomLink from "@/components/customLink";
import ViewImg from "@/components/viewImg";
import LoadVideoPagination from "./loadVideoPagination";

export const revalidate = 60;

async function getData() {
    try {
        const res = await fetch(`${process.env.API_URL}/web_photogallery`, {
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

const Page = async ({ params }) => {
    const data = await getData();

    if (!data) {
        return (<div className="loader"></div>);
    }

    return (
        <div className="container">
            <div className="row">
                {data.data.map((row, i) =>
                    <div key={i} className="col-12 col-xl-3 mb-3 mb-xl-0">
                        <div className="position-relative">
                            <div className="position-relative">
                                <ViewImg image={row.cover_photo} cls="h-100 w-100 border-bottom-0" alt={row.name} />
                            </div>
                            <h5 className="text-limit-2 mt-2">{row.name}</h5>
                            <CustomLink prefetch={false} className="stretched-link" href={`/photo/view/${row.id}`}></CustomLink>
                        </div>
                    </div>
                )}

                <LoadVideoPagination />
            </div>
        </div>
    );
};

export default Page;
