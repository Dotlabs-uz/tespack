"use client"

import { notFound } from "next/navigation";
import '@google/model-viewer';

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

export interface ProductType {
	id: number;
	title: { rendered: string };
	content: { rendered: string };
	_embedded?: any;
	meta?: {
		neckFinish?: string;
		beverageType?: string;
		numberOfParts?: string;
		material?: string;
		slipAgent?: string;
		weight?: string;
		tetheredCap?: string;
		drawing_id?: number;
	};
	product_category?: { id: number; name: string }[];
	imageUrl?: string;
	drawingUrl?: string;
	volumeOptions?: string[];
	features?: string;
}

async function getProduct(id: string): Promise<ProductType | null> {
	const res = await fetch(`${WP_API_URL}/products/${id}?_embed`, { cache: "no-store" });
	if (!res.ok) return null;
	return res.json();
}

export default async function ProductPage({ params }: { params: { id: string } }) {
	const product = await getProduct(params.id);
	if (!product) return notFound();

	const imageUrl = product.imageUrl || product._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
	const drawingUrl = product.drawingUrl || (product.meta?.drawing_id ? `${WP_API_URL}/media/${product.meta.drawing_id}` : null);

	return (
		<main className="container mx-auto px-4 md:px-0 py-10">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
				{/* {imageUrl && (
					<model-viewer
						src={imageUrl}
						alt={product.title.rendered}
						camera-controls
						auto-rotate
						environment-image="neutral"
						exposure="1"
						className="w-full h-96"
					/>
					<model-viewer
						src="/275.glb"
						alt="3D модель"
						auto-rotate
						camera-controls
						style={{ width: '100%', height: '100%' }}
					></model-viewer>
				)} */}
				<img src="/" alt="" />

				<div className="sticky top-20">
					<h1 className="text-4xl text-[#03156B] font-bold mb-2">{product.title.rendered}</h1>

					{Array.isArray(product.product_category) && product.product_category.length > 0 && (
						<p className="text-[#999999] mb-4">
							<strong>Категория:</strong> {product.product_category.map(cat => cat.name).join(", ")}
						</p>
					)}

					<div className="flex flex-col mb-4">
						<span className="text-2xl text-[#7A7A7A] font-bold">Обьём</span>
						<select className="ml-2 border px-2 py-1 rounded">
							{product.volumeOptions?.map(v => (
								<option key={v} value={v}>{v}</option>
							)) || ["250 мл", "500 мл", "750 мл", "1000 мл", "1500 мл", "2000 мл"].map(v => (
								<option key={v} value={v}>{v}</option>
							))}
						</select>
					</div>

					{product.content?.rendered && (
						<div className="mb-6">
							<h2 className="text-2xl text-[#7A7A7A] font-bold">Особенности</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div dangerouslySetInnerHTML={{ __html: product.content.rendered }} />
							</div>
						</div>
					)}

					<div className="mb-6">
						<h2 className="text-2xl text-[#7A7A7A] font-bold">Характеристики</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<table className="w-full border border-gray-300 rounded mb-4">
								<tbody>
									{product.meta?.neckFinish && (
										<tr>
											<td className="border px-4 py-2 font-medium">Neck Finish</td>
											<td className="border px-4 py-2">{product.meta.neckFinish}</td>
										</tr>
									)}
									{product.meta?.beverageType && (
										<tr>
											<td className="border px-4 py-2 font-medium">Beverage Type</td>
											<td className="border px-4 py-2">{product.meta.beverageType}</td>
										</tr>
									)}
									{product.meta?.numberOfParts && (
										<tr>
											<td className="border px-4 py-2 font-medium">Number of Parts</td>
											<td className="border px-4 py-2">{product.meta.numberOfParts}</td>
										</tr>
									)}
									{product.meta?.material && (
										<tr>
											<td className="border px-4 py-2 font-medium">Material</td>
											<td className="border px-4 py-2">{product.meta.material}</td>
										</tr>
									)}
								</tbody>
							</table>

							<table className="w-full border border-gray-300 rounded mb-4">
								<tbody>
									{product.meta?.slipAgent && (
										<tr>
											<td className="border px-4 py-2 font-medium">Slip Agent</td>
											<td className="border px-4 py-2">{product.meta.slipAgent}</td>
										</tr>
									)}
									{product.meta?.weight && (
										<tr>
											<td className="border px-4 py-2 font-medium">Weight</td>
											<td className="border px-4 py-2">{product.meta.weight}</td>
										</tr>
									)}
									{product.meta?.tetheredCap && (
										<tr>
											<td className="border px-4 py-2 font-medium">Tethered Cap</td>
											<td className="border px-4 py-2">{product.meta.tetheredCap}</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			{drawingUrl && (
				<div className="mt-12 grid grid-cols-2">
					<h2 className="text-2xl font-semibold mb-4">Чертеж</h2>
					<img src={drawingUrl} alt="Чертеж продукта" className="w-full border rounded shadow" />
				</div>
			)}

		</main>
	);
}
