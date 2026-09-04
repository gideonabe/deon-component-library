import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'dark';
}

export function Badge({ children, variant = 'default', className = '', ...props }: BadgeProps) {
  const baseClasses = "inline-flex items-center justify-center px-3 py-1 text-[10px] font-sans tracking-[0.2em] uppercase rounded-full";
  
  const variants = {
    default: "bg-neutral-100 text-neutral-900",
    outline: "bg-transparent border border-neutral-300 text-neutral-600",
    dark: "bg-neutral-900 text-white",
  };

  return (
    <span className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}