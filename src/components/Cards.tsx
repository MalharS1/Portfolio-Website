import { useMouse } from "@uidotdev/usehooks";
import { motion, Variants, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { mergeRefs } from "react-merge-refs";

// for card slides
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import '/node_modules/swiper/swiper.css';
import '/node_modules/swiper/modules/navigation.css';
import '/node_modules/swiper/modules/pagination.css';
import { Swiper as SwiperType } from 'swiper/types';

interface ProjectProperties {
    id: number;
    front_img_path: string;
    back_img_path: string;
    title: string;
    git_link: string;
    description: string;
}

interface CardsProps {
    id_nav: string;
}

function Cards({ id_nav }: CardsProps) {

    // to have multiple groups for multiple slides. Each outer list is num of cards in one slide
    const groupedProjects: ProjectProperties[][] = [

        // Slide 1
        [
            {
                id: 0,
                front_img_path: "/assets/card_front_img/mobile_dev.png",
                back_img_path: "/assets/card_back_img/phone_big.png",
                title: "Mobile Application Development",
                git_link: "https://github.com/MalharS1/Mobile-Application-Development",
                description: "UniFood is a cutting-edge mobile application tailored for post-secondary students, bringing together essential services like grocery shopping, meal planning, and nutrition tracking—all within a single, easy-to-use platform. Designed to simplify meal management for busy students, UniFood leverages powerful APIs, including Firestore and Nutritionix, to deliver a seamless and intuitive user experience."
            },
            {
                id: 1,
                front_img_path: "/assets/card_front_img/co2_emissions.png",
                back_img_path: "/assets/card_back_img/data_big.png",
                title: "Data Analysis Project",
                git_link: "https://github.com/MalharS1/Data-Analysis-Project",
                description: "This project analyzes CO2 emissions data from 1995 to 2018, focusing on global and Canadian trends. Using Pandas for data manipulation and Seaborn for visualization, the analysis highlights key patterns and insights, helping to understand the evolving landscape of emissions. The project provides a clear overview of emissions trends, with a particular emphasis on Canada's performance."
            },
            {
                id: 2,
                front_img_path: "/assets/card_front_img/server.png",
                back_img_path: "/assets/card_back_img/web_soc_big.png",
                title: "Interactive Web Sockets",
                git_link: "https://github.com/MalharS1/Interactive-Web-Sockets",
                description: "This project is a virtual classroom application where users can create or join chat rooms for real-time messaging. It includes features like a Tic-Tac-Toe game, a Whiteboard for drawing or notes, a To-Do List for task management, and a Number Guessing Game for fun and stress relief, enhancing the overall user experience."
            },
            {
                id: 3,
                front_img_path: "/assets/card_front_img/rocket.png",
                back_img_path: "/assets/card_back_img/rocket_big.png",
                title: "PyGame Rocket Simulation",
                git_link: "https://github.com/MalharS1/PyGame-Rocket-Simulation",
                description: "This PyGame project explores a simplified rocket simulation. While a full-scale rocket simulation is beyond the scope for a third-year Computer Science student, this version captures key aspects of the physics behind rocket flight. It offers a hands-on approach to understanding fundamental concepts while providing an interactive and engaging experience."
            }
        ],

        // Slide 2
        [
            {
                id: 4,
                front_img_path: "/assets/card_front_img/rocket.png",
                back_img_path: "/assets/card_back_img/rocket_big.png",
                title: "PyGame Rocket Simulation",
                git_link: "https://github.com/MalharS1/PyGame-Rocket-Simulation",
                description: "This PyGame project explores a simplified rocket simulation. While a full-scale rocket simulation is beyond the scope for a third-year Computer Science student, this version captures key aspects of the physics behind rocket flight. It offers a hands-on approach to understanding fundamental concepts while providing an interactive and engaging experience."
            },
            {
                id: 5,
                front_img_path: "/assets/card_front_img/rocket.png",
                back_img_path: "/assets/card_back_img/rocket_big.png",
                title: "PyGame Rocket Simulation",
                git_link: "https://github.com/MalharS1/PyGame-Rocket-Simulation",
                description: "This PyGame project explores a simplified rocket simulation. While a full-scale rocket simulation is beyond the scope for a third-year Computer Science student, this version captures key aspects of the physics behind rocket flight. It offers a hands-on approach to understanding fundamental concepts while providing an interactive and engaging experience."
            },
            {
                id: 6,
                front_img_path: "/assets/card_front_img/rocket.png",
                back_img_path: "/assets/card_back_img/rocket_big.png",
                title: "PyGame Rocket Simulation",
                git_link: "https://github.com/MalharS1/PyGame-Rocket-Simulation",
                description: "This PyGame project explores a simplified rocket simulation. While a full-scale rocket simulation is beyond the scope for a third-year Computer Science student, this version captures key aspects of the physics behind rocket flight. It offers a hands-on approach to understanding fundamental concepts while providing an interactive and engaging experience."
            },
            {
                id: 7,
                front_img_path: "/assets/card_front_img/rocket.png",
                back_img_path: "/assets/card_back_img/rocket_big.png",
                title: "PyGame Rocket Simulation",
                git_link: "https://github.com/MalharS1/PyGame-Rocket-Simulation",
                description: "This PyGame project explores a simplified rocket simulation. While a full-scale rocket simulation is beyond the scope for a third-year Computer Science student, this version captures key aspects of the physics behind rocket flight. It offers a hands-on approach to understanding fundamental concepts while providing an interactive and engaging experience."
            }
        ]
    ];


    // future proofing
    // Keep track of which slides have been viewed
    const [viewedSlides, setViewedSlides] = useState<Record<number, boolean>>({ 0: true }); // First slide starts as viewed
    const handleSlideChange = (swiper: SwiperType) => {

        // preserves previous states to only animate once, while keeping tracking initial animation trigger
        setViewedSlides((prev) => ({ ...prev, [swiper.realIndex]: true }));
    };

    const parentVariants: Variants = {
        initialL: {
            scale: 1,
            opacity: 0,
            x: -800,
            boxShadow: "0px 0px 0px 0px #000000"
        },
        initialR: {
            scale: 1,
            opacity: 0,
            x: 800,
            boxShadow: "0px 0px 0px 0px #000000"
        },
        visibleL: {
            scale: 1,
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
            },
        },
        visibleR: {
            scale: 1,
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
            },
        },
        pulse: {
            boxShadow: ["0px 0px 0px 0px #FF10F0", "0px 0px 14px 3px #8b00ff", "0px 0px 0px 0px #03ffff"],
            transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 4,
                ease: "easeInOut",
                delay: 0.3,
            },
        },
        hover: {
            height: "70vh",
            width: "70vw",
            transition: {
                duration: 0.3,
                type: "spring",
                stiffness: 200,
                damping: 30,
                mass: 1,
            },
        },
    };

    const scrollToCenter = (ref: React.RefObject<HTMLDivElement>) => {
        if (ref.current != null) {
            ref.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center",
            });
        }
    };

    return (
        <section id={id_nav} className="relative">
            <div className="cards-container flex flex-col items-center overflow-hidden pt-12 select-none">

                {/* Section Title */}
                <div className="flex items-center justify-center space-x-4 mb-8">
                    <hr className="w-[22rem] h-[0.15rem] rounded bg-gray-200 border-0 dark:bg-gray-700" />
                    <div className="translate-x-1 font-customA tracking-wide text-3xl font-extrabold text-center">Pro</div>
                    <div className="-translate-x-2 font-customA tracking-wide text-3xl font-extrabold text-center">jects</div>
                    <hr className="w-[22rem] h-[0.15rem] rounded bg-gray-200 border-0 dark:bg-gray-700" />
                </div>

                {/* Swiper Container */}
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    className="w-[78%]"
                    onSlideChange={handleSlideChange}
                >
                    {groupedProjects.map((group, groupIndex) => (
                        <SwiperSlide key={groupIndex} className="overflow-hidden">
                            <div className="flex flex-col p-8 items-center rounded-[100px] bg-black bg-opacity-40 border-[2px] border-gray-600">
                                {group.map((project) => {
                                    const ref = useRef<null | HTMLDivElement>(null);
                                    const isInView = useInView(ref, { once: true, amount: 0.1 });
                                    const [isActivated, setIsActivated] = useState<boolean>(false);
                                    const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
                                    const [mouse, mRef] = useMouse();


                                    // only activate hover effects after user has hoverd for more than 0.5 sec
                                    const handleMouseEnter = () => {
                                        const timeout = setTimeout(() => {
                                            setIsActivated(true);
                                            scrollToCenter(ref);
                                        }, 500);
                                        setTimer(timeout);
                                    };

                                    // reset timer on mouse leave from card
                                    const handleMouseLeave = () => {
                                        if (timer) clearTimeout(timer);
                                        setIsActivated(false);
                                    };

                                    // Only animate if current slide has been viewed
                                    const shouldAnimate = viewedSlides[groupIndex] && isInView;

                                    return (
                                        <motion.div
                                            key={project.id}
                                            ref={mergeRefs([ref, mRef])}
                                            className={`card bg-gray-900 border-2 bg-opacity-60 rounded-lg h-[15rem] w-[50rem] m-4 flex ${project.id % 2 === 0
                                                ? "flex-row-reverse border-slate-300"
                                                : "flex-row border-slate-500"
                                                } items-center relative cursor-pointer`}
                                            style={{
                                                backgroundImage: isActivated ? `url(${project.back_img_path})` : "none",
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }}
                                            variants={parentVariants}
                                            initial={project.id % 2 === 0 ? "initialL" : "initialR"}
                                            animate={
                                                shouldAnimate
                                                    ? project.id % 2 === 0
                                                        ? !isActivated
                                                            ? ["visibleL"]
                                                            : ["visibleL", "pulse", "hover"]
                                                        : !isActivated
                                                            ? ["visibleR"]
                                                            : ["visibleR", "pulse", "hover"]
                                                    : undefined
                                            }
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            {isActivated ? (
                                                <>
                                                    <motion.div
                                                        className="absolute inset-0 bg-black opacity-30"
                                                        style={{ zIndex: 2 }}
                                                    />
                                                    <div className="h-[100%] w-[100%] flex justify-center items-center">
                                                        <a
                                                            className="z-10 h-[100%] w-[100%] flex justify-center items-center text-5xl invert"
                                                            href={project.git_link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        />
                                                    </div>
                                                    <div
                                                        className="absolute bottom-full mb-2 flex items-center select-none w-[100%] justify-start"
                                                        style={{
                                                            left: `${mouse.elementX - 200}px`,
                                                            top: `${mouse.elementY - 20}px`,
                                                            zIndex: 100,
                                                        }}
                                                    >
                                                        <div className="bg-slate-900 text-white text-sm rounded px-3 py-1 whitespace-nowrap opacity-80">
                                                            <span className="flex justify-center items-center">
                                                                <i><FaGithub /></i>
                                                                <p className="pl-2">{project.git_link}</p>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <motion.div className="mx-1 w-[40%] h-[100%] flex items-center justify-center z-10">
                                                        <div className="relative w-full h-full flex items-center justify-center">
                                                            <motion.img
                                                                src={project.front_img_path}
                                                                className="h-auto w-auto max-h-[70%] max-w-[70%] object-contain"
                                                            />
                                                        </div>
                                                    </motion.div>
                                                    <motion.div className="w-[100%] h-[100%] text-white z-10 flex flex-col justify-center">
                                                        <h2 className="font-customC text-2xl font-bold pl-4">{project.title}</h2>
                                                        <div className="overflow-auto h-[10rem] pl-2 mx-2">
                                                            <p className="text-sm mt-3">{project.description}</p>
                                                        </div>
                                                    </motion.div>
                                                </>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}

export default Cards;