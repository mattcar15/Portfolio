// src/components/media/Picture.tsx
import React from "react";
import { RESPONSIVE_IMAGES } from "@/components/projects/assets.generated";

type ImageSource = string | { src: string };

type Props = {
  srcKey: keyof typeof RESPONSIVE_IMAGES;   // e.g. "CarCamper/hero"
  alt: string;
  sizes: string;                            // e.g. "(max-width: 768px) 100vw, 960px"
  widths?: number[];                        // defaults to available
  className?: string;
  width?: number;
  height?: number;
  placeholder?: boolean;
};

export default function Picture({
  srcKey, alt, sizes, widths, className, width, height, placeholder = true,
}: Props) {
  const img = RESPONSIVE_IMAGES[srcKey];
  const allWidths = widths ?? Object.keys(img.avif).map(Number).sort((a,b)=>a-b);

  const getSrc = (source: ImageSource): string => {
    return typeof source === 'string' ? source : source.src;
  };

  const toSrcSet = (m: Record<string, ImageSource>) =>
    allWidths.map(w => `${getSrc(m[String(w)])} ${w}w`).join(", ");

  const style = placeholder
    ? { background: `center / cover no-repeat url('${getSrc(img.placeholder)}')` }
    : undefined;

  // Fallback <img> uses the middle width
  const mid = allWidths[Math.floor(allWidths.length / 2)];
  const fallbackMidKey = String(mid);
  const fallbackMid = fallbackMidKey in img.fallback 
    ? img.fallback[fallbackMidKey as keyof typeof img.fallback]
    : Object.values(img.fallback)[0];

  return (
    <picture>
      <source type="image/avif" srcSet={toSrcSet(img.avif)} sizes={sizes} />
      <img
        className={className}
        src={getSrc(fallbackMid)}
        srcSet={toSrcSet(img.fallback)}
        sizes={sizes}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        alt={alt}
        style={style}
      />
    </picture>
  );
}
