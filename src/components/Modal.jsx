import { children } from "solid-js";

const Modal = (props) => {
  const handleBackDropClick = (e) => {
    const backdrop = document.querySelector(".backdrop");
    e.stopPropagation();
    if (e.target !== backdrop) {
      return;
    }
    setShow(false);
  };
  const c = children(() => props.children);
  return (
    <div
      class="absolute top-0 left-0 bottom-0 right-0 backdrop-blur-md z-40 flex justify-center backdrop"
      onClick={handleBackDropClick}
    >
      <div class="font-conf max-w-full sm:max-w-2xl w-full bg-white absolute top-[10%] rounded shadow-lg p-3 z-50">
        <div class="flex justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className=" h-6 w-6"
            viewBox="0 0 20 20"
            fill="black"
            onClick={() => props.setShow(false)}
            class="cursor-pointer"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {c}
      </div>
    </div>
  );
};

export default Modal;
