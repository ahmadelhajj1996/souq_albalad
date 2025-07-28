import  { useEffect } from "react";
import PropTypes from "prop-types";

const Modal = ({
  isOpen,
  onClose,
  children,
  className = "",
  className1 = "",
  closeOnOverlayClick = true,
  closeOnEsc = true,
}) => {
  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, closeOnEsc]);

  if (!isOpen) return null; 
  
  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto  `}>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${className1} `}
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className={`relative  bg-white rounded-lg shadow-xl transform transition-all max-w-full ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="block absolute top-4 end-4 text-gray-800 hover:text-red-600"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="p-6 mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  className1: PropTypes.string,
  closeOnOverlayClick: PropTypes.bool,
  closeOnEsc: PropTypes.bool,
};

export default Modal


// const [isModalOpen, setIsModalOpen] = useState(false);
{/* <button onClick={() => setIsModalOpen(true)}>open </button>
<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  closeOnEsc={false}
  closeOnOverlayClick={false}
  className="w-[900px] h-[600px]"
>
  <div className="">
    Lorem Ipsum is simply dummy text of the printing and typesetting
    industry. Lorem Ipsum has been the industrys standard dummy text ever
    since the 1500s, when an unknown printer took a galley of type and
    scrambled it to make a type specimen book. It has survived not only
    five centuries, but also the leap into electronic typesetting,
    remaining essentially unchanged. It was popularised in the 1960s with
    the release of Letraset sheets containing Lorem Ipsum passages, and
    more recently with desktop publishing software like Aldus PageMaker
    including versions of Lorem Ipsum
  </div>
</Modal> */}
