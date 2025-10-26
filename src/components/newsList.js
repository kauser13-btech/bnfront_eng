import React from "react";
import ViewImg from "./viewImg";
import CustomLink from "./customLink";

const NewsList = ({ data, title }) => {
    return (
        <div className="mt-4">
            <h3 className="mb-4 pb-2 border-bottom">{title}</h3>
            <div className="newsList">
                {data && data.map((row, i) =>
                    <div key={i} className="position-relative mb-3 pb-2 border-bottom">
                        <div className="row">
                            <div className="col-8">
                                <h5 className="text-limit-3">{row.n_head}</h5>
                            </div>
                            <div className="col-4">
                                <ViewImg image={row.main_image} cls="h-auto w-100" alt={row.n_head} />
                            </div>
                            <CustomLink prefetch={false} className="stretched-link" href={`/${row.cat_name.slug}/news/bd/${row.n_id}.details`}></CustomLink>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsList;
