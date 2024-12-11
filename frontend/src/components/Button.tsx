import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-sm  px-4 py-2 rounded-md ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
