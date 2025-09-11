"use client";

import { useState, useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslations } from "next-intl";

type FAQItem = {
    id: number;
    title: { rendered: string };
    content: { rendered: string };
    link?: string;
};

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

async function getFAQ(): Promise<FAQItem[]> {
    const res = await fetch(`${WP_API_URL}/faq?_embed&per_page=100`);
    if (!res.ok) return [];
    return res.json();
}

export default function Contacts() {
    const [faq, setFaq] = useState<FAQItem[]>([]);
    const [currentLang, setCurrentLang] = useState("ru");
    const t = useTranslations("FAQ");

    useEffect(() => {
        getFAQ().then((data) => setFaq(data));
        const langFromCookie = document.cookie.match(/locale=(\w{2,5})/)?.[1];
        if (langFromCookie) setCurrentLang(langFromCookie);
    }, []);

    const langMap: Record<string, string | null> = {
        ru: null,
        en: "/en/",
        uz: "/uz/",
    };

    const filteredFAQ = faq.filter((item) => {
        const langSuffix = langMap[currentLang];
        if (!langSuffix) return !item.link?.includes("/en/") && !item.link?.includes("/uz/");
        return item.link?.includes(langSuffix);
    });

    return (
        <div className="w-full">
            <div className="w-full md:container mx-auto md:py-10">
                <div className="bg-[#03156B] text-white p-10 flex flex-col md:flex-row justify-between rounded-b-3xl md:rounded-3xl gap-5 mb-10">
                    <h1 className="text-4xl md:text-6xl max-w-sm font-bold">{t("contacts_title")}</h1>
                    <p className="text-base md:text-xl max-w-lg">{t("contacts_description")}</p>
                </div>
            </div>

            <div className="relative">
                <div className="absolute inset-x-0 top-10 bottom-10 bg-[#03156B] -z-10"></div>
                <div className="container mx-auto px-4 md:px-0 grid md:grid-cols-2 gap-6 mb-12">
                    <div className="flex flex-col gap-6 bg-white shadow-md rounded-3xl p-10 border border-[#E5E5E5]">
                        <div>
                            <h3 className="text-[#868686] text-sm font-bold">{t("address_label")}</h3>
                            <p className="text-[#03156B] text-lg md:text-2xl">{t("address_text")}</p>
                        </div>
                        <div>
                            <h3 className="text-[#868686] text-sm font-bold">{t("contact_label")}</h3>
                            <p className="text-[#03156B] text-lg md:text-2xl">{t("phone_1")}</p>
                            <p className="text-[#03156B] text-lg md:text-2xl">{t("phone_2")}</p>
                            <p className="text-[#03156B] text-lg md:text-2xl">{t("email")}</p>
                        </div>
                    </div>

                    <div className="rounded-3xl overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.21604336766!2d66.94101887650521!3d39.71829289785151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f17.0!3m3!1m2!1s0x3f4d1969ba726c73%3A0xfa025676d2ff00fb!2sTespack%2C%20Tesco%20Plus%20Company!5e1!3m2!1sru!2s!4v1757200051035!5m2!1sru!2s"
                            width="100%"
                            height="500"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-0">
                <h2 className="text-4xl md:text-5xl text-[#03156B] font-bold mb-6">{t("faq_title")}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Accordion type="single" collapsible className="space-y-5">
                        {filteredFAQ.filter((_, i) => i % 2 === 0).map(item => (
                            <AccordionItem
                                key={item.id}
                                value={`item-${item.id}`}
                                className="rounded-xl p-6 flex flex-col gap-2 accordion-shadow border-b-0"
                            >
                                <AccordionTrigger className="text-base md:text-xl text-[#737373] cursor-pointer border-b-0 focus:ring-0 focus:border-0">
                                    <span dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
                                </AccordionTrigger>
                                <AccordionContent className="text-xs md:text-base text-[#363636]">
                                    <div dangerouslySetInnerHTML={{ __html: item.content.rendered }} />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <Accordion type="single" collapsible className="space-y-5">
                        {filteredFAQ.filter((_, i) => i % 2 !== 0).map(item => (
                            <AccordionItem
                                key={item.id}
                                value={`item-${item.id}`}
                                className="rounded-xl p-6 flex flex-col gap-2.5 accordion-shadow border-b-0"
                            >
                                <AccordionTrigger className="text-base md:text-xl text-[#737373] cursor-pointer border-b-0 focus:ring-0 focus:border-0">
                                    <span dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
                                </AccordionTrigger>
                                <AccordionContent className="text-xs md:text-base text-[#363636]">
                                    <div dangerouslySetInnerHTML={{ __html: item.content.rendered }} />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    );
}

