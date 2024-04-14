import Image from 'next/image';
import React, { useState } from 'react';

interface ImageWithFallbackProps {
    src: string;
    fallbackSrc: string;
    alt: string;
    borderColor?: string; // Assuming borderColor is a string of CSS classes
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
    src,
    fallbackSrc,
    alt,
    borderColor,
}) => {
    const [imageSrc, setImageSrc] = useState<string>(src);

    const onError = () => {
        setImageSrc(fallbackSrc);
    };

    return (
        <>
            {imageSrc && (
                <Image
                    className={`rounded-full z-10 ${borderColor}`}
                    src={imageSrc}
                    alt={alt}
                    onError={onError}
                    width={20}
                    height={20}
                />
            )}
        </>
    );
};

export default ImageWithFallback;
