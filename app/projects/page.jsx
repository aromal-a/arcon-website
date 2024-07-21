import Image from 'next/image';

export default function Projects() {
    const projects = [
        {
            id: 1,
            name: 'Drawing room for family time',
            description: 'Bedroom with a clean and comfortable design for your family. Charming with a modern design.',
            image: '/image/one.jpg',
            link: '',
        },
        {
            id: 2,
            name: 'Kitchen look modern and clean',
            description: 'Kitchen looks modern and clean. Charming with a modern design.',
            image: '/image/two.jpg',
            link: '',
        },
        {
            id: 3,
            name: 'Perfect living room for family time',
            description: 'Drawing room with a clean and comfortable design for your family. Charming with a modern design.',
            image: '/image/three.jpg',
            link: '',
        },
        {
            id: 4,
            name: 'Perfect living room for family time',
            description: 'Drawing room with a clean and comfortable design for your family. Charming with a modern design.',
            image: '/image/four.jpg',
            link: '',
        },
        {
            id: 5,
            name: 'Perfect living room for family time',
            description: 'Drawing room with a clean and comfortable design for your family. Charming with a modern design.',
            image: '/image/five.jpg',
            link: '',
        },
        {
            id: 6,
            name: 'Perfect living room for family time',
            description: 'Drawing room with a clean and comfortable design for your family. Charming with a modern design.',
            image: '/image/six.jpg',
            link: '',
        },
        {
            id: 7,
            name: 'Perfect living room for family time',
            description: 'Drawing room with a clean and comfortable design for your family. Charming with a modern design.',
            image: '/image/seven.jpg',
            link: '',
        },
        {
            id: 8,
            name: 'Perfect living room for family time',
            description: 'Drawing room with a clean and comfortable design for your family. Charming with a modern design.',
            image: '/image/eight.jpg',
            link: '',
        },
    ];
    
    return (
        <div>
            <div className="bg-[url('/image/backgroundproject.jpg')] bg-center bg-cover">
                <h1 className="container py-64 text-6xl font-semibold tracking-widest text-white">OUR PROJECTS</h1>
            </div>
            <div className="container grid grid-cols-2 gap-8 py-8">
                {projects.map((project) => (
                    <div key={project.id} className="relative overflow-hidden rounded-xl group">
                        <div>
                            <Image src={project.image} layout="responsive" width={480} height={380} alt={project.name} className="w-full" />
                        </div>
                        <div className="absolute bottom-0 flex-col items-center justify-end w-full gap-32 p-12 text-xl text-white transition duration-300 ease-in-out translate-y-full bg-gradient-to-b from-transparent to-black group-hover:translate-y-0">
                            <h1 className="text-2xl font-semibold">{project.name}</h1>
                            <p className="py-4">{project.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
