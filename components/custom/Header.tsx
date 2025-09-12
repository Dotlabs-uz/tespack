"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function Header() {
    const [query, setQuery] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState("ru");
    const t = useTranslations("Header");
    const b = useTranslations("Buttons");
    const pathname = usePathname();

    useEffect(() => {
        const lang = document.cookie.match(/locale=(\w{2,5})/)?.[1];
        if (lang) setCurrentLang(lang);
    }, []);

    const languages = [
        { code: "ru", label: "RU" },
        { code: "en", label: "EN" },
        { code: "uz", label: "UZ" },
    ];

    const handleLangChange = (code: string) => {
        document.cookie = `locale=${code}; path=/`;
        setCurrentLang(code);
        window.location.reload();
    };

    const mobileNoRound = ["/", "/products", "/features", "/contacts", "/news"];
    const desktopNoRound = ["/"];

    const isMobileNoRound = mobileNoRound.includes(pathname);
    const isDesktopNoRound = desktopNoRound.includes(pathname);

    const headerClass = `bg-[#03156B] text-white ${isMobileNoRound ? "rounded-b-none" : "rounded-b-xl"} ${isDesktopNoRound ? "" : "md:rounded-b-3xl"}`;

    return (
        <header className={`${headerClass} relative z-[1000]`}>
            <div className="container mx-auto flex items-center justify-between py-3 px-4 md:px-6 lg:px-0">
                <div className="flex w-full items-center justify-between xl:hidden">
                    <button
                        onClick={() => setMenuOpen((v) => !v)}
                        className="p-2 -ml-2"
                    >
                        <HiOutlineMenuAlt4 className="text-2xl cursor-pointer" />
                    </button>

                    <Link href="/" className="mx-auto">
                        <Image
                            src="/TespackLogo.webp"
                            alt="Tespack Logo"
                            width={120}
                            height={40}
                        />
                    </Link>

                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-gray-300 rounded-lg text-black cursor-pointer text-sm">
                                    {languages.find((l) => l.code === currentLang)?.label || "RU"}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="bg-gray-300">
                                    <ul className="grid">
                                        {languages.map(({ code, label }) => (
                                            <li
                                                key={code}
                                                onClick={() => handleLangChange(code)}
                                                className="flex items-center gap-2 p-2 rounded cursor-pointer"
                                            >
                                                {currentLang === code && (
                                                    <IoCheckmark className="text-[#03156B]" />
                                                )}
                                                <span className="text-black">{label}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="hidden xl:flex w-full items-center justify-between gap-6">
                    <Link href="/">
                        <Image
                            src="/TespackLogo.webp"
                            alt="Tespack Logo"
                            width={150}
                            height={50}
                        />
                    </Link>

                    <div className="flex items-center border-b border-white w-[150px] 2xl:w-[240px]">
                        <IoIosSearch className="text-white text-lg cursor-pointer" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="PET-Преформы"
                            className="px-2 py-1 bg-transparent text-white text-sm outline-none w-full"
                        />
                    </div>

                    <nav className="flex gap-8 text-sm">
                        <Link href="/">{t("menu.home")}</Link>
                        <Link href="/products">{t("menu.products")}</Link>
                        <Link href="/company">{t("menu.about")}</Link>
                        <Link href="/features">{t("menu.features")}</Link>
                        <Link href="/news">{t("menu.news")}</Link>
                        <Link href="/contacts">{t("menu.contacts")}</Link>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="bg-gray-300 rounded-lg text-black cursor-pointer">
                                        {languages.find((l) => l.code === currentLang)?.label || "RU"}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent className="bg-gray-300">
                                        <ul className="grid w-full md:w-[120px]">
                                            {languages.map(({ code, label }) => (
                                                <li
                                                    key={code}
                                                    onClick={() => handleLangChange(code)}
                                                    className="flex items-center gap-2 p-2 rounded cursor-pointer"
                                                >
                                                    {currentLang === code && (
                                                        <IoCheckmark className="text-[#03156B]" />
                                                    )}
                                                    <span className="text-black">{label}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>

                        <button className="btn w-[150px] md:w-[200px] bg-[#FFFFFF] text-black">
                            {b("apply")}
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`xl:hidden fixed inset-0 z-50 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} transition-opacity`}
                onClick={() => setMenuOpen(false)}
            >
                <div className="absolute inset-0 bg-black/40" />
                <div
                    className={`absolute left-0 top-0 h-full w-[82%] max-w-[340px] bg-white text-[#03156B] p-6 transform transition-transform ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between mb-6">
                        <Image
                            src="/TespackLogo.webp"
                            alt="Tespack Logo"
                            width={120}
                            height={40}
                        />
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="text-[#03156B] text-3xl cursor-pointer"
                        >
                            <IoMdClose />
                        </button>
                    </div>

                    <div className="flex items-center border-b border-[#03156B]/40 mb-5">
                        <IoIosSearch className="text-[#03156B] text-lg" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="PET-Преформы"
                            className="px-2 py-2 bg-transparent text-[#03156B] text-sm outline-none w-full placeholder:text-[#03156B]/70"
                        />
                    </div>

                    <nav className="flex flex-col gap-4 text-base">
                        <Link href="/" onClick={() => setMenuOpen(false)}>
                            {t("menu.home")}
                        </Link>
                        <Link href="/products" onClick={() => setMenuOpen(false)}>
                            {t("menu.products")}
                        </Link>
                        <Link href="/company" onClick={() => setMenuOpen(false)}>
                            {t("menu.about")}
                        </Link>
                        <Link href="/features" onClick={() => setMenuOpen(false)}>
                            {t("menu.features")}
                        </Link>
                        <Link href="/news" onClick={() => setMenuOpen(false)}>
                            {t("menu.news")}
                        </Link>
                        <Link href="/contacts" onClick={() => setMenuOpen(false)}>
                            {t("menu.contacts")}
                        </Link>
                    </nav>

                    <button className="btn w-full mt-6 bg-[#03156B] text-white">
                        {b("apply")}
                    </button>
                </div>
            </div>
        </header>
    );
}
