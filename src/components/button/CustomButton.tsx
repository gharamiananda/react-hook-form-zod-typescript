import React from 'react';
import clsx from 'clsx';

interface CustomButtonProps {
  type?: 'button' | 'submit' | 'reset';
  color?: string;
  bgColor?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  iconPosition?: 'front' | 'back';
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  type = 'button',
  color = 'text-white',
  bgColor = 'bg-blue-500',
  onClick,
  icon,
  iconPosition = 'front',
  loading = false,
  disabled = false,
  children,
}) => {
  const buttonClass = clsx(
    'px-4 py-2 rounded-md focus:outline-none',
    color,
    bgColor,
    {
      'cursor-not-allowed opacity-50': disabled || loading,
      'flex items-center justify-center': icon,
    }
  );

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClass}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="loader" />
      ) : (
        <>
          {icon && iconPosition === 'front' && <span className="mr-2">{icon}</span>}
          {children}
          {icon && iconPosition === 'back' && <span className="ml-2">{icon}</span>}
        </>
      )}
    </button>
  );
};

export default CustomButton;
