import Link from "next/link";


export default function Footer() {

    return (
        <div className="bg-zinc-100">
            <div className="container lg:grid lg:grid-cols-2 py-14">
                <div className="grid gap-4 pb-4 text-left lg:pb-0 lg:grid-cols-3">
                    <div>
                        <h2 className="pb-4 text-xl font-semibold">COMPANY</h2>
                        <div className="flex flex-col ">
                            <Link className="py-1 hover:underline" href="/about">About Us</Link>
                            <Link className="py-1 hover:underline" href="/contact">Contact</Link>
                        </div>
                    </div>
                   
                    <div>
                        <h2 className="pb-4 text-xl font-semibold">CONNECT</h2>
                        <div className="flex flex-col ">
                            <Link className="py-1 hover:underline" href="/about">Instagram</Link>
                            <Link className="py-1 hover:underline" href="/press">Linkedin</Link>
                            <Link className="py-1 hover:underline" href="/careers">Twitter</Link>
                        </div>
                    </div>
                </div>
                
            </div>

            {/* Copy Right */}
            <div className="py-10 bg-zinc-200">
                <div className="container text-center text-gray-500 lg:justify-between lg:flex">
                    <div className="pb-4 lg:pb-0">
                        <p>&copy;2024 ARCON DESIGNS AND INTERIORS.All rights reserved </p>
                    </div>
                    <div className="">
                        <Link className="p-4 hover:underline" href="/privacy">Privacy</Link>
                        <Link className="p-4 hover:underline" href="/terms">Terms</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
