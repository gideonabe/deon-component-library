// import type {
//   InputHTMLAttributes,
//   ReactNode,
// } from 'react'

// interface InputProps
//   extends InputHTMLAttributes<HTMLInputElement> {
//   label?: string
//   error?: string
//   helperText?: string
//   startAdornment?: ReactNode
// }

// export function Input({
//   label,
//   error,
//   helperText,
//   startAdornment,
//   id,
//   className = '',
//   ...props
// }: InputProps) {
//   const inputId =
//     id ?? `input-${props.name ?? 'field'}`

//   const describedBy = error
//     ? `${inputId}-error`
//     : helperText
//       ? `${inputId}-helper`
//       : undefined

//   return (
//     <div className="w-full">
//       {label && (
//         <label
//           htmlFor={inputId}
//           className="mb-2 block text-sm font-semibold text-foreground"
//         >
//           {label}

//           {props.required && (
//             <span
//               className="ml-1 text-danger"
//               aria-hidden="true"
//             >
//               *
//             </span>
//           )}
//         </label>
//       )}

//       <div className="relative">
//         {startAdornment && (
//           <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
//             {startAdornment}
//           </div>
//         )}

//         <input
//           id={inputId}
//           aria-invalid={Boolean(error)}
//           aria-describedby={describedBy}
//           className={[
//             'w-full rounded-md border bg-surface px-4 py-3',
//             'text-sm text-foreground',
//             'outline-none transition-colors duration-200',
//             'placeholder:text-muted',
//             'focus:border-brand focus:ring-3 focus:ring-brand/15',
//             error
//               ? 'border-danger focus:border-danger focus:ring-danger/15'
//               : 'border-border',
//             startAdornment ? 'pl-10' : '',
//             className,
//           ].join(' ')}
//           {...props}
//         />
//       </div>

//       {error && (
//         <p
//           id={`${inputId}-error`}
//           className="mt-2 text-sm text-danger"
//           role="alert"
//         >
//           {error}
//         </p>
//       )}

//       {!error && helperText && (
//         <p
//           id={`${inputId}-helper`}
//           className="mt-2 text-sm text-muted"
//         >
//           {helperText}
//         </p>
//       )}
//     </div>
//   )
// }





import React, { forwardRef, useId } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    // Generate a unique ID if one isn't provided, crucial for accessibility (a11y)
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full flex flex-col gap-1.5">
        <label 
          htmlFor={inputId} 
          className="text-xs font-sans font-semibold tracking-widest uppercase text-neutral-900"
        >
          {label}
        </label>
        
        <input
          id={inputId}
          ref={ref}
          className={`
            w-full bg-transparent border-b pb-2 pt-2 text-sm text-neutral-900 placeholder:text-neutral-400 
            focus:outline-none focus:border-neutral-900 transition-colors duration-300 rounded-none
            ${error ? 'border-red-500' : 'border-neutral-200'}
            ${props.readOnly || props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${className}
          `}
          {...props}
        />
        
        {error ? (
          <p className="text-xs text-red-500 mt-1">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-neutral-500 mt-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';