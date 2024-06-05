"use client";
import Image from "next/image";
import { TbArrowNarrowRight } from "react-icons/tb";

export default function CatalogueSection() {
    const items = [
        {
            id: "01",
            catagory: "BEDROOM SETUP",
            title: "Cozy Bedroom Setup",
            image: "/image/badroom.jpg",
            description: "A cozy bedroom setup by Arcon features warm tones and plush textiles, creating a serene and comfortable space for rest and relaxation. Soft lighting and personal touches enhance the inviting atmosphere, making it the perfect retreat for unwinding.",
        },
        {
            id: "02",
            catagory: "KITHEN SETUP",
            title: "Neat & Clean Kitchen",
            image: "/image/kitchen1.jpg",
            description: "A neat and clean kitchen setup by Arcon emphasizes simplicity and functionality with sleek countertops and minimal clutter. Bright lighting and organized storage ensure an efficient and welcoming space for cooking and gathering",
        },
        {
            id: "03",
            catagory: "DRAWING ROOM",
            title: "Family Drowing Room",
            image: "/image/drowing.jpg",
            description: "An inviting drawing setup by Arcon combines comfort and style, featuring soft lighting, plush seating, and personalized décor elements. With a focus on creating a warm and welcoming ambiance, it's the ideal space for artistic inspiration and relaxation.",
        },
        {
            id: "04",
            catagory: "LIVING SETUP",
            title: "Clean Family Room",
            image: "/image/living.jpg",
            description: "A cozy bedroom setup by Arcon features warm tones and plush textiles, creating a serene and comfortable space for rest and relaxation. Soft lighting and personal touches enhance the inviting atmosphere, making it the perfect retreat for unwinding",
        },
    ]

    return (
        <div className="grid gap-8 divide-gray-300 lg:divide-x lg:gap-0 lg:grid-cols-4 md:grid-cols-2">
            {items.map((item) => (
                <div key={item.id} className="relative overflow-hidden group">
                    <div>
                        <Image src={item.image} width={380} height={100} alt="" className="w-full " />
                    </div>
                    <div className="absolute top-0 p-8 m-12 bg-white bg-opacity-60 backdrop-blur">
                        <div className="flex justify-between pb-4 ">
                            <p className="text-sm">{item.catagory}</p>
                            <span className="text-sm ">{item.id}</span>
                        </div>
                        <a className="block text-xl font-semibold" href="">{item.title}</a>
                        <p className="py-4 text-gray-500">{item.description}</p>
                    </div>

                    <div className="inset-0 flex-col items-center justify-end hidden gap-32 pb-16 text-xl transition duration-300 ease-in-out border-b-2 md:flex md:absolute group-hover:translate-y-full md:border-b-0 bg-zinc-100">
                        <p className="tracking-wider -rotate-90 ">{item.catagory} </p>
                        <span className="">
                            {item.id}
                        </span>

                    </div>
                </div>
            ))}
        </div>
    )
}
