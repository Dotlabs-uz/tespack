"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

type Vacancy = {
    id: number;
    date: string;
    title: { rendered: string };
    excerpt: { rendered: string };
    link: string;
    _embedded?: {
        ["wp:term"]?: { name: string }[][];
    };
};

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

async function getVacancies(): Promise<Vacancy[]> {
    const res = await fetch(
        `${WP_API_URL}/vacancy?_embed&per_page=100`,
        { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    return res.json();
}

export default function VacanciesList() {
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [currentLang, setCurrentLang] = useState("ru");
    const t = useTranslations("Vacancies");

    useEffect(() => {
        getVacancies().then((data) => setVacancies(data));
        const langFromCookie = document.cookie.match(/locale=(\w{2,5})/)?.[1];
        if (langFromCookie) setCurrentLang(langFromCookie);
    }, []);

    const langMap: Record<string, string | null> = {
        ru: null,
        en: "/en/",
        uz: "/uz/",
    };

    const filteredVacancies = vacancies.filter((item) => {
        const langSuffix = langMap[currentLang];
        if (!langSuffix) {
            return !item.link?.includes("/en/") && !item.link?.includes("/uz/");
        }
        return item.link?.includes(langSuffix);
    });

    return (
        <div className="container mx-auto px-4 md:px-0 flex flex-col gap-8 mt-10">
            <h1 className="text-3xl md:text-5xl font-bold text-[#03156B]">
                {t("title")}
            </h1>

            <div className="flex gap-6 overflow-x-auto md:overflow-visible pb-4 no-scrollbar">
                {filteredVacancies.map((item) => {
                    const department =
                        item._embedded?.["wp:term"]?.[0]?.[0]?.name || t("no_department");

                    return (
                        <div
                            key={item.id}
                            className="w-[380px] md:w-[400px] flex-shrink-0 md:flex-shrink bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
                        >
                            <div className="flex flex-col flex-1 p-6">
                                <p className="text-sm text-gray-500">
                                    {new Date(item.date).toLocaleDateString(currentLang, {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>

                                <h2
                                    className="text-lg md:text-2xl font-semibold text-[#03156B] mt-2"
                                    dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                                />

                                <span className="mt-40 text-[#AAAAAA] text-sm">
                                    {t("department_prefix")} {department}
                                </span>

                                {item.excerpt?.rendered ? (
                                    <div
                                        className="text-sm text-[#003014] mb-10"
                                        dangerouslySetInnerHTML={{
                                            __html: item.excerpt.rendered,
                                        }}
                                    />
                                ) : (
                                    <p className="text-sm italic text-gray-500 mt-6 mb-6">
                                        {t("no_excerpt")}
                                    </p>
                                )}

                                <div className="mt-auto flex items-center justify-between gap-4">
                                    <button className="w-[184px] h-[52px] bg-[#03156B] text-white text-sm rounded-xl px-8 py-2.5 flex items-center justify-center whitespace-nowrap cursor-pointer">
                                        {t("apply")}
                                    </button>
                                    <Link
                                        href={`/vacancy/${item.id}`}
                                        className="w-[184px] h-[52px] text-[#03156B] text-sm px-8 py-2.5 flex items-center justify-center font-medium"
                                    >
                                        {t("details")}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}


