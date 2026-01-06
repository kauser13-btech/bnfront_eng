import React from "react";
import ViewImg from "./viewImg";

import logoImg from "../../public/img/logo.jpg";
import Image from "next/image";

// async function getData() {
//     const res = await fetch(`${process.env.API_URL}/web_todaysdate`, {
//         headers: { "Accept-Encoding": "gzip,deflate,compress" },
//         next: { revalidate: 300 }
//     });

//     if (!res.ok) {
//         throw new Error('Failed to fetch data');
//     }

//     return res.json();
// }

const Header = async () => {
    // const todayDate = await getData();

    const nd = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const Today = `${weekday[nd.getDay()]} ${("0" + (nd.getDate())).slice(-2)} ${months[nd.getMonth()]} ${nd.getFullYear()}`;

    return (
        <header className="container d-none d-xl-block">
            <div className="row">
                <div className="d-flex mb-3">
                    <div className="me-auto p-2">
                        <a className="d-block mb-2" href={`/`}>
                            <Image src={logoImg.src} className={`w-100 h-auto mainLogo`} alt={`logo`} width={480} height={483} quality={100} />
                        </a>
                    </div>
                    <div className="p-0 pe-0 text-end">

                        <div className="dropdown header-social-dropdown">
                            <button type="button" className="btn btn-outline-light border-0 pe-0 text-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                <i className="bi bi-hand-thumbs-up"></i> Social media
                            </button>
                            <div className="dropdown-menu dropdown-menu-start p-4">
                                <strong>Facebook page</strong>
                                <div className="d-flex flex-wrap gap-3 py-3 border-bottom mb-3">
                                    <a target="_blank" href="https://www.facebook.com/BanglanewsEnglish" className="text-decoration-none text-dark d-flex align-items-center gap-2">
                                        <i className="bi bi-facebook fs-6"></i>
                                        <span>Banglanews24 English</span>
                                    </a>
                                    <a target="_blank" href="https://www.facebook.com/banglanews24" className="text-decoration-none text-dark d-flex align-items-center gap-2">
                                        <i className="bi bi-facebook fs-6"></i>
                                        <span>Banglanews24</span>
                                    </a>
                                    <a target="_blank" href="https://www.facebook.com/banglanews24international" className="text-decoration-none text-dark d-flex align-items-center gap-2">
                                        <i className="bi bi-facebook fs-6"></i>
                                        <span>International</span>
                                    </a>
                                    <a target="_blank" href="https://www.facebook.com/bn24entertainment" className="text-decoration-none text-dark d-flex align-items-center gap-2">
                                        <i className="bi bi-facebook fs-6"></i>
                                        <span>Entertainment</span>
                                    </a>
                                    <a target="_blank" href="https://www.facebook.com/Banglanews24Country" className="text-decoration-none text-dark d-flex align-items-center gap-2">
                                        <i className="bi bi-facebook fs-6"></i>
                                        <span>Country</span>
                                    </a>
                                    <a target="_blank" href="https://www.facebook.com/BanglanewsSports" className="text-decoration-none text-dark d-flex align-items-center gap-2">
                                        <i className="bi bi-facebook fs-6"></i>
                                        <span>Sports</span>
                                    </a>
                                    <a target="_blank" href="https://www.facebook.com/bnlifestyle" className="text-decoration-none text-dark d-flex align-items-center gap-2">
                                        <i className="bi bi-facebook fs-6"></i>
                                        <span>Life Style</span>
                                    </a>
                                    <a target="_blank" href="https://www.facebook.com/Banglanews24Health" className="text-decoration-none text-dark d-flex align-items-center gap-2">
                                        <i className="bi bi-facebook fs-6"></i>
                                        <span>Health</span>
                                    </a>
                                </div>

                                <strong>YouTube channel</strong>
                                <div className="d-flex flex-wrap gap-3 py-3 border-bottom mb-3">
                                    <a target="_blank" href="https://www.youtube.com/@Banglanews24-Youtube" className="text-decoration-none text-dark d-flex align-items-center gap-2">
                                        <i className="bi bi-youtube text-danger fs-6"></i>
                                        <span>Banglanews24</span>
                                    </a>
                                    <a target="_blank" href="https://www.youtube.com/@Banglanews24International" className="text-decoration-none text-dark d-flex align-items-center gap-2">
                                        <i className="bi bi-youtube text-danger fs-6"></i>
                                        <span>International</span>
                                    </a>
                                    <a target="_blank" href="https://www.youtube.com/@Banglanews24Country" className="text-decoration-none text-dark d-flex align-items-center gap-2">
                                        <i className="bi bi-youtube text-danger fs-6"></i>
                                        <span>Country</span>
                                    </a>
                                    <a target="_blank" href="https://www.youtube.com/@Banglanews24Entertainment" className="text-decoration-none text-dark d-flex align-items-center gap-2">
                                        <i className="bi bi-youtube text-danger fs-6"></i>
                                        <span>Entertainment</span>
                                    </a>
                                    <a target="_blank" href="https://www.youtube.com/@BN24Sports" className="text-decoration-none text-dark d-flex align-items-center gap-2">
                                        <i className="bi bi-youtube text-danger fs-6"></i>
                                        <span>Sports</span>
                                    </a>
                                    <a target="_blank" href="https://www.youtube.com/@Banglanews24Health" className="text-decoration-none text-dark d-flex align-items-center gap-2">
                                        <i className="bi bi-youtube text-danger fs-6"></i>
                                        <span>Health</span>
                                    </a>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <strong>Instagram</strong>
                                        <div className="d-flex flex-wrap gap-3 py-3 border-bottom mb-3">
                                            <a target="_blank" href="https://www.instagram.com/banglanews24" className="text-decoration-none text-dark d-flex align-items-center gap-2">
                                                <i className="bi bi-instagram fs-4"></i>
                                                <span>Banglanews24</span>
                                            </a>
                                        </div>

                                        <strong>X</strong>
                                        <div className="d-flex flex-wrap gap-3 py-3 border-bottom mb-3">
                                            <a target="_blank" href="https://x.com/banglanews24com" className="text-decoration-none text-dark d-flex align-items-center gap-2">
                                                <i className="bi bi-twitter-x fs-4"></i>
                                                <span>Banglanews24</span>
                                            </a>
                                        </div>

                                        <strong>LinkedIn</strong>
                                        <div className="d-flex flex-wrap gap-3 py-3 border-bottom mb-3">
                                            <a target="_blank" href="https://linkedin.com/company/banglanews24digital" className="text-decoration-none text-dark d-flex align-items-center gap-2">
                                                <i className="bi bi-linkedin fs-4"></i>
                                                <span>Banglanews24</span>
                                            </a>
                                        </div>

                                        <strong>Threads</strong>
                                        <div className="d-flex flex-wrap gap-3 py-3 border-bottom mb-3">
                                            <a target="_blank" href="https://www.threads.com/@banglanews24" className="text-decoration-none text-dark d-flex align-items-center gap-2">
                                                <i className="bi bi-threads fs-4"></i>
                                                <span>Banglanews24</span>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <strong>WhatsApp</strong>
                                        <div className="d-flex flex-wrap gap-3 py-3 border-bottom mb-3">
                                            <a target="_blank" href="https://whatsapp.com/channel/0029Vb5rjOzIiRp0xlsT6700" className="text-decoration-none text-dark d-flex align-items-center gap-2">
                                                <i className="bi bi-whatsapp fs-4"></i>
                                                <span>Banglanews24</span>
                                            </a>
                                        </div>

                                        <strong>Telegram</strong>
                                        <div className="d-flex flex-wrap gap-3 py-3 border-bottom mb-3">
                                            <a target="_blank" href="https://t.me/+88AQZFm82yRhMWQ1" className="text-decoration-none text-dark d-flex align-items-center gap-2">
                                                <i className="bi bi-telegram fs-4"></i>
                                                <span>Banglanews24</span>
                                            </a>
                                        </div>

                                        <strong>TikTok</strong>
                                        <div className="d-flex flex-wrap gap-3 py-3 border-bottom mb-3">
                                            <a target="_blank" href="https://www.tiktok.com/@Banglanews24.comOfficial" className="text-decoration-none text-dark d-flex align-items-center gap-2">
                                                <i className="bi bi-tiktok fs-4"></i>
                                                <span>Banglanews24</span>
                                            </a>
                                        </div>

                                        <strong>Pinterest</strong>
                                        <div className="d-flex flex-wrap gap-3 py-3 border-bottom mb-3">
                                            <a target="_blank" href="https://www.pinterest.com/banglanews24official" className="text-decoration-none text-dark d-flex align-items-center gap-2">
                                                <i className="bi bi-pinterest fs-4"></i>
                                                <span>Banglanews24</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="clearfix"></div>
                        <time className="text-end d-block" dangerouslySetInnerHTML={{ __html: Today }} />
                    </div>
                </div>
            </div>

        </header>
    );
};

export default Header;
