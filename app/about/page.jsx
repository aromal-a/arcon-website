import Image from "next/image";
import { TbArrowUpRight } from "react-icons/tb";

export default function About() {
  return (
    <div>
      <div className="bg-[url('/image/p13.jpg')] bg-center bg-cover">
        <h1 className="container py-32 text-6xl font-semibold tracking-widest text-center text-white lg:py-64 lg:text-left">
          WHO ARE WE?
        </h1>
      </div>

      <div className="container">
        <div className="py-4 lg:py-14">
          <h2 className="p-4 text-3xl font-semibold text-center lg:p-20 lg:text-5xl">
            We have great idea & Interior Design
          </h2>
          <p className="text-2xl font-medium lg:w-1/2">
            At Arcon For Designs, we specialize in creating innovative interior designs and
            streamlining the entire process by pre-manufacturing our designs in-house using
            advanced technology. We manufacture and export our own materials from all parts of
            India to our factory in Mankamkuzhy, Mavelikkara, Alappuzha.
          </p>
        </div>

        <div className="items-center lg:flex gap-x-8">
          <div className="w-full">
            <Image src="/image/gallery1123.jpg" width={700} height={700} alt="About Arcon work" />
          </div>

          <div>
            <p className="pb-8 tracking-wide">
              <br />
              Our Team consists of experienced engineers and builders who place your ideas and
              dreams with utmost care. We will craft you an authentic living experience.
              <br />
              <br />
              Join us and our ventures if you want to transform your living spaces, offices,
              wardrobes, or anything that requires our hands.
              <br />
              <br />
              <span className="text-xl font-extrabold tracking-tight">
                FRONTIER OF PLYWOOD TECHNOLOGY, We believe transforming our living space directly
                interferes with our minds.
              </span>
              <br />
              <span className="text-xl font-extrabold tracking-tight">
                So we carefully craft your dream choices with utmost and keen care.
              </span>
            </p>

            <a
              className="inline-flex items-center gap-1 px-6 py-3 text-sm text-white rounded-full shadow-lg bg-gray-950 hover:bg-gray-800 hover:ring-2 hover:ring-gray-950 ring-offset-2"
              href="/contact"
            >
              Contact Us <TbArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
