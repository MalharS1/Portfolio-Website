import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom"; // React Router Link for page navigation
import { Link as ScrollLink } from "react-scroll"; // react-scroll Link for smooth scrolling
import Hero from "./Hero";

interface NavigationProperties {
    id: number;
    title: string;
    link: string;
    side: "left" | "center" | "right";
}

function Header() {
    const navigation: NavigationProperties[] = [
        { id: 0, title: "Home", link: "home", side: "left" },
        { id: 1, title: "Projects", link: "projects", side: "right" },
        { id: 2, title: "Contact", link: "contact", side: "left" },
        { id: 3, title: "|", link: "#", side: "center" },
        { id: 4, title: "Side Projects", link: "/side-projects", side: "right" },
    ];

    // to get scroll progress and update for checking (to update nav bar background)
    const { scrollYProgress } = useScroll();
    const [scrollYProg, setScrollYProg] = useState(0);

    const [firstLoad, setFirstLoad] = useState(true);
    const [count, setCount] = useState(0);
    const [isAnimated, setIsAnimated] = useState(false);

    // use effect: {function to perform}, [value to track] 
    useEffect(() => {
        // update scroll y-value when it changes
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            setScrollYProg(latest);

            // only set first load if its the first time yProgress is 0
            if (count === 0) {
                setFirstLoad(latest === 0);
                setCount(1);
            }
        });

        // cleans for memory leaks
        return () => unsubscribe();
    }, [scrollYProgress, count]);

    // colour and blur if user is scrolling (separate because of animate)
    const scrollColour = scrollYProg >= 0.06 ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)";
    const backdropBlur = scrollYProg >= 0.05 ? "backdrop-blur-sm" : "backdrop-blur-none";
    const hr_bg = scrollYProg >= 0.012 ? "rgba(0, 0, 0, 0)" : "rgba(255, 255, 255, 1)";

    const navItemVariants = {
        left: {
            initial: { x: "-100vw", opacity: 0, backgroundColor: "rgba(0, 0, 0, 0)", textShadow: "0px 0px 0px rgba(0, 0, 0, 0)", filter: "drop-shadow(0px 0px 0px rgba(0, 0, 0, 0))" },
            animate: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 180, damping: 25, delay: 1.3 } },
        },
        right: {
            initial: { x: "100vw", opacity: 0, backgroundColor: "rgba(0, 0, 0, 0)", textShadow: "0px 0px 0px rgba(0, 0, 0, 0)", filter: "drop-shadow(0px 0px 0px rgba(0, 0, 0, 0))" },
            animate: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 180, damping: 25, delay: 1.3 } },
        },
        center: {
            initial: { y: "-100vh", opacity: 0 },
            animate: { y: 0, opacity: 0.4, transition: { duration: 1.12, delay: 1.3 } },
        },
    };

    return (
        <>
            {/* Header (names) */}
            <motion.header
                className={`flex justify-center sticky font-customC space-x-[7vw] font-bold text-[27px] m-2 ml-0 mb-2 p-1 pb-2 top-0 z-20 w-[100vw] ${backdropBlur} select-none overflow-hidden`}
                initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                animate={{ backgroundColor: scrollColour }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >

                {/* remove if normal is preferred */}


                {/* <motion.div className={`bg-black ${backdropBlur} h-[40px] w-[80vw] absolute rounded-full`}
                    initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                    animate={{ backgroundColor: scrollColour }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                ></motion.div> */}


                {navigation.map((nav_item) =>

                    // to have no link for separator
                    nav_item.title === "|" ? (
                        <motion.nav key={nav_item.id} variants={navItemVariants[nav_item.side]} initial="initial" animate="animate">
                            <span className="text-white">{nav_item.title}</span>
                        </motion.nav>
                    ) : (
                        <motion.nav
                            key={nav_item.id}
                            variants={navItemVariants[nav_item.side]}
                            initial="initial"
                            animate="animate"
                            whileHover={{
                                textShadow: "0px 0px 20px #03ffff, 0px 0px 2px #03ffff, 0px 0px 60px #03ffff",
                                scale: 1.15,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                                mass: 2,
                                duration: 0.5,
                            }}
                        >
                            {nav_item.title === "Side Projects" ? (
                                <>
                                    <RouterLink to={nav_item.link} className="cursor-pointer" >
                                        {nav_item.title}
                                    </RouterLink>

                                    {/* remove later  */}
                                    <span className="absolute -translate-x-[155px] translate-y-[20px] w-[100%] rotate-[10deg] border-2 bg-white"></span>
                                    <span className="absolute -translate-x-[155px] translate-y-[20px] w-[100%] -rotate-[10deg] border-2 bg-white"></span>
                                </>

                            ) : (
                                <ScrollLink
                                    to={nav_item.link}
                                    smooth={true}
                                    duration={500}
                                    className="cursor-pointer"
                                >
                                    {nav_item.title}
                                </ScrollLink>
                            )}
                        </motion.nav>
                    )
                )}
            </motion.header>

            {/* Header (horizontal rule) */}
            {/* hr: as width increases, animate in the gradient */}
            <motion.div
                className="w-[65rem] mx-auto h-[0.10rem] rounded relative"
                initial={{
                    background: "linear-gradient(to right, #03ffff 0%, #03ffff 0%, rgba(255, 255, 255, 0) 0%)",
                    width: "0%",
                }}
                animate={{
                    width: "65%",
                    background: firstLoad ? [
                        "linear-gradient(to right, #03ffff 0%, #03ffff 0%, rgba(255, 255, 255, 0) 0%)",
                        "linear-gradient(to right, #03ffff 0%, #FF69B4 100%)",
                        "rgba(255, 255, 255, 1)",
                    ] : hr_bg,
                }}
                transition={{
                    duration: firstLoad ? 1 : 0.2,
                    delay: firstLoad ? 0.35 : undefined,
                    ease: "easeInOut",
                    times: [0, 0.87, 1],
                }}
                onAnimationComplete={() => setIsAnimated(true)}
            />

            {/* Hero Section */}
            <Hero id_nav={"home"} isAnimated={isAnimated} />
        </>
    );
}

export default Header;
