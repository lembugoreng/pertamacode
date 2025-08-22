import React from 'react';

const Modal = ({ open, onClose, title, children, actions }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-xl border border-black/10 bg-white p-4 shadow-lg dark:border-white/10 dark:bg-zinc-900">
        {title && (
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button onClick={onClose} className="rounded-md px-2 py-1 text-sm text-black/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/5">✕</button>
          </div>
        )}
        <div>{children}</div>
        {actions && (
          <div className="mt-4 flex justify-end gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;