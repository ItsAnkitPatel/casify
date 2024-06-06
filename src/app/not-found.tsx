import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center gap-2">
      <Image src="/notfound.webp"  alt="not found image" height={300} width={300}/>
      <div className="hover:shadow-2xl rounded-lg border px-5 py-2 shadow-xl duration-200">

        <h2>404 | Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/" className="text-blue-500 hover:underline">Return Home</Link>
      </div>
    </div>
  );
}
