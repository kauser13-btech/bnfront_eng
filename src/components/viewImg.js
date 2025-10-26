"use client"

import Image from 'next/image';

const imageLoader = ({ src }) => {
    return src;
}

const ViewImg = ({ image, cls, alt, ...props }) => {

    return (
        <Image
            loader={imageLoader}
            src={image}
            className={`${cls} border`}
            alt={alt}
            width={800}
            height={483}
            quality={100}
            {...props}
        />
    );
};


export default ViewImg;
