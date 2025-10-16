"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Mail, Phone } from "lucide-react";
import { FaInstagram, FaTelegramPlane, FaYoutube } from "react-icons/fa";

export default function Maintenance() {
    const t = useTranslations("Maintenance");
    const [currentLang, setCurrentLang] = useState("en");

    useEffect(() => {
        const lang = document.cookie.match(/locale=(\w{2,5})/)?.[1] || "en";
        setCurrentLang(lang);
    }, []);

    const languages = [
        { code: "uz", label: "UZ" },
        { code: "ru", label: "РУС" },
        { code: "en", label: "ENG" },
    ];

    const handleLangChange = (code: string) => {
        document.cookie = `locale=${code}; path=/`;
        setCurrentLang(code);
        window.location.reload();
    };

    return (
        <div className="min-h-screen flex flex-col justify-between relative overflow-hidden text-[#03156B] font-sans">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/Company1.webp')" }}
            ></div>

            <div className="absolute inset-0 bg-gradient-to-b from-[#f8fff6f6] to-white opacity-95"></div>

            <div className="relative z-10 text-center mt-16 px-4">
                <div className="flex justify-center gap-3 text-sm font-medium">
                    {languages.map(({ code, label }) => (
                        <button
                            key={code}
                            onClick={() => handleLangChange(code)}
                            className={`transition-colors ${currentLang === code ? "text-[#03156B]" : "text-black  cursor-pointer"
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <h1 className="text-6xl md:text-8xl font-bold mt-3">
                    {t("title")}
                </h1>
                <p className="text-2xl md:text-3xl font-semibold mt-4">
                    {t("subtitle")}
                </p>

                <img
                    src="/TespackLogoMain.webp"
                    alt="Tespack"
                    className="mx-auto mt-10 w-48 md:w-60"
                />
            </div>

            <div className="relative z-10 bg-white/50 backdrop-blur-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] w-full py-6 text-center">
                <h2 className="text-2xl text-[#868686] font-semibold">
                    {t("contactTitle")}
                </h2>
                <p className="text-[#868686] mt-2 font-medium">
                    {t("salesDepartment")}
                </p>

                <div className="flex flex-col items-center mt-1 text-[#868686]">
                    <div className="flex items-center flex-col gap-2 text-[#03156B]">
                        <div className="flex items-center gap-2">
                            <Phone size={16} />
                            <span>+998 93 330 22 12</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={16} />
                            <span>+998 99 776 80 06</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={16} />
                            <span>+998 93 550 22 44</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[#03156B]">
                        <Mail size={16} />
                        <span>service@puremilky.uz</span>
                    </div>
                </div>

                <div className="flex justify-center gap-6 mt-6 text-[#03156B] text-2xl">
                    <a href="#"><FaInstagram /></a>
                    <a href="https://www.youtube.com/@TESPACKUZ"><FaYoutube /></a>
                    <a href="#"><FaTelegramPlane /></a>
                </div>

                <p className="text-sm text-gray-500 mt-4">© Tespack 2025</p>
            </div>
        </div>
    );
}


