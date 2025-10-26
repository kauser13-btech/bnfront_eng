import React from "react";
import Script from 'next/script';

import CSS from '@/css_module/author.module.css';
import ViewImg from '@/components/viewImg';
import LoadMore from './loadMore';
import CustomLink from "@/components/customLink";

export const revalidate = 60;

const getData = async(aid) => {
	try {
        const res = await fetch(`${process.env.API_URL}/web_author/${aid}`,{ 
			headers: { "Accept-Encoding": "gzip,deflate,compress" },
        	next: { revalidate: 60 }
		});

		if (!res.ok) {
			return [];
		}

		return res.json();
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
}

export async function generateMetadata({ params }){
	const data = await getData(params.aid);

	if (!data.profile) {
		return {
			title: `${data.profile.name} | banglanews24`,
		};
		
	}
	
	const getUrl = `/author/${params.aid}`;

	return {
		title: `${data.profile.name} | banglanews24`,
		description:data.profile.details,
		keywords:data.profile.profession,
		alternates: {
			canonical: getUrl,
		},
		openGraph: {
			title: `${data.profile.name} | banglanews24`,
			description: data.profile.details,
			url: getUrl,
			siteName: 'banglanews24',
			images: [
				{
					url: data.profile.img,
					width: 800,
					height: 600,
				}
			],
			locale: 'bn_BD',
			type: 'article',
		},
	};
}

const Author = async({params}) => {
	const data = await getData(params.aid);
	
	if (!data.profile) {
		return <h1 className="text-center my-5">Not Found</h1>
	}

	return <section className={`${CSS.author} container my-5`}>


		<div className={`${CSS.authorBox} mb-5 w-100`}>
			<div className={CSS.authorInfo_widget}>
					<h2 className={CSS.widgetTitle}>{data.profile.name}</h2>
					{(data.profile.img)?
						<div className={CSS.profilePhoto}>
							<ViewImg image={data.profile.img} cls="h-100 w-100" alt={data.profile.name} />
						</div>
					:''}
				<div className={CSS.profileDataBlock}>
					<h3>{data.profile.profession}</h3>
				</div>
			</div>

			<div className={CSS.authorDetail_widget}>
				<div className={`${CSS.widgetContent} p-4`}>
					<p>{data.profile.details}</p>
				</div>
			</div>
		</div>

		<div className="row">
			<div className="col-12 col-md-8">
				{(data.newsList.data)? data.newsList.data.map((row, i) =>
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
				
				{(data.newsList.current_page!=data.newsList.last_page)?
					<div className="justify-content-center">
						<LoadMore newsList={data.newsList} aid={params.aid} />
					</div>
				:''}
			</div>
			<div className="col-12 col-md-4">
				<div className={`position-sticky ${CSS.top_position} d-none px-3`} id="author-profile">
					<div className={`${CSS.box} rounded`}>
						<div className={CSS.content}>
							{(data.profile.img)?
								<div className={CSS.image}>
									<ViewImg cls={`w-auto h-auto ${CSS.nimg}`} image={data.profile.img} alt={data.profile.name}/>
								</div>
							:''}
							<div className={CSS.text}>
								<p className={CSS.name}>{data.profile.name}</p>
								<p className={CSS.job_title}>{data.profile.profession}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<Script
			id="author-profile"
			dangerouslySetInnerHTML={{
				__html: `
					window.addEventListener('scroll', function() {
						if(document.getElementById('author-profile')!= null){
							if (window.scrollY > 200) {
								document.getElementById("author-profile").classList.remove('d-none');
							} else {
								document.getElementById("author-profile").classList.add('d-none');
							}
						}
					});
				`,
		}	}
		/>
	</section>;
};

export default Author;
