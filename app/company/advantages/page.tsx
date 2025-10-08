import SubHeader from "@/components/custom/SubHeader";
import { useTranslations } from "next-intl";
import { LuMilk } from "react-icons/lu";
import { PiRecycle } from "react-icons/pi";
import { AiOutlineSolution } from "react-icons/ai";
import { FaShieldAlt } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { GiEcology } from "react-icons/gi";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    const locale: any = await getLocale();
    const baseUrl = `${process.env.NEXT_PUBLIC_SITE_URL}`;

    const metaContent: any = {
        ru: {
            title: "Преимущества продукции Tespack — пластиковая упаковка высокого качества",
            description:
                "Компания Tespack с 2006 года производит пластиковую упаковку в Узбекистане: экологичные бутылки, перерабатываемый пластик, герметичные решения и быструю логистику. Индивидуальный подход к каждому клиенту.",
            keywords: [
                "Tespack преимущества",
                "пластиковая упаковка",
                "ПЭТ тара",
                "экологичная упаковка",
                "производство бутылок",
                "упаковочные решения Узбекистан",
            ],
        },
        uz: {
            title: "Tespack mahsulotlarining afzalliklari — yuqori sifatli plastik qadoqlash",
            description:
                "Tespack kompaniyasi 2006 yildan beri Oʻzbekistonda plastik qadoqlash ishlab chiqaradi: ekologik butilkalar, qayta ishlanadigan plastmassa, germetik yechimlar va tezkor logistika. Har bir mijoz uchun individual yondashuv.",
            keywords: [
                "Tespack afzalliklari",
                "plastik qadoqlash",
                "PET idishlar",
                "ekologik qadoqlash",
                "butilka ishlab chiqarish",
                "qadoqlash yechimlari",
            ],
        },
        en: {
            title: "Advantages of Tespack Products — High-Quality Plastic Packaging",
            description:
                "Since 2006, Tespack has been producing plastic packaging in Uzbekistan: eco-friendly bottles, recyclable plastic, hermetic solutions, and fast logistics. Individual solutions for each client.",
            keywords: [
                "Tespack advantages",
                "plastic packaging",
                "PET bottles",
                "eco packaging",
                "bottle production",
                "packaging solutions Uzbekistan",
            ],
        },
    };

    return {
        title: metaContent[locale].title,
        description: metaContent[locale].description,
        keywords: metaContent[locale].keywords,
        alternates: {
            canonical: `${baseUrl}/company/advantages`,
            languages: {
                "x-default": `${baseUrl}/company/advantages`,
                ru: `${baseUrl}/company/advantages?lang=ru`,
                uz: `${baseUrl}/company/advantages?lang=uz`,
                en: `${baseUrl}/company/advantages?lang=en`,
            },
        },
        openGraph: {
            type: "article",
            title: metaContent[locale].title,
            description: metaContent[locale].description,
            url: `${baseUrl}/company/advantages`,
            images: [
                {
                    url: `${baseUrl}/Company4.webp`,
                    width: 1200,
                    height: 630,
                    alt:
                        locale === "ru"
                            ? "Преимущества продукции Tespack"
                            : locale === "uz"
                                ? "Tespack mahsulotlarining afzalliklari"
                                : "Advantages of Tespack products",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: metaContent[locale].title,
            description: metaContent[locale].description,
            images: [`${baseUrl}/Company4.webp`],
        },
    };
}

export default function Advantages() {
    const d = useTranslations("Company.advantages");

    return (
        <>
            <SubHeader />

            <main className="container mx-auto px-4 md:px-0 py-10">
                <div className="flex flex-col md:flex-row justify-between mb-10 gap-6">
                    <h1 className="text-4xl md:text-5xl text-[#03156B] font-bold uppercase">
                        {d("hero.title")}
                        <span className="block">{d("hero.subtitle")}</span>
                    </h1>

                    <p className="text-base md:text-xl text-[#3F3B3A] max-w-2xl">
                        {d("description")}
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 mb-12 text-center text-xs md:text-base">
                    <div>
                        <LuMilk className="mx-auto mb-3 h-12 w-12 text-[#062BD9]" />
                        <p>{d("grid.item1")}</p>
                    </div>
                    <div>
                        <GiEcology className="mx-auto mb-3 h-12 w-12 text-[#062BD9]" />
                        <p>{d("grid.item2")}</p>
                    </div>
                    <div>
                        <PiRecycle className="mx-auto mb-3 h-12 w-12 text-[#062BD9]" />
                        <p>{d("grid.item3")}</p>
                    </div>
                    <div>
                        <AiOutlineSolution className="mx-auto mb-3 h-12 w-12 text-[#062BD9]" />
                        <p>{d("grid.item4")}</p>
                    </div>
                    <div>
                        <FaShieldAlt className="mx-auto mb-3 h-12 w-12 text-[#062BD9]" />
                        <p>{d("grid.item5")}</p>
                    </div>
                    <div>
                        <FaShippingFast className="mx-auto mb-3 h-12 w-12 text-[#062BD9]" />
                        <p>{d("grid.item6")}</p>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto space-y-6 text-base md:text-xl">
                    <p>{d("paragraphs.p1")}</p>
                    <p>{d("paragraphs.p2")}</p>
                    <p>{d("paragraphs.p3")}</p>
                </div>
            </main>
        </>
    );
}
