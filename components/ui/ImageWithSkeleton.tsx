"use client";
import React, { useState } from "react";

export const ImageWithSkeleton: React.FC<{
  src: string;
  alt?: string;
  className?: string;
}> = ({ src, alt = "", className = "" }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative ${className}`}>
      {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`w-full h-auto ${loaded ? "block" : "hidden"} rounded-md`}
      />
    </div>
  );
};

export default ImageWithSkeleton;

