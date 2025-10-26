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
                                <span className="me-1 float-start">অনুসরণ করুণ |</span>
                                <a className="me-2 float-start" href="https://www.youtube.com/channel/UCzfkD4dNxVlIhUW3xaM4uxw"><i className="bi bi-youtube"></i></a>
                                <a className="me-2 float-start" href="https://x.com/banglanews24com"><i className="bi bi-twitter"></i></a>
                                <a className="me-2 float-start" href="https://www.facebook.com/banglanews24"><i className="bi bi-facebook"></i></a>
                                <a className="me-2 float-start" href="https://www.instagram.com/banglanews24"><i className="bi bi-instagram"></i></a>
                            </div>

                        </div>
                        <div className="col-12 col-xl-4">
                            <div className="text-center">
                                <span>news@banglanews24.com</span><br />
                                <span>+৮৮০ ২ ৮৪৩ ২১৮১ | +৮৮০ ২ ৮৪৩ ২১৮২</span>
                            </div>
                        </div>
                        <div className="col-12 col-xl-4">
                            <div className="app-links">
                                <span className="float-end"> | মোবাইল অ্যাপ ডাউনলোড করুন</span>
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
                            <strong>সম্পাদক: তৌহিদুল ইসলাম মিন্টু</strong>
                            <br />
                            প্রকাশক : ময়নাল হোসেন চৌধুরী
                        </div>
                        <div className="col-12 col-lg-5">
                            <nav className="d-flex flex-wrap justify-content-between">
                                {/* <Link href="#">বিজ্ঞাপন</Link> */}
                                <Link href="/about">আমাদের সম্পর্কে</Link>
                                <Link href="/contact">যোগাযোগ</Link>
                                <Link href="/policy">গোপনীয়তার নীতি</Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container text-center">
                কপিরাইট © ২০২৫ বাংলানিউজটোয়েন্টিফোর.কম | ইস্ট ওয়েস্ট মিডিয়া পিএলসি (ইডব্লিউএমজিপিএলসি) বসুন্ধরা  গ্রুপের একটি প্রতিষ্ঠান
            </div>
        </footer>
    );
};

export default Footer;
