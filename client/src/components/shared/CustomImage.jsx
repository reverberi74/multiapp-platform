
import React from "react";

const SERVER_URL = import.meta.env.VITE_API_SERVER_URL || "http://localhost:3000";

const CustomImage = ({ src, alt, className, onClick, style = {} }) => {
  const fallbackImage = "https://placehold.co/600x400";
  const isValidSrc = src && src.trim() !== "";

  const fullSrc = isValidSrc
    ? src.startsWith("http")
      ? src
      : `${SERVER_URL}/uploads/${src}`
    : fallbackImage;

  return (
    <img
      src={fullSrc}
      alt={alt || "immagine"}
      className={className}
      style={style}
      crossOrigin="anonymous"
      onClick={onClick}
    />
  );
};

export default CustomImage;
