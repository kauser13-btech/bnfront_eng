'use client';

import { useEffect, useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import GPTAdSlot from './GPTAdSlot';

export default function BodyTopAd() {
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState(null);

    // মোবাইল চেক
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 992);
        checkMobile();

        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // slotId ও adUnit নির্ধারণ (useMemo দিয়ে optimize)
    const { slotId, adUnit } = useMemo(() => {
        const getRoute = pathname.substring(1).split('/');

        let baseSlot = '';
        if (getRoute[0] === '') {
            baseSlot = '/21675215918/EN_DH-Top'; // Home
        } else if (getRoute[0] === 'category') {
            baseSlot = '/21675215918/EN_DH-Top'; // Category
        } else if (getRoute[1] === 'news' && getRoute[2] === 'bd') {
            baseSlot = '/21675215918/EN_DH-Top'; // Details
        } else {
            baseSlot = '/21675215918/EN_DH-Top'; // Category/Others
        }

        const uniquePath = pathname === '/' ? 'home' : pathname.replace(/\//g, '-').replace(/^-/, '');
        const finalSlotId = `${baseSlot.replace(/\//g, '-')}-${uniquePath}`;
        const finalAdUnit = baseSlot;

        return { slotId: finalSlotId, adUnit: finalAdUnit };
    }, [pathname]);

    if (isMobile === null || isMobile || !slotId) return null;

    return (
        <div className="body-top-ad bg-light isDesktop">
            <div className="col-md-12">
                <div className="ads d-flex justify-content-center ad-970x90">
                    <div className="desktop-ads">
                        <GPTAdSlot
                            adUnit={adUnit}
                            sizes={[[970, 90]]}
                            slotId={slotId}
                            refreshInterval={60000}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}