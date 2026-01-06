'use client';
import { useEffect, useState } from 'react';

export default function IframeBanner({ src, width = 970, height = 90, className = '', device }) {
    const [isMobile, setIsMobile] = useState(null); // null diye start
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 992);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // client side render na hole kisu dekhabe na
    if (!isClient || isMobile === null) return null;

    const shouldShow =
        (device === 'mobile' && isMobile) ||
        (device === 'desktop' && !isMobile);

    if (!shouldShow || !src) return null;

    return (
        <div className="d-flex justify-content-center bg-light py-2">
            <div className={`iframe-banner-wrapper ${className}`}
                style={{ width: `${width}px`, height: `${height}px`, overflow: 'hidden' }}>
                <iframe src={src} frameBorder="0" scrolling="no" allowFullScreen loading="lazy" style={{ width: '100%', height: '100%', border: 'none', display: 'block' }} />
            </div>
        </div>
    );
}