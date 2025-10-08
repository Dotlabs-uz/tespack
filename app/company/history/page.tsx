import SubHeader from "@/components/custom/SubHeader";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    const locale: any = await getLocale();
    const baseUrl = `${process.env.NEXT_PUBLIC_SITE_URL}`;

    const metaContent: any = {
        ru: {
            title: "История Tespack — путь развития с 2006 года",
            description:
                "Узнайте, как компания Tespack начала путь в 2006 году и стала ведущим производителем ПЭТ-преформ, бутылок и крышек в регионе. История роста, технологий и инноваций.",
            keywords: [
                "история Tespack",
                "Tespack 2006",
                "развитие компании",
                "ПЭТ-преформы",
                "производитель упаковки",
            ],
        },
        uz: {
            title: "Tespack tarixi — 2006-yildan boshlangan muvaffaqiyat yo‘li",
            description:
                "Tespack kompaniyasining 2006-yildan beri qanday rivojlanganini, PET mahsulotlari ishlab chiqarishda yetakchiga aylanganini bilib oling.",
            keywords: [
                "Tespack tarixi",
                "Tespack 2006",
                "kompaniya rivojlanishi",
                "PET preformalar",
                "qadoqlash ishlab chiqaruvchisi",
            ],
        },
        en: {
            title: "Tespack History — Growth Journey Since 2006",
            description:
                "Discover how Tespack started in 2006 and became a leading producer of PET preforms, bottles, and caps. A story of innovation and growth.",
            keywords: [
                "Tespack history",
                "Tespack 2006",
                "company growth",
                "PET preforms",
                "packaging manufacturer",
            ],
        },
    };

    return {
        title: metaContent[locale].title,
        description: metaContent[locale].description,
        keywords: metaContent[locale].keywords,
        alternates: {
            canonical: `${baseUrl}/company/history`,
            languages: {
                "x-default": `${baseUrl}/company/history`,
                ru: `${baseUrl}/company/history?lang=ru`,
                uz: `${baseUrl}/company/history?lang=uz`,
                en: `${baseUrl}/company/history?lang=en`,
            },
        },
        openGraph: {
            type: "article",
            title: metaContent[locale].title,
            description: metaContent[locale].description,
            url: `${baseUrl}/company/history`,
            images: [
                {
                    url: `${baseUrl}/History2006.webp`,
                    width: 1200,
                    height: 630,
                    alt:
                        locale === "ru"
                            ? "История компании Tespack"
                            : locale === "uz"
                                ? "Tespack kompaniyasi tarixi"
                                : "Tespack company history",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: metaContent[locale].title,
            description: metaContent[locale].description,
            images: [`${baseUrl}/History2006.webp`],
        },
    };
}

export default function History() {
    const h = useTranslations("Company.about.History");

    const events = [
        { year: "2006", img: "/History2006.webp", position: "left" },
        { year: "2008", img: "/History2008.webp", position: "right" },
        { year: "2010", img: "/History2010.webp", position: "left" },
        { year: "2012", img: "/History2012.webp", position: "right" },
        { year: "2014", img: "/History2014.webp", position: "left" },
        { year: "2016", img: "/History2016.webp", position: "right" },
        { year: "2018", img: "/History2018.webp", position: "left" },
        { year: "2020", img: "/History2020.webp", position: "right" },
        { year: "2022", img: "/History2022.webp", position: "left" },
        { year: "2024", img: "/History2024.webp", position: "right" },
    ];

    return (
        <>
            <SubHeader />

            <main className="container mx-auto px-4 md:px-0 mt-10">
                <h1 className="text-[#03156B] text-4xl md:text-5xl font-bold text-center mb-8">
                    {h("title")}
                </h1>

                <div className="max-w-2xl mx-auto text-justify mb-16 space-y-4">
                    {h.raw("intro").map((p: string, i: number) => (
                        <p className="text-base md:text-xl" key={i}>{p}</p>
                    ))}
                </div>

                <div className="relative">
                    <div className="absolute left-4 md:left-1/2 top-0 h-full w-[2px] bg-[#03156B] -translate-x-0 md:-translate-x-1/2" />
                    <div className="space-y-20">
                        {events.map((event, i) => (
                            <div key={i} className="relative">
                                <div className="flex md:hidden ml-12">
                                    <div className="flex items-start space-x-4">
                                        <span className="text-[#03156B] text-2xl">{event.year}</span>
                                        <div className="flex flex-col max-w-xs">
                                            <Image
                                                src={event.img}
                                                alt={event.year}
                                                width={424}
                                                height={286}
                                                className="w-full h-auto"
                                            />
                                            <p className="mt-3 text-sm">{h(`events.${event.year}`)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden md:flex items-center">
                                    {event.position === "left" ? (
                                        <>
                                            <div className="w-1/2 flex justify-end pr-8">
                                                <div className="flex space-x-4">
                                                    <div className="flex flex-col max-w-xs">
                                                        <Image
                                                            src={event.img}
                                                            alt={event.year}
                                                            width={424}
                                                            height={286}
                                                        />
                                                        <p className="mt-3">{h(`events.${event.year}`)}</p>
                                                    </div>
                                                    <span className="text-[#03156B] text-6xl">{event.year}</span>
                                                </div>
                                            </div>
                                            <div className="w-1/2" />
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-1/2" />
                                            <div className="pl-8 w-1/2 flex space-x-4">
                                                <span className="text-[#03156B] text-6xl">{event.year}</span>
                                                <div className="flex flex-col max-w-xs">
                                                    <Image
                                                        src={event.img}
                                                        alt={event.year}
                                                        width={424}
                                                        height={286}
                                                    />
                                                    <p className="mt-3">{h(`events.${event.year}`)}</p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="absolute left-4 md:left-1/2 top-3 -translate-x-1/2 md:-translate-x-1/2">
                                    <span className="w-4 h-4 md:w-6 md:h-6 bg-[#03156B] rounded-full block z-10" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
