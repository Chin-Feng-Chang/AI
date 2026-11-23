import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({
  isOpen,
  onClose,
  title = 'SYSTEM NOTIFICATION',
  headerIcon = 'check_circle',
  headerBg = 'bg-primary-container text-on-primary',
  maxWidth = 'max-w-lg',
  children,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 16, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
            className={`relative w-full ${maxWidth} bg-surface-container-lowest border-2 border-black p-space-lg md:p-space-xl shadow-[8px_8px_0px_#000000] flex flex-col gap-space-md max-h-[90vh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Bar */}
            <div
              className={`flex items-center justify-between ${headerBg} border-b-2 border-black -mx-space-lg md:-mx-space-xl -mt-space-lg md:-mt-space-xl px-space-lg md:px-space-xl py-space-sm`}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">{headerIcon}</span>
                <span className="font-label-md text-label-md uppercase tracking-wider">{title}</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="hover:opacity-75 transition-opacity flex items-center justify-center"
                aria-label="Close modal"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            {/* Body Content */}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
