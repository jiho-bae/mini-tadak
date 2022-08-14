import React from 'react';
import './style.css';

interface CircleButtonProps {
  icon?: React.ReactNode;
  text?: string;
  className?: string;
  color?: string;
  onClick?: () => void;
}

const CircleButton = ({ text, icon, className = '', color, onClick }: CircleButtonProps): JSX.Element => {
  return (
    <button color={color} className={'circle-button ' + className} onClick={onClick}>
      {icon}
      {text}
    </button>
  );
};

export default CircleButton;
