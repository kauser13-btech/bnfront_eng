import { CardSkeleton } from '@/components/skeleton';
import LazySection from "@/components/lazySection";
import Section1 from '@/components/section1';
import Section2 from '@/components/section2';
import Section4 from '@/components/section4';
import Section6 from '@/components/section6';
import Section7 from '@/components/section7';
import Section8 from '@/components/section8';
import Section9 from '@/components/section9';
import SpecialSigmenNews from '@/components/specialSigmenNews';
import DesktopAd from '@/ads/desktopAd';
import MobileAd from '@/ads/mobileAd';
import WelcomeAd from '@/ads/welcomeAd';
import MobileWelcomeAd from '@/ads/mobileWelcomeAd';
import BottomStickyAd from '@/ads/bottomStickyAd';
import MobileBottomStickyAd from '@/ads/mobileBottomStickyAd';
import LeadNews2 from '@/components/leadNews2';
import IframeBanner from '@/ads/iframeBanner';

export const revalidate = 60;

async function getData() {
    try {
        const res = await fetch(`${process.env.API_URL}/web_home`, {
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
async function getData2() {
    try {
        const res = await fetch(`${process.env.API_URL}/web_home2`, {
            headers: { "Accept-Encoding": "gzip,deflate,compress" },
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
    title: 'Banglanews24 | Bangla News and Entertainment 24x7',
    description: 'BanglaNews24 is the most popular online Bangla news portal in Bangladesh covering all latest BD News and international news Top and instant 24 7 Live News provider in BD.',
    keywords: ['Banglanews24, Bangla News, Bangla News Paper, Online Bangla News Portal, Bangaldesh News, Bangla News Online, Online Bangla News, Bangladeshi News, Bangladeshi News Online, Bengali News, Bengali Online News, Dhaka Bangladesh News, banglanews24,bangla news 24, bangla news, bd news, banglanews24.com, bangla news24, bangladesh news 24, banglanewsBreaking News, World News, BD News, Breaking News, National News, Country News, Entertainment News, Politics, Law and court, International, Sports, Entertainment, technology, Art and culture, Lifestyle, district news, daily chittagong, economics business, health, education, Islam, India, career, horoscope, interviews, football news, Kids news, feature news, tourism, opinion, probash, power, fuel, election comission,corporate corner, জাতীয়, রাজনীতি, আইন ও আদালত, আন্তর্জাতিক, খেলা, বিনোদন,তথ্যপ্রযুক্তি, শিল্প-সাহিত্য, লাইফস্টাইল, জেলার খবর, চট্টগ্রাম প্রতিদিন, অর্থনীতি-ব্যবসা, স্বাস্থ্য, শিক্ষা, ইসলাম, ভারত, ক্যারিয়ার, রাশিফল, সাক্ষাৎকার, কাতার বিশ্বকাপ, ইচ্ছেঘুড়ি, ফিচার, পর্যটন, মুক্তমত, প্রবাসে বাংলাদেশ, বিদ্যুৎ ও জ্বালানি, অফবিট, নির্বাচন ও ইসি, এভিয়াট্যুর, অপার মহিমার রমজান, অপার মহিমার রমজান, কর্পোরেট কর্নার, আজকের সব সংবাদ'],
    alternates: {
        canonical: 'https://en.banglanews24.com',
    },
    openGraph: {
        title: 'bangla news and entertainment 24x7 - banglanews24.com',
        description: 'BanglaNews24 is the most popular online Bangla news portal in Bangladesh covering all latest BD News and international news Top and instant 24 7 Live News provider in BD.',
        url: 'https://en.banglanews24.com',
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

export default async function Home() {
    const [homeData, homeData2] = await Promise.all([getData(), getData2()]);
    const data = { ...homeData, ...homeData2 };

    const today = new Date();
    const options = { weekday: 'short' };
    const dayName = today.toLocaleDateString('en-US', options);

    if (!homeData) {
        return (<div className="loader"></div>);
    }

    return (
        <>
            <div className="d-none">
                <DesktopAd adData={data.banner_desktop} position="no-ad" catId="home" w="970" h="90" />
                <MobileAd adData={data.banner_mobile} position="no-ad" catId="home" w="300" h="90" />
            </div>

            <WelcomeAd adSlotId="DH-Welcome-660x440" timeOut="13000" />
            <MobileWelcomeAd adSlotId="MH-Welcome-320x480" timeOut="13000" />
            <BottomStickyAd adData={data.banner_desktop} position="desktop-home-bottom-sticky" catId="home" w="970" h="90" />
            <MobileBottomStickyAd adData={data.banner_mobile} position="mobile-home-bottom-sticky" catId="home" w="320" h="100" />

            <div className="ad-1x1">
                <DesktopAd adData={data.banner_desktop} position="desktop-home-1x1" catId="home" w="1" h="1" />
                <MobileAd adData={data.banner_mobile} position="mobile-home-1x1" catId="home" w="1" h="1" />
            </div>
            <div className="ad-1x1">
                <DesktopAd adData={data.banner_desktop} position="desktop-catagory-1x1" catId="home" w="1" h="1" />
                <MobileAd adData={data.banner_mobile} position="mobile-catagory-1x1" catId="home" w="1" h="1" />
            </div>

            <SpecialSigmenNews />

            <div className="mt-3">
                <DesktopAd adData={data.banner_desktop} position="desktop-home-section-1" catId="home" w="970" h="90" />

                {/* <IframeBanner src="https://reachableads-av.s3.ap-southeast-1.amazonaws.com/creatives/aygaze/3/970x90.html" height="90" width="970" device="desktop" /> */}
            </div>

            {/* <IframeBanner src="https://reachableads-av.s3.ap-southeast-1.amazonaws.com/creatives/aygaze/3/320x100.html" height="100" width="320" device="mobile" /> */}

            <MobileAd adData={data.banner_mobile} position="mobile-home-section-1" catId="home" w="320" h="100" />

            <LeadNews2 data={data.leadNews} video={[]} bannerDesktop={data.banner_desktop} bannerMobile={data.banner_mobile} specialVideo={data.special_video} homeVideoSlide={data.home_videoSlide} />

            {/* <LeadNews data={data.leadNews} video={[]} bannerDesktop={data.banner_desktop} bannerMobile={data.banner_mobile} specialVideo={data.special_video} homeVideoSlide={data.home_videoSlide} /> */}

            <MobileAd adData={data.banner_mobile} position="mobile-home-section-5" catId="home" w="320" h="250" />

            <Section1 title="Highlights" data={data.highlight} />

            <DesktopAd adData={data.banner_desktop} position="desktop-home-section-5" catId="home" w="970" h="90" />
            <MobileAd adData={data.banner_mobile} position="mobile-home-section-6" catId="home" w="320" h="250" />

            <Section8 title="National" data={data.homeCat_1} hrf="/category/national" adPosition="desktop-home-section-6" bannerDesktop={data.banner_desktop} bannerMobile={data.banner_mobile} />

            <DesktopAd adData={data.banner_desktop} position="desktop-home-section-6" catId="home" w="970" h="90" />
            <MobileAd adData={data.banner_mobile} position="mobile-home-section-7" catId="home" w="320" h="250" />

            <Section9 title="International" data={data.homeCat_4} hrf="/category/international" latest={data.latest} mostRead={data.most_read} />


            <LazySection fallback={<CardSkeleton />}>
                <DesktopAd adData={data.banner_desktop} position="desktop-home-section-7" catId="home" w="970" h="90" />
                <MobileAd adData={data.banner_mobile} position="mobile-home-section-8" catId="home" w="320" h="250" />

                <Section2 title="Sports" data={data.homeCat_5} hrf="/category/sports" />

                <DesktopAd adData={data.banner_desktop} position="desktop-home-section-8" catId="home" w="970" h="90" />
                <MobileAd adData={data.banner_mobile} position="mobile-home-section-9" catId="home" w="320" h="250" />

                <Section6 title="Entertainment" data={data.homeCat_6} hrf="/category/entertainment" adPosition="desktop-home-section-9" bannerDesktop={data.banner_desktop} bannerMobile={data.banner_mobile} />
            </LazySection>

            <LazySection fallback={<CardSkeleton />}>
                <DesktopAd adData={data.banner_desktop} position="desktop-home-section-10" catId="home" w="970" h="90" />
                <MobileAd adData={data.banner_mobile} position="mobile-home-section-10" catId="home" w="320" h="250" />

                {/* <Section3 /> */}

                <MobileAd adData={data.banner_mobile} position="mobile-home-section-11" catId="home" w="320" h="250" />
            </LazySection>

            <LazySection fallback={<CardSkeleton />}>
                <Section1 title="Health" data={data.homeCat_9} hrf="/category/health" />

                <MobileAd adData={data.banner_mobile} position="mobile-home-section-12" catId="home" w="320" h="250" />

                <Section1 title="Politics" data={data.homeCat_2} hrf="/category/politics" />
            </LazySection>

            <LazySection fallback={<CardSkeleton />}>
                <div className="container mt-4">
                    <div className='row'>
                        <div className='col-12 col-xl-4 borde-endr-xl border-end-xxl'>
                            <Section4 title="Business" data={data.homeCat_3} hrf="/category/business" />
                        </div>
                        <div className='col-12 col-xl-4 borde-endr-xl border-end-xxl'>
                            <Section4 title="Technology" data={data.homeCat_7} hrf="/category/technology" />
                        </div>
                        <div className='col-12 col-xl-4'>
                            <Section4 title="Lifestyle" data={data.homeCat_10} hrf="/category/lifestyle" />
                        </div>
                    </div>
                </div>
            </LazySection>

            <LazySection fallback={<CardSkeleton />}>
                <div className="container mt-4">
                    <div className='row'>
                        <div className='col-12 col-xl-4 borde-endr-xl border-end-xxl'>
                            <Section4 title="Education" data={data.homeCat_8} hrf="/category/education" />
                        </div>
                        <div className='col-12 col-xl-4 borde-endr-xl border-end-xxl'>
                            <Section4 title="Special" data={data.homeCat_12} hrf="/category/banglanews-special" />
                        </div>
                        <div className='col-12 col-xl-4'>
                            <Section4 title="Open forum" data={data.homeCat_15} hrf="/category/open-forum" />
                        </div>
                    </div>
                </div>
            </LazySection>

            <LazySection fallback={<CardSkeleton />}>
                <Section7 />
            </LazySection>

        </>
    );
}