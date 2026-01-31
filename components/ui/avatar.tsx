import * as React from "react";
import Image from "next/image";

type AvatarProps = {
  src: string;
  alt?: string;
  size?: number;
  className?: string;
  ring?: number; // ring thickness in px
};

export function Avatar({
  src,
  alt = "avatar",
  size = 58,
  className = "",
  ring = 4,
}: AvatarProps) {
  const outerSize = size;
  const innerSize = Math.max(0, outerSize - 2 * ring);

  return (
    <div
      style={{ width: outerSize, height: outerSize }}
      className={`inline-flex items-center justify-center rounded-full dark:bg-white ${className}`}
      aria-hidden={false}
    >
      <div style={{ width: innerSize, height: innerSize }} className="overflow-hidden rounded-full">
        <Image src={src} alt={alt} width={innerSize} height={innerSize} className="object-cover w-full h-full" />
      </div>
    </div>
  );
}

export default Avatar;

