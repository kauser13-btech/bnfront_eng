"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const BackToTop = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const scrollTrigger = 600;

        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            setShow(scrollTop > scrollTrigger);
        };

        handleScroll(); // Initial check
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Link
            href="#"
            id="back-to-top"
            title="Back to top"
            onClick={scrollToTop}
            className={`${show ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
            <i className="bi bi-chevron-up text-danger"></i>
        </Link>
    );
};

export default BackToTop;
