import Image from "next/image";

interface ICard {
  src: string;
  alt: string;
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
  width?: number;
  height?: number;
  onClick?: () => void;
}

export default function Card({
  src,
  alt,
  onLoad,
  width = 300,
  height = 428,
  onClick,
}: ICard) {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      onLoad={onLoad}
      placeholder="blur"
      blurDataURL="/assets/loading.jpg"
      onClick={onClick}
    />
  );
}
