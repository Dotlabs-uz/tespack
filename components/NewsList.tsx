"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

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

async function getNews(): Promise<News[]> {
    const res = await fetch(
        "http://tespack.infinityfreeapp.com/wp-json/wp/v2/news?_embed&per_page=100",
        { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    return res.json();
}

export default function NewsList() {
    const [news, setNews] = useState<News[]>([]);
    const [currentLang, setCurrentLang] = useState("ru");

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

    return (
        <div className="flex gap-5 flex-wrap justify-start">
            {filteredNews.map((item) => {
                const image =
                    item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                    "/placeholder.jpg";
                const category =
                    item._embedded?.["wp:term"]?.[0]?.[0]?.name || "Без категории";

                return (
                    <div
                        key={item.id}
                        className="w-[300px] flex flex-col bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
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
                                    dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }}
                                />
                            ) : (
                                <p className="text-sm italic text-gray-500">Нет описания</p>
                            )}

                            <div className="mt-auto">
                                <Link
                                    href={`/news/${item.id}`}
                                    className="flex items-center gap-2 text-[#03156B] font-medium mt-4"
                                >
                                    Подробнее <FaArrowRight />
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

