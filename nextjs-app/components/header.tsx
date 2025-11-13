"use client";

import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="bg-dark-navy text-white shadow-lg">
      <nav className="mx-auto max-w-7xl px-8 py-8">
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center transition-transform hover:scale-105">
            <Image
              src="/images/logo.png"
              alt="Sports Activities Amman Logo"
              width={120}
              height={120}
              className="h-[120px] w-auto md:h-[100px]"
              priority
            />
          </Link>

          {/* Navigation Links */}
          <ul className="flex flex-wrap justify-center gap-2 md:gap-8">
            {[
              { href: "#sports", label: "Sports" },
              { href: "#private", label: "Private Lessons" },
              { href: "#about", label: "About Us" },
              { href: "#contact", label: "Contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full border border-white/20 bg-white/15 px-3 py-2 text-xs transition-all hover:border-accent-orange hover:bg-accent-orange hover:text-white md:border-0 md:bg-transparent md:px-0 md:text-base md:hover:bg-transparent md:hover:-translate-y-0.5"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
