"use client";

import SubHeader from "@/components/custom/SubHeader";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function FactsPage() {
    const f = useTranslations("Company.facts");

    return (
        <div>
            <SubHeader />

            <section className="container mx-auto px-6 py-12">
                <h2 className="text-4xl md:text-5xl text-center font-bold text-[#03156B] mb-6">
                    {f("title")}
                </h2>
                <p className="text-base md:text-xl text-center text-[#3F3B3A] max-w-xl mx-auto mb-12">
                    {f("description")}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-16 text-[#062BD9]">
                    <div>
                        <p className="text-4xl md:text-6xl font-bold">300+</p>
                        <p className="mt-2">{f("stats.clients")}</p>
                    </div>
                    <div>
                        <p className="text-4xl md:text-6xl font-bold">
                            <span className="md:hidden">100k M²+</span>
                            <span className="hidden md:inline">100 000M²+</span>
                        </p>
                        <p className="mt-2">{f("stats.area")}</p>
                    </div>
                    <div>
                        <p className="text-4xl md:text-6xl font-bold">5+</p>
                        <p className="mt-2">{f("stats.countries")}</p>
                    </div>
                    <div>
                        <p className="text-4xl md:text-6xl font-bold">500+</p>
                        <p className="mt-2">{f("stats.employees")}</p>
                    </div>
                </div>

                <div className="text-center mb-10">
                    <p className="text-base md:text-xl max-w-2xl mx-auto mb-10">
                        {f("partners_text")}
                    </p>

                    <div className="flex flex-wrap justify-around items-center gap-8 md:gap-0">
                        <Image src="/PureMilkyLogo.png" alt="Puremilk" width={100} height={60} />
                        <Image src="/SofinLogo.png" alt="Sofin" width={80} height={60} />
                        <Image src="/MusaffoLogo.png" alt="Musaffo" width={100} height={60} />
                        <Image src="/AgroBravoLogo.png" alt="Agro Bravo" width={100} height={60} />
                        <Image src="/SaxovatLogo.png" alt="Saxovat" width={100} height={60} />
                        <Image src="/EverLogo.png" alt="Ever" width={80} height={60} />
                        <Image src="/SayhunLogo.png" alt="Sayhun" width={100} height={60} />
                    </div>
                </div>

                <div className="text-base md:text-xl max-w-4xl mx-auto space-y-6">
                    <p>{f("paragraphs.p1")}</p>
                    <p>{f("paragraphs.p2")}</p>
                </div>
            </section>
        </div>
    );
}
