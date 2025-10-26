import Link from "next/link";
import React from "react";


export const metadata = {
    title: 'PRIVACY POLICY - banglanews24.com',
    description: 'BanglaNews24 is the most popular online Bangla news portal in Bangladesh covering all latest BD News and international news Top and instant 24 7 Live News provider in BD.',
    keywords: ['Banglanews24, Bangla News, Bangla News Paper, Online Bangla News Portal, Bangaldesh News, Bangla News Online, Online Bangla News, Bangladeshi News, Bangladeshi News Online, Bengali News, Bengali Online News, Dhaka Bangladesh News, banglanews24,bangla news 24, bangla news, bd news, banglanews24.com, bangla news24, bangladesh news 24, banglanewsBreaking News, World News, BD News, Breaking News, National News, Country News, Entertainment News, Politics, Law and court, International, Sports, Entertainment, technology, Art and culture, Lifestyle, district news, daily chittagong, economics business, health, education, Islam, India, career, horoscope, interviews, football news, Kids news, feature news, tourism, opinion, probash, power, fuel, election comission,corporate corner, জাতীয়, রাজনীতি, আইন ও আদালত, আন্তর্জাতিক, খেলা, বিনোদন,তথ্যপ্রযুক্তি, শিল্প-সাহিত্য, লাইফস্টাইল, জেলার খবর, চট্টগ্রাম প্রতিদিন, অর্থনীতি-ব্যবসা, স্বাস্থ্য, শিক্ষা, ইসলাম, ভারত, ক্যারিয়ার, রাশিফল, সাক্ষাৎকার, কাতার বিশ্বকাপ, ইচ্ছেঘুড়ি, ফিচার, পর্যটন, মুক্তমত, প্রবাসে বাংলাদেশ, বিদ্যুৎ ও জ্বালানি, অফবিট, নির্বাচন ও ইসি, এভিয়াট্যুর, অপার মহিমার রমজান, অপার মহিমার রমজান, কর্পোরেট কর্নার, আজকের সব সংবাদ'],
    alternates: {
        canonical: 'https://www.banglanews24.com/policy',
    },
}

const Page = () => {
    return (
        <div className="container">
            <div className="my-5">
                <h2>PRIVACY POLICY</h2>
                <p>All contents, including news, quotes, data, photos, videos, graphics and other information on <Link href="https://www.banglanews24.com/">banglanews24.com</Link> site is provided for your personal information only.  It is not placed for any sort of commercial use.</p>
                <p>The data collected on this site are for the exclusive use of <Link href="https://www.banglanews24.com/">banglanews24.com</Link> and cannot be disclosed or sold to third parties. The readers of this site have the rights of access for reading only.</p>
                <p><Link href="https://www.banglanews24.com/">banglanews24.com</Link> implements technology and security features in order to safeguard the privacy of its readers from loss, unauthorized access or improper use.</p>
                <p>Users of the site are invited to inform <Link href="https://www.banglanews24.com/">banglanews24.com</Link> services on any dysfunctions of the site in the light of privacy rights.</p>
                <p>If you require any more information or have any questions about our privacy policy, please feel free to contact us by email at <Link href="mailto:banglanews.digital@gmail.com">banglanews.digital@gmail.com</Link></p>
                <h3>LOG FILES</h3>
                <p>Like many other Web sites, <Link href="https://www.banglanews24.com/">banglanews24.com</Link> makes use of log files. The information inside the log files includes internet protocol ( IP ) addresses, type of browser, Internet Service Provider ( ISP ), date/time stamp, referring/exit pages, and number of clicks to analyze trends, administer the site, track user&apos;s movement around the site, and gather demographic information. IP addresses, and other such information are not linked to any information that is personally identifiable.</p>
                <h3>COOKIES AND WEB BEACONS</h3>
                <p><Link href="https://www.banglanews24.com/">banglanews24.com</Link> does use cookies to store information about visitors preferences, record user-specific information on which pages the user access or visit, customize Web page content based on visitors browser type or other information that the visitor sends via their browser.</p>
                <h3>DOUBLECLICK DART COOKIE</h3>
                <ul>
                    <li>:: Google, as a third party vendor, uses cookies to serve ads on <Link href="https://www.banglanews24.com/">banglanews24.com</Link>.</li>
                    <li>:: Google&apos;s use of the DART cookie enables it to serve ads to users based on their visit to <Link href="https://www.banglanews24.com/">banglanews24.com</Link> and other sites on the Internet.</li>
                    <li>:: Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy at the following URL - https://www.google.com/privacy_ads.html</li>
                </ul>
                <p>Some of our advertising partners may use cookies and web beacons on our site. Our advertising partners include ....</p>
                <h3>GOOGLE ADSENSE</h3>
                <p>These third-party ad servers or ad networks use technology to the advertisements and links that appear on <Link href="https://www.banglanews24.com/">banglanews24.com</Link> send directly to your browsers. They automatically receive your IP address when this occurs. Other technologies ( such as cookies, JavaScript, or Web Beacons ) may also be used by the third-party ad networks to measure the effectiveness of their advertisements and / or to personalize the advertising content that you see.</p>
                <p><Link href="https://www.banglanews24.com/">banglanews24.com</Link> has no access to or control over these cookies that are used by third-party advertisers.</p>
                <p>You should consult the respective privacy policies of these third-party ad servers for more detailed information on their practices as well as for instructions about how to opt-out of certain practices.</p>
                <p><Link href="https://www.banglanews24.com/">banglanews24.com</Link>&apos;s privacy policy does not apply to, and we cannot control the activities of, such other advertisers or web sites.</p>
                <p>If you wish to disable cookies, you may do so through your individual browser options. More detailed information about cookie management with specific web browsers can be found at the browsers&apos; respective websites.</p>
            </div>
        </div>
    );
};

export default Page;