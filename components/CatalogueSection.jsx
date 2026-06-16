"use client";
import Image from "next/image";
import { TbArrowNarrowRight } from "react-icons/tb";

export default function CatalogueSection() {
    const items = [
        {
            id: "01",
            catagory: "BEDROOM DESIGNS",
            title: "Cozy Bedroom Setup",
            image: "/image/badroom.jpg",
            description: "family drowing room with a clean and comfortable design for your family.",
        },
        {
            id: "02",
            catagory: "KITCHEN ACCESSORIES",
            title: "Neat & Clean Kitchen Accessories",
            image: "/image/kitchen1.jpg",
            description: "family drowing room with a clean and comfortable design for your family.",
        },
        {
            id: "03",
            catagory: "DRAWER SETUP",
            title: "Family Drawer Room, Lockers and Safety Measures",
            image: "/image/drowing.jpg",
            description: "family drowing room with a clean and comfortable design for your family.",
        },
        {
            id: "04",
            catagory: "LIVING SETUP",
            title: "Quiet Relaxing spaces built just for you",
            image: "/image/living.jpg",
            description: "family drowing room with a clean and comfortable design for your family.",
        },
    ]

    return (
        <div className="grid gap-8 divide-gray-300 lg:divide-x lg:gap-0 lg:grid-cols-4 md:grid-cols-2">
            {items.map((item) => (
                <div key={item.id} className="relative overflow-hidden group">
                    <div>
                        <Image src={item.image} width={380} height={100} alt={item.title} className="w-full" />
                    </div>
                    <div className="absolute top-0 p-8 m-12 bg-white bg-opacity-60 backdrop-blur">
                        <div className="flex justify-between pb-4">
                            <p className="text-sm">{item.catagory}</p>
                            <span className="text-sm">{item.id}</span>
                        </div>
                        <a className="block text-xl font-semibold" href="">{item.title}</a>
                        <p className="py-4 text-gray-500">{item.description}</p>
                        <a className="inline-flex items-center font-medium" href="">
                            See Details <TbArrowNarrowRight className="ml-2 text-xl" />
                        </a>
                    </div>

                    <div className="absolute inset-0 hidden flex-col items-center justify-end gap-32 pb-16 text-xl transition duration-300 ease-in-out border-b-2 md:flex group-hover:bg-black group-hover:bg-opacity-50">
                        <p className="tracking-wider -rotate-90 text-white">{item.catagory}</p>
                        <span className="text-white">{item.id}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
