"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useTranslations } from "next-intl";

type News = {
    id: number;
    date: string;
    title: { rendered: string };
    excerpt: { rendered: string };
    link: string;
    _embedded?: {
        ["wp:featuredmedia"]?: { source_url: string }[];
        ["wp:term"]?: { name: string }[][];
    };
};

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

async function getNews(): Promise<News[]> {
    const res = await fetch(
        `${WP_API_URL}/news?_embed&per_page=100`,
    );
    if (!res.ok) return [];
    return res.json();
}

export default function NewsList() {
    const [news, setNews] = useState<News[]>([]);
    const [currentLang, setCurrentLang] = useState("ru");
    const carouselRef = useRef<HTMLDivElement>(null);

    const t = useTranslations("News");

    useEffect(() => {
        getNews().then((data) => setNews(data));
        const langFromCookie = document.cookie.match(/locale=(\w{2,5})/)?.[1];
        if (langFromCookie) setCurrentLang(langFromCookie);
    }, []);

    const langMap: Record<string, string | null> = {
        ru: null,
        en: "/en/",
        uz: "/uz/",
    };

    const filteredNews = news.filter((item) => {
        const langSuffix = langMap[currentLang];
        if (!langSuffix) {
            return !item.link?.includes("/en/") && !item.link?.includes("/uz/");
        }
        return item.link?.includes(langSuffix);
    });

    const scrollLeft = () => {
        carouselRef.current?.scrollBy({ left: -320, behavior: "smooth" });
    };

    const scrollRight = () => {
        carouselRef.current?.scrollBy({ left: 320, behavior: "smooth" });
    };

    return (
        <div className="container mx-auto px-4 md:px-0 flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-3xl md:text-5xl font-bold text-[#03156B]">
                    {t("title")}
                </h1>

                <p className="text-sm md:text-base max-w-md text-[#3F3B3A] md:flex-1 md:text-left">
                    {t("description")}
                </p>

                <div className="hidden md:flex gap-2">
                    <button
                        onClick={scrollLeft}
                        className="w-[71px] h-[37px] bg-white border border-[#03156B] flex items-center justify-center rounded-md shadow-sm hover:bg-gray-100 cursor-pointer"
                    >
                        <IoIosArrowBack size={20} color="#03156B" />
                    </button>
                    <button
                        onClick={scrollRight}
                        className="w-[71px] h-[37px] bg-white border border-[#03156B] flex items-center justify-center rounded-md shadow-sm hover:bg-gray-100 cursor-pointer"
                    >
                        <IoIosArrowForward size={20} color="#03156B" />
                    </button>
                </div>
            </div>

            <div
                ref={carouselRef}
                className="flex gap-5 overflow-x-auto scroll-smooth pb-4 no-scrollbar"
            >
                {filteredNews.map((item) => {
                    const image = item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.jpg";
                    const category = item._embedded?.["wp:term"]?.[0]?.[0]?.name || t("no_category");

                    return (
                        <div
                            key={item.id}
                            className="w-[300px] flex-shrink-0 flex flex-col bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                        >
                            <div className="relative p-3">
                                <img
                                    src={image}
                                    alt={item.title.rendered}
                                    className="rounded-xl object-fill w-full h-[256px]"
                                />

                                <span className="absolute top-[20px] left-[20px] w-[112px] h-[30px] bg-[#E1E1E1] rounded-full flex items-center justify-center px-[20px] py-[8px] gap-[10px] text-xs font-medium">
                                    {category}
                                </span>
                            </div>

                            <div className="flex flex-col flex-1 p-4">
                                <p className="text-sm text-[#697586]">
                                    {new Date(item.date).toLocaleDateString(currentLang, {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>

                                <h2
                                    className="text-lg font-semibold text-[#03156B]"
                                    dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                                />

                                {item.excerpt?.rendered ? (
                                    <div
                                        className="text-sm text-[#333]"
                                        dangerouslySetInnerHTML={{
                                            __html: item.excerpt.rendered,
                                        }}
                                    />
                                ) : (
                                    <p className="text-sm italic text-gray-500">{t("no_excerpt")}</p>
                                )}

                                <div className="mt-auto">
                                    <Link
                                        href={`/news/${item.id}`}
                                        className="flex items-center gap-2 text-[#03156B] font-medium mt-4"
                                    >
                                        {t("read_more")} <IoIosArrowForward />
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

