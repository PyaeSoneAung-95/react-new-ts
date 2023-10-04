import { ThreeDots } from "react-loader-spinner";

export default function OverlayLoading({ color }: { color: string }) {
  return (
    <div className="absolute w-full h-full bg-gray-50 inset-0 opacity-80 rounded-full flex items-center justify-center">
      <ThreeDots
        width="40px"
        height="100%"
        color={color}
        ariaLabel="three-dots-loading"
        wrapperClass="loadingWrapper"
        visible={true}
      />
    </div>
  );
}
