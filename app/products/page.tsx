"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FaArrowRightLong, FaArrowLeft } from "react-icons/fa6"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Checkbox } from "@/components/ui/checkbox"
import { MdKeyboardArrowDown } from "react-icons/md"
import { Skeleton } from "@/components/ui/skeleton"
import { useTranslations } from "next-intl"
import Image from "next/image"
import ModelView from "./[id]/ModelView"

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL
const ITEMS_PER_PAGE = 12

export default function Products() {
	const [products, setProducts] = useState<any[]>([])
	const [loading, setLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const [currentLang, setCurrentLang] = useState("ru")

	const t = useTranslations("Products")

	useEffect(() => {
		async function fetchProducts() {
			try {
				const res = await fetch(`${WP_API_URL}/products?_embed&per_page=100`)
				const data = await res.json()
				setProducts(data)
			} catch (e) {
				console.error(e)
			} finally {
				setLoading(false)
			}
		}

		fetchProducts()

		const langFromCookie = document.cookie.match(/locale=(\w{2,5})/)?.[1]
		if (langFromCookie) setCurrentLang(langFromCookie)
	}, [])

	const langMap: Record<string, string | null> = {
		ru: null,
		en: "/en/",
		uz: "/uz/",
	}

	const filteredProducts = products.filter((item) => {
		const langSuffix = langMap[currentLang]
		if (!langSuffix) {
			return !item.link?.includes("/en/") && !item.link?.includes("/uz/")
		}
		return item.link?.includes(langSuffix)
	})

	const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
	const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

	const categoryOptions = [
		"noncarbonated",
		"sensitive",
		"sparkling",
		"low_calorie",
		"organic",
		"sugar_free",
		"flavored",
		"caffeine_free",
	]

	return (
		<div>
			<section className="w-full rounded-b-3xl md:container mx-auto bg-[#03156B] text-white px-4 md:p-8 md:rounded-3xl flex flex-col md:flex-row md:items-center md:mt-8 relative overflow-visible">
				<div className="flex flex-col md:gap-10 z-10 mt-5 md:mt-0">
					<h1 className="text-4xl md:text-6xl font-bold uppercase max-w-xs md:max-w-xl">{t("title")}</h1>
					<p className="mt-4 text-base md:text-xl max-w-lg">{t("description")}</p>
				</div>
				<div className="flex-1 relative flex flex-col md:flex-row justify-center items-center mt-8 md:mt-0 min-h-[300px] overflow-visible">
					<div className="relative flex flex-col md:flex-row justify-center items-center w-full">
						<Image
							src="/BottleCap3.webp"
							alt=""
							width={240}
							height={111}
							className="absolute top-2 left-[35%] sm:left-[30%] xs:left-[25%] -translate-x-1/2 object-contain z-30 w-[150px] sm:w-[180px] md:w-[240px] h-[120px] sm:h-[150px] md:h-[180px]"
						/>
						<Image
							src="/BottleCap2.webp"
							alt=""
							width={210}
							height={114}
							className="absolute left-[15%] sm:left-[20%] -translate-x-1/2 object-contain -rotate-10 z-10 w-[160px] sm:w-[180px] md:w-[210px] h-[140px] sm:h-[160px] md:h-[240px]"
						/>
						<Image
							src="/BottleCap.webp"
							alt=""
							width={210}
							height={151}
							className="absolute left-[45%] sm:left-[45%] xs:left-[40%] -translate-x-1/2 object-contain rotate-9 z-20 w-[130px] sm:w-[200px] md:w-[210px] h-[150px] sm:h-[200px] md:h-[250px]"
						/>
						<Image
							src="/Bottles.webp"
							alt=""
							width={300}
							height={200}
							className="absolute right-[5%] sm:right-[10%] xs:right-[15%] w-[150px] sm:w-[200px] md:w-[250px]"
						/>
					</div>
				</div>
			</section>

			<main className="container mx-auto grid grid-cols-12 gap-6 mt-12 px-4 md:px-0">
				<aside className="col-span-12 md:col-span-3 pr-4">
					<div className="flex flex-col gap-6 md:gap-8">
						<div className="flex flex-col gap-8 md:hidden">
							<div className="flex flex-col gap-3">
								<h2 className="text-[#03156B] text-xl font-bold">{t("pet_containers")}</h2>
								<Carousel className="w-full">
									<CarouselContent className="flex">
										{categoryOptions.map((option, i) => (
											<CarouselItem key={i} className="pl-2 basis-auto shrink-0 snap-center">
												<label className="flex items-center gap-2 text-sm rounded-xl px-3 py-2">
													<Checkbox className="border-2 border-[#03156B] data-[state=checked]:bg-[#03156B] data-[state=checked]:text-white" />
													{t(`categories.${option}`)}
												</label>
											</CarouselItem>
										))}
									</CarouselContent>
								</Carousel>
							</div>
							<div className="flex flex-col gap-3">
								<h2 className="text-[#03156B] text-xl font-bold">{t("polymer_closures")}</h2>
								<Carousel className="w-full">
									<CarouselContent className="flex">
										{categoryOptions.slice(0, 4).map((option, i) => (
											<CarouselItem key={i} className="pl-2 basis-auto shrink-0 snap-center">
												<label className="flex items-center gap-2 text-sm rounded-xl px-3 py-2">
													<Checkbox className="border-2 border-[#03156B] data-[state=checked]:bg-[#03156B] data-[state=checked]:text-white" />
													{t(`categories.${option}`)}
												</label>
											</CarouselItem>
										))}
									</CarouselContent>
								</Carousel>
							</div>
						</div>

						<div className="hidden md:flex md:flex-col gap-4 overflow-visible">
							<Collapsible className="min-w-[250px] shrink-0 mb-6">
								<CollapsibleTrigger className="flex items-center justify-between w-full group">
									<h2 className="text-[#03156B] text-xl font-bold cursor-pointer text-left">{t("pet_containers")}</h2>
									<MdKeyboardArrowDown className="h-5 w-5 text-[#03156B] transition-transform group-data-[state=open]:rotate-180 cursor-pointer" />
								</CollapsibleTrigger>
								<CollapsibleContent className="mt-3 flex flex-col gap-2 text-left">
									{categoryOptions.map((option, i) => (
										<label key={i} className="flex items-center gap-2 text-sm text-left">
											<Checkbox className="border-2 border-[#03156B] data-[state=checked]:bg-[#03156B] data-[state=checked]:text-white" />
											{t(`categories.${option}`)}
										</label>
									))}
								</CollapsibleContent>
							</Collapsible>

							<Collapsible className="min-w-[250px] shrink-0 mb-6">
								<CollapsibleTrigger className="flex items-center justify-between w-full group">
									<h2 className="text-[#03156B] text-xl font-bold cursor-pointer text-left">{t("polymer_closures")}</h2>
									<MdKeyboardArrowDown className="h-5 w-5 text-[#03156B] transition-transform group-data-[state=open]:rotate-180 cursor-pointer" />
								</CollapsibleTrigger>
								<CollapsibleContent className="mt-3 flex flex-col gap-2 text-left">
									{categoryOptions.slice(0, 4).map((option, i) => (
										<label key={i} className="flex items-center gap-2 text-sm text-left">
											<Checkbox className="border-2 border-[#03156B] data-[state=checked]:bg-[#03156B] data-[state=checked]:text-white" />
											{t(`categories.${option}`)}
										</label>
									))}
								</CollapsibleContent>
							</Collapsible>
						</div>
					</div>
				</aside>

				<section className="col-span-12 md:col-span-9">
					<div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 min-h-[400px]">
						{loading
							? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
								<div key={i} className="flex flex-col w-full animate-pulse gap-2">
									<Skeleton className="w-full aspect-square rounded-3xl bg-gray-200/70" />
									<Skeleton className="h-6 w-3/4 rounded bg-gray-200/70" />
								</div>
							))
							: paginatedProducts.map((product: any) => (
								<div key={product.id} className="flex flex-col w-full">
									<div className="w-full aspect-square flex items-center justify-center bg-white rounded-3xl shadow-[0_0_4px_0_rgba(2,15,35,0.3),0_2px_6px_0_rgba(0,0,0,0.2)]">
										<div className="w-full aspect-square flex items-center justify-center bg-white rounded-3xl shadow-[0_0_4px_0_rgba(2,15,35,0.3),0_2px_6px_0_rgba(0,0,0,0.2)]">
											<ModelView imageUrl={product.glbUrl} product={product} showWheel={false} />
										</div>
									</div>
									<div className="flex items-center justify-between mt-2">
										<Link href={`/products/${product.id}`} className="text-[#03156B] text-lg font-semibold">
											{product.title.rendered}
										</Link>
										<Link href={`/products/${product.id}`} className="text-[#062BD9] text-2xl">
											<FaArrowRightLong />
										</Link>
									</div>
								</div>
							))}
					</div>

					<div className="flex justify-center items-center gap-2 mt-8">
						<button
							onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
							disabled={currentPage === 1}
							className="px-3 py-1 bg-[#03156B] text-white rounded disabled:opacity-50 cursor-pointer"
							title={t("pagination.previous")}
						>
							<FaArrowLeft />
						</button>
						{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
							<button
								key={page}
								onClick={() => setCurrentPage(page)}
								className={`px-3 py-1 rounded ${page === currentPage ? "bg-[#062BD9] text-white" : "bg-gray-200"
									} cursor-pointer`}
							>
								{page}
							</button>
						))}
						<button
							onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
							disabled={currentPage === totalPages}
							className="px-3 py-1 bg-[#03156B] text-white rounded disabled:opacity-50 cursor-pointer"
							title={t("pagination.next")}
						>
							<FaArrowRightLong />
						</button>
					</div>
				</section>
			</main>
		</div>
	)
}
