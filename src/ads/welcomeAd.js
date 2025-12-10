"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import GPTAdSlot from "./GPTAdSlot";

const WelcomeAd = ({ adSlotId, timeOut = 10000 }) => {
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState(null);
    const modalRef = useRef(null);
    const modalInstanceRef = useRef(null);
    const timeoutRef = useRef(null);
    const listenerRef = useRef(null);

    useEffect(() => {
        setIsMobile(window.innerWidth <= 991.98);
    }, []);

    useEffect(() => {
        if (isMobile === false && window.googletag) {
            // Event listener যোগ করুন
            window.googletag.cmd.push(() => {
                listenerRef.current = (event) => {
                    // চেক করুন: এই slot এর জন্য কিনা
                    if (event.slot.getSlotElementId() === adSlotId) {
                        // চেক করুন: ad খালি না কিনা
                        if (!event.isEmpty && modalRef.current && window.bootstrap) {
                            // Modal show করুন
                            modalInstanceRef.current = new window.bootstrap.Modal(modalRef.current);
                            modalInstanceRef.current.show();

                            // Timeout এর পর modal বন্ধ করুন
                            timeoutRef.current = setTimeout(() => {
                                if (modalInstanceRef.current) {
                                    modalInstanceRef.current.hide();
                                }
                            }, timeOut);
                        }
                    }
                };

                window.googletag.pubads().addEventListener('slotRenderEnded', listenerRef.current);
            });

            // Cleanup
            return () => {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
                if (modalInstanceRef.current) {
                    modalInstanceRef.current.hide();
                }
                if (listenerRef.current && window.googletag) {
                    window.googletag.cmd.push(() => {
                        window.googletag.pubads().removeEventListener('slotRenderEnded', listenerRef.current);
                    });
                }
            };
        }
    }, [isMobile, adSlotId, timeOut]);

    // Pathname change হলে cleanup
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            if (modalInstanceRef.current) {
                modalInstanceRef.current.hide();
            }
        };
    }, [pathname]);

    if (isMobile === null) return null;

    return (
        <>
            {!isMobile && (
                <div 
                    className="modal fade welcomeModal" 
                    tabIndex="-1" 
                    id="welcomeModal"
                    ref={modalRef}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    data-bs-dismiss="modal" 
                                    aria-label="Close"
                                >
                                    <i className="bi bi-x-lg"></i>
                                </button>
                                <GPTAdSlot
                                    adUnit={`/21675215918/${adSlotId}`}
                                    sizes={[[660, 440]]}
                                    slotId={adSlotId}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default WelcomeAd;