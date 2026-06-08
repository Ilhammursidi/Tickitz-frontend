import { useState, useEffect } from "react";
import { Button } from "../components/atoms/Button";
import InputField from "../components/atoms/Input";
import MovieCard from "../components/organism/MovieCard";

function MovieList() {

    const movies = [
        {
            id: "lion-king",
            poster: "/src/assets/images/example.png",
            title: "Lion King",
            release: "December 2020",
            genre: ["Adventure", "Comedy"],
        },
        {
            id: "lion-king-2",
            poster: "/src/assets/images/example.png",
            title: "King Lion",
            release: "December 2020",
            genre: ["Adventure", "Comedy"],
        },
        {
            id: "lion-king-3",
            poster: "/src/assets/images/example.png",
            title: "The Avengers",
            release: "December 2020",
            genre: ["Adventure", "Comedy"],
        },
        {
            id: "lion-king-4",
            poster: "/src/assets/images/example.png",
            title: "The Hulk",
            release: "December 2020",
            genre: ["Adventure", "Comedy"],
        },
        {
            id: "lion-king-5",
            poster: "/src/assets/images/example.png",
            title: "Blue Lock",
            release: "December 2020",
            genre: ["Adventure", "Comedy"],
        },
        {
            id: "lion-king-6",
            poster: "/src/assets/images/example.png",
            title: "Demon God",
            release: "December 2020",
            genre: ["Adventure", "Comedy"],
        },
        {
            id: "lion-king-7",
            poster: "/src/assets/images/example.png",
            title: "The Mullet",
            release: "December 2020",
            genre: ["Adventure", "Comedy"],
        },
        {
            id: "lion-king-8",
            poster: "/src/assets/images/example.png",
            title: "Thor",
            release: "December 2020",
            genre: ["Adventure", "Comedy"],
        },
        {
            id: "lion-king-9",
            poster: "/src/assets/images/example.png",
            title: "Flash",
            release: "December 2020",
            genre: ["Adventure", "Comedy"],
        },
        {
            id: "lion-king-10",
            poster: "/src/assets/images/example.png",
            title: "Spiderman",
            release: "December 2020",
            genre: ["Adventure", "Comedy"],
        },
        {
            id: "lion-king-11",
            poster: "/src/assets/images/example.png",
            title: "Social Distancing",
            release: "December 2020",
            genre: ["Adventure", "Comedy"],
        },
        {
            id: "lion-king-12",
            poster: "/src/assets/images/example.png",
            title: "Bullet",
            release: "December 2020",
            genre: ["Adventure", "Comedy"],
        },
    ]

    const handleDetail = (id) => alert(`Detail film: ${id}`);
    const handleBuyTicket = (id) => alert(`Beli tiket film: ${id}`);

    function HeroBanner() {
        const heroBanners = [
            {
                id: 1,
                backdrop: "/src/assets/images/example.png",
                tagline: "LIST MOVIE OF THE WEEK",
                title: "Experience the Magic of Cinema: Book Your Tickets Today"
            },
            {
                id: 2,
                backdrop: "/src/assets/images/example.png",
                tagline: "NEW RELEASE THIS WEEK",
                title: "Discover the Most Anticipated Action Blockbusters"
            },
            {
                id: 3,
                backdrop: "/src/assets/images/example.png",
                tagline: "EXCLUSIVE IN TICKITZ",
                title: "Watch Premium Cinematic Masterpieces from Your Best Seats"
            }
        ];

        const [currentIndex, setCurrentIndex] = useState(0);

        useEffect(() => {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) =>
                    prevIndex === heroBanners.length - 1 ? 0 : prevIndex + 1
                );
            }, 5000);

            return () => clearInterval(interval);
        }, [heroBanners.length]);

        const nextSlide = () => {
            setCurrentIndex((prev) => (prev === heroBanners.length - 1 ? 0 : prev + 1));
        };

        const prevSlide = () => {
            setCurrentIndex((prev) => (prev === 0 ? heroBanners.length - 1 : prev - 1));
        };

        return (
            <section className="w-full">
                <div className="relative w-full h-100 md:h-120 overflow-hidden shadow-xl bg-gray-900">

                    <div
                        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {heroBanners.map((banner) => (
                            <div key={banner.id} className="relative w-full h-full shrink-0">
                                <img
                                    src={banner.backdrop}
                                    alt={banner.title}
                                    className="w-full h-full object-cover object-center"
                                />

                                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent flex flex-col justify-center px-8 md:px-16">
                                    <p className="text-xs md:text-sm font-semibold text-gray-300 tracking-widest uppercase mb-3">
                                        {banner.tagline}
                                    </p>
                                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-2xl">
                                        {banner.title}
                                    </h1>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                        {heroBanners.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`transition-all duration-300 rounded-full ${currentIndex === index
                                        ? "w-6 h-1.5 bg-blue-600"
                                        : "w-1.5 h-1.5 bg-white/50 hover:bg-white"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section>
            <HeroBanner></HeroBanner>
            <section className="px-5 md:px-20 lg:px-24 py-5">
                {/* content */}

                <section className="flex flex-col md:flex-row gap-5">
                    <form action="">
                        <label className="text-gray-700" htmlFor="">Search Event</label>
                        <div className="border border-gray-300 rounded-md flex w-70 h-15 p-2 px-4 mt-2">
                            <img className="opacity-20 w-5" src="/src/assets/icons/search.svg" alt="" />
                            <input placeholder="Spiderman" className="outline-none pl-2 focus:outline-0 w-full" type="text" />
                        </div>
                    </form>
                    <div>

                        <p className="text-gray-700">Filter</p>
                        <div className="mt-4 text-gray-700">
                            <Button>Thriller</Button>
                            <Button>Horror</Button>
                            <Button>Romantic</Button>
                            <Button>Adventure</Button>
                            <Button>Sci-Fi</Button>
                        </div>
                    </div>
                </section>

                {/* fetch film dan hasil filternya */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 my-5 w-full max-w-6xl mx-auto">

                
                {movies.map((m, index) => (
                    
                    <section className="my-4 w-full">
                    <MovieCard
                    key={index}
                    id={m.id}
                    poster={m.poster}
                    title={m.title}
                    genre={m.genre}
                    onDetail={handleDetail}
                    onBuyTicket={handleBuyTicket}
                    />
                    </section>
                ))}


                    {/* pagination */}
                    <section>

                    </section>
                </section>

                <section className="bg-blue-600 w-full my-5 h-120 md:h-80 rounded-3xl p-8 text-white text-center shadow-lg relative overflow-hidden">

                    <h2 className="text-2xl md:text-5xl mb-4 mt-10">Subscribe to our newsletter</h2>

                    <div className="flex flex-col md:flex-row md:justify-center gap-3">
                        <InputField className="md:w-60" placeholder="first name"></InputField>
                        <InputField className="md:w-60" placeholder="email address"></InputField>
                        <button className="bg-white text-blue-600 font-bold md:w-60 py-3 rounded-lg mt-2">
                            Subscribe Now
                        </button>
                    </div>

                    <div className="absolute -bottom-30 -right-20 w-50 h-50 border-4 border-white/80 rounded-full"></div>
                </section>

                {/* content */}
            </section>
        </section>
    )
}

export default MovieList;