// "use client";

// import { useState } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";

// interface FormsProps {
//     openModal: "feedback" | "vacancies" | null;
//     setOpenModal: (value: "feedback" | "vacancies" | null) => void;
// }

// function useForm(initialValues: Record<string, string>) {
//     const [values, setValues] = useState(initialValues);
//     const handleChange = (name: string, value: string) => {
//         setValues((prev) => ({ ...prev, [name]: value }));
//     };
//     const resetForm = () => setValues(initialValues);
//     return { values, handleChange, resetForm };
// }

// export default function Forms({ openModal, setOpenModal }: FormsProps) {
//     const feedbackForm = useForm({ name: "", phone: "" });
//     const vacanciesForm = useForm({
//         vacancy: "",
//         education: "",
//         source: "",
//         file: "",
//         fullName: "",
//         birthDate: "",
//         email: "",
//         phone: "",
//     });

//     return (
//         <>
//             {/* Модалка обратной связи */}
//             <Dialog open={openModal === "feedback"} onOpenChange={() => setOpenModal(null)}>
//                 <DialogContent className="sm:max-w-[974px] bg-[#FFFFFF] border-none rounded-3xl p-10">
//                     <DialogHeader>
//                         <DialogTitle className="text-[#03156B] font-bold text-5xl">
//                             ЗАЯВКА НА ОБРАТНУЮ СВЯЗЬ
//                         </DialogTitle>
//                         <p className="text-sm text-[#737373]">
//                             Отправьте информацию о себе и мы свяжемся
//                             <span className="block">с вами по поводу сотрудничества</span>
//                         </p>
//                     </DialogHeader>

//                     <div className="flex gap-8 text-[#737373] mt-3 w-full">
//                         <Input
//                             placeholder="Имя"
//                             value={feedbackForm.values.name}
//                             onChange={(e) => feedbackForm.handleChange("name", e.target.value)}
//                             className="bg-[#F0F0F0] px-4 py-6 text-lg rounded-xl border-none"
//                         />
//                         <Input
//                             type="tel"
//                             placeholder="Номер телефона"
//                             value={feedbackForm.values.phone}
//                             onChange={(e) => feedbackForm.handleChange("phone", e.target.value)}
//                             className="bg-[#F0F0F0] px-4 py-6 text-lg rounded-xl border-none"
//                         />
//                     </div>

//                     <div className="flex items-center gap-4 mt-6">
//                         <button
//                             onClick={() => {
//                                 console.log(feedbackForm.values);
//                                 setOpenModal(null);
//                                 feedbackForm.resetForm();
//                             }}
//                             className="btn bg-[#062BD9] text-white"
//                         >
//                             Отправить форму
//                         </button>
//                         <p className="text-xs text-[#C4C4C8] max-w-xs">
//                             Я соглашаюсь с условиями и даю разрешение на обработку персональных данных
//                         </p>
//                     </div>
//                 </DialogContent>
//             </Dialog>

//             {/* Модалка вакансий */}
//             <Dialog open={openModal === "vacancies"} onOpenChange={() => setOpenModal(null)}>
//                 <DialogContent className="sm:max-w-[974px] bg-[#FFFFFF] border-none rounded-3xl p-10">
//                     <DialogHeader>
//                         <DialogTitle className="text-[#03156B] font-bold text-5xl">
//                             ЗАПОЛНИТЕ АНКЕТУ
//                         </DialogTitle>
//                         <p className="text-sm text-[#737373]">
//                             Отправьте информацию о себе и мы рассмотрим
//                             <span className="block">вас на вакантную должность</span>
//                         </p>
//                     </DialogHeader>

