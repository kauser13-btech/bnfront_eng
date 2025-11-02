import React from "react";
import ViewImg from "./viewImg";
import logoImg from "../../public/img/logo.jpg";
import Link from "next/link";
import Offcanvas from "./offcanvas";
import Image from "next/image";
import CustomLink from "./customLink";
import SearchBTN from "./searchBTN";

async function getData() {
    const res = await fetch(`${process.env.API_URL}/web_allnavs`, {
        headers: { "Accept-Encoding": "gzip,deflate,compress" },
        next: { revalidate: 300 }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

const Navbar = async () => {
    const data = await getData();

    return (<>
        <nav className="navbar navbar-expand-xl sticky-top py-0 shadow-mobile bg-white">
            <div className="container">
                <a className="navbar-brand d-block d-xl-none" href={`/`}>
                    <Image src={logoImg.src} className={`w-75 h-auto`} alt={`logo`} width={800} height={483} quality={100} />
                </a>
                
                <a href="https://www.banglanews24.com"
                    className="text-danger rounded border border-success px-2">বাংলা</a>

                <button className="navbar-toggler text-secondary fs-1 d-block d-xl-none border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                    <i className="bi bi-list"></i>
                </button>

                <div className="collapse navbar-collapse border" id="navbarScroll">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link fs-5 py-0" aria-current="page" href={`/`}><i className="bi bi-house"></i></a>
                        </li>

                        {data.nav.slice(0, 8).map((nav, i) => {
                            if (nav.child.length > 0) {
                                let isDropdown = (nav.slug == '#') ? 'dropdown' : 'dropdown';
                                return (
                                    <li key={i} className="nav-item dropdown">
                                        <CustomLink prefetch={false} href={`/category/${nav.slug}`} className="nav-link fs-5 py-0 px-3 dropdown-toggle" role="button" data-bs-toggle={isDropdown} aria-expanded="false">{nav.m_name}</CustomLink>
                                        <ul className="dropdown-menu">
                                            {nav.child.map((row, i) =>
                                                <li key={i}>
                                                    <CustomLink prefetch={false} href={`/category/${row.slug}`} className="dropdown-item fs-5">{row.m_name}</CustomLink>
                                                </li>
                                            )}
                                        </ul>
                                    </li>
                                );
                            }
                            return <li key={i} className="nav-item"><CustomLink prefetch={false} href={`/category/${nav.slug}`} className="nav-link fs-5 py-0 px-3">{nav.m_name}</CustomLink></li>;
                        })}

                        {/* <li className="nav-item dropdown">
                            <a className="nav-link text-light dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu">
                                <li><CustomLink className="dropdown-item" href="#">Action</CustomLink></li>
                                <li><CustomLink className="dropdown-item" href="#">Another action</CustomLink></li>
                                <li><CustomLink className="dropdown-item" href="#">Something else here</CustomLink></li>
                            </ul>
                        </li> */}
                    </ul>
                    <span className="navbar-text p-0">
                        <ul className="list-group list-group-horizontal">
                            <li className="list-group-item rounded-0 pb-0 pt-2 border-top-0 border-bottom-0">
                                <CustomLink prefetch={false} className="fs-6" href={`/video`}>Video</CustomLink>
                            </li>
                            <li className="list-group-item rounded-0 pb-0 pt-2 border-start-0 border-top-0 border-bottom-0">
                                <CustomLink prefetch={false} className="fs-6" href={`https://www.banglanews24.com/`}>বাংলা</CustomLink>
                            </li>
                            <li className="list-group-item rounded-0 py-0 border-top-0 border-bottom-0">
                                <SearchBTN />
                            </li>
                            <li className="list-group-item rounded-0 py-0 border-end-0 border-top-0 border-bottom-0">
                                <button className="navbar-toggler text-secondary fs-3 mt-2 p-0 d-block  border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                                    <i className="bi bi-list"></i>
                                </button>
                            </li>
                        </ul>
                    </span>
                </div>
            </div>
        </nav>

        <Offcanvas data={data.nav} />
    </>
    );
};

export default Navbar;
