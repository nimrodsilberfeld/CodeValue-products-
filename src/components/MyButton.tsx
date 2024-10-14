import React from "react";

interface MyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  text: string;
  textColor?: string;
  backgroundColor?: string;
  fontSize?: string;
  disabled?: boolean;
}

const MyButton = ({
  text,
  onClick,
  textColor,
  backgroundColor,
  fontSize,
  disabled = false,
  ...props
}: MyButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="button-1"
      style={{
        fontSize: fontSize ? fontSize : "1rem",
        color: disabled ? "#cccccc" : textColor ? textColor : "white",
        backgroundColor: disabled
          ? "#e0e0e0"
          : backgroundColor
          ? backgroundColor
          : "#2c3e50",
      }}
      {...props}
    >
      {text}
    </button>
  );
};

export default MyButton;