//                     <div className="flex gap-8 w-full mt-3">
//                         <div className="flex flex-col gap-4 text-[#737373] w-full">
//                             <Input
//                                 placeholder="Вакансия"
//                                 value={vacanciesForm.values.vacancy}
//                                 onChange={(e) => vacanciesForm.handleChange("vacancy", e.target.value)}
//                                 className="bg-[#F0F0F0] px-4 py-6 text-lg rounded-xl border-none"
//                             />
//                             <Input
//                                 placeholder="Образование"
//                                 value={vacanciesForm.values.education}
//                                 onChange={(e) => vacanciesForm.handleChange("education", e.target.value)}
//                                 className="bg-[#F0F0F0] px-4 py-6 text-lg rounded-xl border-none"
//                             />
//                             <Input
//                                 placeholder="Откуда вы узнали о вакансии"
//                                 value={vacanciesForm.values.source}
//                                 onChange={(e) => vacanciesForm.handleChange("source", e.target.value)}
//                                 className="bg-[#F0F0F0] px-4 py-6 text-lg rounded-xl border-none"
//                             />
//                             <Input
//                                 placeholder="Файл"
//                                 value={vacanciesForm.values.file}
//                                 onChange={(e) => vacanciesForm.handleChange("file", e.target.value)}
//                                 className="bg-[#F0F0F0] px-4 py-6 text-lg rounded-xl border-none"
//                             />
//                         </div>
//                         <div className="flex flex-col gap-4 text-[#737373] w-full">
//                             <Input
//                                 placeholder="ФИО"
//                                 value={vacanciesForm.values.fullName}
//                                 onChange={(e) => vacanciesForm.handleChange("fullName", e.target.value)}
//                                 className="bg-[#F0F0F0] px-4 py-6 text-lg rounded-xl border-none"
//                             />
//                             <Input
//                                 placeholder="Дата рождения"
//                                 value={vacanciesForm.values.birthDate}
//                                 onChange={(e) => vacanciesForm.handleChange("birthDate", e.target.value)}
//                                 className="bg-[#F0F0F0] px-4 py-6 text-lg rounded-xl border-none"
//                             />
//                             <Input
//                                 type="email"
//                                 placeholder="Электронная почта"
//                                 value={vacanciesForm.values.email}
//                                 onChange={(e) => vacanciesForm.handleChange("email", e.target.value)}
//                                 className="bg-[#F0F0F0] px-4 py-6 text-lg rounded-xl border-none"
//                             />
//                             <Input
//                                 type="tel"
//                                 placeholder="Телефон"
//                                 value={vacanciesForm.values.phone}
//                                 onChange={(e) => vacanciesForm.handleChange("phone", e.target.value)}
//                                 className="bg-[#F0F0F0] px-4 py-6 text-lg rounded-xl border-none"
//                             />
//                         </div>
//                     </div>

//                     <div className="flex items-center gap-4 mt-6">
//                         <button
//                             onClick={() => {
//                                 console.log(vacanciesForm.values);
//                                 setOpenModal(null);
//                                 vacanciesForm.resetForm();
//                             }}
//                             className="btn bg-[#062BD9] text-white"
//                         >
//                             Отправить форму
//                         </button>
//                         <p className="text-xs text-[#C4C4C8] max-w-xs">
//                             Я соглашаюсь с условиями и даю разрешение на обработку персональных данных
//                         </p>
//                     </div>
//                 </DialogContent>
//             </Dialog>
//         </>
//     );
// }


"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface FormsProps {
    openModal: "feedback" | "vacancies" | null;
    setOpenModal: (value: "feedback" | "vacancies" | null) => void;
}

