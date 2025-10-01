"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { Checkbox } from "@/components/ui/checkbox";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ModelView from "./[id]/ModelView";
import { useSearchParams } from "next/navigation";

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

export default function Products() {
	const [products, setProducts] = useState<any[]>([]);
	const [categories, setCategories] = useState<any[]>([]);
	const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
	const [loading, setLoading] = useState(true);
	const [currentLang, setCurrentLang] = useState("ru");

	const t = useTranslations("Products");
	const searchParams = useSearchParams();
	const categoryFromQuery = searchParams.get("category");

	useEffect(() => {
		async function fetchData() {
			try {
				const [productsRes, categoriesRes] = await Promise.all([
					fetch(`${WP_API_URL}/products?_embed&per_page=100`),
					fetch(`${WP_API_URL}/product_category?per_page=100`),
				]);
				const [productsData, categoriesData] = await Promise.all([
					productsRes.json(),
					categoriesRes.json(),
				]);
				setProducts(productsData);
				setCategories(categoriesData);
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
		const langFromCookie = document.cookie.match(/locale=(\w{2,5})/)?.[1];
		if (langFromCookie) setCurrentLang(langFromCookie);
	}, []);

	useEffect(() => {
		if (categoryFromQuery) {
			const catId = parseInt(categoryFromQuery, 10);
			if (!isNaN(catId)) {
				setSelectedCategories([catId]);
			}
		}
	}, [categoryFromQuery, categories]);

	let filteredProducts = products;

	if (selectedCategories.length > 0) {
		filteredProducts = filteredProducts.filter((product) =>
			product.product_category?.some((catId: number) =>
				selectedCategories.includes(catId)
			)
		);
	}

	const toggleCategory = (id: number) => {
		setSelectedCategories((prev) =>
			prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
		);
	};

	const getTranslatedTitle = (product: any) => {
		if (currentLang === "uz")
			return product.title_uz || product.title.rendered;
		if (currentLang === "en")
			return product.title_en || product.title.rendered;
		return product.title.rendered;
	};

	return (
		<div>
			<section className="w-full rounded-b-3xl md:container mx-auto bg-[#03156B] text-white px-4 md:p-8 md:rounded-3xl flex flex-col md:flex-row md:items-center md:mt-8 relative overflow-visible">
				<div className="flex flex-col md:gap-10 z-10 mt-5 md:mt-0">
					<h1 className="text-4xl md:text-6xl font-bold uppercase max-w-xs md:max-w-xl">
						{t("title")}
					</h1>
					<p className="mt-4 text-base md:text-xl max-w-lg">
						{t("description")}
					</p>
				</div>
				<div className="flex-1 relative flex flex-col md:flex-row justify-center items-center mt-8 md:mt-0 min-h-[300px] overflow-visible">
					<div className="relative flex flex-col justify-center md:flex-row items-center w-full">
						<Image
							src="/BottleCap3.webp"
							alt=""
							width={500}
							height={500}
							className="absolute top-0 left-[10%] -translate-x-1/2 object-contain z-30 w-[150px] sm:w-[180px] md:w-[240px] h-[120px]"
						/>
						<Image
							src="/BottleCap2.webp"
							alt=""
							width={500}
							height={500}
							className="absolute -top-13 left-[18%] -translate-x-1/2 object-contain rotate-9 z-10 w-[160px] sm:w-[180px] md:w-[210px] h-[140px]"
						/>
						<Image
							src="/BottleCap.webp"
							alt=""
							width={500}
							height={500}
							className="absolute -top-15 left-8 -translate-x-1/2 object-contain -rotate-9 z-20 w-[130px] sm:w-[200px] md:w-[210px] h-[150px]"
						/>
						<Image
							src="/Bottle1.webp"
							alt=""
							width={500}
							height={500}
							className="absolute right-[15%] -rotate-10 w-100 md:w-130 lg:w-150"
						/>
						<Image
							src="/Bottle2.webp"
							alt=""
							width={500}
							height={500}
							className="absolute right-0 rotate-10 w-100 md:w-130 lg:w-150"
						/>
					</div>
				</div>
			</section>

			<main className="container mx-auto grid grid-cols-12 gap-6 mt-12 px-4 md:px-0">
				{/* Сказали убрать ! */}
				{/* <aside className="col-span-12 md:col-span-3 pr-4">
					<div className="flex flex-col gap-6 md:gap-8">
						<div className="flex flex-col gap-3 md:hidden">
							<h2 className="text-[#03156B] text-xl font-bold">{t("pet_containers")}</h2>
							<Carousel className="w-full">
								<CarouselContent className="flex">
									{categories.map((cat) => (
										<CarouselItem key={cat.id} className="pl-2 basis-auto shrink-0 snap-center">
											<label className="flex items-center gap-2 text-sm rounded-xl px-3 py-2 cursor-pointer">
												<Checkbox
													checked={selectedCategories.includes(cat.id)}
													onCheckedChange={() => toggleCategory(cat.id)}
													className="border-2 border-[#03156B] data-[state=checked]:bg-[#03156B] data-[state=checked]:text-white cursor-pointer"
												/>
												{cat.name}
											</label>
										</CarouselItem>
									))}
								</CarouselContent>
							</Carousel>
						</div>

						<div className="hidden md:flex md:flex-col gap-4 overflow-visible">
							<Collapsible className="min-w-[250px] shrink-0 mb-6">
								<CollapsibleTrigger className="flex items-center justify-between w-full group">
									<h2 className="text-[#03156B] text-xl font-bold cursor-pointer text-left">{t("pet_containers")}</h2>
									<MdKeyboardArrowDown className="h-5 w-5 text-[#03156B] transition-transform group-data-[state=open]:rotate-180 cursor-pointer" />
								</CollapsibleTrigger>
								<CollapsibleContent className="mt-3 flex flex-col gap-2 text-left">
									{categories.map((cat) => (
										<label key={cat.id} className="flex items-center gap-2 text-sm text-left cursor-pointer">
											<Checkbox
												checked={selectedCategories.includes(cat.id)}
												onCheckedChange={() => toggleCategory(cat.id)}
												className="border-2 border-[#03156B] data-[state=checked]:bg-[#03156B] data-[state=checked]:text-white  cursor-pointer"
											/>
											{cat.name}
										</label>
									))}
								</CollapsibleContent>
							</Collapsible>
						</div>
					</div>
				</aside> */}

				<section className="col-span-12 ">
					<div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 min-h-[400px]">
						{loading
							? Array.from({ length: 12 }).map((_, i) => (
									<div
										key={i}
										className="flex flex-col w-full animate-pulse gap-2"
									>
										<Skeleton className="w-full aspect-square rounded-3xl bg-gray-200/70" />
										<Skeleton className="h-6 w-3/4 rounded bg-gray-200/70" />
									</div>
							  ))
							: filteredProducts.map((product: any) => (
									<Link
										key={product.id}
										href={`/products/${product.id}`}
										className="flex flex-col w-full cursor-pointer"
									>
										<div className="w-full aspect-square flex items-center justify-center bg-[#E5E5E5] hover:bg-[#B7DCFF] rounded-3xl shadow transition-colors overflow-hidden">
											{product._embedded?.[
												"wp:featuredmedia"
											]?.[0]?.source_url ? (
												<img
													src={
														product._embedded[
															"wp:featuredmedia"
														][0].source_url
													}
													alt={getTranslatedTitle(
														product
													)}
													className="object-cover"
												/>
											) : (
												<ModelView
													imageUrl={product.glbUrl}
													product={product}
													showWheel={false}
													cameraControls={false}
												/>
											)}
										</div>
										<div className="flex items-center justify-between mt-2">
											<span className="text-[#03156B] text-lg font-semibold">
												{getTranslatedTitle(product)}
											</span>
											<span className="text-[#062BD9] text-2xl">
												<FaArrowRightLong />
											</span>
										</div>
									</Link>
							  ))}
					</div>
				</section>
			</main>
		</div>
	);
}
