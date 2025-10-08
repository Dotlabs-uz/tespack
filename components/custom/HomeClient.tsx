"use client"

import Image from "next/image";
import NewsList from "@/components/custom/NewsList";
import VideoSection from "@/components/custom/VideoSection";
import VacanciesList from "@/components/custom/VacanciesList";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Forms from "@/components/custom/Forms";
import { useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"

const images = [
    { src: "/Hero1.webp", alt: "hero" },
    { src: "/Hero2.webp", alt: "hero" },
    { src: "/Hero3.webp", alt: "hero" },
    { src: "/Hero4.webp", alt: "hero" },
];

export default function HomeClient() {
    const b = useTranslations("Buttons");
    const h = useTranslations("Hero");
    const p = useTranslations("ProductsCategories");

    const [openModal, setOpenModal] = useState<"feedback" | "vacancies" | null>(null);

    return (
        <main className="overflow-x-hidden">
            <section className="relative text-white overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[80%] bg-[#03156B] rounded-b-2xl md:rounded-b-3xl md:h-[60%]" />
                <div className="container mx-auto relative px-4 sm:px-0">
                    <div className="flex flex-col items-start gap-3 pt-10 md:flex-row md:items-center md:gap-10 md:pt-16">
                        <h1 className="text-3xl md:text-6xl font-bold">
                            {h("title")}
                            <span className="block">{h("title_span")}</span>
                        </h1>
                        <p className="text-sm md:text-xl">
                            {h("text1")}
                            <span className="block">{h("text2")}</span>
                            <span className="block">{h("text3")}</span>
                        </p>
                    </div>
                    <div className="mt-3 md:mt-10 flex justify-center">
                        <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 6000, stopOnInteraction: false }),]}>
                            <div className="py-10 overflow-hidden mx-auto">
                                <CarouselContent className="flex">
                                    {images.map((img, i) => (
                                        <CarouselItem key={i} className="shrink-0 basis-full">
                                            <Image
                                                src={img.src}
                                                alt={img.alt}
                                                width={1320}
                                                height={565}
                                                className="w-full h-[413px] md:h-[900px] object-cover rounded-3xl"
                                            />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </div>
                        </Carousel>
                    </div>
                </div>
            </section>

            <section className="container mx-auto py-12 px-4 sm:px-0">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#03156B] uppercase">
                        {p("title")}
                        <span className="block">{p("title_span")}</span>
                    </h2>
                    <p className="text-base md:text-xl max-w-lg mt-4 md:mt-0 text-[#3F3B3A]">
                        {p("description")}
                    </p>
                    <Link
                        href="/products"
                        className="btn mt-4 md:mt-0 px-6 py-2 border border-[#03156B] text-[#03156B] text-sm"
                    >
                        {p("button")}
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
                    <Link
                        href={{ pathname: "/products", query: { category: 75 } }}
                        className="bg-[#03156B] text-white rounded-3xl p-6 md:col-span-2 flex flex-col justify-between relative min-h-[370px]"
                    >
                        <div className="flex flex-col h-full">
                            <h3 className="text-2xl md:text-3xl font-bold mb-3 whitespace-pre-line">
                                {p("items.caps_title")}
                            </h3>
                            <div className="flex-1 flex flex-col justify-between">
                                <div className="relative flex justify-center items-center h-30 translate-x-12 sm:translate-x-8 md:translate-x-10">
                                    <Image
                                        src="/BottleCap.webp"
                                        alt=""
                                        width={1500}
                                        height={1500}
                                        className="absolute right-1/2 translate-x-1/2 translate-y-1/4 object-contain z-10 w-[600px] sm:h-[300px]"
                                    />
                                    <Image
                                        src="/BottleCap.webp"
                                        alt=""
                                        width={1500}
                                        height={1500}
                                        className="absolute -bottom-5 md:-bottom-13 -right-1/4 md:right-[15%] object-contain rotate-10 md:rotate-6 z-9 w-[490px] sm:h-[276px]"
                                    />
                                    <Image
                                        src="/BottleCap.webp"
                                        alt=""
                                        width={1500}
                                        height={1500}
                                        className="absolute -bottom-[25%] md:-bottom-[33%] -right-0 md:right-[36%] object-contain -rotate-13 z-8 w-[457px] h-[257px]"
                                    />
                                </div>
                                <p className="text-sm md:text-base max-w-xs mt-4 relative z-10">
                                    {p("items.caps_text")}
                                </p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href={{ pathname: "/products", query: { category: 76 } }}
                        className="bg-white text-[#03156B] rounded-3xl p-6 border border-[#EAEAEA] flex flex-col justify-between"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold mb-3">
                            {p("items.preforms_title")}
                        </h3>
                        <p className="text-sm md:text-base mt-auto max-w-xs">
                            {p("items.preforms_text")}
                        </p>
                    </Link>

                    <Link
                        href={{ pathname: "/products", query: { category: 77 } }}
                        className="bg-white text-[#03156B] rounded-2xl p-6 border border-gray-200 flex flex-col justify-between"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold mb-3">
                            {p("items.cups_title")}
                        </h3>
                        <p className="text-sm md:text-base mt-auto max-w-xs">
                            {p("items.cups_text")}
                        </p>
                        <button
                            className="btn w-full bg-[#03156B] text-white mt-5 md:hidden"
                            onClick={(e) => {
                                e.preventDefault();
                                setOpenModal("feedback");
                            }}
                        >
                            {b("apply")}
                        </button>
                    </Link>

                    <Link
                        href={{ pathname: "/products", query: { category: 73 } }}
                        className="bg-[#03156B] text-white rounded-3xl p-6 md:col-span-2 flex flex-col justify-between relative min-h-[370px] overflow-visible"
                    >
                        <div className="flex flex-col h-full">
                            <h3 className="text-2xl md:text-3xl font-bold mb-3 whitespace-pre-line">
                                {p("items.bottles_title")}
                            </h3>
                            <div className="flex-1 flex flex-col justify-between">
                                <div className="relative flex justify-center items-center translate-x-6 sm:translate-x-8 md:translate-x-10">
                                    <Image
                                        src="/Bottle1.webp"
                                        alt=""
                                        width={1500}
                                        height={1500}
                                        className="absolute translate-x-[15%] md:translate-x-0 top-0 md:-top-3 w-50 md:w-50 lg:w-80 object-contain z-9 md:translate-y-20"
                                    />
                                    <Image
                                        src="/Bottle2.webp"
                                        alt=""
                                        width={1500}
                                        height={1500}
                                        className="absolute -top-10 md:-top-23 translate-x-[38%] md:translate-x-[23%] w-70 md:w-80 lg:w-120 z-9 object-contain md:translate-y-20"
                                    />
                                    <Image
                                        src="/Bottle3.webp"
                                        alt=""
                                        width={1500}
                                        height={1500}
                                        className="absolute right-1/2 translate-x-[70%] md:translate-x-[60%] z-8 w-100 md:w-130 lg:w-150 object-contain translate-y-5 md:translate-y-20"
                                    />
                                </div>
                                <p className="text-sm md:text-base max-w-xs mt-4 relative z-10">
                                    {p("items.bottles_text")}
                                </p>
                            </div>
                        </div>
                        <button
                            className="hidden md:flex btn w-[160px] sm:w-[200px] bg-[#FFFFFF] text-black absolute bottom-6 right-6 z-10"
                            onClick={(e) => {
                                e.preventDefault();
                                setOpenModal("vacancies");
                            }}
                        >
                            {b("apply")}
                        </button>
                    </Link>
                </div>
            </section>

            <VideoSection />
            <NewsList />
            <VacanciesList />
            <Forms openModal={openModal} setOpenModal={setOpenModal} />
        </main>
    );
}