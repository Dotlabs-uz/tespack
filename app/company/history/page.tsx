import SubHeader from "@/components/custom/SubHeader";
import VideoSection from "@/components/custom/VideoSection";
import Image from "next/image";

export default function History() {
    const intro = `Компания Tespаck начала свою работу в 2006 году. Её основали братья Мунисовы — Абдуазиз и Абдухафиз, объединив усилия и стремление к созданию собственного производства. С самого начала Tespack сосредоточилась на качестве, надежности и инновациях в сфере пластмассовых изделий.

Сегодня компания производит широкий ассортимент продукции — от ПЭТ-преформ до полимерных крышек, соответствующих современным стандартам качества. За годы работы Tespack наладила сотрудничество с десятками предприятий по всему региону и зарекомендовала себя как надёжный и стабильный поставщик.

По мере роста и расширения спроса, они открыли новые заводы, что позволило значительно увеличить объёмы производства и улучшить логистику. Tespack продолжает активно развиваться, внедряя новые технологии и отвечая на современные потребности рынка.
`;

    const events = [
        { year: "2006", text: "Основание компании Tesko Plus.", img: "/TescoPlus.png", position: "left" },
        { year: "2008", text: "Покупаем новые технологии из Китая", img: "/NewTechnologies.png", position: "right" },
        { year: "2010", text: "В 2010 году был запущен второй производственный завод", img: "/OtherInformation.png", position: "left" },
        { year: "2012", text: "Начали производить полипропиленовые стаканы", img: "/OtherInformation2.png", position: "right" },
        { year: "2014", text: "Начало производства полимерных закрытий", img: "/OtherInformation.png", position: "left" },
        { year: "2016", text: "Мы первыми в Узбекистане начали производить крышки формата 1881.", img: "/OtherInformation2.png", position: "right" },
        { year: "2018", text: "В 2018 году был запущен третий производственный завод", img: "/OtherInformation.png", position: "left" },
        { year: "2020", text: "Приобретали современные японские станки.", img: "/OtherInformation2.png", position: "right" },
        { year: "2022", text: "В 2022 году был запущен четвёртый производственный завод", img: "/OtherInformation.png", position: "left" },
        { year: "2024", text: "Закупка европейского оборудования (SIPA, ENGEL, SMI).", img: "/OtherInformation2.png", position: "right" },
    ];

    return (
        <>
            <SubHeader />
            <VideoSection />

            <main className="container mx-auto px-4 md:px-0">
                <h1 className="text-[#03156B] text-4xl md:text-5xl font-bold text-center mb-8">
                    История TESPACK
                </h1>

                <div className="max-w-2xl mx-auto text-justify mb-16 space-y-4">
                    {intro.split("\n").map((p, i) => (
                        <p className="text-base md:text-xl" key={i}>{p}</p>
                    ))}
                </div>

                <div className="relative">
                    <div className="absolute left-1/2 top-0 h-full w-[2px] bg-[#03156B] -translate-x-1/2" />

                    <div className="space-y-20">
                        {events.map((event, i) => (
                            <div
                                key={i}
                                className="relative flex items-center"
                            >
                                {event.position === "left" ? (
                                    <>
                                        <div className="w-1/2 flex justify-end pr-8">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex flex-col max-w-xs">
                                                    <Image
                                                        src={event.img}
                                                        alt={event.year}
                                                        width={424}
                                                        height={286}
                                                    />
                                                    <p className="mt-3">{event.text}</p>
                                                </div>
                                                <span className="text-[#03156B] text-6xl">
                                                    {event.year}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="relative flex justify-center items-center">
                                            <span className="w-6 h-6 bg-[#03156B] rounded-full absolute left-1/2 -translate-x-1/2 z-10" />
                                        </div>

                                        <div className="w-1/2" />
                                    </>
                                ) : (
                                    <>
                                        <div className="w-1/2" />

                                        <div className="relative flex justify-center items-center">
                                            <span className="w-6 h-6 bg-[#03156B] rounded-full absolute left-1/2 -translate-x-1/2 z-10" />
                                        </div>

                                        <div className="pl-8">
                                            <div className="flex items-center space-x-4">
                                                <span className="text-[#03156B] text-6xl">
                                                    {event.year}
                                                </span>
                                                <div className="flex flex-col max-w-xs">
                                                    <Image
                                                        src={event.img}
                                                        alt={event.year}
                                                        width={424}
                                                        height={286}
                                                    />
                                                    <p className="mt-3">{event.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}



