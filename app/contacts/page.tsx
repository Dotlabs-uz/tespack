
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import ContactsClient from "./ContactsClient";

export async function generateMetadata(): Promise<Metadata> {
    const locale: any = await getLocale();
    const baseUrl = `${process.env.NEXT_PUBLIC_SITE_URL}`;

    const metaContent: any = {
        ru: {
            title: "Контакты Tespack — адрес, телефоны и местоположение компании",
            description:
                "Свяжитесь с Tespack: адрес офиса, контакты, схема проезда и карта. Получите консультацию по пластиковым изделиям, полимерным покрытиям, PET-преформам и другим решениям.",
            keywords: [
                "контакты Tespack",
                "адрес Tespack",
                "локация Tespack",
                "связаться с Tespack",
                "производство упаковки",
            ],
        },
        uz: {
            title: "Tespack bilan aloqa — manzil, telefonlar va joylashuv",
            description:
                "Tespack bilan bog'laning: ofis manzili, kontaktlar, yo'nalishlar va xarita. Plastik mahsulotlar, polimer qoplamalar, PET-prefomalar va boshqa yechimlar haqida maslahat oling.",
            keywords: [
                "Tespack aloqa",
                "Tespack manzil",
                "Tespack joylashuvi",
                "Tespack bilan bog'lanish",
                "qadoqlash ishlab chiqarish",
            ],
        },
        en: {
            title: "Contact Tespack — Address, Phone, and Company Location",
            description:
                "Get in touch with Tespack: office address, contact details, directions, and map. Request a consultation on plastic products, polymer coatings, PET preforms, and more.",
            keywords: [
                "Tespack contact",
                "Tespack address",
                "Tespack location",
                "contact Tespack",
                "packaging production",
            ],
        },
    };

    return {
        title: metaContent[locale].title,
        description: metaContent[locale].description,
        keywords: metaContent[locale].keywords,
        alternates: {
            canonical: `${baseUrl}/contacts`,
            languages: {
                "x-default": `${baseUrl}/contacts`,
                ru: `${baseUrl}/contacts?lang=ru`,
                uz: `${baseUrl}/contacts?lang=uz`,
                en: `${baseUrl}/contacts?lang=en`,
            },
        },
        openGraph: {
            type: "website",
            title: metaContent[locale].title,
            description: metaContent[locale].description,
            url: `${baseUrl}/contacts`,
            images: [
                {
                    url: `${baseUrl}/ContactsHero.webp`,
                    width: 1200,
                    height: 630,
                    alt:
                        locale === "ru"
                            ? "Контакты и местоположение компании Tespack"
                            : locale === "uz"
                                ? "Tespack kompaniyasining aloqa va joylashuvi"
                                : "Tespack contact and location",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: metaContent[locale].title,
            description: metaContent[locale].description,
            images: [`${baseUrl}/ContactsHero.webp`],
        },
    };
}

export default function Contacts() {
    return <ContactsClient />;
}