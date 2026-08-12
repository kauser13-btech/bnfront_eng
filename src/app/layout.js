import { Suspense } from 'react';
import Script from 'next/script';
import { SkeletonNavbar } from '@/components/skeleton';

import Header from '@/components/header';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import SpinnerCleaner from '@/components/spinnerCleaner';

import { Noto_Serif_Bengali } from 'next/font/google';

import '../../public/css/bootstrap.min.css';
import '../../public/css/bootstrap-icons.min.css';
import '../../public/css/globals.css';
import BodyTopAd from '@/ads/bodyTopAd';
import Analytics from './analytics';
import BackToTop from '@/components/backToTop';

const notoSarifBengali = Noto_Serif_Bengali({
    weight: ['400', '700'],
    subsets: ['bengali'],
    display: 'swap',
});

export const metadata = {
    metadataBase: new URL('https://en.banglanews24.com'),
    applicationName: 'Banglanews24',
    authors: [{ name: 'Banglanews24', url: 'https://en.banglanews24.com' }],
    manifest: '/feedifyPWAmanifest.json',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
        },
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: [
            { url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
            { url: '/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
            { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
            { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
    },
    other: {
        'identifier-URL': 'https://en.banglanews24.com',
    },
    facebook: {
        appId: '826224996881445',
    },
    twitter: {
        card: 'summary_large_image',
        creator: '@Banglanews24',
    },
}

export default function RootLayout({ children }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://en.banglanews24.com/"
            }
        ],

        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Banglanews24.com",
        "image": "https://en.banglanews24.com/public/desktop/img/bn24_logo_3.jpg",
        "@id": "https://en.banglanews24.com/public/desktop/img/bn24_logo_3.jpg",
        "url": "https://en.banglanews24.com/",
        "telephone": "+8809612123131",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "ABG Tower, Plot - 440, 441 & 442, Road - 18, Bashundhara R/A",
            "addressLocality": "Dhaka",
            "postalCode": "1229",
            "addressCountry": "BD",
            "addressRegion": "Dhaka"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "23.813467",
            "longitude": "90.433780"
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
        },
        "sameAs": [
            "https://www.facebook.com/BanglanewsEnglish",
            "https://twitter.com/banglanews24com",
            "https://www.youtube.com/channel/UCuF6rsucG-LUjL76Rvjlh0A",
            "https://play.google.com/store/apps/details?id=com.ewmgl.banglanews&hl=en_US",
            "https://itunes.apple.com/us/app/banglanews24-official/id965623960?mt=8",
            "https://banglanews24.com/rss/rss.xml"
        ],
        "priceRange": "৳৳"
    };

    return (
        <html lang="bn">
            <head>
                <meta property="fb:pages" content="349770751712144" />
            </head>
            <body suppressHydrationWarning={true} className={notoSarifBengali.className}>

                <BodyTopAd />

                <main className="pt-lg-2">
                    <Header />
                    <Analytics />

                    <Suspense fallback={<SkeletonNavbar />}>
                        <Navbar />
                    </Suspense>

                    <SpinnerCleaner />
                    {children}

                    <Footer />
                    <BackToTop />
                </main>

                <Script src="https://www.googletagmanager.com/gtag/js?id=G-FR5KSYH0VK" strategy="afterInteractive" />
                <Script id="google-analytics" strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){window.dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-FR5KSYH0VK');

                            gtag('event', 'epaper_view', {
                                'app_name': 'English',
                            });
                        `,
                    }}
                />
                {/* <Script id="feedify-webscript" strategy="lazyOnload"
                    dangerouslySetInnerHTML={{
                        __html: `
                            var feedify = feedify || {};
                            window.feedify_options={fedify_url:"https://app.feedify.net/",pkey:"BD9w6ryqCr9fCFmVAWFaFvQ23F0dAA1rTtj-gWqcoD0u0qPzI67WxgeX-T5rTE4tZK2xuJot__6P8_eSmdr6ZjE"};
                                (function (window, document){
                                function addScript( script_url ){
                                var s = document.createElement('script');
                                s.type = 'text/javascript';
                                s.src = script_url;
                                document.getElementsByTagName('head')[0].appendChild(s);
                                }
                                addScript('https://cdn.feedify.net/getjs/feedbackembad-min-3.0.js');
                            })(window, document);
                        `,
                    }}
                /> */}

                <Script src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" strategy="afterInteractive" />
                <Script id="gpt-init" strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.googletag = window.googletag || { cmd: [] };
                            window.googletag.cmd.push(function() {
                                window.googletag.pubads().enableSingleRequest();
                                window.googletag.pubads().collapseEmptyDivs();
                                window.googletag.pubads().enableLazyLoad({
                                    fetchMarginPercent: 200,
                                    renderMarginPercent: 100,
                                    mobileScaling: 2.0
                                });
                                window.googletag.enableServices();
                            });
                        `,
                    }}
                />

                <Script id="app-bootstrap" src="/js/bootstrap.bundle.min.js" />
                <Script id="app-jsonLd" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            </body>
        </html>
    );
}
