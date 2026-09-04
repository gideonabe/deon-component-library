// import {
//   useEffect,
//   type ReactNode,
// } from 'react'
// import { X } from 'lucide-react'

// interface ModalProps {
//   isOpen: boolean
//   onClose: () => void
//   title: string
//   children: ReactNode
// }

// export function Modal({
//   isOpen,
//   onClose,
//   title,
//   children,
// }: ModalProps) {
//   useEffect(() => {
//     if (!isOpen) return

//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === 'Escape') {
//         onClose()
//       }
//     }

//     document.addEventListener(
//       'keydown',
//       handleKeyDown,
//     )

//     document.body.style.overflow = 'hidden'

//     return () => {
//       document.removeEventListener(
//         'keydown',
//         handleKeyDown,
//       )

//       document.body.style.overflow = ''
//     }
//   }, [isOpen, onClose])

//   if (!isOpen) return null

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center p-4"
//       role="dialog"
//       aria-modal="true"
//       aria-labelledby="modal-title"
//     >
//       <button
//         type="button"
//         aria-label="Close modal"
//         onClick={onClose}
//         className="absolute inset-0 cursor-default bg-black/50 backdrop-blur-sm"
//       />

//       <div className="relative z-10 w-full max-w-lg rounded-xl border border-border bg-surface p-6 shadow-2xl shadow-black/20">
//         <div className="mb-6 flex items-start justify-between gap-4">
//           <h2
//             id="modal-title"
//             className="font-display text-2xl font-semibold"
//           >
//             {title}
//           </h2>

//           <button
//             type="button"
//             onClick={onClose}
//             aria-label="Close modal"
//             className="rounded-full p-2 text-muted transition hover:bg-surface-muted hover:text-foreground"
//           >
//             <X size={18} aria-hidden="true" />
//           </button>
//         </div>

//         {children}
//       </div>
//     </div>
//   )
// }




import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-lg bg-white p-6 md:p-8 rounded-sm shadow-2xl z-10"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>

            {title && (
              <h2 className="text-xl font-serif text-neutral-900 mb-6">{title}</h2>
            )}
            
            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}