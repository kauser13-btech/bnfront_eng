"use client"

import { useEffect, useState } from "react";
import axios from "axios";

import CSS from '@/css_module/author.module.css';
import ViewImg from '@/components/viewImg';
import CustomLink from "@/components/customLink";


const LoadMore = ({aid, newsList}) => {
	const [posts, setPosts] = useState([]);
	const [isLoading, setLoading] = useState(false);
    const [nextPage, setNextPage] = useState(newsList.current_page+1);
	const [nextPageURL, setNextPageURL] = useState(`${process.env.NEXT_PUBLIC_BASE_URL}/api/author/${aid}?page=${newsList.current_page+1}`);


    const loadMoreData = async () => {
	    setLoading(true);
	    if(nextPageURL){
            console.log('nextPageURL',nextPageURL)
		    await axios.get(`${nextPageURL}`).then(function (response) {
		    	if(response.data){
		    		if(nextPage < newsList.last_page){
		    			setNextPage(response.data.newsList.current_page+1);
		    			setNextPageURL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/author/${aid}?page=${response.data.newsList.current_page+1}`);
		    		}else{
		    			setNextPage(null);
		    			setNextPageURL(null);
		    		}
			        setPosts([...posts, ...response.data.newsList.data]);
			        setLoading(false);
		    	}
		    })
		}
	};

    
    return <>
        {(posts)? posts.map((row, i) =>
            <div key={i} className={`border-bottom ${CSS.bm_last} mb-4 pb-4`}>
                <CustomLink href={`/${row.cat_name.slug}/news/bd/${row.n_id}.details`} className="row">
                    <div className="col-4">
                        <ViewImg cls={`w-100 img-thumbnail ${CSS.nimg}`} image={row.main_image} alt={row.n_head}/>
                    </div>
                    <div className="col-8">
                        {row.n_solder?
                            <h5 className="n_solder_txt"dangerouslySetInnerHTML={{ __html: row.n_solder }} />
                        :''}
                        <h2 className="title">{row.n_head}</h2>
                        <p className="mb-0">{row.n_subhead}</p>
                        <time>{row.date_at}</time>
                    </div>
                </CustomLink>
            </div>
        ) : ''}

        <div className="col border-bottom pb-4">
            {(nextPageURL)?<div className="d-flex justify-content-center"><button className="btn btn-outline-secondary" onClick={async () => {await loadMoreData();}} type="button">Click here for More News {isLoading ? <div className="spinner-border spinner-border-sm" role="status"><span className="sr-only"></span></div> : ''}</button></div>:''}
        </div>
    
    </>;
};

export default LoadMore