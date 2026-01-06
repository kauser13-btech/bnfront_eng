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
                    <div className="p-0 pe-0">
                        <ul className="list-group list-group-horizontal mb-2 float-end mt-2">
                            <li className="list-group-item">
                                <a className="text-dark fs-6" href="https://www.facebook.com/BanglanewsEnglish"><i className="bi bi-facebook"></i></a>
                            </li>
                            <li className="list-group-item">
                                <a className="text-dark fs-6" href="https://www.youtube.com/channel/UCzfkD4dNxVlIhUW3xaM4uxw"><i className="bi bi-youtube"></i></a>
                            </li>
                            <li className="list-group-item">
                                <a className="text-dark fs-6" href="https://x.com/banglanews24com"><i className="bi bi-twitter-x"></i></a>
                            </li>
                            <li className="list-group-item">
                                <a className="text-dark fs-6" href="https://www.instagram.com/banglanews24/"><i className="bi bi-instagram"></i></a>
                            </li>
                            <li className="list-group-item">
                                <a className="text-dark fs-6" href="https://whatsapp.com/channel/0029Vb5rjOzIiRp0xlsT6700"><i className="bi bi-whatsapp"></i></a>
                            </li>
                            <li className="list-group-item">
                                <a className="text-dark fs-6" href="https://www.linkedin.com/company/banglanews24digital/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BRm2TgTL%2BTGCcsmi0Ln357Q%3D%3D"><i className="bi bi-linkedin"></i></a>
                            </li>
                        </ul>

                        <div className="clearfix"></div>
                        <time className="text-end d-block" dangerouslySetInnerHTML={{ __html: Today }} />
                    </div>
                </div>
            </div>

        </header>
    );
};

export default Header;
