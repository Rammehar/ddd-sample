"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-full items-center">
      <h4>We are sorry</h4>
      <p>Something went wrong</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
