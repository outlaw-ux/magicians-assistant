import Image from "next/image";

export default function Card({
  src,
  alt,
  onLoad,
}: {
  src: string;
  alt: string;
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
}) {
  return (
    <Image
      src={src}
      width="300"
      height="428"
      alt={alt}
      onLoad={onLoad}
      placeholder="blur"
      blurDataURL="/assets/loading.jpg"
    />
  );
}
