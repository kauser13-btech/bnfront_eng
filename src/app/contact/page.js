import Link from "next/link";
import React from "react";


export const metadata = {
    title: 'Contact US - banglanews24.com',
    description: 'BanglaNews24 is the most popular online Bangla news portal in Bangladesh covering all latest BD News and international news Top and instant 24 7 Live News provider in BD.',
    keywords: ['Banglanews24, Bangla News, Bangla News Paper, Online Bangla News Portal, Bangaldesh News, Bangla News Online, Online Bangla News, Bangladeshi News, Bangladeshi News Online, Bengali News, Bengali Online News, Dhaka Bangladesh News, banglanews24,bangla news 24, bangla news, bd news, banglanews24.com, bangla news24, bangladesh news 24, banglanewsBreaking News, World News, BD News, Breaking News, National News, Country News, Entertainment News, Politics, Law and court, International, Sports, Entertainment, technology, Art and culture, Lifestyle, district news, daily chittagong, economics business, health, education, Islam, India, career, horoscope, interviews, football news, Kids news, feature news, tourism, opinion, probash, power, fuel, election comission,corporate corner, জাতীয়, রাজনীতি, আইন ও আদালত, আন্তর্জাতিক, খেলা, বিনোদন,তথ্যপ্রযুক্তি, শিল্প-সাহিত্য, লাইফস্টাইল, জেলার খবর, চট্টগ্রাম প্রতিদিন, অর্থনীতি-ব্যবসা, স্বাস্থ্য, শিক্ষা, ইসলাম, ভারত, ক্যারিয়ার, রাশিফল, সাক্ষাৎকার, কাতার বিশ্বকাপ, ইচ্ছেঘুড়ি, ফিচার, পর্যটন, মুক্তমত, প্রবাসে বাংলাদেশ, বিদ্যুৎ ও জ্বালানি, অফবিট, নির্বাচন ও ইসি, এভিয়াট্যুর, অপার মহিমার রমজান, অপার মহিমার রমজান, কর্পোরেট কর্নার, আজকের সব সংবাদ'],
    alternates: {
        canonical: 'https://en.banglanews24.com/contact',
    },
}

const Page = () => {
    return (
        <div className="container">
            <div className="my-5">
                <h3>Contact Details</h3>
                <address>
                    <strong><Link href="http://www.banglanews24.com">banglanews24.com</Link></strong> (A Concern of East West Media Group PLC)<br />
                    Plot No. 371/A, Block-D, Bashundhara R/A, Dhaka-1229, Bangladesh.<br />
                </address>
                <strong>News Room Phone :</strong> 880-9612123131, 88-01729076996, 01729076999 <br />
                {/* <strong>Phone :</strong> 88 02 8432181, 8432182 <br />
                <strong>Fax :</strong> 88 02 8432346 <br /> */}
                <strong>Email :</strong> <Link href="mailto:news@banglanews24.com">news@banglanews24.com</Link> <br /><br />
                <strong>Marketing Department :</strong> 880-9612123131 <br />
                <strong>Email :</strong> <Link href="mailto:marketing@banglanews24.com">marketing@banglanews24.com</Link> <br /><br />
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14600.372698363597!2d90.4287878121337!3d23.81528556545919!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xaeeee29962cf96ef!2sEast%20West%20Media%20Group%20Limited!5e0!3m2!1sen!2sbd!4v1663577019533!5m2!1sen!2sbd" width="1060" height="450" allowFullScreen=""></iframe>
            </div>
        </div>
    );
};

export default Page;
