import HomeClient from "@/components/custom/HomeClient";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
	const locale: any = await getLocale();
	const baseUrl = `${process.env.NEXT_PUBLIC_SITE_URL}`;

	const metaContent: any = {
		ru: {
			title: "Tespack | Лидеры в ПЭТ-упаковке для вашего бизнеса",
			description:
				"Создаем инновационные ПЭТ-преформы, бутылки и крышки с фокусом на качество и экологию. Надежный партнер B2B с 20-летним опытом.",
			keywords: ["ПЭТ упаковка", "ПЭТ бутылки", "ПЭТ преформы"],
		},
		uz: {
			title: "Tespack | Biznesingiz uchun PET qadoqlash bo‘yicha yetakchilar",
			description:
				"20 yillik tajribaga ega ishonchli B2B hamkor. Yuqori sifat va ekologiyaga e’tibor bilan PET preforma, butilka va qopqoqlarni ishlab chiqamiz.",
			keywords: ["PET qadoqlash", "PET butilkalar", "PET preformalar"],
		},
		en: {
			title: "Tespack | Leaders in PET Packaging for Your Business",
			description:
				"Creating innovative PET preforms, bottles, and caps with a focus on quality and sustainability.",
			keywords: ["PET packaging", "PET bottles", "PET preforms"],
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
			canonical: baseUrl,
			languages: {
				"x-default": baseUrl,
				ru: `${baseUrl}?lang=ru`,
				uz: `${baseUrl}?lang=uz`,
				en: `${baseUrl}?lang=en`,
			},
		},
		openGraph: {
			type: "website",
			url: baseUrl,
			siteName: "Tespack",
			title,
			description,
			images: [
				{
					url: `${baseUrl}/Hero4.webp`,
					width: 1200,
					height: 630,
					alt:
						locale === "ru"
							? "Tespack — ПЭТ упаковка высокого качества"
							: locale === "uz"
								? "Tespack — Yuqori sifatli PET qadoqlash"
								: "Tespack — High-quality PET packaging",
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			site: "@tespack",
			title,
			description,
			images: [`${baseUrl}/Hero4.webp`],
		},
	};
}

export default function Page() {
	return <HomeClient />;
}
