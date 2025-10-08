import ProductsClient from "./ProductsClient";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
	const locale = await getLocale();
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

	const metaContent: any = {
		ru: {
			title: "Каталог продукции Tespack | ПЭТ-преформы, контейнеры, полимерные изделия",
			description:
				"Пластиковые изделия, полимерные покрытия, ПЭТ-преформы и многое другое в одном каталоге Tespack. Высокое качество и экологичность для вашего бизнеса.",
			keywords: [
				"каталог ПЭТ-продукции",
				"ПЭТ-преформы",
				"полимерные крышки",
				"ПЭТ-контейнеры",
				"пластиковые изделия",
			],
		},
		uz: {
			title: "Tespack mahsulotlari katalogi | PET preformalar, konteynerlar, polimer buyumlar",
			description:
				"Plastik buyumlar, polimer qoplamalar, PET preformalar va boshqalar — barchasi Tespack katalogida. Biznesingiz uchun yuqori sifat va ekologik yechimlar.",
			keywords: [
				"PET mahsulotlari katalogi",
				"PET preformalar",
				"polimer qopqoqlar",
				"PET konteynerlar",
				"plastik buyumlar",
			],
		},
		en: {
			title: "Tespack Product Catalog | PET Preforms, Containers, Polymer Products",
			description:
				"Plastic products, polymer coatings, PET preforms and more — all in one Tespack catalog. High quality and eco-friendly solutions for your business.",
			keywords: [
				"PET products catalog",
				"PET preforms",
				"polymer closures",
				"PET containers",
				"plastic products",
			],
		},
	};

	return {
		title: metaContent[locale].title,
		description: metaContent[locale].description,
		keywords: metaContent[locale].keywords,
		alternates: {
			canonical: `${baseUrl}/products`,
			languages: {
				"x-default": `${baseUrl}/products?lang=uz`,
				ru: `${baseUrl}/products?lang=ru`,
				uz: `${baseUrl}/products?lang=uz`,
				en: `${baseUrl}/products?lang=en`,
			},
		},
		openGraph: {
			type: "website",
			title: metaContent[locale].title,
			description: metaContent[locale].description,
			url: `${baseUrl}/products`,
			images: [
				{
					url: `${baseUrl}/Features6.webp`,
					width: 1200,
					height: 630,
					alt:
						locale === "ru"
							? "Каталог продукции Tespack"
							: locale === "uz"
								? "Tespack mahsulotlar katalogi"
								: "Tespack Product Catalog",
				},
			],
		},
	};
}

export default function Products() {
	return <ProductsClient />;
}
