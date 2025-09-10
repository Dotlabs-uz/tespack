import { notFound } from "next/navigation";

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

async function getNewsItem(id: string) {
	const res = await fetch(
		`${WP_API_URL}/news/${id}?_embed`,
	);
	if (!res.ok) return null;
	return res.json();
}

export default async function NewsDetail({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const newsItem = await getNewsItem((await params).id);

	if (!newsItem) return notFound();

	const image = newsItem._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";

	const category = newsItem._embedded?.["wp:term"]?.[0]?.[0]?.name || "Без категории";

	const date = new Date(newsItem.date).toLocaleDateString("ru-RU", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<main className="container mx-auto px-4 md:px-0 py-10">
			<h1
				className="text-3xl md:text-5xl font-bold text-[#03156B] mb-4 text-center leading-snug"
				dangerouslySetInnerHTML={{ __html: newsItem.title.rendered }}
			/>

			<div className="flex justify-center items-center gap-4 mb-8 text-sm md:text-base">
				<span className="px-4 py-1 bg-[#E1E1E1] rounded-full font-medium">
					{category}
				</span>
				<span>{date}</span>
			</div>

			<div className="mb-10">
				<img
					src={image}
					alt={newsItem.title.rendered}
					className="max-h-[500px] object-cover rounded-2xl shadow-lg mx-auto"
				/>
			</div>

			<div
				className="mx-auto max-w-2xl"
				dangerouslySetInnerHTML={{ __html: newsItem.content.rendered }}
			/>
		</main>
	);
}
