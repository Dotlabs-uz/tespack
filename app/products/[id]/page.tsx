// import { notFound } from "next/navigation";
// import ModelView from "./ModelView";
// import { getTranslations, getLocale } from "next-intl/server";
// import ServicesList from "@/components/custom/ServicesList";

// const WP_API_URL = process.env.WORDPRESS_URL;

// export interface ProductType {
// 	id: number;
// 	title: { rendered: string };
// 	content: { rendered: string };
// 	_embedded?: any;
// 	product_category?: { id: number; name: string }[];
// 	imageUrl?: string;
// 	drawingUrl?: string;
// 	glbUrl?: string;
// 	title_ru?: string;
// 	title_uz?: string;
// 	title_en?: string;
// 	content_ru?: string;
// 	content_uz?: string;
// 	content_en?: string;
// }

// async function getProduct(id: string): Promise<ProductType | null> {
// 	try {
// 		const res = await fetch(`${WP_API_URL}/products/${id}?_embed`, {
// 			cache: "no-store",
// 		});
// 		return res.json();
// 	} catch (e) {
// 		console.log(e);
// 		return null;
// 	}
// }

// export default async function ProductPage({
// 	params,
// }: {
// 	params: Promise<{ id: string }>;
// }) {
// 	const product = await getProduct((await params).id);
// 	if (!product) return notFound();

// 	const locale = await getLocale();
// 	const t = await getTranslations("Product");

// 	const imageUrl = product.glbUrl || null;

// 	const localizedTitle =
// 		locale === "uz"
// 			? product.title_uz || product.title.rendered
// 			: locale === "en"
// 				? product.title_en || product.title.rendered
// 				: product.title_ru || product.title.rendered;

// 	const localizedContent =
// 		locale === "uz"
// 			? product.content_uz || product.content.rendered
// 			: locale === "en"
// 				? product.content_en || product.content.rendered
// 				: product.content_ru || product.content.rendered;


// 	return (
// 		<main className="container mx-auto px-4 md:px-0 py-10">
// 			<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
// 				{imageUrl && (
// 					<div className="sticky max-w-2xl flex items-center justify-center bg-white rounded-3xl shadow-[0_0_4px_0_rgba(2,15,35,0.3),0_2px_6px_0_rgba(0,0,0,0.2)] overflow-hidden">
// 						<ModelView imageUrl={imageUrl} product={product} height="h-150" />
// 					</div>
// 				)}

// 				<div>
// 					<h1 className="text-4xl text-[#03156B] font-bold mb-2">
// 						{localizedTitle}
// 					</h1>

// 					{product._embedded?.["wp:term"]?.[0]?.length > 0 && (
// 						<p className="text-[#999999] mb-4">
// 							{product._embedded["wp:term"][0]
// 								.map((cat: any) => cat.name)
// 								.join(", ")}
// 						</p>
// 					)}

// 					{localizedContent && (
// 						<div className="mb-6">
// 							<h2 className="text-2xl text-[#7A7A7A] font-bold">
// 								{t("features")}
// 							</h2>
// 							<div
// 								className="prose"
// 								dangerouslySetInnerHTML={{ __html: localizedContent }}
// 							/>
// 						</div>
// 					)}
// 				</div>

// 				{product.drawingUrl && (
// 					<div className="md:col-start-2">
// 						<h2 className="text-2xl text-[#7A7A7A] font-bold mb-4">
// 							{t("drawing")}
// 						</h2>
// 						<img
// 							src={product.drawingUrl}
// 							alt="Чертёж продукта"
// 							className="w-full border rounded shadow"
// 						/>
// 					</div>
// 				)}
// 			</div>

// 			<ServicesList categories={product._embedded?.["wp:term"]?.[0] || []} />
// 		</main>
// 	);
// }

import { notFound } from "next/navigation";
import ModelView from "./ModelView";
import { getTranslations, getLocale } from "next-intl/server";
import ServicesList from "@/components/custom/ServicesList";

const WP_API_URL = process.env.WORDPRESS_URL;

export interface ProductType {
	id: number;
	title: { rendered: string };
	content: { rendered: string };
	_embedded?: any;
	product_category?: { id: number; name: string }[];
	imageUrl?: string;
	drawingUrl?: string;
	glbUrl?: string;
	title_ru?: string;
	title_uz?: string;
	title_en?: string;
	content_ru?: string;
	content_uz?: string;
	content_en?: string;
}

async function getProduct(id: string): Promise<ProductType | null> {
	try {
		const res = await fetch(`${WP_API_URL}/products/${id}?_embed`, {
			cache: "no-store",
		});
		return res.json();
	} catch (e) {
		console.log(e);
		return null;
	}
}

export default async function ProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const product = await getProduct((await params).id);
	if (!product) return notFound();

	const locale = await getLocale();
	const t = await getTranslations("Product");

	const imageUrl = product.glbUrl || null;

	const localizedTitle =
		locale === "uz"
			? product.title_uz || product.title.rendered
			: locale === "en"
				? product.title_en || product.title.rendered
				: product.title_ru || product.title.rendered;

	const localizedContent =
		locale === "uz"
			? product.content_uz || product.content.rendered
			: locale === "en"
				? product.content_en || product.content.rendered
				: product.content_ru || product.content.rendered;


	return (
		<main className="container mx-auto px-4 md:px-0 py-10">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
				{imageUrl && (
					<div className="md:sticky top-20 self-start max-w-2xl flex items-center justify-center bg-white rounded-3xl shadow-[0_0_4px_0_rgba(2,15,35,0.3),0_2px_6px_0_rgba(0,0,0,0.2)]">
						<ModelView imageUrl={imageUrl} product={product} height="h-150" />
					</div>
				)}

				<div className="space-y-6">
					<h1 className="text-4xl text-[#03156B] font-bold mb-2">
						{localizedTitle}
					</h1>

					{product._embedded?.["wp:term"]?.[0]?.length > 0 && (
						<p className="text-[#999999] mb-4">
							{product._embedded["wp:term"][0]
								.map((cat: any) => cat.name)
								.join(", ")}
						</p>
					)}

					{localizedContent && (
						<div className="mb-6">
							<h2 className="text-2xl text-[#7A7A7A] font-bold">{t("features")}</h2>
							<div
								className="prose"
								dangerouslySetInnerHTML={{ __html: localizedContent }}
							/>
						</div>
					)}

					{product.drawingUrl && (
						<div>
							<h2 className="text-2xl text-[#7A7A7A] font-bold mb-4">
								{t("drawing")}
							</h2>
							<img
								src={product.drawingUrl}
								alt="Чертёж продукта"
								className="w-full border rounded shadow"
							/>
						</div>
					)}
				</div>
			</div>

			<ServicesList categories={product._embedded?.["wp:term"]?.[0] || []} />
		</main>

	);
}
