import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

type News = {
    id: number;
    date: string;
    title: { rendered: string };
    excerpt: { rendered: string };
    _embedded?: {
        ["wp:featuredmedia"]?: { source_url: string }[];
        ["wp:term"]?: { name: string }[][];
    };
};

async function getNews(): Promise<News[]> {
    const res = await fetch("http://localhost/wp-json/wp/v2/news?_embed", {
        next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
}

export default async function NewsList() {
    const news = await getNews();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
            {news.map((item) => {
                const image =
                    item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                    "/placeholder.jpg";

                const category =
                    item._embedded?.["wp:term"]?.[0]?.[0]?.name || "Без категории";

                return (
                    <div
                        key={item.id}
                        className="w-[312px] h-[498px] flex flex-col bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
                    >
                        <img
                            src={image}
                            alt={item.title.rendered}
                            className="rounded-xl object-cover"
                        />

                        <div className="flex flex-col flex-1 p-4">
                            <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded w-fit mb-2">
                                {category}
                            </span>

                            <p className="text-sm text-[#697586]">
                                {new Date(item.date).toLocaleDateString("ru-RU", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>

                            <h2
                                className="text-lg font-semibold text-[#03156B]"
                                dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                            />

                            {item.excerpt?.rendered ? (
                                <div
                                    className="text-sm "
                                    dangerouslySetInnerHTML={{
                                        __html: item.excerpt.rendered,
                                    }}
                                />
                            ) : (
                                <p className="text-sm italic">
                                    Нет описания
                                </p>
                            )}

                            <div className="mt-auto">
                                <Link
                                    href={`/news/${item.id}`}
                                    className="flex items-center gap-2 text-[#03156B] font-medium"
                                >
                                    Подробнее <FaArrowRight />
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
