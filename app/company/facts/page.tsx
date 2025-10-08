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
			title: "Факты о Tespack — лидере в производстве пластиковой упаковки",
			description:
				"Более 18 лет Tespack производит надёжную и экологичную пластиковую упаковку: системы, бутылки, крышки, литые изделия. 300+ корпоративных клиентов, 5+ стран поставок, 100 000 м² производственных площадей.",
			keywords: [
				"Tespack факты",
				"производство упаковки",
				"пластиковые бутылки",
				"ПЭТ изделия",
				"партнёры Tespack",
			],
		},
		uz: {
			title: "Tespack haqidagi faktlar — plastik qadoqlash sohasidagi yetakchi",
			description:
				"18 yildan ortiq tajribaga ega Tespack plastik qadoqlash ishlab chiqaradi: tizimlar, butilkalar, qopqoqlar, quyma mahsulotlar. 300+ korporativ mijozlar, 5+ mamlakatga yetkazib berish, 100 000 m² ishlab chiqarish maydoni.",
			keywords: [
				"Tespack faktlar",
				"qadoqlash ishlab chiqarish",
				"plastik butilkalar",
				"PET mahsulotlar",
				"Tespack hamkorlar",
			],
		},
		en: {
			title: "Tespack Facts — A Leader in Plastic Packaging Production",
			description:
				"With over 18 years of experience, Tespack manufactures reliable and eco-friendly plastic packaging: systems, bottles, caps, and molded products. 300+ corporate clients, 5+ countries, 100,000 m² of production space.",
			keywords: [
				"Tespack facts",
				"packaging production",
				"plastic bottles",
				"PET products",
				"Tespack partners",
			],
		},
	};

	return {
		title: metaContent[locale].title,
		description: metaContent[locale].description,
		keywords: metaContent[locale].keywords,
		alternates: {
			canonical: `${baseUrl}/company/facts`,
			languages: {
				"x-default": `${baseUrl}/company/facts`,
				ru: `${baseUrl}/company/facts?lang=ru`,
				uz: `${baseUrl}/company/facts?lang=uz`,
				en: `${baseUrl}/company/facts?lang=en`,
			},
		},
		openGraph: {
			type: "article",
			title: metaContent[locale].title,
			description: metaContent[locale].description,
			url: `${baseUrl}/company/facts`,
			images: [
				{
					url: `${baseUrl}/Company3.webp`,
					width: 1200,
					height: 630,
					alt:
						locale === "ru"
							? "Факты о компании Tespack"
							: locale === "uz"
							? "Tespack kompaniyasi haqidagi faktlar"
							: "Tespack company facts",
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: metaContent[locale].title,
			description: metaContent[locale].description,
			images: [`${baseUrl}/Company3.webp`],
		},
	};
}

export default function Facts() {
    const f = useTranslations("Company.facts");

    const logos = [
        { src: "/PureMilkyLogo.webp", alt: "Puremilk", w: 100 },
        { src: "/SofinLogo.webp", alt: "Sofin", w: 80 },
        { src: "/MusaffoLogo.webp", alt: "Musaffo", w: 100 },
        { src: "/AgroBravoLogo.webp", alt: "Agro Bravo", w: 100 },
        { src: "/SaxovatLogo.webp", alt: "Saxovat", w: 100 },
        { src: "/EverLogo.webp", alt: "Ever", w: 80 },
        { src: "/SayhunLogo.webp", alt: "Sayhun", w: 100 },
    ];

    return (
        <div>
            <SubHeader />

            <section className="container mx-auto px-6 py-12">
                <h2 className="text-4xl md:text-5xl text-center font-bold text-[#03156B] mb-6">
                    {f("title")}
                </h2>
                <p className="text-base md:text-xl text-center text-[#3F3B3A] max-w-xl mx-auto mb-12">
                    {f("description")}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-16 text-[#062BD9]">
                    <div>
                        <p className="text-4xl md:text-6xl font-bold">300+</p>
                        <p className="mt-2">{f("stats.clients")}</p>
                    </div>
                    <div>
                        <p className="text-4xl md:text-6xl font-bold">
                            <span className="md:hidden">100k M²+</span>
                            <span className="hidden md:inline">100 000M²+</span>
                        </p>
                        <p className="mt-2">{f("stats.area")}</p>
                    </div>
                    <div>
                        <p className="text-4xl md:text-6xl font-bold">5+</p>
                        <p className="mt-2">{f("stats.countries")}</p>
                    </div>
                    <div>
                        <p className="text-4xl md:text-6xl font-bold">500+</p>
                        <p className="mt-2">{f("stats.employees")}</p>
                    </div>
                </div>

                <div className="text-center mb-10">
                    <p className="text-base md:text-xl max-w-2xl mx-auto mb-10">
                        {f("partners_text")}
                    </p>

                    <div className="md:hidden overflow-hidden relative">
                        <div className="flex animate-marquee space-x-8">
                            {[...logos, ...logos].map((logo, i) => (
                                <div key={i} className="flex-shrink-0 flex justify-center">
                                    <Image
                                        src={logo.src}
                                        alt={logo.alt}
                                        width={logo.w}
                                        height={60}
                                        className="object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:flex flex-wrap justify-around items-center gap-8">
                        {logos.map((logo, i) => (
                            <Image
                                key={i}
                                src={logo.src}
                                alt={logo.alt}
                                width={logo.w}
                                height={60}
                                className="object-contain"
                            />
                        ))}
                    </div>
                </div>

                <div className="text-base md:text-xl max-w-4xl mx-auto space-y-6">
                    <p>{f("paragraphs.p1")}</p>
                    <p>{f("paragraphs.p2")}</p>
                </div>
            </section>
        </div>
    );
}
