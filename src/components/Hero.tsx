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
        { id: 0, icon_path: "src/assets/skills_icons/python.webp", title: "Python" },
        { id: 1, icon_path: "src/assets/skills_icons/c_plus_plus.png", title: "C++" },
        { id: 2, icon_path: "src/assets/skills_icons/c.png", title: "C" },
        { id: 3, icon_path: "src/assets/skills_icons/java.png", title: "Java" },
        { id: 4, icon_path: "src/assets/skills_icons/react.webp", title: "React" },
        { id: 5, icon_path: "src/assets/skills_icons/tailwind.webp", title: "Tailwind CSS" },
        { id: 6, icon_path: "src/assets/skills_icons/framer.png", title: "Framer-motion" },
        { id: 7, icon_path: "src/assets/skills_icons/ts.png", title: "Typescript" },
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
                        <p className="text-base text-gray-300 mt-2 w-[50%] translate-y-2 tracking-wider">
                            I'm a 4<sup>th</sup> year Computer Science student at Ontario Tech University.
                            I am passionate about Software Development, Data Analysis, and Robotics. My
                            portfolio showcases my skill set along with the projects I've worked on over the years.
                            For a more detailed overview or additional information, please visit my socials or send me an email via the{" "}
                            <Link
                                to={"contact"}
                                smooth={true}
                                duration={1000}
                                className="cursor-pointer underline text-blue-400"
                            >
                                Contact Form
                            </Link>{" "}
                            below.
                        </p>
                    </motion.span>

                    {/* Skills (entire wheel including middle icon) */}
                    <div className="flex relative left-1/2 top-[10%] w-[22rem] aspect-square border border-neutral-500 rounded-full translate-x-1/2 -translate-y-[47%]">
                        <div className="flex w-60 aspect-square m-auto border border-neutral-500 rounded-full">
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

                        {/* Rotating skills wheel */}
                        <motion.ul
                            className="absolute w-full h-full flex items-center justify-center"
                            animate={startRingAnimation ? { rotate: 360 } : {}}
                            transition={startRingAnimation ? {
                                ease: "linear",
                                duration: 55,
                                repeat: Infinity,
                            } : {}}
                        // onAnimationComplete={() => setstartParagraphAnimation(true)}
                        >
                            {icons.map((ic, index) => (
                                <li
                                    key={ic.id}
                                    className="absolute group w-12 h-12 origin-center select-none"
                                    style={{
                                        transform: `rotate(${index * 45}deg) translateY(-11rem) rotate(-${index * 45}deg)`,
                                        filter:
                                            ic.id % 2 === 0
                                                ? "drop-shadow(1px 1px 0px #B026FF)"
                                                : "drop-shadow(1px 1px 0px #00FFFF)"
                                    }}
                                >
                                    <motion.div
                                        className="bg-neutral-700 border-2 border-zinc-500 rounded-xl p-1 w-full h-full select-none"
                                        animate={startRingAnimation ? { rotate: -360 } : undefined}
                                        transition={startRingAnimation ? {
                                            ease: "linear",
                                            duration: 55,
                                            repeat: Infinity,
                                        } : {}}
                                    >
                                        <motion.img src={ic.icon_path} className="m-auto select-none" />
                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex items-center justify-center select-none">
                                            <div className="bg-slate-900 font-bold font-customC text-white text-sm rounded px-3 py-1 whitespace-nowrap select-none">
                                                {ic.title}
                                            </div>
                                        </div>
                                    </motion.div>
                                </li>
                            ))}
                        </motion.ul>
                    </div>

                    {/* Text Continued */}
                    <motion.span className="text-base text-gray-300 w-[50%] -translate-y-40 tracking-wider font-bold"
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
