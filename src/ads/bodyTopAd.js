"use client"

import React, { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import { AdSlot, DFPManager, DFPSlotsProvider } from 'react-dfp';
import ViewImg from "@/components/viewImg";

const BodyTopAd = () => {
    const pathname = usePathname();
    const [getSlotId, setSlotId] = useState('');
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		if (window.innerWidth <= 992) {
			setIsMobile(true);
		}
	}, []);

    useEffect(() => {
        const getRoute = pathname.substring(1).split("/");

        if (getRoute[0] == '') {
            setSlotId('DH-T1');
        } else if (getRoute[0] == 'category') {
            // category page
            setSlotId('DC-T1');
        } else if (getRoute[1] == 'news' && getRoute[2] == 'bd') {
            // details page
            setSlotId('DD-T1');
        } else {
            // else page
            setSlotId('DC-T1');
        }

    }, [pathname])

    return (
        <>
            {(getSlotId != '' && !isMobile) &&
                <div className="body-top-ad bg-light isDesktop">
                    {/* <div className="col-md-12">
                        <div className="ads d-flex justify-content-center">
                            <DFPSlotsProvider dfpNetworkId="21675215918">
                                <div className="desktopView">
                                    <AdSlot slotId={getSlotId} sizes={[[970, 90]]} adUnit={getSlotId} />
                                </div>
                            </DFPSlotsProvider>
                        </div>
                    </div> */}
                </div>
            }
        </>
    )
}

export default BodyTopAd