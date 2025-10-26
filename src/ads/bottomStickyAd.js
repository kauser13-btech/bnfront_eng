"use client";

import React, { useEffect, useState } from 'react';
import { AdSlot, DFPSlotsProvider } from 'react-dfp';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const imageLoader = ({ src }) => {
	return src;
}

const BottomStickyAd = ({ adData, position, catId, w, h, nid }) => {
	const pathname = usePathname();
	const [isMobile, setIsMobile] = useState(null);

	useEffect(() => {
		setIsMobile(window.innerWidth <= 991.98);
	}, []);

	useEffect(() => {
		if (isMobile === false) {
			const scrollTrigger = 100;
			const bottomStickyEl = document.querySelector('.bottom-sticky-ad');

			function showAd() {
				if (bottomStickyEl) {
					bottomStickyEl.classList.add('show');
					bottomStickyEl.classList.remove('hide');
				}
			}

			function hideAd(remove = false) {
				if (bottomStickyEl) {
					bottomStickyEl.classList.add('hide');
					bottomStickyEl.classList.remove('show');
					if (remove) {
						setTimeout(() => {
							bottomStickyEl.remove();
						}, 400);
					}
				}
			}

			function onScroll() {
				if (window.scrollY > scrollTrigger) {
					showAd();
				} else {
					hideAd();
				}
			}

			window.addEventListener('scroll', onScroll);

			document.body.addEventListener('click', (event) => {
				if (event.target.closest('.sticky-ad-down')) {
					event.preventDefault();
					hideAd(true);
				}
			});

			return () => {
				window.removeEventListener('scroll', onScroll);
			};
		}
	}, [isMobile, pathname]);

	function checkAd(catId, adData) {
		if (catId == 'home') {
			return true;
		}

		const currentMenusId = catId;
		const adCondition = adData.ad_condition;
		const menusId = adData.menus_id;
		const news_ids = adData.n_id;

		if (nid && news_ids) {
			let ids = news_ids.split(",");
			if (ids.includes(`${nid}`)) {
				return adCondition == 0 ? false : true;
			}
			return adCondition == 1 ? false : true;
		}

		if (menusId == 'all') {
			return true;
		}

		const isMenu = JSON.parse(menusId).some(i => i == currentMenusId);
		return adCondition ? isMenu : !isMenu;
	}

	if (isMobile === null) return null;

	return (
		<>
			{!isMobile &&
				<div ad-position={position}>
					{(adData != '') ?
						<div className="bottom-sticky-ad bg-light hide">
							<DFPSlotsProvider className="container" dfpNetworkId="21675215918">
								<div className="position-relative">
									<button className="sticky-ad-down border-0"><i className="bi bi-chevron-down"></i></button>
								</div>
								{adData.map((banner, i) =>
									(banner.ads_positions_slug == position) ?
										(checkAd(catId, banner) ?
											<div key={i} className="ads mb-2 d-flex justify-content-center">
												{(banner.adtype == 'dfp-code') ?
													<div className="desktop-ads">
														<AdSlot slotId={banner.head_code} sizes={JSON.parse(`[${banner.ad_code}]`)} adUnit={banner.head_code} />
													</div>
													: (banner.adtype == 'images') ?
														<a href={banner.landing_url} target="_blank">
															<Image
																loader={imageLoader}
																src={`${banner.storage_src}/${banner.ad_img}`}
																className="mw-100 h-auto"
																alt={banner.ad_img}
																width={w}
																height={h}
																quality={100}
															/>
														</a>
														:
														<div dangerouslySetInnerHTML={{ __html: banner.ad_code }} />
												}
											</div>
											: '')
										: ''
								)}
							</DFPSlotsProvider>
						</div>
						: ''}
				</div>
			}
		</>
	);
};

export default BottomStickyAd;
