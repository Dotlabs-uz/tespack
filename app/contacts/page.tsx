"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Contacts() {
    return (
        <div className="container mx-auto px-4 md:px-0 py-10">
            <div className="bg-[#03156B] text-white p-10 flex justify-between rounded-3xl mb-10">
                <h1 className="text-4xl md:text-6xl max-w-sm font-bold">КОНТАКТЫ И ЛОКАЦИЯ</h1>
                <p className="text-base md:text-xl max-w-lg">Пластиковые изделия, полимерные покрытия, PET-Преформы и многое другое в одном каталоге.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="flex flex-col gap-6 bg-white shadow-md rounded-3xl p-10 border border-[#E5E5E5]">
                    <div className="">
                        <h3 className="text-[#868686] text-sm font-bold">Address:</h3>
                        <p className="text-[#03156B] text-lg md:text-2xl">2774 Oak Drive, Plattsburgh, New York</p>
                    </div>
                    <div className="">
                        <h3 className="text-[#868686] text-sm font-bold">Address:</h3>
                        <p className="text-[#03156B] text-lg md:text-2xl">2774 Oak Drive, Plattsburgh, New York</p>
                    </div>
                    <div className="">
                        <h3 className="text-[#868686] text-sm font-bold">Address:</h3>
                        <p className="text-[#03156B] text-lg md:text-2xl">2774 Oak Drive, Plattsburgh, New York</p>
                    </div>
                    <div>
                        <h3 className="text-[#868686] text-sm font-bold">Contact:</h3>
                        <p className="text-[#03156B] text-lg md:text-2xl">+998 91 123 45 67</p>
                        <p className="text-[#03156B] text-lg md:text-2xl">+998 91 123 45 67</p>
                        <p className="text-[#03156B] text-lg md:text-2xl">contact@tespack.com</p>
                    </div>
                </div>

                <div className="rounded-3xl overflow-hidden">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.21604336766!2d66.94101887650521!3d39.71829289785151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f17.0!3m3!1m2!1s0x3f4d1969ba726c73%3A0xfa025676d2ff00fb!2sTespack%2C%20Tesco%20Plus%20Company!5e1!3m2!1sru!2s!4v1757200051035!5m2!1sru!2s"
                        width="100%"
                        height="500"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-6">ЧАСТЫЕ ВОПРОСЫ</h2>
            <Accordion type="single" collapsible className="w-full space-y-2">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is there a free trial available?</AccordionTrigger>
                    <AccordionContent>
                        Yes, you can try us free for 30 days. If you want, we'll provide you with a free,
                        personalized 30-minute onboarding call to get you up and running as soon as possible.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Can I change my plan later?</AccordionTrigger>
                    <AccordionContent>Yes, you can change your plan anytime in your account settings.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>What is your cancellation policy?</AccordionTrigger>
                    <AccordionContent>You can cancel anytime – no hidden fees.</AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
