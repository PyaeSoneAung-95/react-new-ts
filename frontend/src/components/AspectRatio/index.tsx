import { useEffect, useRef } from "react";

export default function AspectRatio({
  ratio = 564 / 840,
  children,
  customStyles,
}: AspectRatioProps) {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const adjustDimension = () => {
      let frame = frameRef.current;
      if (frame) {
        const frameWidth = frame.getBoundingClientRect().width;
        frame.style.height = `${frameWidth * ratio}px`;
      }
    };
    adjustDimension();
    window.addEventListener("resize", adjustDimension);
    return () => window.removeEventListener("resize", adjustDimension);
  }, [ratio]);

  return (
    <div
      ref={frameRef}
      className={`relative flex justify-center bg-gray-200 ${customStyles}`}
    >
      {children}
    </div>
  );
}
