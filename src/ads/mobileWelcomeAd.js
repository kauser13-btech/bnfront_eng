"use client";

import { useEffect, useState } from "react";
import { AdSlot, DFPManager, DFPSlotsProvider } from "react-dfp";
import { usePathname } from "next/navigation";

const WelcomeAd = ({ adSlotId, timeOut }) => {
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState(null);

    useEffect(() => {
        setIsMobile(window.innerWidth <= 991.98);
    }, []);

    useEffect(() => {
        if (isMobile === true) {
            DFPManager.getGoogletag().then((googletag) => {
                googletag.cmd.push(() => {
                    googletag.pubads().addEventListener("slotRenderEnded", function (event) {
                        if (event.slot.getSlotElementId() === adSlotId) {
                            if (!event.isEmpty) {
                                const modalElement = document.querySelector(".welcomeModal");
                                if (modalElement) {
                                    const modal = new window.bootstrap.Modal(modalElement);
                                    modal.show();

                                    const timer = setTimeout(() => {
                                        modal.hide();
                                        modalElement.remove();
                                    }, timeOut);

                                    return () => clearTimeout(timer);
                                }
                            }
                        }
                    });
                });
            });
        }
    }, [isMobile, adSlotId, timeOut, pathname]);

    if (isMobile === null) return null;

    return (
        <>
            {isMobile && (
                <div className="modal fade welcomeModal" tabIndex="-1" id="welcomeModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                    <i className="bi bi-x-lg"></i>
                                </button>
                                <DFPSlotsProvider dfpNetworkId="21675215918">
                                    <AdSlot
                                        slotId={adSlotId}
                                        sizes={[[320, 480]]}
                                        adUnit={adSlotId}
                                    />
                                </DFPSlotsProvider>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default WelcomeAd;
