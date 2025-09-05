import Link from "next/link";

interface InfoCardProps {
    title: string;
    description: string;
    image: string;
    link: string;
}

export default function InfoCard({ title, description, image, link }: InfoCardProps) {
    return (
        <div
            className="relative rounded-xl md:rounded-3xl overflow-hidden shadow-lg h-[275px] md:h-[600px] flex items-center justify-center"
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 text-center text-white flex flex-col items-center max-w-[500px] px-4 mx-auto md:px-0">
                <h1 className="text-4xl md:text-6xl font-bold mb-2">{title}</h1>
                <p className="text-base md:text-2xl mb-4">{description}</p>
                <Link
                    href={link}
                    className="btn bg-white text-black"
                >
                    Подробнее
                </Link>
            </div>
        </div>
    );
}