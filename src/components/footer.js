import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className="mb-4">
            <div className="border-top border-bottom py-2 my-2">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-xl-4">
                            <div className="social-links mob_left_none">
                                <span className="me-1 float-start">Follow Us |</span>
                                <a className="me-2 float-start" href="https://www.youtube.com/channel/UCzfkD4dNxVlIhUW3xaM4uxw"><i className="bi bi-youtube"></i></a>
                                <a className="me-2 float-start" href="https://x.com/banglanews24com"><i className="bi bi-twitter"></i></a>
                                <a className="me-2 float-start" href="https://www.facebook.com/banglanews24"><i className="bi bi-facebook"></i></a>
                                <a className="me-2 float-start" href="https://www.instagram.com/banglanews24"><i className="bi bi-instagram"></i></a>
                            </div>

                        </div>
                        <div className="col-12 col-xl-4">
                            <div className="text-center">
                                <span>news@banglanews24.com</span><br />
                                <span>+880 2 843 2181 | +880 2 843 2182</span>
                            </div>
                        </div>
                        <div className="col-12 col-xl-4">
                            <div className="app-links">
                                <span className="float-end"> | Download Mobile App</span>
                                <a target="_blank" className="float-end" href="https://apps.apple.com/us/app/banglanews24-official/id965623960"><i className="bi bi-apple"></i></a>
                                <a target="_blank" className="float-end" href="https://play.google.com/store/apps/details?id=com.ewmgl.banglanews&hl=en_US"><i className="bi bi-google-play"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-bottom pb-2 mb-2">
                <div className="container">
                    <div className="row mob_left_none">
                        <div className="col-12 col-lg-7">
                            <strong>Editor: Tawhidul Islam Mintu</strong>
                            <br />
                            Publisher: Maynal Hossain Chowdhury
                        </div>
                        <div className="col-12 col-lg-5">
                            <nav className="d-flex flex-wrap justify-content-between">
                                {/* <Link href="#">বিজ্ঞাপন</Link> */}
                                <Link href="/about">About Us</Link>
                                <Link href="/contact">Contact</Link>
                                <Link href="/policy">Term & Condition</Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container text-center">
                Copyright © {new Date().getFullYear()} banglanews24.com | East West Media Group PLC (EWMGPLC) Sister concern of Bashundhara Group
            </div>
        </footer>
    );
};

export default Footer;
