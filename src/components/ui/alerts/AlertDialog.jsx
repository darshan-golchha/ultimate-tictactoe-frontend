import React from 'react';

const AlertDialog = ({ open, children }) => {
  return open ? (
    <div className="alert-dialog-overlay fixed bottom-4 left-4 z-50 shadow-2xl">
      {children}
    </div>
  ) : null;
};

const AlertDialogContent = ({ children }) => {
  return (
    <div className="alert-dialog-content bg-white rounded-lg shadow-lg max-w-xs w-full p-4">
      {children}
    </div>
  );
};

const AlertDialogHeader = ({ children }) => {
  return <div className="alert-dialog-header text-sm font-semibold mb-2">{children}</div>;
};

const AlertDialogTitle = ({ children }) => {
  return (
    <h3 className="alert-dialog-title text-base font-bold text-gray-800">
      {children}
    </h3>
  );
};

const AlertDialogDescription = ({ children }) => {
  return (
    <p className="alert-dialog-description text-sm text-gray-600">
      {children}
    </p>
  );
};

const AlertDialogFooter = ({ children }) => {
  return <div className="alert-dialog-footer flex justify-end gap-2 mt-2">{children}</div>;
};

const AlertDialogAction = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="alert-dialog-action bg-indigo-600 hover:bg-indigo-700 text-white rounded px-4 py-1 text-sm shadow-md transition"
    >
      {children}
    </button>
  );
};

const AlertDialogCancel = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="alert-dialog-cancel text-gray-500 hover:text-gray-700 px-4 py-1 text-sm transition"
    >
      {children}
    </button>
  );
};

export {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
};
