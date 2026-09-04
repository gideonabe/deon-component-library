// interface LoaderProps {
//   size?: 'sm' | 'md' | 'lg'
//   label?: string
// }

// const sizes = {
//   sm: 'size-4 border-2',
//   md: 'size-6 border-2',
//   lg: 'size-10 border-4',
// }

// export function Loader({
//   size = 'md',
//   label = 'Loading',
// }: LoaderProps) {
//   return (
//     <div
//       className="inline-flex items-center gap-3"
//       role="status"
//       aria-label={label}
//     >
//       <span
//         className={[
//           'animate-spin rounded-full border-brand border-t-transparent',
//           sizes[size],
//         ].join(' ')}
//       />

//       <span className="sr-only">
//         {label}
//       </span>
//     </div>
//   )
// }





import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Loader({ size = 'md', className = '' }: LoaderProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <svg 
      className={`animate-spin text-neutral-900 ${sizes[size]} ${className}`} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
      aria-label="Loading"
      role="status"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}