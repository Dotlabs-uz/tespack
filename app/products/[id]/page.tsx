import { notFound } from "next/navigation";

async function getProduct(id: string) {
    const res = await fetch(
        `https://tespack.uz/wp/wp-json/wp/v2/products/${id}?_embed`,
        { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    return res.json();
}

export default async function Product({ params }: { params: { id: string } }) {
    const product = await getProduct(params.id);

    if (!product) return notFound();
    if (product.acf && Object.keys(product.acf).length > 0) {
        console.log("ACF есть и в нём есть данные");
    } else {
        console.log("ACF пустой или его нет");
    }

    return (
        <main className="p-6">
            <h1 className="text-3xl font-bold mb-4">{product.title.rendered}</h1>

            {product._embedded?.["wp:featuredmedia"] && (
                <img
                    src={product._embedded["wp:featuredmedia"][0].source_url}
                    alt={product.title.rendered}
                    className="w-full max-w-lg rounded mb-6"
                />
            )}

            <div
                className="prose mb-8"
                dangerouslySetInnerHTML={{ __html: product.content.rendered }}
            />

            {product.acf?.specs && (
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Характеристики</h2>
                    <div className="border p-4 rounded">
                        <pre>{JSON.stringify(product.acf.specs, null, 2)}</pre>
                    </div>
                </div>
            )}

            {product.acf?.drawing && (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Чертеж</h2>
                    <img
                        src={product.acf.drawing}
                        alt="Чертеж"
                        className="w-full max-w-xl border rounded"
                    />
                </div>
            )}
        </main>
    );
}

