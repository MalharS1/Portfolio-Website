import { useState } from "react";
import { motion } from "framer-motion";
import { GiSkills } from "react-icons/gi";
import { Link } from "react-scroll";

// Interface for WaveText component props
interface WaveTextProps {
    text: string;
    shouldAnimate: boolean;
    onAnimationComplete?: () => void;
}

// Interface for Hero component props
interface HeroProps {
    id_nav: string;
    isAnimated: boolean;
}

// Interface for Icon properties
interface IconProperties {
    id: number;
    icon_path: string;
    title: string;
    link: string;
}

// WaveText component for animated text
function WaveText({ text, shouldAnimate, onAnimationComplete }: WaveTextProps) {
    const letters = text.split("");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08, // to add delay to each letter
            },
        },
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <motion.div
            className="flex font-customC text-white text-5xl italic font-extrabold translate-y-20 select-none"
            variants={containerVariants}
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
            onAnimationComplete={onAnimationComplete}
        >
            {letters.map((letter, index) => (
                <motion.span key={index} variants={letterVariants}>
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.div>
    );
}

// Hero component
function Hero({ id_nav, isAnimated }: HeroProps) {
    const [startTextAnimation, setStartTextAnimation] = useState(false);
    const [startRingAnimation, setStartRingAnimation] = useState(false);

    const boxVariants = {

        // give hero container 3d laying down effect
        initial: {
            scale: 0.27,
            opacity: 0.5,
            rotateX: 35,
            rotateZ: 15,
            y: -100,
        },
        visible: {
            scale: 0.9,
            y: 0,
            opacity: 1,
            rotateX: [35, 0],
            rotateZ: [15, -15, 0],
            transition: {
                delay: 0.2,
                duration: 0.8,
                ease: "easeInOut",
            },
        },
    };

    const textVariants = {
        initial: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 3,
                ease: "linear",
                staggerChildren: 0.01,
            }
        },
    }

    const icons: IconProperties[] = [

        // Outer Circle
        { id: 0, icon_path: "/assets/skills_icons/python.webp", title: "Python", link: "https://www.python.org/" },
        { id: 1, icon_path: "/assets/skills_icons/c_plus_plus.png", title: "C++", link: "https://devdocs.io/cpp/" },
        { id: 2, icon_path: "/assets/skills_icons/c.png", title: "C", link: "https://devdocs.io/c/" },
        { id: 3, icon_path: "/assets/skills_icons/git.png", title: "Github", link: "https://github.com/" },
        { id: 4, icon_path: "/assets/skills_icons/vitejs.svg", title: "Vite", link: "https://vite.dev/" },
        { id: 5, icon_path: "/assets/skills_icons/react.webp", title: "React", link: "https://react.dev/" },
        { id: 6, icon_path: "/assets/skills_icons/tailwind.webp", title: "Tailwind CSS", link: "https://tailwindcss.com/" },
        { id: 7, icon_path: "/assets/skills_icons/framer.png", title: "Framer-motion", link: "https://motion.dev/" },
        { id: 8, icon_path: "/assets/skills_icons/ts.png", title: "Typescript", link: "https://www.typescriptlang.org/" },

        // Inner Circle
        { id: 9, icon_path: "/assets/skills_icons/java.png", title: "Java", link: "https://www.java.com/en/" },
        { id: 10, icon_path: "/assets/skills_icons/linux.png", title: "Linux", link: "https://www.linux.org/" },
        { id: 11, icon_path: "/assets/skills_icons/postgresql.png", title: "PostgreSQL", link: "https://www.postgresql.org/" },
        { id: 12, icon_path: "/assets/skills_icons/flutter.png", title: "Flutter", link: "https://flutter.dev/" },
        { id: 13, icon_path: "/assets/skills_icons/dart.png", title: "Dart", link: "https://dart.dev/" },
    ];

    return (
        <section id={id_nav} className="h-full pt-4">
            <div className="flex justify-center items-center w-full h-full" style={{ perspective: "1000px" }}>
                <motion.div
                    className="flex flex-col w-[85rem] h-[48rem] border-2 rounded-3xl bg-gray-800 p-20"
                    style={{ boxShadow: "5px 5px 40px #36454F" }}
                    variants={boxVariants}
                    initial="initial"
                    animate={isAnimated ? "visible" : "initial"}
                    onAnimationComplete={() => setStartTextAnimation(true)}
                >
                    {/* Text */}
                    <WaveText
                        text="Malhar Singh"
                        shouldAnimate={startTextAnimation}
                        onAnimationComplete={() => setStartRingAnimation(true)}
                    />

                    <motion.span
                        className="text-white text-2xl font-semibold mt-8 translate-y-32"
                        variants={textVariants}
                        initial="initial"
                        animate={startTextAnimation ? "visible" : {}}
                    >
                        <p className="select-none font-customC text-2xl">Introduction</p>
                        <p className="text-base text-gray-300 mt-2 w-[50%] translate-y-2 tracking-wider select-none">
                            I'm a 4th-year Computer Science student at Ontario Tech University with a strong passion for Software Development, Data Analysis, and Robotics.
                            My portfolio highlights my skills and features a collection of projects I've worked on throughout my academic and professional journey.
                            For a deeper dive into my work or to get in touch, feel free to explore my socials or reach out directly through the{" "}
                            <Link
                                to={"contact"}
                                smooth={true}
                                duration={1000}
                                className="cursor-pointer underline text-blue-400"
                            >
                                Contact Form
                            </Link>
                            {" "}below.
                        </p>
                    </motion.span>

                    {/* Skills (entire wheel including middle icon) */}
                    <div className="flex relative left-1/2 top-[10%] w-[400px] aspect-square border border-neutral-500 rounded-full translate-x-1/3 -translate-y-[55%]">

                        {/* Inner Circle (Center Icon) */}
                        <div className="flex w-64 aspect-square m-auto border border-neutral-500 rounded-full">
                            <div className="w-[6rem] m-auto p-[0.2rem] aspect-square rounded-full">
                                <div className="flex flex-col items-center justify-center w-full h-full">
                                    <svg width="0" height="0">
                                        <defs>
                                            <linearGradient
                                                id="gradient"
                                                x1="100%"
                                                y1="100%"
                                                x2="30%"
                                                y2="10%"
                                            >
                                                <stop stopColor="#7a6ded" offset="40%" />
                                                <stop stopColor="#03ffff" offset="100%" />
                                            </linearGradient>
                                        </defs>
                                    </svg>

                                    <GiSkills
                                        style={{
                                            stroke: "url(#gradient)",
                                            strokeWidth: 15,
                                            fill: "none",
                                        }}
                                        className="text-[40px]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Rotating Skills Wheel */}
                        <motion.ul
                            className="absolute w-full h-full flex items-center justify-center"
                            animate={startRingAnimation ? { rotate: 360 } : {}}
                            transition={
                                startRingAnimation
                                    ? {
                                        ease: "linear",
                                        duration: 60,
                                        repeat: Infinity,
                                    }
                                    : {}
                            }
                        >
                            {icons.map((ic, index) => {
                                const isInnerCircle = index >= 9;

                                // Angle dictates icon placement
                                const angle = isInnerCircle
                                    ? index * (360 / (icons.length - 9))
                                    : index * (360 / Math.min(icons.length, 9));

                                const radius = isInnerCircle ? '8rem' : '12.5rem';

                                return (
                                    <div
                                        key={ic.id}
                                        className="absolute group w-12 h-12 select-none"
                                        style={{
                                            transform: `rotate(${angle}deg) translateY(-${radius}) rotate(-${angle}deg)`,
                                            filter:
                                                ic.id % 2 != 0
                                                    ? "drop-shadow(1px 1px 0px #B026FF)"
                                                    : "drop-shadow(1px 1px 0px #00FFFF)",
                                        }}
                                    >
                                        <a href={ic.link} target="_blank" className="group">
                                            <li className="absolute group w-12 h-12 origin-center select-none">
                                                <motion.div
                                                    className="bg-neutral-700 border-2 border-zinc-500 rounded-xl p-1 w-full h-full select-none cursor-pointer"
                                                    animate={
                                                        startRingAnimation
                                                            ? { rotate: -360 }
                                                            : undefined
                                                    }
                                                    transition={
                                                        startRingAnimation
                                                            ? {
                                                                ease: "linear",
                                                                duration: 60,
                                                                repeat: Infinity,
                                                            }
                                                            : {}
                                                    }
                                                >
                                                    <motion.img
                                                        src={ic.icon_path}
                                                        className={`m-auto select-none ${ic.title === "Linux" ? "h-10 -translate-y-[2px]" : ""} ${ic.title === "Github" ? "translate-y-[1px]" : ""}`}
                                                    />

                                                    {/* Tooltip */}
                                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex items-center justify-center select-none">
                                                        <div className="bg-slate-900 font-bold font-customC text-white text-sm rounded px-3 py-1 whitespace-nowrap select-none">
                                                            {ic.title}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </li>
                                        </a>
                                    </div>
                                );
                            })}
                        </motion.ul>
                    </div>


                    {/* Text Continued */}
                    <motion.span className="text-base text-gray-300 w-[50%] -translate-y-48 tracking-wider font-bold"
                        variants={textVariants}
                        initial="initial"
                        animate={startTextAnimation ? "visible" : {}}
                    >
                        <sup className="block text-red-400 text-2xl font-extrabold translate-y-9">*</sup>
                        <p className="ml-3 text-lg font-customC">Hover over individual rotating skills and Projects for more informtaion</p>
                    </motion.span>
                </motion.div>
            </div>
        </section >
    );
}

export default Hero;
