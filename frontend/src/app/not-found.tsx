import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        <p className="text-4xl font-bold">404-Not Found</p>
        <p>Could not find requested resource</p>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  );
}
