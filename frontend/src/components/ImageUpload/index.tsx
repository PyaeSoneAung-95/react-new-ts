import { useField } from "formik";
import { useEffect, useRef, useState } from "react";
import AspectRatio from "../AspectRatio";

export default function ImageUpload({ name }: { name: string }) {
  const [field, meta, helpers] = useField(name);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [preview, setPreview] = useState<ArrayBuffer | string>("");

  useEffect(() => {
    if (meta.value && meta.value instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as ArrayBuffer);
      };
      reader.readAsDataURL(meta.value);
    } else {
      setPreview("");
    }
  }, [meta.value]);

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDrag(true);
  };
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDrag(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    helpers.setValue(file);
    setIsDrag(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    helpers.setValue(file);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleRemove = () => {
    helpers.setValue("");
  };

  return (
    <div
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragEnter}
      className="p-1"
      style={{
        border: `4px dashed ${
          isDrag ? "rgba(13, 110, 253, 0.5)" : "rgba(128, 128, 131, 0.5)"
        } `,
      }}
    >
      <AspectRatio ratio={1 / 2}>
        {meta.value ? (
          <>
            <img
              src={meta.value instanceof File ? preview : meta.value}
              alt="Preview image"
              className="w-auto max-h-full"
            />
            <button
              className="absolute top-2 right-2 text-2xl"
              type="button"
              onClick={handleRemove}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="block w-4 h-4 text-red-500"
              >
                <path d="M1 1L11 11M11 1L1 11" />
              </svg>
            </button>
          </>
        ) : (
          <div className="flex items-center justify-center w-full">
            <div className="text-center">
              <p>Drag and drop your image here</p>
              <button
                type="button"
                onClick={handleClick}
                className="bg-blue-400 hover:bg-blue-500 text-white rounded-md mt-4 px-3 py-4"
              >
                Browse
              </button>
            </div>
          </div>
        )}
      </AspectRatio>
      <input
        type="file"
        hidden
        ref={inputRef}
        name={name}
        accept="image/*"
        onChange={handleChange}
      />
    </div>
  );
}
