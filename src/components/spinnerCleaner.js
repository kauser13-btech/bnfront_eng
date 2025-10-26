'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function SpinnerCleaner() {
    const pathname = usePathname();

    useEffect(() => {
        const spinner = document.getElementById('global-spinner');
        if (spinner) spinner.remove();
    }, [pathname]);

    return null;
}