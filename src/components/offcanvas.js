'use client'

import React from "react";
import ViewImg from "./viewImg";
import logoImg from "../../public/img/logo.jpg";
import Link from "next/link";
import Image from "next/image";
import CustomLink from "./customLink";

const Offcanvas = ({ data }) => {
    const closeOffCanvas = () => {
        document.getElementById('offcanvasClose').click();
    }

    return (
        <div className="offcanvas offcanvas-end text-bg-light" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header border-bottom">
                <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                    <Image src={logoImg.src} className={`w-75 h-auto`} alt={`logo`} width={800} height={483} quality={100} />
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-header border-bottom pt-0 pb-2 d-flex justify-content-center d-block d-xl-none">
                <ul className="list-group list-group-horizontal mb-2 float-end mt-4">
                    <li className="list-group-item">
                        <a className="text-dark fs-6" href="https://www.facebook.com/banglanews24"><i className="bi bi-facebook"></i></a>
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
            </div>
            <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li className="nav-item">
                        <a className="nav-link fs-5" aria-current="page" href={`/`}><i className="bi bi-house"></i></a>
                    </li>
                    <li className="nav-item">
                        <CustomLink prefetch={false} className="nav-link fs-5" href={`/video`}>Video</CustomLink>
                    </li>


                    {data.map((nav, i) => {
                        if (nav.child.length > 0) {
                            return (
                                <li key={i} className="nav-item dropdown">
                                    <CustomLink href="#" className="nav-link dropdown-toggle fs-5" role="button" data-bs-toggle="dropdown" aria-expanded="false">{nav.m_name}</CustomLink>
                                    <ul className="dropdown-menu">
                                        {nav.child.map((row, i) =>
                                            <li key={i}><CustomLink prefetch={false} onClick={closeOffCanvas} href={`/category/${row.slug}`} className="dropdown-item fs-5">{row.m_name}</CustomLink></li>
                                        )}
                                    </ul>
                                </li>
                            );
                        }
                        return <li key={i} className="nav-item"><CustomLink prefetch={false} onClick={closeOffCanvas} href={`/category/${nav.slug}`} className="nav-link fs-5">{nav.m_name}</CustomLink></li>;
                    })}

                    {/* <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark">
                            <li><CustomLink prefetch={false} onClick={closeOffCanvas} className="dropdown-item" href="#">Action</CustomLink></li>
                            <li><CustomLink prefetch={false} onClick={closeOffCanvas} className="dropdown-item" href="#">Another action</CustomLink></li>
                            <li>
                            </li>
                            <li><CustomLink prefetch={false} onClick={closeOffCanvas} className="dropdown-item" href="#">Something else here</CustomLink></li>
                        </ul>
                    </li> */}
                </ul>
            </div>
        </div>
    );
};

export default Offcanvas;
