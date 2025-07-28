import PropTypes from "prop-types";

const Image = ({
  src,
  alt = "",
  className = "",
  fallback = null,
  ...props
}) => {
  if (!src) {
    return (
      fallback || <span className={`text-gray-400 ${className}`}>No image</span>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        if (fallback) {
          e.currentTarget.style.display = "none";
        }
      }}
      {...props}
    />
  );
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  fallback: PropTypes.node,
};

export default Image;
