"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useTranslations } from "next-intl";

export default function Header() {
    const [query, setQuery] = useState("");
    const [currentLang, setCurrentLang] = useState("ru");
    const t = useTranslations("Header");
    const b = useTranslations("Buttons");

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

    return (
        <header className="bg-[#03156B] text-white">
            <div className="container mx-auto flex items-center justify-between py-3">
                <div className="flex w-full items-center justify-between sm:hidden px-4">
                    <HiOutlineMenuAlt4 className="text-2xl cursor-pointer" />
                    <Link href="/" className="mx-auto">
                        <Image
                            src="/TespackLogo.png"
                            alt="Tespack Logo"
                            width={120}
                            height={40}
                        />
                    </Link>
                    <div className="w-6" />
                </div>

                <div className="hidden sm:flex w-full items-center justify-between">
                    <Link href="/">
                        <Image
                            src="/TespackLogo.png"
                            alt="Tespack Logo"
                            width={150}
                            height={50}
                        />
                    </Link>

                    <div className="hidden sm:flex items-center border-b border-white w-[220px]">
                        <IoIosSearch className="text-white text-lg cursor-pointer" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="PET-Преформы"
                            className="px-2 py-1 bg-transparent text-white text-sm outline-none w-full"
                        />
                    </div>


                    <nav className="hidden md:flex gap-8 text-sm">
                        <Link href="/">{t("menu.home")}</Link>
                        <Link href="/products">{t("menu.products")}</Link>
                        <Link href="/company">{t("menu.about")}</Link>
                        <Link href="/features">{t("menu.features")}</Link>
                        <Link href="/news">{t("menu.news")}</Link>
                        <Link href="/contacts">{t("menu.contacts")}</Link>
                    </nav>

                    <div className="flex items-center space-x-4 relative">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="bg-gray-300 rounded-lg text-black cursor-pointer">
                                        {languages.find((l) => l.code === currentLang)?.label || "RU"}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent className="bg-gray-300">
                                        <ul className="grid w-[120px]">
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

                        <button className="btn w-[160px] sm:w-[200px] bg-[#FFFFFF] text-black">
                            {b("apply")}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

