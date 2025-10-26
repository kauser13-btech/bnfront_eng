"use client"

import { useEffect, useState } from 'react';
import { AdSlot, DFPManager, DFPSlotsProvider } from 'react-dfp';
import Image from 'next/image';

const DesktopAd = ({ adData, position, catId, w, h, nid }) => {
	const [isMobile, setIsMobile] = useState(null);

	useEffect(() => {
		setIsMobile(window.innerWidth <= 991.98);
	}, []);

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
				return (adCondition == 0) ? false : true;
			}
			return (adCondition == 1) ? false : true;
		}

		if (menusId == 'all') {
			return true;
		}

		const isMenu = JSON.parse(menusId).some(i => i == currentMenusId);
		if (adCondition) {
			return isMenu;
		} else {
			return !isMenu;
		}
	}

    if (isMobile === null) return null;

	return (
		<>
			{!isMobile &&
				<div ad-position={position} className={`ad-${w}`}>
					{(adData != '') ?
						<DFPSlotsProvider dfpNetworkId="21675215918">
							{adData.map((banner, i) =>
								(banner.ads_positions_slug == position) ?
									(checkAd(catId, banner) ?
										<div key={i} className={`ads mb-2 d-flex justify-content-center ad-${w}x${h}`} ad-id={banner.id}>
											{(banner.adtype == 'dfp-code') ?
												<div className="desktop-ads">
													<AdSlot slotId={banner.head_code} sizes={JSON.parse(`[${banner.ad_code}]`)} adUnit={banner.head_code} />
												</div>
												: (banner.adtype == 'images') ?
													<a className="ads-img" href={banner.landing_url} target="_blank">
														<Image
															placeholder="blur"
															blurDataURL={`/_next/image?url=${banner.storage_src}/${banner.ad_img}&w=16&q=1`}
															src={`${banner.storage_src}/${banner.ad_img}`}
															className="w-auto h-auto mw-100"
															alt={banner.ad_img}
															layout="responsive"
															width={w}
															height={h}
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
						: ''}
				</div>
			}
		</>

	)
}

export default DesktopAd