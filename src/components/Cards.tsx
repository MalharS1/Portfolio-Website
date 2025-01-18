import { useMouse } from "@uidotdev/usehooks";
import { motion, Variants, useInView } from "framer-motion"; //framer-motion for animation
import { useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";    // icon from react-icons
import { mergeRefs } from "react-merge-refs";  // to allow multiple refs (auto-center item and tooltip follow cursor)

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

    const projects: ProjectProperties[] = [
        {
            id: 0,
            front_img_path: "/assets/card_front_img/mobile_dev.png",
            back_img_path: "/assets/card_back_img/phone_big.png",
            title: "Mobile Application Development",
            git_link: "https://github.com/MalharS1/Mobile-Application-Development",
            description: "UniFood is a mobile application designed for post-secondary students to centralize services like grocery shopping, meal planning, and nutrition tracking into a single platform. Powered by APIs such as Firestore and Nutritionix, it provides a seamless experience for busy students looking to organize their meals and groceries efficiently."
        },
        {
            id: 1,
            front_img_path: "/assets/card_front_img/co2_emissions.png",
            back_img_path: "/assets/card_back_img/data_big.png",
            title: "Data Analysis Project",
            git_link: "https://github.com/MalharS1/Data-Analysis-Project",
            description: "This project analyzes and interprets CO2 emissions data from 1995 to 2018. Some techniques include, but are not limited to data exploration, data analysis and trend recognition. The following report determines trends for all countries, but more specifically Canada with the use of Pandas for data manipulation and Seaborn for visualization"
        },
        {
            id: 2,
            front_img_path: "/assets/card_front_img/server.png",
            back_img_path: "/assets/card_back_img/web_soc_big.png",
            title: "Interactive Web Sockets",
            git_link: "https://github.com/MalharS1/Interactive-Web-Sockets",
            description: "Features a dynamic simulated virtual classroom application that allows users to create and/or join chat rooms to communicate with each other in real time via messages. Some additional features to enhance the users' experience include things such as a Tic-Tac-Toe game, a White board (to draw/take notes), a To-Do list (add/manage tasks), and a number guessing game (for some memes/to relieve stress)."
        },
        {
            id: 3,
            front_img_path: "/assets/card_front_img/rocket.png",
            back_img_path: "/assets/card_back_img/rocket_big.png",
            title: "PyGame Rocket Simulation",
            git_link: "https://github.com/MalharS1/PyGame-Rocket-Simulation",
            description: "This Py-Game project aims to examine a simplified version of a rocket simulation. While an exact replica of a rocket simulation would be out of the scope for third-year Computer Science student, a simplified version still addresses much of the physics behind rocket simulations."
        },
    ];

    const parentVariants: Variants = {

        // L and R for alternating animations
        initialL: {
            scale: 1,
            opacity: 0,
            x: -1000,
            boxShadow: "0px 0px 0px 0px #000000"
        },
        initialR: {
            scale: 1,
            opacity: 0,
            x: 1000,
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
            height: "80vh",
            width: "80vw",
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

                {/* scetion Title */}
                <div className="flex items-center justify-center space-x-4 mb-8">
                    <hr className="w-[22rem] h-[0.15rem] rounded bg-gray-200 border-0 dark:bg-gray-700" />

                    {/* splitting projects name since this font has some overlap for letter J */}
                    <div className="translate-x-1 font-customA tracking-wide text-3xl font-extrabold text-center">Pro</div>
                    <div className="-translate-x-2 font-customA tracking-wide text-3xl font-extrabold text-center">jects</div>
                    <hr className="w-[22rem] h-[0.15rem] rounded bg-gray-200 border-0 dark:bg-gray-700" />
                </div>

                {/* Cards: variables and states defined here since each card has its own refs and states */}
                {projects.map((project) => {
                    const ref = useRef<null | HTMLDivElement>(null);
                    const isInView = useInView(ref, { once: true, amount: 0.1 }); // only trigger once, and if 0.1% of element is in view
                    const [isActivated, setIsActivated] = useState<boolean>(false);
                    const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
                    const [mouse, mRef] = useMouse();

                    const handleMouseEnter = () => {

                        // basically, only trigger scroll if mouse has hovered for atleast 0.5 sec
                        const timeout = setTimeout(() => {
                            setIsActivated(true);
                            scrollToCenter(ref);
                        }, 500);
                        setTimer(timeout);
                    };

                    const handleMouseLeave = () => {

                        // Clear timeout on leave
                        if (timer) clearTimeout(timer);
                        setIsActivated(false);
                    };

                    return (
                        <motion.div
                            key={project.id}
                            ref={mergeRefs([ref, mRef])} // ref for scroll and mouse tracking

                            // project id used to alternate design
                            className={`card bg-gray-900 border-2 bg-opacity-60 rounded-lg h-[15rem] w-[50rem] m-4 flex ${project.id % 2 === 0
                                ? "flex-row-reverse  border-slate-300"
                                : "flex-row border-slate-500"
                                } items-center relative cursor-pointer`}
                            style={{
                                backgroundImage: isActivated ? `url(${project.back_img_path})` : "none",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                            variants={parentVariants}
                            initial={project.id % 2 === 0 ? "initialL" : "initialR"}
                            animate={isInView ? (project.id % 2 === 0 ? (!isActivated ? ["visibleL"] : ["visibleL", "pulse", "hover"]) : (!isActivated ? ["visibleR"] : ["visibleR", "pulse", "hover"])) : undefined}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            {/* if hover is activated (after 0.5 sec), show back side, else front side */}
                            {isActivated ? (

                                // Back Side
                                <>
                                    <motion.div
                                        className="absolute inset-0 bg-black opacity-30"
                                        style={{
                                            zIndex: 2,
                                        }}
                                    />

                                    <div className="h-[100%] w-[100%] flex justify-center items-center">
                                        <a className="z-10 h-[100%] w-[100%] flex justify-center items-center text-5xl invert" href={project.git_link} target="_blank" rel="noopener noreferrer"> {/* target and rel for security */}
                                        </a>
                                    </div>

                                    <div
                                        className={`absolute bottom-full mb-2 flex items-center select-none w-[100%] justify-start`}
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

                                // Front Side
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
        </section >
    );
}

export default Cards;