import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { MdKeyboardArrowDown } from "react-icons/md";
import ModelView from "./[id]/ModelView";

const WP_API_URL = process.env.WORDPRESS_URL;

async function getProducts() {
	try {
		const res = await fetch(`${WP_API_URL}/products?_embed&per_page=100`);
		return res.json();
	} catch (e) {
		console.log(e);
		return [];
	}
}

export default async function Products() {
	const products = await getProducts();

	return (
		<main className="container mx-auto grid grid-cols-12 gap-6 mt-12">
			<aside className="col-span-3 pr-4">
				<Collapsible className="mb-6">
					<CollapsibleTrigger className="flex items-center justify-between w-full group">
						<h2 className="text-[#03156B] text-xl font-bold cursor-pointer">
							ПЭТ-Контейнеры
						</h2>
						<MdKeyboardArrowDown className="h-5 w-5 text-[#03156B] transition-transform group-data-[state=open]:rotate-180 cursor-pointer" />
					</CollapsibleTrigger>
					<CollapsibleContent className="mt-3 flex flex-col gap-2">
						{[
							"noncarbonated",
							"sensitive",
							"sparkling",
							"low-calorie",
							"organic",
							"sugar-free",
							"flavored",
							"caffeine-free",
						].map((option, i) => (
							<label
								key={i}
								className="flex items-center gap-2 text-sm"
							>
								<Checkbox className="border-2 border-[#03156B] data-[state=checked]:bg-[#03156B] data-[state=checked]:text-white" />
								{option}
							</label>
						))}
					</CollapsibleContent>
				</Collapsible>

				<Collapsible className="mb-6">
					<CollapsibleTrigger className="flex items-center justify-between w-full group">
						<h2 className="text-[#03156B] text-xl font-bold cursor-pointer">
							Полимерные закрытия
						</h2>
						<MdKeyboardArrowDown className="h-5 w-5 text-[#03156B] transition-transform group-data-[state=open]:rotate-180 cursor-pointer" />
					</CollapsibleTrigger>
					<CollapsibleContent className="mt-3 flex flex-col gap-2">
						{[
							"noncarbonated",
							"sensitive",
							"sparkling",
							"low-calorie",
						].map((option, i) => (
							<label
								key={i}
								className="flex items-center gap-2 text-sm"
							>
								<Checkbox className="border-2 border-[#03156B] data-[state=checked]:bg-[#03156B] data-[state=checked]:text-white" />
								{option}
							</label>
						))}
					</CollapsibleContent>
				</Collapsible>
			</aside>

			<section className="col-span-9">
				<div className="flex flex-wrap gap-6">
					{products.map((product: any) => (
						<div
							key={product.id}
							className="w-[312px] flex flex-col"
						>
							{/* <Link
								href={`/products/${product.id}`}
								className="rounded-2xl transition flex items-center justify-center h-[345px]"
								style={{
									boxShadow:
										"0px 0px 4px 0px #020F234D inset, 0px 2px 6px 0px #00000033",
								}}
							> */}
							<ModelView imageUrl="/275.glb" />
							{/* {product._embedded?.["wp:featuredmedia"]?.[0]
									?.source_url && (
									<img
										src={
											product._embedded[
												"wp:featuredmedia"
											][0].source_url
										}
										alt={product.title.rendered}
										className="max-h-full object-contain p-4"
									/>
								)} */}
							{/* </Link> */}
							<div className="flex items-center justify-between mt-2">
								<h2 className="text-[#03156B] text-lg font-semibold">
									{product.title.rendered}
								</h2>
								<Link
									href={`/products/${product.id}`}
									className="text-[#062BD9] text-2xl"
								>
									<FaArrowRightLong />
								</Link>
							</div>
						</div>
					))}
				</div>
			</section>
		</main>
	);
}
