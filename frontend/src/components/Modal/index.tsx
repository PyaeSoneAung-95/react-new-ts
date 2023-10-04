export default function Modal({
  isOpen,
  onClose,
  containerStyles,
  children,
}: ModalProps) {
  const clickOverlay = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed inset-0 z-50 overflow-auto`}
    >
      <div
        onClick={clickOverlay}
        className="flex items-center justify-center px-3 py-5 bg-black bg-opacity-50  w-full min-h-full"
      >
        <div className={`relative bg-white rounded-md p-6 ${containerStyles}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
