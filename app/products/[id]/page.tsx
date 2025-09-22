import { notFound } from "next/navigation";
import ModelView from "./ModelView";
import { getTranslations } from "next-intl/server";
import VolumeSelector from "./VolumeSelector";

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
	volume?: number;
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

	const imageUrl = product.glbUrl || null;
	const t = await getTranslations("Product");
	const volume = product.volume ? Number(product.volume) : 0

	return (
		<main className="container mx-auto px-4 md:px-0 py-10">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
				{imageUrl && (
					<div className="sticky max-w-2xl flex items-center justify-center bg-white rounded-3xl shadow-[0_0_4px_0_rgba(2,15,35,0.3),0_2px_6px_0_rgba(0,0,0,0.2)] overflow-visible">
						<ModelView
							imageUrl={imageUrl}
							product={product}
							height="h-150"
						/>
					</div>
				)}

				<div className="">
					<h1 className="text-4xl text-[#03156B] font-bold mb-2">
						{product.title.rendered}
					</h1>

					{product._embedded?.["wp:term"]?.[0]?.length > 0 && (
						<p className="text-[#999999] mb-4">
							{product._embedded["wp:term"][0]
								.map((cat: any) => cat.name)
								.join(", ")}
						</p>
					)}

					<VolumeSelector
						value={volume}
						title={t("volume")}
						options={[
							{ value: 100, label: "100ml" },
							{ value: 200, label: "200ml" },
							{ value: 300, label: "300ml" },
							{ value: 400, label: "400ml" },
							{ value: 500, label: "500ml" },
						]}
					/>

					{product.content?.rendered && (
						<div className="mb-6">
							<h2 className="text-2xl text-[#7A7A7A] font-bold">
								{t("features")}
							</h2>
							<div
								className="prose"
								dangerouslySetInnerHTML={{
									__html: product.content.rendered,
								}}
							/>
						</div>
					)}
				</div>

				{product.drawingUrl && (
					<div className="md:col-start-2">
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
		</main>
	);
}
