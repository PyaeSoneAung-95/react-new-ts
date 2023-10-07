import { useState } from "react";
import Modal from "../Modal";
import Login from "../Login";
import Signup from "../Signup";

export default function AuthButton() {
  const [show, setShow] = useState<boolean>(false);
  const [tag, setTag] = useState<string>("login");

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleTag = (name: string) => setTag(name);

  return (
    <>
      <Modal
        isOpen={show}
        onClose={handleClose}
        containerStyles="w-full sm:w-[460px]"
      >
        {tag === "login" ? (
          <Login handleTag={handleTag} />
        ) : (
          <Signup handleTag={handleTag} />
        )}
      </Modal>
      <button
        className="btn-primary__light px-3 py-3 rounded-md"
        onClick={handleShow}
      >
        Login
      </button>
    </>
  );
}
