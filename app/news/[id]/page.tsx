import { notFound } from "next/navigation";

async function getNewsItem(id: string) {
    const res = await fetch(
        `https://tespack.uz/wp/wp-json/wp/v2/news/${id}?_embed`,
        { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    return res.json();
}

export default async function NewsDetail({ params }: { params: { id: string } }) {
    const newsItem = await getNewsItem(params.id);

    if (!newsItem) return notFound();

    const image =
        newsItem._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "/placeholder.jpg";

    const category =
        newsItem._embedded?.["wp:term"]?.[0]?.[0]?.name || "Без категории";

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
