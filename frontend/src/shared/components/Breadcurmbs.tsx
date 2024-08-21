import Link from "next/link";
import React from "react";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex">
      {items.map((item, index) => (
        <span key={index} className="flex items-center">
          {index > 0 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4 mx-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
          {item.to ? (
            <Link href={item.to} className="hover:underline text-sm">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-500">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
