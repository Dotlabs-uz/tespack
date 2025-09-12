import { notFound } from "next/navigation";
import ModelView from "./ModelView";

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

	neckFinish?: string;
	beverageType?: string;
	numberOfParts?: string;
	material?: string;
	slipAgent?: string;
	weight?: string;
	tetheredCap?: string;
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

	return (
		<main className="container mx-auto px-4 md:px-0 py-10">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
				{imageUrl && (
					<div className="sticky max-w-2xl flex items-center justify-center bg-white rounded-3xl shadow-[0_0_4px_0_rgba(2,15,35,0.3),0_2px_6px_0_rgba(0,0,0,0.2)]">
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

					{product.content?.rendered && (
						<div className="mb-6">
							<h2 className="text-2xl text-[#7A7A7A] font-bold">
								Особенности
							</h2>
							<div
								className="prose"
								dangerouslySetInnerHTML={{
									__html: product.content.rendered,
								}}
							/>
						</div>
					)}

					<div className="mb-6">
						<h2 className="text-2xl text-[#7A7A7A] font-bold mb-4">
							Характеристики
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
							<table className="w-full border border-gray-300 rounded">
								<tbody>
									{product.neckFinish && (
										<tr>
											<td className="border px-4 py-2 font-medium">
												Neck Finish
											</td>
											<td className="border px-4 py-2">
												{product.neckFinish}
											</td>
										</tr>
									)}
									{product.beverageType && (
										<tr>
											<td className="border px-4 py-2 font-medium">
												Beverage Type
											</td>
											<td className="border px-4 py-2">
												{product.beverageType}
											</td>
										</tr>
									)}
									{product.numberOfParts && (
										<tr>
											<td className="border px-4 py-2 font-medium">
												Number of Parts
											</td>
											<td className="border px-4 py-2">
												{product.numberOfParts}
											</td>
										</tr>
									)}
									{product.material && (
										<tr>
											<td className="border px-4 py-2 font-medium">
												Material
											</td>
											<td className="border px-4 py-2">
												{product.material}
											</td>
										</tr>
									)}
								</tbody>
							</table>

							<table className="w-full border border-gray-300 rounded">
								<tbody>
									{product.slipAgent && (
										<tr>
											<td className="border px-4 py-2 font-medium">
												Slip Agent
											</td>
											<td className="border px-4 py-2">
												{product.slipAgent}
											</td>
										</tr>
									)}
									{product.weight && (
										<tr>
											<td className="border px-4 py-2 font-medium">
												Weight
											</td>
											<td className="border px-4 py-2">
												{product.weight}
											</td>
										</tr>
									)}
									{product.tetheredCap && (
										<tr>
											<td className="border px-4 py-2 font-medium">
												Tethered Cap
											</td>
											<td className="border px-4 py-2">
												{product.tetheredCap}
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				{product.drawingUrl && (
					<div className="md:col-start-2">
						<h2 className="text-2xl text-[#7A7A7A] font-bold mb-4">
							Чертёж
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
