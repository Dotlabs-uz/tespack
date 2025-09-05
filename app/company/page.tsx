import InfoCard from "@/components/custom/InfoCard";
import { useTranslations } from "next-intl";

export default function Company() {
    const t = useTranslations("Company");

    const images = ["/Company.png", "/Activity.png"];

    const sections = [
        {
            title: t("about.title"),
            description: t("about.description"),
            link: "/history",
        },
        {
            title: t("activity.title"),
            description: t("activity.description"),
            link: "/activity",
        },
        {
            title: t("facts.title"),
            description: t("facts.description"),
            link: "/facts",
        },
        {
            title: t("advantages.title"),
            description: t("advantages.description"),
            link: "/advantages",
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
