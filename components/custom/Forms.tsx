"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function Forms() {
    const [openModal, setOpenModal] = useState<"feedback" | "vacancies" | null>(null);

    return (
        <div className="flex flex-col items-center p-6">
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setOpenModal("feedback")}
                    className="btn bg-[#062BD9] text-white rounded-lg"
                >
                    Feedback
                </button>
                <button
                    onClick={() => setOpenModal("vacancies")}
                    className="btn bg-[#062BD9] text-white rounded-lg"
                >
                    Vacancies
                </button>
            </div>

            <Dialog open={openModal === "feedback"} onOpenChange={() => setOpenModal(null)}>
                <DialogContent className="sm:max-w-[974px] bg-[#FFFFFF] border-none rounded-3xl p-10">
                    <DialogHeader>
                        <DialogTitle className="text-[#03156B] font-bold text-5xl">
                            ЗАЯВКА НА ОБРАТНУЮ СВЯЗЬ
                        </DialogTitle>
                        <p className="text-sm text-[#737373]">
                            Отправьте информацию о себе и мы свяжемся
                            <span className="block">с вами по поводу сотрудничества</span>
                        </p>
                    </DialogHeader>

                    <div className="flex gap-8 text-[#737373] mt-3 w-full">
                        <Input
                            placeholder="Имя"
                            className=" bg-[#F0F0F0] px-4 py-6 text-lg rounded-xl border-none"
                        />
                        <Input
                            type="tel"
                            placeholder="Номер телефона"
                            className="bg-[#F0F0F0] px-4 py-6 text-lg rounded-xl border-none"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={() => setOpenModal(null)} className="btn bg-[#062BD9] text-white">
                            Отправить форму
                        </button>
                        <p className="text-xs text-[#C4C4C8] max-w-xs">
                            Я соглашаюсь с условиями и даю разрешение на обработку персональных данных
                        </p>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={openModal === "vacancies"} onOpenChange={() => setOpenModal(null)}>
                <DialogContent className="sm:max-w-[974px] bg-[#FFFFFF] border-none rounded-3xl p-10">
                    <DialogHeader>
                        <DialogTitle className="text-[#03156B] font-bold text-5xl">ЗАПОЛНИТЕ АНКЕТУ</DialogTitle>
                        <p className="text-sm text-[#737373]">
                            Отправьте информацию о себе и мы рассмотрим
                            <span className="block">вас на вакантную должность</span>
                        </p>
                    </DialogHeader>
                    <div className="flex gap-8 w-full">
                        <div className="flex flex-col gap-4 text-[#737373] mt-3 w-full">
                            <Input
                                placeholder="Вакансия"
                                className="bg-[#F0F0F0] px-4 py-6 text-lg rounded-xl border-none"
                            />
                            <Input
                                placeholder="Образование"
                                className="bg-[#F0F0F0] px-4 py-6 text-lg rounded-xl border-none"
                            />
                            <Input
                                placeholder="Откуда вы узнали о вакансии"
                                className="bg-[#F0F0F0] px-4 py-6 text-lg rounded-xl border-none"
                            />
                            <Input
                                placeholder="Файл"
                                className="bg-[#F0F0F0] px-4 py-6 text-lg rounded-xl border-none"
                            />
                        </div>
                        <div className="flex flex-col gap-4 text-[#737373] mt-3 w-full">
                            <Input
                                placeholder="ФИО"
                                className="bg-[#F0F0F0] px-4 py-6 text-lg rounded-xl border-none"
                            />
                            <Input
                                placeholder="Дата рождения"
                                className="bg-[#F0F0F0] px-4 py-6 text-lg rounded-xl border-none"
                            />
                            <Input
                                type="email"
                                placeholder="Электронная почта"
                                className="bg-[#F0F0F0] px-4 py-6 text-lg rounded-xl border-none"
                            />
                            <Input
                                type="tel"
                                placeholder="Телефон"
                                className="bg-[#F0F0F0] px-4 py-6 text-lg rounded-xl border-none"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setOpenModal(null)} className="btn bg-[#062BD9] text-white">
                            Отправить форму
                        </button>
                        <p className="text-xs text-[#C4C4C8] max-w-xs">
                            Я соглашаюсь с условиями и даю разрешение на обработку персональных данных
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
