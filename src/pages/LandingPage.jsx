import InputField from "../components/atoms/Input";
import Footer from "../components/organism/Footer";
import Header from "../components/organism/Header";
import MovieCard from "../components/organism/MovieCard";
import React, { useEffect, useRef, useState } from "react";

function LandingPage() {
    const sliderRef = useRef(null);

    const [bisaKeKiri, setBisaKeKiri] = useState(false);
    const [bisaKeKanan, setBisaKeKanan] = useState(true);

    const cekPosisiScroll = () => {
        if (sliderRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

            setBisaKeKiri(scrollLeft > 2);

            setBisaKeKanan(scrollLeft + clientWidth < scrollWidth - 2);
        }
    };

    useEffect(() => {
        cekPosisiScroll();
        window.addEventListener("resize", cekPosisiScroll);
        return () => window.removeEventListener("resize", cekPosisiScroll);
    }, []);


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
            title: "Lion King",
            release: "December 2020",
            genre: ["Adventure", "Comedy"],
        },
        {
            id: "lion-king-3",
            poster: "/src/assets/images/example.png",
            title: "Lion King",
            release: "December 2020",
            genre: ["Adventure", "Comedy"],
        },
        {
            id: "lion-king-4",
            poster: "/src/assets/images/example.png",
            title: "Lion King",
            release: "December 2020",
            genre: ["Adventure", "Comedy"],
        },
    ]
    const upComing = [
        {
            id: "lion-king-5",
            poster: "/src/assets/images/example.png",
            title: "Lion King",
            release: "December 2020",
            genre: ["Adventure", "Comedy"],
        },
        {
            id: "lion-king-6",
            poster: "/src/assets/images/example.png",
            title: "Lion King",
            release: "December 2020",
            genre: ["Adventure", "Comedy"],
        },
        {
            id: "lion-king-7",
            poster: "/src/assets/images/example.png",
            title: "Lion King",
            release: "December 2020",
            genre: ["Adventure", "Comedy"],
        },
        {
            id: "lion-king-8",
            poster: "/src/assets/images/example.png",
            title: "Lion King",
            release: "December 2020",
            genre: ["Adventure", "Comedy"],
        },
        {
            id: "lion-king-9",
            poster: "/src/assets/images/example.png",
            title: "Lion King",
            release: "December 2020",
            genre: ["Adventure", "Comedy"],
        },
        {
            id: "lion-king-10",
            poster: "/src/assets/images/example.png",
            title: "Lion King",
            release: "December 2020",
            genre: ["Adventure", "Comedy"],
        },
    ];
    const handleDetail = (id) => alert(`Detail film: ${id}`);
    const handleBuyTicket = (id) => alert(`Beli tiket film: ${id}`);

    const geserSlider = (arah) => {
        if (sliderRef.current) {
            const jarakGeser = 300;

            sliderRef.current.scrollBy({
                left: arah === "next" ? jarakGeser : -jarakGeser,
                behavior: "smooth", // Efek animasi menggeser halus
            });
        }
    };
    return (
        <>
            <main className="px-5 md:px-20 lg:px-24">
                <section className="grid md:flex md:items-center md:justify-between py-8">
                    <section className="text-center md:text-left flex flex-col gap-5">
                        <h1 className="text-xl font-bold text-primary">MOVIE TICKET PURCHASES #1 IN INDONESIA</h1>
                        <h1 className="text-4xl md:text-5xl leading-normal">Experience the Magic of Cinema: Book Your Tickets Today</h1>
                        <p className="text-md text-gray-400">Sign up and get the ticket with a lot of discount</p>
                    </section>
                    <section>
                        <div class="m-auto mt-5 grid size-75 md:size-100 lg:size-110 grid-cols-2 grid-rows-3 gap-4">
                            <div class="row-span-2 col-start-1 row-start-1">
                                <img src="/src/assets/images/example.png" alt="" class="w-full h-full object-cover rounded-t-lg" />
                            </div>

                            <div class="col-start-1 row-start-3">
                                <img src="/src/assets/images/example.png" alt="" class="w-full h-full object-cover rounded-b-lg" />
                            </div>

                            <div class="col-start-2 row-start-1">
                                <img src="/src/assets/images/example.png" alt="" class="w-full h-full object-cover rounded-t-lg" />
                            </div>

                            <div class="row-span-2 col-start-2 row-start-2">
                                <img src="/src/assets/images/example.png" alt="" class="w-full h-full object-cover rounded-b-lg" />
                            </div>
                        </div>

                    </section>
                </section>

                <section>
                    <section className="text-center md:text-start md:w-1/2">
                        <p className="text-primary font-bold py-5">WHY CHOOSE US</p>
                        <p className="text-4xl md:text-3xl leading-normal">Unleashing the Ultimate Movie Experience</p>
                    </section>
                    <section className="text-center flex flex-col md:flex-row md:text-justify md:my-2 md:items-start gap-8 py-5">
                        <div>
                            <img className="m-auto md:m-0" src="/src/assets/icons/shield.svg" alt="guaranteed" />
                            <p className="font-bold py-2 md:py-3">Guaranteed</p>
                            <p className="text-gray-500">Book your cinema tickets with total confidence. We ensure your seats are locked in and confirmed instantly every time.</p>
                        </div>
                        <div>
                            <img className="m-auto md:m-0" src="/src/assets/icons/afordable.svg" alt="affordable" />
                            <p className="font-bold py-2 md:py-3">Affordable</p>
                            <p className="text-gray-500">Enjoy the best movie deals in town. We provide premium cinema experiences that are easy on your pocket every day.</p>
                        </div>
                        <div>
                            <img className="m-auto md:m-0" src="/src/assets/icons/customer.svg" alt="customer-service" />
                            <p className="font-bold py-2 md:py-3">24/7 Customer Support</p>
                            <p className="text-gray-500">Need a hand with your booking? Our dedicated team is online around the clock to assist you with any concerns.</p>
                        </div>
                    </section>
                </section>

                <section className="w-full py-10">
                    <section className="text-center py-5 md:w-1/2 md:m-auto px-4">
                        <p className="font-bold text-primary">MOVIES</p>
                        <p className="text-3xl py-5">Exciting Movies That Should Be Watched Today</p>
                    </section>

                    <section className="w-full">
                        <section className="flex w-full overflow-x-auto snap-x snap-mandatory gap-6 pb-6 px-4 md:px-0 scrollbar-hide">

                            {movies.map((m, index) => (
                                <MovieCard
                                    key={index}
                                    id={m.id}
                                    poster={m.poster}
                                    title={m.title}
                                    genre={m.genre}
                                    onDetail={handleDetail}
                                    onBuyTicket={handleBuyTicket}
                                />
                            ))}

                        </section>
                    </section>

                    <p className="hidden md:block font-bold text-center text-primary mt-4">
                        <a href="">View All ➔</a>
                    </p>
                </section>


                <section className="w-full py-10">
                    {/* Bagian Judul dan Tombol Navigasi */}
                    <div className="flex justify-between items-end pb-5 px-5 md:px-0">
                        <div>
                            <p className="font-bold text-primary">UPCOMING MOVIES</p>
                            <h2 className="text-2xl md:text-3xl mt-1 text-gray-900">Exciting Movie Coming Soon</h2>
                        </div>

                        {/* Tampilkan panel kontrol navigasi jika jumlah film lebih dari 4 */}
                        {upComing.length > 4 && (
                            <div className="flex gap-3">
                                {/* Tombol Prev (Kiri) - Menggunakan simbol yang sama tapi dibalik horizontal */}
                                <button
                                    onClick={() => geserSlider("prev")}
                                    className={`w-10 h-10 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 transition-all duration-300 shadow-sm ${!bisaKeKiri ? "opacity-0 pointer-events-none" : "opacity-100"
                                        }`}
                                >
                                    {/* Tambahkan span dengan kelas -scale-x-100 untuk membalik arah karakter */}
                                    <span className="-scale-x-100 inline-block">➔</span>
                                </button>

                                {/* Tombol Next (Kanan) - Tetap normal */}
                                <button
                                    onClick={() => geserSlider("next")}
                                    className={`w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:opacity-90 transition-all duration-300 shadow-sm ${!bisaKeKanan ? "opacity-0 pointer-events-none" : "opacity-100"
                                        }`}
                                >
                                    ➔
                                </button>
                            </div>
                        )}

                    </div>

                    {/* 4. Tambahkan fungsi onScroll ke kontainer utama carousel */}
                    <section
                        ref={sliderRef}
                        onScroll={cekPosisiScroll}
                        className="flex w-full overflow-x-auto snap-x snap-mandatory gap-6 pb-6 px-5 md:px-0 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
                        {upComing.map((m, index) => (
                            <MovieCard
                                key={index}
                                id={m.id}
                                poster={m.poster}
                                title={m.title}
                                release={m.release}
                                genre={m.genre}
                            />
                        ))}
                    </section>
                </section>



                <section class="bg-blue-600 w-full my-5 h-120 md:h-80 rounded-3xl p-8 text-white text-center shadow-lg relative overflow-hidden">

                    <h2 class="text-2xl md:text-5xl mb-4 mt-10">Subscribe to our newsletter</h2>

                    <div class="flex flex-col md:flex-row md:justify-center gap-3">
                        <InputField className="md:w-60" placeholder="first name"></InputField>
                        <InputField className="md:w-60" placeholder="email address"></InputField>
                        <button class="bg-white text-blue-600 font-bold md:w-60 py-3 rounded-lg mt-2">
                            Subscribe Now
                        </button>
                    </div>

                    <div class="absolute -bottom-30 -right-20 w-50 h-50 border-4 border-white/80 rounded-full"></div>
                </section>
            </main>
        </>
    )
}

export default LandingPage;