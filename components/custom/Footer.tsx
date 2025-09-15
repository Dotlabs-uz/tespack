"use client"

import { useState } from "react"
import { FaYoutube, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa"
import Image from "next/image"
import { useTranslations } from "next-intl"

function useForm(initialValues: Record<string, string>) {
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const t = useTranslations("Forms")

    const handleChange = (name: string, value: string) => {
        setValues((prev) => ({ ...prev, [name]: value }))
        setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    const validate = () => {
        const validators: Record<string, (val: string) => string | null> = {
            name: (val) => (val.trim().length < 2 ? t("validation.nameShort") : null),
            phone: (val) => {
                const cleanPhone = val.replace(/\D/g, "")
                const isValidUzbek = /^998\d{9}$/.test(cleanPhone)
                const isValidGeneral = /^\d{7,15}$/.test(cleanPhone)
                return isValidUzbek || isValidGeneral ? null : t("validation.phoneInvalid")
            },
        }

        const newErrors: Record<string, string> = {}

        for (const key in values) {
            const val = values[key].trim()
            if (!val) {
                newErrors[key] = t("validation.required")
                continue
            }
            if (validators[key]) {
                const error = validators[key](val)
                if (error) newErrors[key] = error
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const resetForm = () => {
        setValues(initialValues)
        setErrors({})
    }

    return { values, errors, handleChange, validate, resetForm }
}

export default function Footer() {
    const t = useTranslations("Footer")
    const feedbackForm = useForm({ name: "", phone: "" })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async () => {
        if (!feedbackForm.validate()) return

        setIsSubmitting(true)
        try {
            const response = await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(feedbackForm.values),
            })

            if (response.ok) {
                feedbackForm.resetForm()
            } else {
                throw new Error("Failed to submit feedback")
            }
        } catch (err) {
            console.error("Error submitting feedback:", err)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <footer className="bg-white border-t-2 border-[#EAEAEA] rounded-3xl mt-40">
            <div className="container mx-auto px-4 md:px-0">
                <div className="bg-[#062BD9] text-white rounded-3xl -mt-25 p-6 md:p-15 shadow-lg flex flex-col md:flex-row md:justify-between gap-6 max-w-5xl mx-auto">
                    <div className="flex flex-col justify-between">
                        <h2 className="flex flex-col text-2xl md:text-3xl font-bold mb-4 md:mb-0">
                            {t("cooperation_title")}
                        </h2>
                        <p className="text-sm max-w-3xs">{t("cooperation_text")}</p>
                    </div>

                    <div className="flex flex-col gap-3 md:w-1/2">
                        <div className="flex flex-col gap-1">
                            <input
                                type="text"
                                placeholder={t("form.name")}
                                value={feedbackForm.values.name}
                                onChange={(e) => feedbackForm.handleChange("name", e.target.value)}
                                className={`rounded-lg px-4 py-2 w-full bg-[#FFFFFF] text-[#868686] border ${feedbackForm.errors.name ? "border-red-500" : "border-transparent"}`}
                            />
                            {feedbackForm.errors.name && <p className="text-red-500 text-xs">{feedbackForm.errors.name}</p>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <input
                                type="tel"
                                placeholder={t("form.phone")}
                                value={feedbackForm.values.phone}
                                onChange={(e) => {
                                    const digits = e.target.value.replace(/\D/g, "").replace(/^998/, "").slice(0, 9)
                                    const formatted =
                                        "+998" +
                                        (digits.match(/(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/)?.slice(1) || [])
                                            .filter(Boolean)
                                            .map((part, i) => (i < 2 ? " " + part : "-" + part))
                                            .join("")
                                    feedbackForm.handleChange("phone", formatted)
                                }}
                                className={`rounded-lg px-4 py-2 w-full bg-[#FFFFFF] text-[#868686] border ${feedbackForm.errors.phone ? "border-red-500" : "border-transparent"}`}
                            />
                            {feedbackForm.errors.phone && <p className="text-red-500 text-xs">{feedbackForm.errors.phone}</p>}
                        </div>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="btn btn-light w-full disabled:opacity-50"
                        >
                            {isSubmitting ? t("form.submitting") : t("form.send")}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:justify-between items-start gap-10 mt-10">
                    <Image src="/FooterLogo.webp" alt="Tespack" width={120} height={50} />

                    <div className="order-1 md:order-2 flex flex-row gap-35 md:gap-20 text-sm md:text-xl">
                        <div className="flex flex-col gap-2 mb-4 md:mb-0">
                            <a href="/">{t("menu.home")}</a>
                            <a href="/products">{t("menu.products")}</a>
                            <a href="/company">{t("menu.about")}</a>
                            <a href="/features">{t("menu.features")}</a>
                            <a href="/contacts">{t("menu.contacts")}</a>
                        </div>
                        <div className="flex flex-col gap-2">
                            <a href="#">{t("menu.catalog")}</a>
                            <a href="#">{t("menu.certificates")}</a>
                            <a href="#">{t("menu.licenses")}</a>
                            <a href="#">{t("menu.docs")}</a>
                        </div>
                    </div>

                    <div className="order-2 md:order-1 flex flex-row md:flex-col gap-25 md:gap-10 md:w-1/2">
                        <div className="flex flex-col md:items-start mb-4 md:mb-0 md:max-w-3xs">
                            <p className="text-sm text-[#868686] font-bold">{t("address_title")}</p>
                            <p className="text-sm md:text-2xl text-[#03156B]">{t("address_text")}</p>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-sm text-[#868686] font-bold">{t("contact_title")}</p>
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
    )
}