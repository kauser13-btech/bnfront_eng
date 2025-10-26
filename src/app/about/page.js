import Link from "next/link";
import React from "react";


export const metadata = {
    title: 'ABOUT US - banglanews24.com',
    description: 'BanglaNews24 is the most popular online Bangla news portal in Bangladesh covering all latest BD News and international news Top and instant 24 7 Live News provider in BD.',
    keywords: ['Banglanews24, Bangla News, Bangla News Paper, Online Bangla News Portal, Bangaldesh News, Bangla News Online, Online Bangla News, Bangladeshi News, Bangladeshi News Online, Bengali News, Bengali Online News, Dhaka Bangladesh News, banglanews24,bangla news 24, bangla news, bd news, banglanews24.com, bangla news24, bangladesh news 24, banglanewsBreaking News, World News, BD News, Breaking News, National News, Country News, Entertainment News, Politics, Law and court, International, Sports, Entertainment, technology, Art and culture, Lifestyle, district news, daily chittagong, economics business, health, education, Islam, India, career, horoscope, interviews, football news, Kids news, feature news, tourism, opinion, probash, power, fuel, election comission,corporate corner, জাতীয়, রাজনীতি, আইন ও আদালত, আন্তর্জাতিক, খেলা, বিনোদন,তথ্যপ্রযুক্তি, শিল্প-সাহিত্য, লাইফস্টাইল, জেলার খবর, চট্টগ্রাম প্রতিদিন, অর্থনীতি-ব্যবসা, স্বাস্থ্য, শিক্ষা, ইসলাম, ভারত, ক্যারিয়ার, রাশিফল, সাক্ষাৎকার, কাতার বিশ্বকাপ, ইচ্ছেঘুড়ি, ফিচার, পর্যটন, মুক্তমত, প্রবাসে বাংলাদেশ, বিদ্যুৎ ও জ্বালানি, অফবিট, নির্বাচন ও ইসি, এভিয়াট্যুর, অপার মহিমার রমজান, অপার মহিমার রমজান, কর্পোরেট কর্নার, আজকের সব সংবাদ'],
    alternates: {
        canonical: 'https://www.banglanews24.com/about',
    },
}

const Page = () => {
    return (
        <div className="container">
            <div className="my-5">
                <h2>ABOUT US</h2>
                <p>
                    banglanews24.com, a new-generation multimedia news portal from Bangladesh, disseminates round-the-clock news in both Bangla and English from a highly interactive platform.
                    A concern of the East-West Media Group PLC., banglanews24.com is a most dynamic platform that brings news fast and accurate. For people across the globe, it is also a
                    haunt for refreshing entertainment.
                </p>
                <h3>OUR VISION</h3>
                <p>
                    With new ideas, cutting-edge outlook and futuristic vision for info-savvy new generations, we live up to with the most credible information.
                </p>
                <h3>WHO WE ARE</h3>
                <p>
                    This is not an opportunity that just comes along. A beginning that takes a lot to build a new media venture for the new generation with a
                    team of renowned and professional journalists.
                </p>
                <h3>WHY ARE WE</h3>
                <p>
                    In the fast-moving 24 x 7 global news environment, Bangladesh and its people cannot look on to what is going around them and what may affect them as global citizens.
                    Our real-time news coverage and interactive platform allow people to have their say, as news in the making affects them, too. Our online readers are not mere recipient of
                    anything and everything on the go, but active content provider. We believe our audience wherever they are, at home or abroad is not merely silent observer of events;
                    they are also participants and catalysts. As a fast information provider with accuracy, our highest standards of professionalism in journalism will be tested by you.
                </p>
                <br /><br />
                <strong>Editor</strong><br />
                <Link href="http://banglanews24.com" target="_blank">BanglaNews24.com</Link><br />
                <address>Plot: ABG Tower, Plot - 440, 441 & 442, Road - 18, Bashundhara R/A, Dhaka - 1229, Bangladesh</address>
            </div>
        </div>
    );
};

export default Page;
