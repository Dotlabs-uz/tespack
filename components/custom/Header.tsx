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
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Forms from "./Forms";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { MdKeyboardArrowDown } from "react-icons/md";

export default function Header() {
    const [query, setQuery] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState<string | null>(null);
    const t = useTranslations("Header");
    const b = useTranslations("Buttons");
    const pathname = usePathname();
    const [openModal, setOpenModal] = useState<"feedback" | "vacancies" | null>(null);

    useEffect(() => {
        const lang = document.cookie.match(/locale=(\w{2,5})/)?.[1] || "en";
        setCurrentLang(lang);
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
                                    {languages.find((l) => l.code === currentLang)?.label || "EN"}
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

                    {/* <div className="flex items-center border-b border-white w-[150px] 2xl:w-[240px]">
                        <IoIosSearch className="text-white text-lg cursor-pointer" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="PET-Преформы"
                            className="px-2 py-1 bg-transparent text-white text-sm outline-none w-full"
                        />
                    </div> */}

                    <nav className="flex items-center gap-8 text-sm">
                        <Link href="/">{t("menu.home")}</Link>

                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="cursor-pointer bg-transparent border-0 shadow-none px-0 py-0 h-auto text-sm font-normal">
                                        <Link
                                            href="/products"
                                            className="px-3 py-2 cursor-pointer"
                                        >
                                            {t("menu.products")}
                                        </Link>
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent className="p-3 bg-white text-[#03156B] border-0">
                                        <div className="grid gap-3 w-56 text-[#03156B] font-bold">
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href={{ pathname: "/products", query: { category: 73 } }}
                                                    className="block px-2 py-1 hover:bg-gray-100 rounded-md"
                                                >
                                                    {t("menu.categories.petPreforms")}
                                                </Link>
                                            </NavigationMenuLink>

                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href={{ pathname: "/products", query: { category: 75 } }}
                                                    className="block px-2 py-1 hover:bg-gray-100 rounded-md"
                                                >
                                                    {t("menu.categories.polymerClosures")}
                                                </Link>
                                            </NavigationMenuLink>

                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href={{ pathname: "/products", query: { category: 76 } }}
                                                    className="block px-2 py-1 hover:bg-gray-100 rounded-md"
                                                >
                                                    {t("menu.categories.petContainers")}
                                                </Link>
                                            </NavigationMenuLink>

                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href={{ pathname: "/products", query: { category: 77 } }}
                                                    className="block px-2 py-1 hover:bg-gray-100 rounded-md"
                                                >
                                                    {t("menu.categories.plasticProducts")}
                                                </Link>
                                            </NavigationMenuLink>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>

                        <Link href="/company">{t("menu.about")}</Link>
                        <Link href="/features">{t("menu.features")}</Link>
                        <Link href="/contacts">{t("menu.contacts")}</Link>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="bg-gray-300 rounded-lg text-black cursor-pointer">
                                        {languages.find((l) => l.code === currentLang)?.label || "EN"}
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

                        <button className="btn w-[150px] md:w-[200px] bg-[#FFFFFF] text-black" onClick={() => setOpenModal("feedback")}>
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

                    {/* <div className="flex items-center border-b border-[#03156B]/40 mb-5">
                        <IoIosSearch className="text-[#03156B] text-lg" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="PET-Преформы"
                            className="px-2 py-2 bg-transparent text-[#03156B] text-sm outline-none w-full placeholder:text-[#03156B]/70"
                        />
                    </div> */}

                    <nav className="flex flex-col gap-4 text-base">
                        <Link href="/" onClick={() => setMenuOpen(false)}>
                            {t("menu.home")}
                        </Link>

                        <Collapsible>
                            <CollapsibleTrigger className="flex w-full justify-between items-center cursor-pointer text-[#03156B] group">
                                {t("menu.products")}
                                <MdKeyboardArrowDown className="h-5 w-5 text-[#03156B] transition-transform group-data-[state=open]:rotate-180" />
                            </CollapsibleTrigger>

                            <CollapsibleContent className="mt-2 ml-3 flex flex-col gap-2 text-sm text-[#03156B]">
                                <Link
                                    href={{ pathname: "/products", query: { category: 73 } }}
                                    onClick={() => setMenuOpen(false)}
                                    className="px-2 py-1 hover:bg-gray-100 rounded-md"
                                >
                                    {t("menu.categories.petPreforms")}
                                </Link>
                                <Link
                                    href={{ pathname: "/products", query: { category: 75 } }}
                                    onClick={() => setMenuOpen(false)}
                                    className="px-2 py-1 hover:bg-gray-100 rounded-md"
                                >
                                    {t("menu.categories.polymerClosures")}
                                </Link>
                                <Link
                                    href={{ pathname: "/products", query: { category: 76 } }}
                                    onClick={() => setMenuOpen(false)}
                                    className="px-2 py-1 hover:bg-gray-100 rounded-md"
                                >
                                    {t("menu.categories.petContainers")}
                                </Link>
                                <Link
                                    href={{ pathname: "/products", query: { category: 77 } }}
                                    onClick={() => setMenuOpen(false)}
                                    className="px-2 py-1 hover:bg-gray-100 rounded-md"
                                >
                                    {t("menu.categories.plasticProducts")}
                                </Link>
                            </CollapsibleContent>
                        </Collapsible>

                        <Link href="/company" onClick={() => setMenuOpen(false)}>
                            {t("menu.about")}
                        </Link>
                        <Link href="/features" onClick={() => setMenuOpen(false)}>
                            {t("menu.features")}
                        </Link>
                        <Link href="/contacts" onClick={() => setMenuOpen(false)}>
                            {t("menu.contacts")}
                        </Link>
                    </nav>

                    <button className="btn w-full mt-6 bg-[#03156B] text-white" onClick={() => { setOpenModal("feedback"); setMenuOpen(false) }}>
                        {b("apply")}
                    </button>
                </div>
            </div>
            <Forms openModal={openModal} setOpenModal={setOpenModal} />
        </header>
    );
}
