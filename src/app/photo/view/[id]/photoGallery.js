'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import ViewImg from "@/components/viewImg";

const PhotoGallery = ({ gallery }) => {
    const modalRef = useRef(null);
    const bsModalRef = useRef(null);

    const images = JSON.parse(gallery.images);

    const createCaption = useCallback((caption) => {
        return `<div class="carousel-caption d-none d-md-block">
        <h4 class="m-0">${caption}</h4>
      </div>`;
    }, []);

    const createIndicators = useCallback((currentIndex) => {
        let markup = "";

        for (let i = 0; i < images.length; i++) {
            markup += `
        <button type="button" data-bs-target="#lightboxCarousel"
          data-bs-slide-to="${i}"
          ${i === currentIndex ? 'class="active" aria-current="true"' : ''}
          aria-label="Slide ${i + 1}">
        </button>`;
        }

        return markup;
    }, [images.length]);

    const createSlides = useCallback((currentIndex) => {
        let markup = "";

        images.forEach((image, index) => {
            markup += `
        <div class="carousel-item${index === currentIndex ? " active" : ""}">
          <img class="d-block img-fluid w-100" src="${gallery.imagesUrl}/${image.image}" alt="${image.text}">
          ${image.alt ? createCaption(image.alt) : ""}
        </div>`;
        });

        return markup;
    }, [images, gallery.imagesUrl, createCaption]);

    const createCarousel = useCallback((currentIndex) => {
        const markup = `
      <div id="lightboxCarousel" class="carousel slide carousel-fade" data-bs-ride="true">
        <div class="carousel-indicators">
          ${createIndicators(currentIndex)}
        </div>
        <div class="carousel-inner justify-content-center mx-auto">
          ${createSlides(currentIndex)}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#lightboxCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#lightboxCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    `;

        const modalBody = modalRef.current?.querySelector('.lightbox-content');
        if (modalBody) {
            modalBody.innerHTML = markup;
        }
    }, [createIndicators, createSlides]);

    useEffect(() => {
        const initializeBootstrap = () => {
            if (typeof window !== 'undefined' && window.bootstrap && modalRef.current) {
                bsModalRef.current = new window.bootstrap.Modal(modalRef.current);

                const fsEnlarge = modalRef.current.querySelector(".btn-fullscreen-enlarge");
                const fsExit = modalRef.current.querySelector(".btn-fullscreen-exit");

                if (fsEnlarge && fsExit) {
                    const enterFS = () => {
                        modalRef.current.requestFullscreen().catch(err => {
                            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                        });
                        fsEnlarge.classList.toggle("d-none");
                        fsExit.classList.toggle("d-none");
                    };

                    const exitFS = () => {
                        document.exitFullscreen();
                        fsExit.classList.toggle("d-none");
                        fsEnlarge.classList.toggle("d-none");
                    };

                    fsEnlarge.addEventListener("click", (e) => {
                        e.preventDefault();
                        enterFS();
                    });

                    fsExit.addEventListener("click", (e) => {
                        e.preventDefault();
                        exitFS();
                    });

                    setTimeout(() => {
                        createCarousel(0);
                        bsModalRef.current?.show();
                    }, 300);
                }
            }
        };

        if (typeof window !== 'undefined' && window.bootstrap) {
            initializeBootstrap();
        } else {
            const timer = setTimeout(() => {
                initializeBootstrap();
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [createCarousel]);

    const handleImageClick = (e, index) => {
        e.preventDefault();

        const lightboxCarousel = document.getElementById("lightboxCarousel");

        if (lightboxCarousel && window.bootstrap) {
            const bsCarousel = new window.bootstrap.Carousel(lightboxCarousel);
            bsCarousel.to(index);
        } else {
            createCarousel(index);
        }

        if (bsModalRef.current) {
            bsModalRef.current.show();
        }
    };

    return (
        <>
            <style jsx global>{`
        :root {
          --lightbox: rgb(0 0 0 / 0.75);
          --carousel-text: #fff;
        }
        
        @keyframes zoomin {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .gallery-item {
          display: block;
          text-decoration: none;
          cursor: pointer;
        }
        
        .gallery-item img {
          box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.15);
          transition: box-shadow 0.2s;
        }
        
        .gallery-item:hover img {
          box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.35);
        }

        .modal.lightbox-modal {
            z-index: 99999 !important;
        }

        .modal-backdrop {
            z-index: 99998 !important;
        }

        .modal-content {
            z-index: 99999 !important;
        }
        
        .lightbox-modal .modal-content {
          background-color: var(--lightbox);
        }
        
        .lightbox-modal .btn-close {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          font-size: 1.25rem;
          z-index: 10;
          filter: invert(1) grayscale(100);
        }
        
        .lightbox-modal .modal-body {
          display: flex;
          align-items: center;
          padding: 0;
        }
        
        .lightbox-modal .lightbox-content {
          width: 100%;
        }
        
        .lightbox-modal .carousel-indicators {
          margin-bottom: 0;
        }
        
        .lightbox-modal .carousel-indicators [data-bs-target] {
          background-color: var(--carousel-text) !important;
        }
        
        .lightbox-modal .carousel-inner {
          width: 75%;
        }
        
        .lightbox-modal .carousel-inner img {
          animation: zoomin 10s linear infinite;
        }
        
        .lightbox-modal .carousel-item .carousel-caption {
          right: 0;
          bottom: 0;
          left: 0;
          padding-bottom: 2rem;
          background-color: var(--lightbox);
          color: var(--carousel-text) !important;
        }
        
        .lightbox-modal .carousel-control-prev,
        .lightbox-modal .carousel-control-next {
          width: auto;
        }
        
        .lightbox-modal .carousel-control-prev {
          left: 1.25rem;
        }
        
        .lightbox-modal .carousel-control-next {
          right: 1.25rem;
        }
        
        @media (min-width: 1400px) {
          .lightbox-modal .carousel-inner {
            max-width: 60%;
          }
        }
        
        [data-bs-theme="dark"] .lightbox-modal .carousel-control-next-icon,
        [data-bs-theme="dark"] .lightbox-modal .carousel-control-prev-icon {
          filter: none;
        }
        
        .btn-fullscreen-enlarge,
        .btn-fullscreen-exit {
          position: absolute;
          top: 1.25rem;
          right: 3.5rem;
          z-index: 10;
          border: 0;
          background: transparent;
          opacity: 0.6;
          font-size: 1.25rem;
          color: white;
          cursor: pointer;
          padding: 0.5rem;
        }
        
        .btn-fullscreen-enlarge:hover,
        .btn-fullscreen-exit:hover {
          opacity: 1;
        }
      `}</style>

            <section className="photo-gallery">
                <div className="container">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 gallery-grid">
                        {images.map((image, index) => (
                            <div key={index} className="col">
                                <a
                                    className="gallery-item"
                                    href={`${gallery.imagesUrl}/${image.image}`}
                                    onClick={(e) => handleImageClick(e, index)}
                                >
                                    <ViewImg image={`${gallery.imagesUrl}/${image.image}`} cls="h-100 w-100 img-fluid" alt={image.text} />
                                    <h5 className='mt-4 px-2 text-limit-2 lh-base'>{image.text}</h5>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div
                className="modal fade lightbox-modal"
                id="lightbox-modal"
                tabIndex="-1"
                ref={modalRef}
            >
                <div className="modal-dialog modal-dialog-centered modal-fullscreen">
                    <div className="modal-content">
                        <button
                            type="button"
                            className="btn-fullscreen-enlarge"
                            aria-label="Enlarge fullscreen"
                        >
                            ⛶
                        </button>
                        <button
                            type="button"
                            className="btn-fullscreen-exit d-none"
                            aria-label="Exit fullscreen"
                        >
                            ⛶
                        </button>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        >
                            ×
                        </button>
                        <div className="modal-body">
                            <div className="lightbox-content">
                                {/* Carousel will be inserted here */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PhotoGallery;
