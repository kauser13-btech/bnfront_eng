'use client';
import { useEffect, useState } from 'react';

export default function IframeBanner({
    src,
    width = 970,               // fixed width in px
    height = 90,               // fixed height in px
    className = '',
    device = 'both',
}) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 992);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const shouldShow =
        device === 'both' ||
        (device === 'mobile' && isMobile) ||
        (device === 'desktop' && !isMobile);

    if (!shouldShow || !src) return null;

    return (
        <div className="d-flex justify-content-center bg-light">
            <div className={`iframe-banner-wrapper ${className}`}
                style={{ width: `${width}px`, height: `${height}px`, overflow: 'hidden' }}>
                <iframe src={src} frameBorder="0" scrolling="no" allowFullScreen loading="lazy" style={{ width: '100%', height: '100%', border: 'none', display: 'block' }} />
            </div>
        </div>
    );
}