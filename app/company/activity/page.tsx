import SubHeader from "@/components/custom/SubHeader";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    const locale: any = await getLocale();
    const baseUrl = `${process.env.NEXT_PUBLIC_SITE_URL}`;

    const metaContent: any = {
        ru: {
            title: "Деятельность Tespack — инновационные решения в упаковке",
            description:
                "Компания Tespack предлагает полный цикл производства пластиковой упаковки, от идеи до реализации. Мы работаем на мировом уровне, обеспечивая качество, устойчивость и стратегическое партнёрство.",
            keywords: [
                "деятельность Tespack",
                "производство упаковки",
                "инновационные решения",
                "ПЭТ продукция",
                "упаковочные технологии",
            ],
        },
        uz: {
            title: "Tespack faoliyati — qadoqlash bo‘yicha innovatsion yechimlar",
            description:
                "Tespack kompaniyasi plastik qadoqlash ishlab chiqarishda to‘liq xizmatlar siklini taklif etadi. Biz sifat, barqarorlik va hamkorlikni ta'minlaymiz.",
            keywords: [
                "Tespack faoliyati",
                "qadoqlash ishlab chiqarish",
                "innovatsion yechimlar",
                "PET mahsulotlari",
                "qadoqlash texnologiyalari",
            ],
        },
        en: {
            title: "Tespack Activities — Innovative Packaging Solutions",
            description:
                "Tespack provides a full cycle of plastic packaging production, from idea to realization. We deliver quality, sustainability, and strategic partnerships worldwide.",
            keywords: [
                "Tespack activities",
                "packaging production",
                "innovative solutions",
                "PET products",
                "packaging technologies",
            ],
        },
    };

    return {
        title: metaContent[locale].title,
        description: metaContent[locale].description,
        keywords: metaContent[locale].keywords,
        alternates: {
            canonical: `${baseUrl}/company/activity`,
            languages: {
                "x-default": `${baseUrl}/company/activity`,
                ru: `${baseUrl}/company/activity?lang=ru`,
                uz: `${baseUrl}/company/activity?lang=uz`,
                en: `${baseUrl}/company/activity?lang=en`,
            },
        },
        openGraph: {
            type: "article",
            title: metaContent[locale].title,
            description: metaContent[locale].description,
            url: `${baseUrl}/company/activity`,
            images: [
                {
                    url: `${baseUrl}/Company2.webp`,
                    width: 1200,
                    height: 630,
                    alt:
                        locale === "ru"
                            ? "Деятельность компании Tespack"
                            : locale === "uz"
                                ? "Tespack kompaniyasi faoliyati"
                                : "Tespack company activity",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: metaContent[locale].title,
            description: metaContent[locale].description,
            images: [`${baseUrl}/Company2.webp`],
        },
    };
}

export default function Activity() {
    const a = useTranslations("Company.activity");

    return (
        <>
            <SubHeader />

            <main className="container mx-auto px-4 md:px-0 py-10">
                <div className="grid md:grid-cols-2 gap-8 items-center mb-10 bg-[#03156B] rounded-3xl p-6">
                    <Image
                        src="/Activity.webp"
                        alt="Activity"
                        width={600}
                        height={560}
                        className="rounded-xl md:h-[560px] w-full"
                    />
                    <div className="flex flex-col justify-between h-full">
                        <h1 className="text-4xl md:text-5xl text-white font-bold uppercase">
                            {a("hero.title")}
                        </h1>
                        <p className="text-white text-base md:text-xl">
                            {a("description")}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-5 max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-5xl text-[#03156B] font-bold mb-4 uppercase">
                        {a("section.title")}
                    </h2>
                    <p className="text-base md:text-xl mb-9">
                        {a("section.paragraph1")}
                    </p>
                    <p className="text-base md:text-xl">
                        {a("section.paragraph2")}
                    </p>
                </div>
            </main>
        </>
    );
}

