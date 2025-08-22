"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";

export default function Header() {
    const [query, setQuery] = useState("");

    return (
        <header className="w-full bg-[#03156B] text-white">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
                <Link href="/" className="">
                    <Image
                        src="/TespackLogo.png"
                        alt=""
                        width={150}
                        height={50}
                        className=""
                    />
                </Link>

                <div className="flex items-center ml-6 border-b border-white">
                    <IoIosSearch className="text-white text-lg cursor-pointer" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="PET-Преформы"
                        className="px-3 py-1 bg-transparent text-white text-sm outline-none flex-1"
                    />
                </div>

                <nav className="md:flex space-x-6 ml-6 text-sm">
                    <Link href="/">Главная</Link>
                    <Link href="/products">Продукция</Link>
                    <Link href="/company">О компании</Link>
                    <Link href="/">Возможности</Link>
                    <Link href="/news">Новости</Link>
                    <Link href="/contacts">Контакты</Link>
                </nav>

                <div className="flex items-center space-x-4 ml-6">
                    <button className="btn w-[212px] bg-[#FFFFFF] text-black">
                        Оставить заявку
                    </button>
                </div>
            </div>
        </header>
    );
}

