"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Forms from "./Forms";
import { useTranslations } from "next-intl";

type Category = {
    id: number;
    name: string;
    slug: string;
};

type Service = {
    id: number;
    title: { rendered: string };
    excerpt: { rendered: string };
    link: string;
    _embedded?: {
        ["wp:term"]?: Category[][];
        ["wp:featuredmedia"]?: { source_url: string }[];
    };
};

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

export default function ServicesList({ categories }: { categories: Category[] }) {
    const [services, setServices] = useState<Service[]>([]);
    const [openModal, setOpenModal] = useState<"feedback" | "vacancies" | null>(null);
    const [currentLang, setCurrentLang] = useState("ru");
    const carouselRef = useRef<HTMLDivElement>(null);
    const t = useTranslations("Services");

    useEffect(() => {
        fetch(`${WP_API_URL}/services?_embed&per_page=50`)
            .then((res) => res.json())
            .then((data) => setServices(data))
            .catch((err) => console.error("Ошибка загрузки услуг:", err));

        const langFromCookie = document.cookie.match(/locale=(\w{2,5})/)?.[1];
        if (langFromCookie) setCurrentLang(langFromCookie);
    }, []);

    const langMap: Record<string, string | null> = {
        ru: null,
        en: "/en/",
        uz: "/uz/",
    };

    const langFiltered = services.filter((service) => {
        const langSuffix = langMap[currentLang];
        if (!langSuffix) {
            return !service.link?.includes("/en/") && !service.link?.includes("/uz/");
        }
        return service.link?.includes(langSuffix);
    });

    const filteredServices = langFiltered.filter((service) => {
        const serviceCategories = service._embedded?.["wp:term"]?.[0] || [];
        return serviceCategories.some((cat) =>
            categories.some((productCat) => productCat.id === cat.id)
        );
    });

    if (filteredServices.length === 0) return null;

    return (
        <section className="mt-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#03156B] uppercase mb-10">
                {t("title")}
            </h2>

            <div
                ref={carouselRef}
                className="flex gap-8 overflow-x-auto scroll-smooth pb-4 no-scrollbar"
            >
                {filteredServices.map((service) => {
                    const image =
                        service._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                        "/placeholder.jpg";

                    return (
                        <div
                            key={service.id}
                            className="max-w-[400px] min-w-[320px] bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition cursor-pointer h-[400px] p-6"
                        >
                            <Link href={`/services/${service.id}`} className="flex-1 flex flex-col">
                                <img
                                    src={image}
                                    alt={service.title.rendered}
                                    className="w-full h-56 object-cover"
                                />
                                <h3
                                    className="text-lg font-semibold text-[#3F3B3A]"
                                    dangerouslySetInnerHTML={{ __html: service.title.rendered }}
                                />
                            </Link>

                            <button
                                className="w-full bg-[#062BD9] text-white font-medium py-2 rounded-lg cursor-pointer"
                                onClick={() => setOpenModal("feedback")}
                            >
                                {t("button")}
                            </button>
                        </div>
                    );
                })}
            </div>

            <Forms openModal={openModal} setOpenModal={setOpenModal} />
        </section>
    );
}
