"use client";
import Image from "next/image";
import { TbArrowNarrowRight } from "react-icons/tb";

export default function CatalogueSection() {
    const items = [
        {
            id: "01",
            category: "BEDROOM DESIGNS",
            title: "Cozy Bedroom Setup",
            image: "public/image/gallery10",
            description: "A whole new range of designs and sets that turn your sleeping space into a bold and cozy setup",
        },
        {
            id: "02",
            category: "KITCHEN ACCESSORIES",
            title: "Neat & Clean Kitchen Accessories",
            image: "public/image/gallery11",
            description: "You deserve a clean kitchen table that is sleek and modern.",
        },
        {
            id: "03",
            category: "DRAWER SETUP",
            title: "Family Drawer Room, Lockers and Safety Measures",
            image: "public/image/gallery13",
            description: "High quality security for keeping your belonging. Top-knotch security accessories",
        },
        {
            id: "04",
            category: "LIVING SETUP",
            title: "Quiet Relaxing spaces built just for you",
            image: "public/image/gallery14",
            description: "A comfortable living space steup for your beautiful home.",
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
