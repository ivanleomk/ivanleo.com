"use client";

import Image, { ImageProps } from "next/image";
import { clsxm } from "../utils/css";

export interface IKommyImage extends ImageProps {
  blogImage?: boolean;
  caption?: string;
  captionClassName?: string;
  height?: number;
  width?: number;
}

export default function KommyImage({
  src,
  alt,
  className,
  blogImage = false,
  caption,
  width = 600,
  height = 600,
  captionClassName,
  ...rest
}: IKommyImage) {
  if (blogImage) {
    return (
      <figure className="mx-auto my-8 h-auto w-auto max-w-3xl overflow-clip rounded-md">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={clsxm(
            "h-auto w-full rounded-md object-cover object-center",
            className
          )}
        />
        <figcaption
          className={clsxm(
            "mx-auto mt-2 max-w-xl text-center text-base italic text-gray-600",
            captionClassName
          )}
        >
          <span>{caption}</span>
        </figcaption>
      </figure>
    );
  }
  return (
    <div className = "flex items-center justify-center my-6">
      
    <Image
      className={clsxm( className)}
      src={src}
      alt={alt}
      width={width}
      height={height}
      {...rest}
    />
    
    </div>
  );
}
