import React from "react";

const Button = ({
  styles,
  padding,
  fontSize,
  fontWeight,
  content,
  furtherClasses,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      style={{ borderWidth: 1.5, borderRadius: 4, ...styles }}
      className={`bg-[#3d1a54] border-2 border-[#3d1a54] ${padding} ${fontSize} ${fontWeight} ${furtherClasses} duration-300 text-white hover:bg-white hover:text-[#3d1a54] transition-all`}
    >
      {content}
    </button>
  );
};

export default Button;
