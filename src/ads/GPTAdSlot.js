'use client';

import { useEffect, useRef } from 'react';

export default function GPTAdSlot({ adUnit, sizes, slotId, refreshInterval = 0, onSlotRenderEnded }) {
  const containerRef = useRef(null);
  const slotRef = useRef(null);
  const intervalRef = useRef(null);
  const listenerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current; // ✅ Copy to variable
    
    if (!container || !window.googletag) return;

    // পুরানো কন্টেন্ট মুছে ফেলুন
    container.innerHTML = '';

    const div = document.createElement('div');
    div.id = slotId;
    container.appendChild(div);

    window.googletag.cmd.push(() => {
      // পুরানো স্লট ডিস্ট্রয় করুন
      if (slotRef.current) {
        window.googletag.destroySlots([slotRef.current]);
      }

      // নতুন স্লট তৈরি করুন
      slotRef.current = window.googletag
        .defineSlot(adUnit, sizes, slotId)
        .addService(window.googletag.pubads());
      
      slotRef.current.setCollapseEmptyDiv(true);

      // রেন্ডার লিসেনার যোগ করুন
      if (onSlotRenderEnded) {
        listenerRef.current = (event) => {
          if (event.slot.getSlotElementId() === slotId) {
            onSlotRenderEnded(event);
          }
        };
        window.googletag.pubads().addEventListener('slotRenderEnded', listenerRef.current);
      }

      window.googletag.display(slotId);
    });

    // রিফ্রেশ ইন্টারভাল সেট করুন
    if (refreshInterval > 0) {
      intervalRef.current = setInterval(() => {
        if (slotRef.current) {
          window.googletag.cmd.push(() => {
            window.googletag.pubads().refresh([slotRef.current]);
          });
        }
      }, refreshInterval);
    }

    // ক্লিনআপ
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      if (listenerRef.current) {
        window.googletag.cmd.push(() => {
          window.googletag.pubads().removeEventListener('slotRenderEnded', listenerRef.current);
        });
      }

      if (slotRef.current) {
        window.googletag.cmd.push(() => {
          window.googletag.destroySlots([slotRef.current]);
        });
      }
      
      // ✅ Use the copied variable
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [adUnit, sizes, slotId, refreshInterval, onSlotRenderEnded]);

  return <div ref={containerRef} style={{ minHeight: sizes[0][1], width: '100%' }} />;
}