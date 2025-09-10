import InfoCard from "@/components/custom/InfoCard";
import { useTranslations } from "next-intl";

export default function Company() {
    const с = useTranslations("Company");

    const images = ["/Company.webp", "/Activity.webp"];

    const sections = [
        {
            title: с("about.title"),
            description: с("about.description"),
            link: "/company/history",
        },
        {
            title: с("activity.title"),
            description: с("activity.description"),
            link: "/company/activity",
        },
        {
            title: с("facts.title"),
            description: с("facts.description"),
            link: "/company/facts",
        },
        {
            title: с("advantages.title"),
            description: с("advantages.description"),
            link: "/company/advantages",
        },
    ];

    return (
        <main className="container mx-auto py-10 space-y-7 px-4">
            {sections.map((item, i) => (
                <InfoCard key={i} {...item} image={images[i % images.length]} />
            ))}
        </main>
    );
}
