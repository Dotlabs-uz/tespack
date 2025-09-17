"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

interface VolumeOption {
    value: number
    label: string
}

interface VolumeSelectorProps {
    value: number
    options: VolumeOption[]
    title?: string
}

export default function VolumeSelector({
    value,
    options,
    title = "Объем",
}: VolumeSelectorProps) {
    const [selected] = useState(value)
    const currentIndex = options.findIndex((o) => o.value === selected)
    const validIndex = currentIndex >= 0 ? currentIndex : 0

    return (
        <div className="w-full max-w-md my-8">
            <h3 className="text-2xl text-[#7A7A7A] font-bold mb-5">{title}</h3>

            <div className="relative px-4">
                <div className="relative h-2 bg-border rounded-full" />

                <div className="absolute inset-0 flex justify-between items-center">
                    {options.map((option, index) => (
                        <div
                            key={option.value}
                            className={cn(
                                "w-4 h-4 rounded-full border-2 transition-all duration-200",
                                index === validIndex
                                    ? "bg-[#03156B] border-[#03156B] shadow-lg"
                                    : "border-[#7A7A7A] bg-transparent",
                            )}
                        />
                    ))}
                </div>
            </div>

            <div className="flex justify-between mt-4">
                {options.map((option, index) => (
                    <span
                        key={option.value}
                        className={cn(
                            "text-sm transition-colors duration-200",
                            index === validIndex ? "text-[#03156B] font-medium" : "text-muted-foreground",
                        )}
                    >
                        {option.label}
                    </span>
                ))}
            </div>
        </div>
    )
}

