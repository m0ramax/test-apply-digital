import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="h-44 w-full bg-[#404040]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-4 h-full flex items-center justify-center">
        <Link href="/" className="relative w-40 h-12">
          <Image
            src="/apply-digital-logo.png"
            alt="ApplyDigital Logo"
            fill
            sizes="(max-width: 160px) 100vw, 160px"
            className="object-contain"
            priority
          />
        </Link>
      </div>
    </footer>
  );
}