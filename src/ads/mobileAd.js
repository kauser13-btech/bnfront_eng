'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import GPTAdSlot from './GPTAdSlot';
import Script from 'next/script';

export default function MobileAd({ adData = [], position, catId, w, h, nid }) {
	const [isMobile, setIsMobile] = useState(null);

	useEffect(() => {
		setIsMobile(window.innerWidth <= 991.98);
	}, []);

	const checkAd = (banner) => {
		if (catId === 'home') return true;

		const currentMenusId = catId;
		const adCondition = banner.ad_condition;
		const menusId = banner.menus_id;
		const news_ids = banner.n_id;

		// News ID check
		if (nid && news_ids) {
			const ids = news_ids.split(',');
			if (ids.includes(String(nid))) {
				return adCondition == 0 ? false : true;
			}
			return adCondition == 1 ? false : true;
		}

		// All menus check
		if (menusId === 'all') return true;

		// Specific menus check
		try {
			const isMenu = JSON.parse(menusId).some(i => i == currentMenusId);
			return adCondition ? isMenu : !isMenu;
		} catch (error) {
			console.error('Invalid menus_id JSON:', menusId);
			return false;
		}
	};

	if (isMobile === null || !isMobile) return null;

	const filteredAds = adData.filter(
		(banner) => banner.ads_positions_slug === position && checkAd(banner)
	);

	if (filteredAds.length === 0) return null;

	return (
		<>
			{filteredAds.map((banner, i) => {
				const slotId = `gpt-ad-mobile-${position}-${banner.id}-${i}`;

				return (
					<div
						ad-position={position}
						key={slotId}
						className={`ads mb-2 d-flex justify-content-center ad-${w}x${h}`}
						ad-id={banner.id}
					>
						{banner.adtype === 'dfp-code' ? (
							<div className="mobile-ads">
								<GPTAdSlot
									adUnit={`/21675215918/${banner.head_code}`}
									sizes={JSON.parse(`[${banner.ad_code}]`)}
									slotId={slotId}
									refreshInterval={50000}
								/>
							</div>
						) : banner.adtype === 'images' ? (
							<a
								href={banner.landing_url}
								target="_blank"
								rel="noopener noreferrer"
								className="ads-img"
							>
								<Image
									src={`${banner.storage_src}/${banner.ad_img}`}
									alt={banner.ad_img || 'Advertisement'}
									width={w}
									height={h}
									className="w-auto h-auto mw-100"
									placeholder="blur"
									blurDataURL={`/_next/image?url=${banner.storage_src}/${banner.ad_img}&w=16&q=1`}
									unoptimized={banner.storage_src?.includes('http')}
								/>
							</a>
						) : (
							<Script id={banner.head_code} src={banner.ad_code} strategy="afterInteractive" />
						)}
					</div>
				);
			})}
		</>
	);
}