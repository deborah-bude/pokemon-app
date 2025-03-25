'use client'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useCallback, useEffect, useState, type ReactNode } from 'react'

type SliderProps = {
    children: ReactNode[]
    autoSlideInterval?: number // in ms
}

export default function Slider({ children, autoSlideInterval = 5000 }: SliderProps) {
    const [current, setCurrent] = useState(0)
    const total = children.length

    const nextSlide = useCallback(() => {
        setCurrent((prev) => (prev + 1) % total)
    }, [total])

    const prevSlide = useCallback(() => {
        setCurrent((prev) => (prev - 1 + total) % total)
    }, [total])

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide()
        }, autoSlideInterval)
        return () => clearInterval(interval)
    }, [nextSlide, autoSlideInterval])

    return (
        <div className="relative w-full overflow-hidden">
            {/* Left Arrow */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 hover:bg-white z-10"
            >
                <ChevronLeftIcon className="h-6 w-6 text-black" />
            </button>

            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {children.map((slide, index) => (
                    <div key={index} className="w-full flex-shrink-0 p-4">
                        {slide}
                    </div>
                ))}
            </div>

            {/* Right Arrow */}
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 hover:bg-white z-10"
            >
                <ChevronRightIcon className="h-6 w-6 text-black" />
            </button>
        </div>
    )
}
