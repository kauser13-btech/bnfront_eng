"use client";

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const CustomLink = ({ href, children, fallbackDelay = 2000, className, ...props }) => {
    const router = useRouter();
    const pathname = usePathname();
    const fallbackTimerRef = useRef(null);

    useEffect(() => {
        // Spinner remove on route change
        const spinner = document.getElementById('global-spinner');
        if (spinner) spinner.remove();

        // Cleanup fallback timer
        if (fallbackTimerRef.current) {
            clearTimeout(fallbackTimerRef.current);
            fallbackTimerRef.current = null;
        }
    }, [pathname]);

    const handleClick = (e) => {
        const currentPath = window.location.pathname;
        e.preventDefault();

        // Show spinner if not already shown
        if (!document.getElementById('global-spinner')) {
            const spinner = document.createElement('div');
            spinner.id = 'global-spinner';
            spinner.innerHTML = `<div class="loaderOverlay"><div class="loader"></div></div>`;
            document.body.appendChild(spinner);
        }

        // Set fallback reload if path doesn't change
        fallbackTimerRef.current = setTimeout(() => {
            if (window.location.pathname === currentPath) {
                window.location.href = href;
            }
        }, fallbackDelay);

        // Try Next.js navigation (sync)
        router.push(href);
    };

    return (
        <Link href={href} onClick={handleClick} className={className} {...props}>
            {children}
        </Link>
    );
};

export default CustomLink;
