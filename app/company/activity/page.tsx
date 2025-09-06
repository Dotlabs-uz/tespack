"use client";

import SubHeader from "@/components/custom/SubHeader";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Activity() {
    const a = useTranslations("Company.activity");

    return (
        <>
            <SubHeader />

            <main className="container mx-auto px-4 md:px-0 py-10">
                <div className="grid md:grid-cols-2 gap-8 items-center mb-10 bg-[#03156B] rounded-3xl p-6">
                    <Image
                        src="/Activity.png"
                        alt="Activity"
                        width={600}
                        height={560}
                        className="rounded-xl md:h-[560px] w-full"
                    />
                    <div className="flex flex-col justify-between h-full">
                        <h1 className="text-4xl md:text-5xl text-white font-bold uppercase">
                            {a("hero.title")}
                        </h1>
                        <p className="text-white text-base md:text-xl">
                            {a("description")}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-5 max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-5xl text-[#03156B] font-bold mb-4 uppercase">
                        {a("section.title")}
                    </h2>
                    <p className="text-base md:text-xl mb-9">
                        {a("section.paragraph1")}
                    </p>
                    <p className="text-base md:text-xl">
                        {a("section.paragraph2")}
                    </p>
                </div>
            </main>
        </>
    );
}

