"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
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
        <header className="w-full bg-[#03156B] text-white">
            <div className="mx-auto flex items-center justify-between px-6 py-3">
                <Link href="/" className="">
                    <Image
                        src="/TespackLogo.png"
                        alt="Tespack Logo"
                        width={150}
                        height={50}
                    />
                </Link>

                <div className="flex items-center space-x-6">
                    <div className="flex items-center border-b border-white">
                        <IoIosSearch className="text-white text-lg cursor-pointer" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="PET-Преформы"
                            className="px-3 py-1 bg-transparent text-white text-sm outline-none flex-1"
                        />
                    </div>

                    <nav className="hidden md:flex gap-8 text-sm">
                        <Link href="/products">{t("menu.products")}</Link>
                        <Link href="/company">{t("menu.about")}</Link>
                        <Link href="/news">{t("menu.news")}</Link>
                        <Link href="/vacancies">{t("menu.vacancies")}</Link>
                        <Link href="/contacts">{t("menu.contacts")}</Link>
                    </nav>
                </div>

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

                    <button className="btn w-[212px] bg-[#FFFFFF] text-black">
                        {b("apply")}
                    </button>
                </div>
            </div>
        </header>
    );
}
