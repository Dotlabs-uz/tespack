"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl"

interface FormsProps {
    openModal: "feedback" | "vacancies" | null
    setOpenModal: (value: "feedback" | "vacancies" | null) => void
}

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
            fullName: (val) => (val.trim().length < 2 ? t("validation.nameShort") : null),
            email: (val) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                return emailRegex.test(val.trim()) ? null : t("validation.emailInvalid")
            },
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

    return { values, handleChange, resetForm, validate, errors }
}

export default function Forms({ openModal, setOpenModal }: FormsProps) {
    const t = useTranslations("Forms")
    const feedbackForm = useForm({ name: "", phone: "" })
    const vacanciesForm = useForm({
        vacancy: "",
        education: "",
        source: "",
        file: "",
        fullName: "",
        birthDate: "",
        email: "",
        phone: "",
    })

    const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false)
    const [isSubmittingVacancy, setIsSubmittingVacancy] = useState(false)

    const handleFeedbackSubmit = async () => {
        if (!feedbackForm.validate()) return

        setIsSubmittingFeedback(true)
        try {
            const response = await fetch("/api/feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(feedbackForm.values),
            })

            if (response.ok) {
                setOpenModal(null)
                feedbackForm.resetForm()
            } else {
                throw new Error("Failed to submit feedback")
            }
        } catch (error) {
            console.error("Error submitting feedback:", error)
        } finally {
            setIsSubmittingFeedback(false)
        }
    }

    const handleVacancySubmit = async () => {
        if (!vacanciesForm.validate()) return

        setIsSubmittingVacancy(true)
        try {
            const response = await fetch("/api/vacancies", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(vacanciesForm.values),
            })

            if (response.ok) {
                setOpenModal(null)
                vacanciesForm.resetForm()
            } else {
                throw new Error("Failed to submit vacancy application")
            }
        } catch (error) {
            console.error("Error submitting vacancy application:", error)
        } finally {
            setIsSubmittingVacancy(false)
        }
    }

    return (
        <>
            <Dialog open={openModal === "feedback"} onOpenChange={() => setOpenModal(null)}>
                <DialogContent className="w-full sm:max-w-[974px] bg-white border-none rounded-3xl p-6 sm:p-10">
                    <DialogHeader>
                        <DialogTitle className="text-[#03156B] font-bold text-3xl sm:text-5xl">{t("feedback.title")}</DialogTitle>
                        <p className="text-sm text-[#737373] mt-2">
                            {t("feedback.description")}
                            <span className="block">{t("feedback.descriptionLine2")}</span>
                        </p>
                    </DialogHeader>

                    <div className="flex flex-col gap-4 mt-4 sm:flex-row sm:gap-8">
                        <div className="flex-1 flex flex-col gap-2">
                            <Input
                                placeholder={t("feedback.placeholders.name")}
                                value={feedbackForm.values.name}
                                onChange={(e) => feedbackForm.handleChange("name", e.target.value)}
                                className={`bg-[#F0F0F0] px-4 py-4 text-lg rounded-xl border ${feedbackForm.errors.name ? "border-red-500" : "border-none"
                                    }`}
                            />
                            {feedbackForm.errors.name && <p className="text-red-500 text-xs">{feedbackForm.errors.name}</p>}
                        </div>

                        <div className="flex-1 flex flex-col gap-2">
                            <Input
                                type="tel"
                                placeholder={t("feedback.placeholders.phone")}
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
                                className={`bg-[#F0F0F0] px-4 py-4 text-lg rounded-xl border ${feedbackForm.errors.phone ? "border-red-500" : "border-none"}`}
                            />
                            {feedbackForm.errors.phone && <p className="text-red-500 text-xs">{feedbackForm.errors.phone}</p>}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
                        <button
                            onClick={handleFeedbackSubmit}
                            disabled={isSubmittingFeedback}
                            className="btn bg-[#062BD9] text-white w-full sm:w-auto disabled:opacity-50"
                        >
                            {isSubmittingFeedback ? t("feedback.submitting") : t("feedback.submitButton")}
                        </button>
                        <p className="text-xs text-[#C4C4C8] max-w-xs mt-2 sm:mt-0">{t("feedback.agreement")}</p>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={openModal === "vacancies"} onOpenChange={() => setOpenModal(null)}>
                <DialogContent className="w-full sm:max-w-[974px] bg-white border-none rounded-3xl p-6 sm:p-10">
                    <DialogHeader>
                        <DialogTitle className="text-[#03156B] font-bold text-3xl sm:text-5xl">{t("vacancies.title")}</DialogTitle>
                        <p className="text-sm text-[#737373] mt-2">
                            {t("vacancies.description")}
                            <span className="block">{t("vacancies.descriptionLine2")}</span>
                        </p>
                    </DialogHeader>

                    <div className="flex flex-col gap-4 mt-4 sm:flex-row sm:gap-8">
                        <div className="flex-1 flex flex-col gap-3">
                            <Input
                                placeholder={t("vacancies.placeholders.vacancy")}
                                value={vacanciesForm.values.vacancy}
                                onChange={(e) => vacanciesForm.handleChange("vacancy", e.target.value)}
                                className={`bg-[#F0F0F0] px-4 py-4 text-lg rounded-xl border ${vacanciesForm.errors.vacancy ? "border-red-500" : "border-none"
                                    }`}
                            />
                            {vacanciesForm.errors.vacancy && <p className="text-red-500 text-xs">{vacanciesForm.errors.vacancy}</p>}

                            <Input
                                placeholder={t("vacancies.placeholders.education")}
                                value={vacanciesForm.values.education}
                                onChange={(e) => vacanciesForm.handleChange("education", e.target.value)}
                                className="bg-[#F0F0F0] px-4 py-4 text-lg rounded-xl border-none"
                            />
                            <Input
                                placeholder={t("vacancies.placeholders.source")}
                                value={vacanciesForm.values.source}
                                onChange={(e) => vacanciesForm.handleChange("source", e.target.value)}
                                className="bg-[#F0F0F0] px-4 py-4 text-lg rounded-xl border-none"
                            />
                            <Input
                                placeholder={t("vacancies.placeholders.file")}
                                value={vacanciesForm.values.file}
                                onChange={(e) => vacanciesForm.handleChange("file", e.target.value)}
                                className="bg-[#F0F0F0] px-4 py-4 text-lg rounded-xl border-none"
                            />
                        </div>

                        <div className="flex-1 flex flex-col gap-3">
                            <Input
                                placeholder={t("vacancies.placeholders.fullName")}
                                value={vacanciesForm.values.fullName}
                                onChange={(e) => vacanciesForm.handleChange("fullName", e.target.value)}
                                className={`bg-[#F0F0F0] px-4 py-4 text-lg rounded-xl border ${vacanciesForm.errors.fullName ? "border-red-500" : "border-none"
                                    }`}
                            />
                            {vacanciesForm.errors.fullName && <p className="text-red-500 text-xs">{vacanciesForm.errors.fullName}</p>}

                            <Input
                                placeholder={t("vacancies.placeholders.birthDate")}
                                value={vacanciesForm.values.birthDate}
                                onChange={(e) => vacanciesForm.handleChange("birthDate", e.target.value)}
                                className="bg-[#F0F0F0] px-4 py-4 text-lg rounded-xl border-none"
                            />
                            <Input
                                type="email"
                                placeholder={t("vacancies.placeholders.email")}
                                value={vacanciesForm.values.email}
                                onChange={(e) => vacanciesForm.handleChange("email", e.target.value)}
                                className={`bg-[#F0F0F0] px-4 py-4 text-lg rounded-xl border ${vacanciesForm.errors.email ? "border-red-500" : "border-none"
                                    }`}
                            />
                            {vacanciesForm.errors.email && <p className="text-red-500 text-xs">{vacanciesForm.errors.email}</p>}

                            <Input
                                type="tel"
                                placeholder={t("vacancies.placeholders.phone")}
                                value={vacanciesForm.values.phone}
                                onChange={(e) => {
                                    const digits = e.target.value.replace(/\D/g, "").replace(/^998/, "").slice(0, 9)

                                    const formatted =
                                        "+998" +
                                        (digits.match(/(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/)?.slice(1) || [])
                                            .filter(Boolean)
                                            .map((part, i) => (i < 2 ? " " + part : "-" + part))
                                            .join("")

                                    vacanciesForm.handleChange("phone", formatted)
                                }}
                                className={`bg-[#F0F0F0] px-4 py-4 text-lg rounded-xl border ${vacanciesForm.errors.phone ? "border-red-500" : "border-none"
                                    }`}
                            />
                            {vacanciesForm.errors.phone && <p className="text-red-500 text-xs">{vacanciesForm.errors.phone}</p>}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
                        <button
                            onClick={handleVacancySubmit}
                            disabled={isSubmittingVacancy}
                            className="btn bg-[#062BD9] text-white w-full sm:w-auto disabled:opacity-50"
                        >
                            {isSubmittingVacancy ? t("vacancies.submitting") : t("vacancies.submitButton")}
                        </button>
                        <p className="text-xs text-[#C4C4C8] max-w-xs mt-2 sm:mt-0">{t("vacancies.agreement")}</p>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
