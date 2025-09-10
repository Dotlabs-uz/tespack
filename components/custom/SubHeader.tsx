"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function SubHeader() {
    const pathname = usePathname();
    const t = useTranslations("SubHeader");

    const navLinks = [
        { href: "/company/history", key: "history" },
        { href: "/company/activity", key: "activity" },
        { href: "/company/facts", key: "facts" },
        { href: "/company/advantages", key: "advantages" }
    ];

    const currentPage = navLinks.find(link => link.href === pathname);

    return (
        <div className="relative">
            <div className="absolute inset-0 -top-10 bg-[#2339A6] z-0"></div>

            <div className="container mx-auto flex items-center justify-between relative z-10 text-white py-4">
                <h2 className="hidden md:block text-lg font-bold">
                    {currentPage ? `${t(currentPage.key)} Tespack` : "Tespack"}
                </h2>

                <nav className="flex-1 flex justify-center gap-6">
                    {navLinks.map(link => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative pb-2 text-sm md:text-base transition-colors ${isActive ? "" : "hover:opacity-80"}`}
                            >
                                {t(link.key)}
                                {isActive && (
                                    <span className="absolute left-0 -bottom-0.5 w-full h-0.5 bg-white"></span>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
