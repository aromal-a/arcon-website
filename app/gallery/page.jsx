
import Image from "next/image";

export default function Gallery() {
  return (
    <div className="container py-10 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="flex flex-col gap-4">
        <div>
          <Image className="h-auto max-w-full rounded-lg" src="/image/three.jpeg" alt="" width={500} height={500} />
        </div>
        <div>
          <Image className="h-auto max-w-full rounded-lg" src="/image/eight.jpeg" alt="" width={500} height={500} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <Image className="h-auto max-w-full rounded-lg" src="/image/one.jpeg" alt="" width={500} height={500} />
        </div>
        <div>
          <Image className="h-auto max-w-full rounded-lg" src="/image/seven.jpeg" alt="" width={500} height={500} />
        </div>
        <div>
          <Image className="h-auto max-w-full rounded-lg" src="/image/six.jpeg" alt="" width={500} height={500} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <Image className="h-auto max-w-full rounded-lg" src="/image/ten.jpeg" alt="" width={500} height={500} />
        </div>
        <div>
          <Image className="h-auto max-w-full rounded-lg" src="/image/two.jpeg" alt="" width={500} height={500} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <Image className="h-auto max-w-full rounded-lg" src="/image/p1.jpeg" alt="" width={500} height={500} />
        </div>
        <div>
          <Image className="h-auto max-w-full rounded-lg" src="/image/p2.jpeg" alt="" width={500} height={500} />
        </div>
        <div>
          <Image className="h-auto max-w-full rounded-lg" src="/image/p3.jpeg" alt="" width={500} height={500} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <Image className="h-auto max-w-full rounded-lg" src="/image/s1.jpg" alt="" width={500} height={500} />
        </div>
        <div>
          <Image className="h-auto max-w-full rounded-lg" src="/image/s2.jpg" alt="" width={500} height={500} />
        </div>
        <div>
          <Image className="h-auto max-w-full rounded-lg" src="/image/s3.jpg" alt="" width={500} height={500} />
        </div>
        <div>
          <Image className="h-auto max-w-full rounded-lg" src="/image/s4.jpg" alt="" width={500} height={500} />
        </div>
        <div>
          <Image className="h-auto max-w-full rounded-lg" src="/image/s5.jpg" alt="" width={500} height={500} />
        </div>
      </div>
    </div>
  );
}
