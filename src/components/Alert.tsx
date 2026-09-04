import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Info, AlertTriangle, XCircle, X } from 'lucide-react';

interface AlertProps {
  variant?: 'success' | 'info' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export function Alert({ variant = 'info', title, children, onClose }: AlertProps) {
  const config = {
    success: { icon: CheckCircle, classes: 'bg-green-50 border-green-200 text-green-900' },
    info: { icon: Info, classes: 'bg-blue-50 border-blue-200 text-blue-900' },
    warning: { icon: AlertTriangle, classes: 'bg-orange-50 border-orange-200 text-orange-900' },
    error: { icon: XCircle, classes: 'bg-red-50 border-red-200 text-red-900' },
  };

  const { icon: Icon, classes } = config[variant];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`flex items-start p-4 border rounded-sm shadow-sm ${classes}`}
        role="alert"
      >
        <Icon className="w-5 h-5 mt-0.5 shrink-0" strokeWidth={1.5} />
        
        <div className="ml-3 flex-1">
          {title && <h4 className="text-sm font-semibold mb-1">{title}</h4>}
          <div className="text-sm opacity-90">{children}</div>
        </div>

        {onClose && (
          <button 
            onClick={onClose}
            className="ml-4 shrink-0 opacity-50 hover:opacity-100 transition-opacity"
            aria-label="Close alert"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}