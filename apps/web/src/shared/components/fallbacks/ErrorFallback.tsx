"use client"

import React from "react";

interface ErrorFallbackProps {
  title?: string;
  message?: string;
  buttonText?: string;
  onRetry?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

const DefaultIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-16 w-16 text-red-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v4m0 4h.01M4.93 19h14.14c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.2 16c-.77 1.33.19 3 1.73 3z"
    />
  </svg>
);

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  buttonText = "Try Again",
  onRetry,
  icon,
  className = "",
}) => {
  return (
    <div
      className={`flex min-h-[250px] h-full w-full items-center justify-center bg-transparent px-4 py-8 ${className}`}
    >
      <div className="flex max-w-md flex-col items-center text-center">
        {icon ?? <DefaultIcon />}

        <h2 className="mt-5 text-2xl font-bold text-gray-800 dark:text-gray-100">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
          {message}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-6 rounded-lg bg-red-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-600 active:scale-95"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorFallback;