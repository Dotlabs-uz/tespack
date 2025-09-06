"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Contacts() {
    return (
        <div className="container mx-auto px-4 py-10">
            <div className="bg-blue-900 text-white p-6 rounded-2xl mb-10">
                <h1 className="text-3xl font-bold">КОНТАКТЫ И ЛОКАЦИЯ</h1>
                <p className="mt-2 text-sm max-w-lg">
                    Пластиковые изделия, полимерные покрытия, PET-Преформы и многое другое в одном каталоге.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="bg-white shadow-md rounded-2xl p-6">
                    <div className="mb-6">
                        <h3 className="font-bold">Address:</h3>
                        <p>2774 Oak Drive, Plattsburgh, New York</p>
                    </div>
                    <div className="mb-6">
                        <h3 className="font-bold">Address:</h3>
                        <p>2774 Oak Drive, Plattsburgh, New York</p>
                    </div>
                    <div className="mb-6">
                        <h3 className="font-bold">Address:</h3>
                        <p>2774 Oak Drive, Plattsburgh, New York</p>
                    </div>
                    <div>
                        <h3 className="font-bold">Contact:</h3>
                        <p>+998 91 123 45 67</p>
                        <p>+998 91 123 45 67</p>
                        <p>contact@tespack.com</p>
                    </div>
                </div>

                <div className="rounded-2xl overflow-hidden">
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
