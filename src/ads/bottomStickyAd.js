'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import GPTAdSlot from './GPTAdSlot';

const imageLoader = ({ src }) => src;

export default function BottomStickyAd({ adData = [], position, catId, w, h, nid }) {
	const [isMobile, setIsMobile] = useState(null);
	const stickyRef = useRef(null);

	// মোবাইল চেক
	useEffect(() => {
		setIsMobile(window.innerWidth <= 991.98);
	}, []);

	// Sticky লজিক
	useEffect(() => {
		if (isMobile === false) {
			const scrollTrigger = 100;
			const bottomStickyEl = stickyRef.current;

			const showAd = () => {
				if (bottomStickyEl) {
					bottomStickyEl.classList.add('show');
					bottomStickyEl.classList.remove('hide');
				}
			};

			const hideAd = (remove = false) => {
				if (bottomStickyEl) {
					bottomStickyEl.classList.add('hide');
					bottomStickyEl.classList.remove('show');
					if (remove) {
						setTimeout(() => {
							if (bottomStickyEl.parentNode) {
								bottomStickyEl.remove();
							}
						}, 400);
					}
				}
			};

			const onScroll = () => {
				if (window.scrollY > scrollTrigger) {
					showAd();
				} else {
					hideAd();
				}
			};

			const onClose = (e) => {
				if (e.target.closest('.sticky-ad-down')) {
					e.preventDefault();
					hideAd(true);
				}
			};

			window.addEventListener('scroll', onScroll);
			document.body.addEventListener('click', onClose);

			return () => {
				window.removeEventListener('scroll', onScroll);
				document.body.removeEventListener('click', onClose);
			};
		}
	}, [isMobile]);

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

	if (isMobile === null || isMobile) return null;

	const filteredAds = adData.filter(
		(banner) => banner.ads_positions_slug === position && checkAd(banner)
	);

	if (filteredAds.length === 0) return null;

	return (
		<div ad-position={position}>
			<div ref={stickyRef} className="bottom-sticky-ad bg-light hide">
				<button className="sticky-ad-down border-0" aria-label="Close sticky ad">
					<i className="bi bi-chevron-down"></i>
				</button>
				<div className="container position-relative">
					{filteredAds.map((banner, i) => {
						const slotId = `gpt-sticky-${position}-${banner.id}-${i}`;

						return (
							<div
								key={slotId}
								className="ads mb-2 d-flex justify-content-center ad-sticky"
								ad-id={banner.id}
							>
								{banner.adtype === 'dfp-code' ? (
									<div className="desktop-ads">
										<GPTAdSlot
											adUnit={`/21675215918/${banner.head_code}`}
											sizes={JSON.parse(`[${banner.ad_code}]`)}
											slotId={slotId}
											refreshInterval={60000}
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
											loader={imageLoader}
											src={`${banner.storage_src}/${banner.ad_img}`}
											className="mw-100 h-auto"
											alt={banner.ad_img || 'Sticky Advertisement'}
											width={w}
											height={h}
											quality={100}
											unoptimized={banner.storage_src?.includes('http')}
										/>
									</a>
								) : (
									<div
										dangerouslySetInnerHTML={{ __html: banner.ad_code }}
										suppressHydrationWarning
									/>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}