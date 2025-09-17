"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { LuMilk } from "react-icons/lu";
import { FiPackage, FiThermometer } from "react-icons/fi";
import { GoClock } from "react-icons/go";
import { useTranslations } from "next-intl";
import React from "react";
import Autoplay from "embla-carousel-autoplay"

const images_first = [
    { src: "/Features1.webp", alt: "features" },
    { src: "/Features2.webp", alt: "features" },
    { src: "/Features3.webp", alt: "features" },
    { src: "/Features4.webp", alt: "features" },
];

const images_second = [
    { src: "/Features5.webp", alt: "features" },
    { src: "/Features6.webp", alt: "features" },
    { src: "/Features7.webp", alt: "features" },
    { src: "/Features8.webp", alt: "features" },
];

export default function Features() {
    const t = useTranslations("Features");

    const items = t.raw("items");

    return (
        <div>
            <section className="w-full rounded-b-3xl md:container mx-auto bg-[#03156B] text-white p-8 md:rounded-3xl flex justify-between md:mt-8">
                <div className="flex flex-col justify-between">
                    <h1 className="text-4xl md:text-6xl font-bold uppercase">
                        {t("title")}
                    </h1>
                    <p className="mt-4 text-base md:text-xl max-w-lg">
                        {t("description")}
                    </p>
                </div>
                <Image
                    src="/FeaturesHero.webp"
                    alt="plant"
                    width={646}
                    height={400}
                    className="object-cover rounded-3xl h-[323px]"
                />
            </section>

            <main className="container mx-auto px-4 md:px-0 py-10">
                <section className="mb-12">
                    <Carousel opts={{ loop: true }} plugins={[ Autoplay({delay: 2000, stopOnInteraction: false}),]}>
                        <div className="flex flex-col xl:flex-row justify-between items-start xl:gap-8">
                            <div className="max-w-xl">
                                <h2 className="text-4xl md:text-5xl font-bold text-[#03156B] uppercase mb-4">
                                    {t("overview.title")}
                                </h2>
                                <p className="text-base md:text-lg mb-6">
                                    {t("overview.text1")}
                                </p>
                            </div>

                            <div className="max-w-xl mb-8 xl:mb-0">
                                <p className="text-base md:text-lg">
                                    {t("overview.text2")}
                                </p>
                            </div>

                            <div className="flex max-w-xl">
                                <div className="flex gap-2">
                                    <CarouselPrevious className="static flex items-center justify-center w-[71px] h-[37px] !bg-[#03156B] border-none rounded-xl cursor-pointer" />
                                    <CarouselNext className="static flex items-center justify-center w-[71px] h-[37px] !bg-[#03156B] border-none rounded-xl cursor-pointer" />
                                </div>
                            </div>
                        </div>

                        <div className="py-10 overflow-hidden">
                            <CarouselContent className="flex">
                                {images_first.map((img, i) => (
                                    <CarouselItem key={i} className="shrink-0 basis-full md:basis-1/2">
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            width={645}
                                            height={379}
                                            className="rounded-[12px] w-[645px] h-[379px] object-cover opacity-100"
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </div>
                    </Carousel>
                </section>

                <section>
                    <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-8 mb-10">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#03156B] uppercase mb-5">
                            {t("partnerships.title")}
                        </h2>
                        <p className="text-base md:text-xl max-w-xl mb-8">
                            {t("partnerships.description")}
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {t.raw("partnerships.items").map((item: any, i: number) => (
                            <div key={i}>
                                <h3 className="text-base md:text-xl font-bold text-[#03156B] mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-base md:text-xl">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <section className="relative w-full py-10">
                <div className="absolute inset-x-0 top-10 bottom-0 bg-[#03156B] -z-10"></div>
                <div className="container mx-auto px-4 md:px-0 relative z-10">
                    <div className="flex flex-col-reverse md:flex-row justify-between">
                        <div className="flex flex-col justify-end max-w-xl text-white">
                            <h2 className="text-4xl md:text-5xl font-bold uppercase mb-6">
                                {t("innovation.title")}
                            </h2>
                            <p className="text-base md:text-xl mb-10 max-w-lg">
                                {t("innovation.text")}
                            </p>
                        </div>

                        <Image
                            src="/FeaturesInnovation.webp"
                            alt="plant"
                            width={646}
                            height={343}
                            className="object-cover object-[50%_30%] rounded-xl h-[343px] w-[646px] -mt-12 mb-5"
                        />
                    </div>

                    <div>
                        <div className="hidden md:flex gap-15 mt-12">
                            {items.map((item: any, i: number) => (
                                <div key={i} className="space-y-4 max-w-[350px] text-white">
                                    <span className="text-5xl md:text-6xl text-[#5FB1FF] font-bold">{item.num}</span>
                                    <h3 className="text-base md:text-xl font-bold uppercase">{item.title}</h3>
                                    <p className="text-sm md:text-xl">{item.text}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col md:hidden gap-8 mt-12">
                            {items.map((item: any, i: number) => (
                                <div key={i} className={`flex ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"} gap-4`}>
                                    <div className="space-y-4 text-white max-w-[200px]">
                                        <span className="text-5xl md:text-6xl text-[#5FB1FF] font-bold">{item.num}</span>
                                        <h3 className="text-base md:text-xl font-bold uppercase">{item.title}</h3>
                                        <p className="text-sm md:text-xl">{item.text}</p>
                                    </div>
                                    <div className="flex-1"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-4 md:px-0 py-10">
                <section className="py-12">
                    <div className="flex flex-col xl:flex-row justify-between gap-8 items-start mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold uppercase text-[#03156B] max-w-lg">
                            {t("technology.title")}
                        </h2>
                        <p className="text-base md:text-lg text-[#3F3B3A] max-w-2xl">
                            {t("technology.text")}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:flex md:items-center md:justify-between gap-8 md:gap-0 relative">
                        {t.raw("steps").map((step: any, i: number) => {
                            const icons = [GoClock, LuMilk, FiPackage, FiThermometer];
                            const Icon = icons[i];
                            return (
                                <div key={i} className="flex flex-col items-center text-center flex-1 relative z-10">
                                    <div className="bg-gray-100 px-8 py-5 rounded-lg">
                                        <Icon className="h-10 w-10 text-[#062BD9]" />
                                    </div>
                                    <p className="text-lg sm:text-xl md:text-2xl text-[#03156B] mt-3 font-semibold">
                                        {step.title}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    <Carousel opts={{ loop: true }} plugins={[ Autoplay({delay: 2000, stopOnInteraction: false}),]}>
                        <div className="py-10 overflow-hidden mx-auto">
                            <CarouselContent className="flex">
                                {images_second.map((img, i) => (
                                    <CarouselItem key={i} className="shrink-0 basis-full md:basis-1/2">
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            width={645}
                                            height={379}
                                            className="rounded-[12px] w-[645px] h-[379px] object-cover opacity-100"
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>

                            <div className="flex justify-center gap-4 mt-10">
                                <CarouselPrevious className="static flex items-center justify-center w-[71px] h-[37px] !bg-[#03156B] text-white border-none rounded-xl cursor-pointer" />
                                <CarouselNext className="static flex items-center justify-center w-[71px] h-[37px] !bg-[#03156B] text-white border-none rounded-xl cursor-pointer" />
                            </div>
                        </div>
                    </Carousel>
                </section>
            </main>
        </div>
    );
}
