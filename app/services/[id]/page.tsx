"use client";

import { useEffect, useState, use } from "react";
import Forms from "@/components/custom/Forms";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

export default function ServicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [service, setService] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState<"feedback" | "vacancies" | null>(null);
    const t = useTranslations("Services");

    useEffect(() => {
        const fetchService = async () => {
            const res = await fetch(`${WP_API_URL}/services/${id}?_embed`);
            if (!res.ok) {
                notFound();
                return;
            }
            const data = await res.json();
            setService(data);
            setLoading(false);
        };
        fetchService();
    }, [id]);

    if (loading) return null;
    if (!service) return notFound();

    const image = service._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
    const title = service.title?.rendered || "Услуга";
    const content = service.content?.rendered || "";

    return (
        <main className="container mx-auto px-4 md:px-0 py-16 max-w-3xl text-center">
            <h1
                className="text-4xl md:text-5xl font-bold text-[#3F3B3A] mb-8"
                dangerouslySetInnerHTML={{ __html: title }}
            />
            {image && (
                <img
                    src={image}
                    alt={title}
                    className="w-full rounded-2xl shadow-lg mb-10 object-cover max-h-[500px] mx-auto"
                />
            )}
            <div
                className="text-lg text-gray-700 leading-relaxed mb-12"
                dangerouslySetInnerHTML={{ __html: content }}
            />
            <button
                className="w-full bg-[#062BD9] text-white font-medium py-2 rounded-lg cursor-pointer"
                onClick={() => setOpenModal("feedback")}
            >
                {t("button")}
            </button>
            <Forms openModal={openModal} setOpenModal={setOpenModal} />
        </main>
    );
}

