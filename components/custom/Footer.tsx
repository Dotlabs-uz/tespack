import { FaYoutube, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Footer() {
    const t = useTranslations("Footer");

    return (
        <footer className="bg-white border-t-2 border-[#EAEAEA] rounded-3xl mt-40">
            <div className="container mx-auto px-4 md:px-0">
                <div className="bg-[#062BD9] text-white rounded-3xl -mt-25 p-6 md:p-15 shadow-lg flex flex-col md:flex-row md:justify-between gap-6 max-w-5xl mx-auto">
                    <div className="flex flex-col justify-between">
                        <h2 className="flex flex-col text-2xl md:text-3xl font-bold mb-4 md:mb-0">
                            {t("cooperation_title")}
                        </h2>
                        <p className="text-sm">{t("cooperation_text")}</p>
                    </div>

                    <div className="flex flex-col gap-3 md:w-1/2">
                        <input
                            type="text"
                            placeholder={t("form.name")}
                            className="rounded-lg px-4 py-2 w-full bg-[#FFFFFF] text-[#868686]"
                        />
                        <input
                            type="tel"
                            placeholder={t("form.phone")}
                            className="rounded-lg px-4 py-2 w-full bg-[#FFFFFF] text-[#868686]"
                        />
                        <button
                            type="submit"
                            className="btn btn-light btn-light:hover btn-light:active w-full"
                        >
                            {t("form.send")}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:justify-between items-start gap-10 mt-10">
                    <Image src="/FooterLogo.png" alt="Tespack" width={120} height={50} />
                    <div className="flex flex-row md:flex-col gap-10 md:w-1/2">
                        <div className="flex flex-col md:items-start mb-4 md:mb-0">
                            <p className="text-sm text-[#868686] bold">{t("address_title")}</p>
                            <p className="text-sm md:text-2xl text-[#03156B]">{t("address_text")}</p>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-sm text-[#868686] bold">{t("contact_title")}</p>
                            <p className="text-sm md:text-2xl text-[#03156B]">{t("contact_phone")}</p>
                            <p className="text-sm md:text-2xl text-[#03156B]">{t("contact_email")}</p>
                            <div className="flex gap-4 text-[#03156B] text-xl mt-2">
                                <a href="#"><FaYoutube /></a>
                                <a href="#"><FaFacebookF /></a>
                                <a href="#"><FaInstagram /></a>
                                <a href="#"><FaLinkedinIn /></a>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row gap-10 text-sm md:text-xl">
                        <div className="flex flex-col gap-2 mb-4 md:mb-0">
                            <a href="#">{t("menu.home")}</a>
                            <a href="#">{t("menu.products")}</a>
                            <a href="#">{t("menu.about")}</a>
                            <a href="#">{t("menu.features")}</a>
                            <a href="#">{t("menu.contacts")}</a>
                        </div>
                        <div className="flex flex-col gap-2">
                            <a href="#">{t("menu.catalog")}</a>
                            <a href="#">{t("menu.certificates")}</a>
                            <a href="#">{t("menu.licenses")}</a>
                            <a href="#">{t("menu.docs")}</a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mt-10 text-sm gap-2 w-full">
                    <div className="flex justify-between w-full md:justify-end order-1 md:gap-8 md:order-2 underline">
                        <a href="#">{t("bottom.privacy")}</a>
                        <a href="#">{t("bottom.terms")}</a>
                        <a href="#">{t("bottom.cookies")}</a>
                    </div>

                    <div className="flex justify-between w-full md:justify-start order-2 md:gap-50 md:order-1 mt-2 md:mt-0">
                        <p>{t("bottom.copy")}</p>
                        <p>{t("bottom.designed")}</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}



