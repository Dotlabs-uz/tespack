import InfoCard from "@/components/custom/InfoCard";
import { useTranslations } from "next-intl";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    const locale: any = await getLocale();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

    const metaContent: any = {
        ru: {
            title: "О компании Tespack | Производитель ПЭТ-упаковки с 2006 года",
            description:
                "Компания Tespack основана братьями Мунисовыми в 2006 году. Мы создаём пластиковую упаковку, бутылки, крышки и индивидуальные решения под любые идеи клиентов.",
            keywords: [
                "о компании Tespack",
                "производитель ПЭТ упаковки",
                "бутылки и крышки Tespack",
                "пластиковая упаковка Узбекистан",
            ],
        },
        uz: {
            title: "Tespack haqida | 2006-yildan beri PET qadoqlash ishlab chiqaruvchisi",
            description:
                "Tespack kompaniyasi 2006-yilda Munisov birodarlar tomonidan tashkil etilgan. Biz butilkalar, qopqoqlar va har qanday g‘oyangiz asosida PET qadoqlash yechimlarini ishlab chiqamiz.",
            keywords: [
                "Tespack haqida",
                "PET qadoqlash ishlab chiqaruvchi",
                "butilkalar va qopqoqlar",
                "plastik qadoqlash O‘zbekiston",
            ],
        },
        en: {
            title: "About Tespack | PET Packaging Manufacturer Since 2006",
            description:
                "Tespack was founded by the Munisov brothers in 2006. We design and manufacture PET packaging solutions, bottles, caps, and custom packaging for any idea.",
            keywords: [
                "about Tespack",
                "PET packaging manufacturer",
                "bottles and caps",
                "plastic packaging Uzbekistan",
            ],
        },
    };

    const title = metaContent[locale].title;
    const description = metaContent[locale].description;
    const keywords = metaContent[locale].keywords;

    return {
        title,
        description,
        keywords,
        alternates: {
            canonical: `${baseUrl}/company`,
            languages: {
                "x-default": `${baseUrl}/company`,
                ru: `${baseUrl}/company?lang=ru`,
                uz: `${baseUrl}/company?lang=uz`,
                en: `${baseUrl}/company?lang=en`,
            },
        },
        openGraph: {
            type: "website",
            url: `${baseUrl}/company`,
            siteName: "Tespack",
            title,
            description,
            images: [
                {
                    url: `${baseUrl}/Company1.webp`, 
                    width: 1200,
                    height: 630,
                    alt:
                        locale === "ru"
                            ? "Tespack — Производство ПЭТ-упаковки с 2006 года"
                            : locale === "uz"
                                ? "Tespack — 2006-yildan beri PET qadoqlash ishlab chiqaradi"
                                : "Tespack — PET packaging manufacturer since 2006",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [`${baseUrl}/Сompany1.webp`],
        },
    };
}

export default function Company() {
    const с = useTranslations("Company");

    const images = ["/Company1.webp", "/Company2.webp", "/Company3.webp", "/Company4.webp"];

    const sections = [
        {
            title: с("about.title"),
            description: с("about.description"),
            link: "/company/history",
        },
        {
            title: с("activity.title"),
            description: с("activity.description"),
            link: "/company/activity",
        },
        {
            title: с("facts.title"),
            description: с("facts.description"),
            link: "/company/facts",
        },
        {
            title: с("advantages.title"),
            description: с("advantages.description"),
            link: "/company/advantages",
        },
    ];

    return (
        <main className="container mx-auto py-10 space-y-7 px-4">
            {sections.map((item, i) => (
                <InfoCard key={i} {...item} image={images[i % images.length]} />
            ))}
        </main>
    );
}
