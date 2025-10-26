import React from "react";
import ViewImg from "@/components/viewImg";
import Image from 'next/image';
import styles from "@/css_module/details.module.css";
import Link from "next/link";
import CustomLink from "@/components/customLink";

const MoreNews = ({ moreNewsData }) => {
    return (
        <>
            {moreNewsData.n_solder &&
                <span className={`${styles.n_solder} text-danger`} dangerouslySetInnerHTML={{ __html: moreNewsData.n_solder }} />
            }

            <h1 className="my-3">{moreNewsData.n_head}</h1>

            {(moreNewsData.n_subhead) &&
                <h6 className={`mb-2 text-secondary ${styles.n_subhead}`} dangerouslySetInnerHTML={{ __html: moreNewsData.n_subhead }} />
            }

            {moreNewsData.writers_name &&
                <div className={`row ${styles.card_profile}`}>
                    <div className="card-profile my-1 d-block">
                        <div className="row">
                            <div className="col-2 col-md-1 pe-0 text-center">
                                {moreNewsData.writers_img ?
                                    <Image src={moreNewsData.writers_img} alt={moreNewsData.writers_name} width={100} height={100} quality={100} />
                                    : ''}
                            </div>
                            <div className="col">
                                {moreNewsData.get_writers ?
                                    <a href={`/author/${moreNewsData.get_writers.id}`} className="m-0 p-0">
                                        <b className="fs-6">{moreNewsData.writers_name} </b>
                                        {moreNewsData.n_author}
                                        <span className="d-block text-muted">{moreNewsData.writers_profession}</span>
                                    </a>
                                    : ''}
                            </div>
                        </div>
                    </div>
                </div>
            }

            {((moreNewsData.reporter_name == '' || moreNewsData.writers_name == '') && moreNewsData.n_author) &&
                <h6 className="fw-bold my-4"><i className="bi bi-pen"></i> {moreNewsData.n_author}</h6>
            }

            <time className="text-black-50">
                <i className="bi bi-stopwatch text-primary me-2"></i>
                প্রকাশ: {moreNewsData.date_at}
                {(moreNewsData.updated_by != null && moreNewsData.edit_at != '') && ` | আপডেট: ${moreNewsData.edit_at}`}
            </time>
            <div className="mt-3 pt-3 border-top">
                {(moreNewsData.main_image && moreNewsData.main_video == 0) ?
                    <figure className="figure w-100">
                        <ViewImg image={moreNewsData.main_image} cls="w-100 h-auto" alt={moreNewsData.n_head} />

                        <figcaption className="figure-caption text-right fs-6 pb-2" dangerouslySetInnerHTML={{ __html: moreNewsData.n_caption }} />
                    </figure>
                    : ''}

                {(moreNewsData.main_video == 1) &&
                    <div className="ratio ratio-16x9 mb-4">
                        <iframe className="embed-responsive-item" src={moreNewsData.embedded_code} allowFullScreen></iframe>
                    </div>
                }
            </div>

            <article className="position-relative">
                <p className={styles.moreAtticle} dangerouslySetInnerHTML={{ __html: moreNewsData.n_details }} />

                <div className={`position-absolute left-0 right-0 w-100 ${styles.moreReading}`}>
                    <div className="d-grid gap-2 col-6 col-md-2 col-xl-3 col-xxl-2 mt-5 pt-5">
                        <CustomLink prefetch={false} href={`/${moreNewsData.cat_name.slug}/news/bd/${moreNewsData.n_id}.details`} className="btn btn-outline-secondary" type="button">বাকি অংশ পড়ুন <i className="bi bi-arrow-right-short"></i></CustomLink>
                    </div>
                </div>
            </article>

        </>
    );
};

export default MoreNews;
