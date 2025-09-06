"use client";

import SubHeader from "@/components/custom/SubHeader";
import { useTranslations } from "next-intl";

export default function AdvantagesPage() {
    const d = useTranslations("Company.advantages");

    return (
        <>
            <SubHeader />

            <main className="container mx-auto px-4 md:px-0 py-10">
                <div className="flex flex-col md:flex-row justify-between mb-10 gap-6">
                    <h1 className="text-4xl md:text-5xl text-[#03156B] font-bold uppercase">
                        {d("hero.title")}
                        <span className="block">{d("hero.subtitle")}</span>
                    </h1>

                    <p className="text-base md:text-xl text-[#3F3B3A] max-w-2xl">
                        {d("description")}
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 mb-12 text-center text-xs md:text-base">
                    <div>
                        <img src="/BottleIcon.png" alt="" className="mx-auto mb-3 h-12 w-12" />
                        <p>{d("grid.item1")}</p>
                    </div>
                    <div>
                        <img src="/PackageIcon.png" alt="" className="mx-auto mb-3 h-12 w-12" />
                        <p>{d("grid.item2")}</p>
                    </div>
                    <div>
                        <img src="/RecycleIcon.png" alt="" className="mx-auto mb-3 h-12 w-12" />
                        <p>{d("grid.item3")}</p>
                    </div>
                    <div>
                        <img src="/BottleIcon.png" alt="" className="mx-auto mb-3 h-12 w-12" />
                        <p>{d("grid.item4")}</p>
                    </div>
                    <div>
                        <img src="/PackageIcon.png" alt="" className="mx-auto mb-3 h-12 w-12" />
                        <p>{d("grid.item5")}</p>
                    </div>
                    <div>
                        <img src="/PackageIcon.png" alt="" className="mx-auto mb-3 h-12 w-12" />
                        <p>{d("grid.item6")}</p>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto space-y-6 text-base md:text-xl">
                    <p>{d("paragraphs.p1")}</p>
                    <p>{d("paragraphs.p2")}</p>
                    <p>{d("paragraphs.p3")}</p>
                </div>
            </main>
        </>
    );
}
