"use client";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset?: () => void;
}) {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <p className="text-2xl font-semibold">
        There is some error : {error?.message}
      </p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
