"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { FaArrowRightLong } from "react-icons/fa6";

type Address = {
    id: number;
    textKey: string; 
    mapSrc: string;     
};

export default function Contacts() {
    const [currentLang, setCurrentLang] = useState("ru");
    const t = useTranslations("FAQ");

    useEffect(() => {
        const langFromCookie = document.cookie.match(/locale=(\w{2,5})/)?.[1];
        if (langFromCookie) setCurrentLang(langFromCookie);
    }, []);

    const addresses: Address[] = [
        {
            id: 1,
            textKey: "address_text_1",
            mapSrc:
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7634.819569058129!2d66.78600996298292!3d39.55149816908007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4d03381ba34b81%3A0x3cb0380f682574e7!2sTespack%20Investment%20LLC!5e1!3m2!1sru!2s!4v1758039894964!5m2!1sru!2s"
        },
        {
            id: 2,
            textKey: "address_text_2",
            mapSrc:
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.21604336766!2d66.94101887650521!3d39.71829289785151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f17.0!3m3!1m2!1s0x3f4d1969ba726c73%3A0xfa025676d2ff00fb!2sTespack%2C%20Tesco%20Plus%20Company!5e1!3m2!1sru!2s!4v1757200051035!5m2!1sru!2s"
        },
        {
            id: 3,
            textKey: "address_text_3",
            mapSrc:
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d32133.64636157512!2d66.87689491815468!3d39.738237371157624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4d8b23de91ce2b%3A0x874accc5dbe6b2b3!2sOOO%20YOMATO!5e1!3m2!1sru!2s!4v1758040289128!5m2!1sru!2s"
        }
    ];

    const [selectedMap, setSelectedMap] = useState(addresses[0].mapSrc);

    return (
        <div className="w-full">
            <div className="w-full md:container mx-auto md:py-10">
                <div className="bg-[#03156B] text-white p-10 flex flex-col md:flex-row justify-between rounded-b-3xl md:rounded-3xl gap-5 mb-10">
                    <h1 className="text-4xl md:text-6xl max-w-sm font-bold">{t("contacts_title")}</h1>
                    <p className="text-base md:text-xl max-w-lg">{t("contacts_description")}</p>
                </div>
            </div>

            <div className="relative">
                <div className="absolute inset-x-0 top-10 bottom-10 bg-[#03156B] -z-10"></div>
                <div className="container mx-auto px-4 md:px-0 grid md:grid-cols-2 gap-6 mb-12">
                    <div className="flex flex-col gap-6 bg-white shadow-md rounded-3xl p-10 border border-[#E5E5E5]">
                        <div className="flex flex-col gap-5">
                            {addresses.map((addr) => (
                                <div key={addr.id} className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-[#868686] text-sm font-bold">{t("address_label")}</h3>
                                        <p className="text-[#03156B] text-lg md:text-2xl max-w-xs md:max-w-lg">{t(addr.textKey)}</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedMap(addr.mapSrc)}
                                        className="w-10 h-10 flex items-center justify-center bg-[#062BD9] text-white rounded-md cursor-pointer"
                                        title={t("show_on_map")}
                                    >
                                        <FaArrowRightLong />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div>
                            <h3 className="text-[#868686] text-sm font-bold">{t("contact_label")}</h3>
                            <p className="text-[#03156B] text-lg md:text-2xl">{t("phone_1")}</p>
                            <p className="text-[#03156B] text-lg md:text-2xl">{t("phone_2")}</p>
                            <p className="text-[#03156B] text-lg md:text-2xl">{t("phone_3")}</p>
                            <p className="text-[#03156B] text-lg md:text-2xl">{t("email")}</p>
                        </div>
                    </div>

                    <div className="rounded-3xl overflow-hidden">
                        <iframe
                            key={selectedMap}
                            src={selectedMap}
                            width="100%"
                            height="700"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
