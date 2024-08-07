import Image from "next/image";
import logo from "../public/logo.png";
import Navigation from "./Navigation";

export default function Header() {
    return (
        <div className="sticky inset-x-0 top-0 z-10 bg-opacity-60 bg-zinc-100 backdrop-blur-lg">
            <div className="container flex items-center justify-between py-8 ">
                <div className="w-40 h-40 relative">
                    <Image src={logo} alt="logo" layout="fill" objectFit="contain" />
                </div>
                <Navigation />
            </div>
        </div>
    );
}
