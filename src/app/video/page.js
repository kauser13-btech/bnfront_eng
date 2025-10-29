import React from "react";
import CustomLink from "@/components/customLink";
import ViewImg from "@/components/viewImg";
import Carousel from "./carousel";

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

export const metadata = {
    title: 'Video - banglanews24.com',
    description: 'BanglaNews24 is the most popular online Bangla news portal in Bangladesh covering all latest BD News and international news Top and instant 24 7 Live News provider in BD.',
    keywords: ['Banglanews24, Bangla News, Bangla News Paper, Online Bangla News Portal, Bangaldesh News, Bangla News Online, Online Bangla News, Bangladeshi News, Bangladeshi News Online, Bengali News, Bengali Online News, Dhaka Bangladesh News, banglanews24,bangla news 24, bangla news, bd news, banglanews24.com, bangla news24, bangladesh news 24, banglanewsBreaking News, World News, BD News, Breaking News, National News, Country News, Entertainment News, Politics, Law and court, International, Sports, Entertainment, technology, Art and culture, Lifestyle, district news, daily chittagong, economics business, health, education, Islam, India, career, horoscope, interviews, football news, Kids news, feature news, tourism, opinion, probash, power, fuel, election comission,corporate corner, জাতীয়, রাজনীতি, আইন ও আদালত, আন্তর্জাতিক, খেলা, বিনোদন,তথ্যপ্রযুক্তি, শিল্প-সাহিত্য, লাইফস্টাইল, জেলার খবর, চট্টগ্রাম প্রতিদিন, অর্থনীতি-ব্যবসা, স্বাস্থ্য, শিক্ষা, ইসলাম, ভারত, ক্যারিয়ার, রাশিফল, সাক্ষাৎকার, কাতার বিশ্বকাপ, ইচ্ছেঘুড়ি, ফিচার, পর্যটন, মুক্তমত, প্রবাসে বাংলাদেশ, বিদ্যুৎ ও জ্বালানি, অফবিট, নির্বাচন ও ইসি, এভিয়াট্যুর, অপার মহিমার রমজান, অপার মহিমার রমজান, কর্পোরেট কর্নার, আজকের সব সংবাদ'],
    alternates: {
        canonical: 'https://en.banglanews24.com/video',
    },
    openGraph: {
        title: 'Video - banglanews24.com',
        description: 'BanglaNews24 is the most popular online Bangla news portal in Bangladesh covering all latest BD News and international news Top and instant 24 7 Live News provider in BD.',
        url: 'https://en.banglanews24.com/video',
        siteName: 'banglanews24',
        images: [
            {
                url: 'https://en.banglanews24.com/default-img.jpg',
                width: 800,
                height: 600,
            }
        ],
        locale: 'bn_BD',
        type: 'website',
    },
}

const Page = async () => {
    const data = await getData();

    if (!data.gallery_cat) {
        return (<div className="loader"></div>);
    }

    return (
        <>

            <Carousel most_view={data.most_view} />

            {data.gallery_cat.map((row, i) =>
                <div key={i} className="mb-4">
                    <h4 className="mb-4 pb-2 border-bottom">
                        {row.name}
                        <CustomLink prefetch={false} className="float-end fs-6 mt-2" href={`/video/${row.id}`}>More <i className="bi bi-chevron-right"></i></CustomLink>
                    </h4>
                    <div className="row">
                        <div className="col-12 col-xl-4">
                            {row.posts.slice(0, 1).map((row2, i2) =>
                                <div key={i2} className="position-relative">
                                    <div className="position-relative">
                                        <ViewImg image={row2.cover_photo} cls="h-100 w-100 border-bottom-0" alt={row2.name} />
                                        <div className="position-absolute bottom-0 end-0">
                                            <i className="bi bi-youtube text-danger fs-2 me-3"></i>
                                        </div>
                                    </div>

                                    <h5 className="text-limit-2 mt-2">{row2.name}</h5>
                                    <CustomLink prefetch={false} className="stretched-link" href={`/video/play/${row2.id}`}></CustomLink>
                                </div>
                            )}
                        </div>
                        <div className="col-12 col-xl-8">
                            <div className="row">
                                {row.posts.slice(1, 3).map((row2, i2) =>
                                    <div key={i2} className="col-12 col-xl-6 mt-3 mt-xl-0">
                                        <div className="position-relative">
                                            <div className="row">
                                                <div className="col-4 col-xl-12">
                                                    <div className="position-relative">
                                                        <ViewImg image={row2.cover_photo} cls="h-100 w-100 border-bottom-0" alt={row2.name} />
                                                        <div className="position-absolute bottom-0 end-0">
                                                            <i className="bi bi-youtube text-danger fs-2 me-3"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-8 col-xl-12">
                                                    <h5 className="text-limit-2 mt-2">{row2.name}</h5>
                                                </div>
                                            </div>
                                            <CustomLink prefetch={false} className="stretched-link" href={`/video/play/${row2.id}`}></CustomLink>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Page;
