import React from 'react';
import ViewImg from '@/components/viewImg';
import Link from 'next/link';
import CustomLink from '@/components/customLink';
import ArchiveCalendar from '@/components/archiveCalendar';

export const revalidate = 60;

const getData = async () => {
    try {
        const res = await fetch(`${process.env.API_URL}/topic/todayall`, {
            headers: { "Accept-Encoding": "gzip,deflate,compress" },
            next: { revalidate: 60 }
        });
        return res.json();
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
}

export const metadata = {
    title: 'আজকের সব খবর | Banglanews24',
    description: 'BanglaNews24 is the most popular online Bangla news portal in Bangladesh covering all latest BD News and international news Top and instant 24 7 Live News provider in BD.',
    keywords: ['Banglanews24, Bangla News, Bangla News Paper, Online Bangla News Portal, Bangaldesh News, Bangla News Online, Online Bangla News, Bangladeshi News, Bangladeshi News Online, Bengali News, Bengali Online News, Dhaka Bangladesh News, banglanews24,bangla news 24, bangla news, bd news, banglanews24.com, bangla news24, bangladesh news 24, banglanewsBreaking News, World News, BD News, Breaking News, National News, Country News, Entertainment News, Politics, Law and court, International, Sports, Entertainment, technology, Art and culture, Lifestyle, district news, daily chittagong, economics business, health, education, Islam, India, career, horoscope, interviews, football news, Kids news, feature news, tourism, opinion, probash, power, fuel, election comission,corporate corner, জাতীয়, রাজনীতি, আইন ও আদালত, আন্তর্জাতিক, খেলা, বিনোদন,তথ্যপ্রযুক্তি, শিল্প-সাহিত্য, লাইফস্টাইল, জেলার খবর, চট্টগ্রাম প্রতিদিন, অর্থনীতি-ব্যবসা, স্বাস্থ্য, শিক্ষা, ইসলাম, ভারত, ক্যারিয়ার, রাশিফল, সাক্ষাৎকার, কাতার বিশ্বকাপ, ইচ্ছেঘুড়ি, ফিচার, পর্যটন, মুক্তমত, প্রবাসে বাংলাদেশ, বিদ্যুৎ ও জ্বালানি, অফবিট, নির্বাচন ও ইসি, এভিয়াট্যুর, অপার মহিমার রমজান, অপার মহিমার রমজান, কর্পোরেট কর্নার, আজকের সব সংবাদ'],
    alternates: {
        canonical: 'https://www.banglanews24.com/topic/todayall',
    },
}

const Topic = async ({ params }) => {
    const data = await getData();

    return (
        <section className="categoryLead section archiveNews">
            <div className="container">
                <div className="row mt-5">
                    <div className="col-8 col-xl-10">
                        <h1 className="fs-3 text-success-emphasis mb-2 pb-2">Todays All News</h1>

                        {/* <ol className="breadcrumb mt-5 align-items-center">
                            <li className="breadcrumb-item">
                                <a href={`/`}><i className="bi bi-house"></i></a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                <h1 className="d-inline fs-6 fw-normal m-0 p-0 text-secondary">
                                    আজকের সব খবর
                                </h1>
                            </li>
                        </ol> */}
                    </div>
                    <div className="col-4 col-xl-2">
                        <div className="d-flex justify-content-end">
                            <div className="dropdown archive-dropdown text-black">
                                <a href="#" className="dropdown-toggle" id="calendarArea" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className="me-2">Archive</span>
                                    <i className="bi bi-calendar-date fs-4 "></i>
                                </a>
                                <div className="dropdown-menu p-0 border-0 bg-transparent" aria-labelledby="calendarArea">
                                    <ArchiveCalendar />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='border-bottom'></div>
                </div>

                <div className="row">
                    <div className="row my-4 card-list-area">
                        {(data.list) ? data.list.map((row, i) =>
                            <div key={i} className="col-md-3 mb-3">
                                <div className="card position-relative border-0">
                                    <ViewImg image={row.main_image} cls="card-img-top h-auto mb-2 w-100" alt={row.n_head} />
                                    <div className="card-body px-3 pt-0">
                                        <h4 className="card-title lh-sm">{row.n_head}</h4>
                                        {/* <p className="card-text lh-base homeSubDesc">{row.n_details}</p> */}
                                    </div>
                                    <CustomLink prefetch={false} className="stretched-link" href={`/${row.cat_name.slug}/news/bd/${row.n_id}.details`}></CustomLink>
                                </div>
                            </div>
                        ) : ''}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Topic