function useForm(initialValues: Record<string, string>) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (name: string, value: string) => {
        setValues((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" })); // очищаем ошибку при вводе
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        for (const key in values) {
            const val = values[key].trim();

            if (!val) {
                newErrors[key] = "Это поле обязательно";
            } else {
                if (key === "email") {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(val)) newErrors[key] = "Неверный формат e-mail";
                }
                if (key === "phone") {
                    const phoneRegex = /^[0-9+()\s-]{7,20}$/;
                    if (!phoneRegex.test(val)) newErrors[key] = "Неверный номер телефона";
                }
                if (key === "name" || key === "fullName") {
                    if (val.length < 2) newErrors[key] = "Слишком короткое имя";
                }
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const resetForm = () => {
        setValues(initialValues);
        setErrors({});
    };

    return { values, handleChange, resetForm, validate, errors };
}

export default function Forms({ openModal, setOpenModal }: FormsProps) {
    const feedbackForm = useForm({ name: "", phone: "" });
    const vacanciesForm = useForm({
        vacancy: "",
        education: "",
        source: "",
        file: "",
        fullName: "",
        birthDate: "",
        email: "",
        phone: "",
    });

    return (
        <>
            {/* Модалка обратной связи */}
            <Dialog open={openModal === "feedback"} onOpenChange={() => setOpenModal(null)}>
                <DialogContent className="w-full sm:max-w-[974px] bg-white border-none rounded-3xl p-6 sm:p-10">
                    <DialogHeader>
                        <DialogTitle className="text-[#03156B] font-bold text-3xl sm:text-5xl">
                            ЗАЯВКА НА ОБРАТНУЮ СВЯЗЬ
                        </DialogTitle>
                        <p className="text-sm text-[#737373] mt-2">
                            Отправьте информацию о себе и мы свяжемся
                            <span className="block">с вами по поводу сотрудничества</span>
                        </p>
                    </DialogHeader>

                    {/* Мобильная верстка: колонки 1 */}
                    <div className="flex flex-col gap-4 mt-4 sm:flex-row sm:gap-8">
                        <div className="flex-1 flex flex-col gap-2">
                            <Input
                                placeholder="Имя"
                                value={feedbackForm.values.name}
                                onChange={(e) => feedbackForm.handleChange("name", e.target.value)}
                                className={`bg-[#F0F0F0] px-4 py-4 text-lg rounded-xl border ${feedbackForm.errors.name ? "border-red-500" : "border-none"
                                    }`}
                            />
                            {feedbackForm.errors.name && (
                                <p className="text-red-500 text-xs">{feedbackForm.errors.name}</p>
                            )}
                        </div>

                        <div className="flex-1 flex flex-col gap-2">
                            <Input
                                type="tel"
                                placeholder="Номер телефона"
                                value={feedbackForm.values.phone}
                                onChange={(e) => feedbackForm.handleChange("phone", e.target.value)}
                                className={`bg-[#F0F0F0] px-4 py-4 text-lg rounded-xl border ${feedbackForm.errors.phone ? "border-red-500" : "border-none"
                                    }`}
                            />
                            {feedbackForm.errors.phone && (
                                <p className="text-red-500 text-xs">{feedbackForm.errors.phone}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
                        <button
                            onClick={() => {
                                if (feedbackForm.validate()) {
                                    console.log(feedbackForm.values);
                                    setOpenModal(null);
                                    feedbackForm.resetForm();
                                }
                            }}
                            className="btn bg-[#062BD9] text-white w-full sm:w-auto"
                        >
                            Отправить форму
                        </button>
                        <p className="text-xs text-[#C4C4C8] max-w-xs mt-2 sm:mt-0">
                            Я соглашаюсь с условиями и даю разрешение на обработку персональных данных
                        </p>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Модалка вакансий */}
            <Dialog open={openModal === "vacancies"} onOpenChange={() => setOpenModal(null)}>
                <DialogContent className="w-full sm:max-w-[974px] bg-white border-none rounded-3xl p-6 sm:p-10">
                    <DialogHeader>
                        <DialogTitle className="text-[#03156B] font-bold text-3xl sm:text-5xl">
                            ЗАПОЛНИТЕ АНКЕТУ
                        </DialogTitle>
                        <p className="text-sm text-[#737373] mt-2">
                            Отправьте информацию о себе и мы рассмотрим
                            <span className="block">вас на вакантную должность</span>
                        </p>
                    </DialogHeader>

                    {/* Мобильная верстка: колонки 1, ПК: колонки 2 */}
                    <div className="flex flex-col gap-4 mt-4 sm:flex-row sm:gap-8">
                        <div className="flex-1 flex flex-col gap-3">
                            <Input
                                placeholder="Вакансия"
                                value={vacanciesForm.values.vacancy}
                                onChange={(e) => vacanciesForm.handleChange("vacancy", e.target.value)}
                                className={`bg-[#F0F0F0] px-4 py-4 text-lg rounded-xl border ${vacanciesForm.errors.vacancy ? "border-red-500" : "border-none"
                                    }`}
                            />
                            {vacanciesForm.errors.vacancy && (
                                <p className="text-red-500 text-xs">{vacanciesForm.errors.vacancy}</p>
                            )}

                            <Input
                                placeholder="Образование"
                                value={vacanciesForm.values.education}
                                onChange={(e) => vacanciesForm.handleChange("education", e.target.value)}
                                className="bg-[#F0F0F0] px-4 py-4 text-lg rounded-xl border-none"
                            />
                            <Input
                                placeholder="Откуда вы узнали о вакансии"
                                value={vacanciesForm.values.source}
                                onChange={(e) => vacanciesForm.handleChange("source", e.target.value)}
                                className="bg-[#F0F0F0] px-4 py-4 text-lg rounded-xl border-none"
                            />
                            <Input
                                placeholder="Файл"
                                value={vacanciesForm.values.file}
                                onChange={(e) => vacanciesForm.handleChange("file", e.target.value)}
                                className="bg-[#F0F0F0] px-4 py-4 text-lg rounded-xl border-none"
                            />
                        </div>

                        <div className="flex-1 flex flex-col gap-3">
                            <Input
                                placeholder="ФИО"
                                value={vacanciesForm.values.fullName}
                                onChange={(e) => vacanciesForm.handleChange("fullName", e.target.value)}
                                className={`bg-[#F0F0F0] px-4 py-4 text-lg rounded-xl border ${vacanciesForm.errors.fullName ? "border-red-500" : "border-none"
                                    }`}
                            />
                            {vacanciesForm.errors.fullName && (
                                <p className="text-red-500 text-xs">{vacanciesForm.errors.fullName}</p>
                            )}

                            <Input
                                placeholder="Дата рождения"
                                value={vacanciesForm.values.birthDate}
                                onChange={(e) => vacanciesForm.handleChange("birthDate", e.target.value)}
                                className="bg-[#F0F0F0] px-4 py-4 text-lg rounded-xl border-none"
                            />
                            <Input
                                type="email"
                                placeholder="Электронная почта"
                                value={vacanciesForm.values.email}
                                onChange={(e) => vacanciesForm.handleChange("email", e.target.value)}
                                className={`bg-[#F0F0F0] px-4 py-4 text-lg rounded-xl border ${vacanciesForm.errors.email ? "border-red-500" : "border-none"
                                    }`}
                            />
                            {vacanciesForm.errors.email && (
                                <p className="text-red-500 text-xs">{vacanciesForm.errors.email}</p>
                            )}

                            <Input
                                type="tel"
                                placeholder="Телефон"
                                value={vacanciesForm.values.phone}
                                onChange={(e) => vacanciesForm.handleChange("phone", e.target.value)}
                                className={`bg-[#F0F0F0] px-4 py-4 text-lg rounded-xl border ${vacanciesForm.errors.phone ? "border-red-500" : "border-none"
                                    }`}
                            />
                            {vacanciesForm.errors.phone && (
                                <p className="text-red-500 text-xs">{vacanciesForm.errors.phone}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
                        <button
                            onClick={() => {
                                if (vacanciesForm.validate()) {
                                    console.log(vacanciesForm.values);
                                    setOpenModal(null);
                                    vacanciesForm.resetForm();
                                }
                            }}
                            className="btn bg-[#062BD9] text-white w-full sm:w-auto"
                        >
                            Отправить форму
                        </button>
                        <p className="text-xs text-[#C4C4C8] max-w-xs mt-2 sm:mt-0">
                            Я соглашаюсь с условиями и даю разрешение на обработку персональных данных
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
