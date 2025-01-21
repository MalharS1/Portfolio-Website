import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';     // used to automatically send email via contact form
import { motion, useInView } from 'framer-motion';
import { FaFileDownload, FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from 'react-icons/md';

interface ContactProps {
    id_nav: string;
}

function ShinyButton() {
    return (
        <motion.button
            type="submit"
            initial={{ "--x": "100%", scale: 1 }}
            animate={{ "--x": "-100%" }}
            whileHover={{ scale: 1.10 }}
            transition={{
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 1,
                type: "spring",
                stiffness: 20,
                damping: 15,
                mass: 10,
                scale: {
                    type: "spring",
                    stiffness: 100,
                    damping: 5,
                    mass: 0.1,
                },
            }}
            className="px-6 py-2 rounded-md relative radial-gradient"
        >
            <span className="font-customC text-neutral-100 tracking-wide font-bold h-full w-full block relative linear-mask">
                Submit
            </span>
            <span className="block absolute inset-0 rounded-md p-px linear-overlay" />
        </motion.button>
    );
};


function Contact({ id_nav }: ContactProps) {

    // EmailJS
    const form = useRef<HTMLFormElement | null>(null);

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (form.current) {
            emailjs
                .sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, form.current, {
                    publicKey: import.meta.env.VITE_PUBLIC_ID,
                })
                .then(
                    () => {
                        console.log('SUCCESS!');
                        if (form.current) {
                            form.current.reset(); // Reset the form fields
                        }
                    },
                    (error) => {
                        console.log('FAILED...', error.text);
                    }
                );
        }
    };

    const ref = useRef<null | HTMLDivElement>(null); // need Div (specify type) here or get error
    const isInView = useInView(ref, { once: true });

    const [charCount, setCharCount] = useState(0);
    const maxChar = 200;

    return (
        <section id={id_nav} className="mt-[68px] pt-10 bg-gradient-to-t from-slate-950 from-20% h-[40rem] flex items-center justify-center z-[15]">
            <motion.div ref={ref} className="flex w-full max-w-6xl mb-20 flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ duration: 2, ease: "linear" }}
            >
                <div className="flex items-center justify-center space-x-4 mb-8">
                    <hr className="w-[20rem] h-[0.15rem] rounded bg-gray-200 border-0 dark:bg-gray-700" />
                    <div className="font-customA tracking-wide text-3xl font-extrabold text-center select-none">Contact Me</div>
                    <hr className="w-[20rem] h-[0.15rem] rounded bg-gray-200 border-0 dark:bg-gray-700" />
                </div>

                <div className="flex w-full">
                    {/* Left Column */}
                    <div className="flex flex-col justify-center pr-10 mr-5 w-1/4 mt-11 space-y-20 ml-5 -translate-y-6">
                        <div className="flex justify-between w-full icnGrp">
                            <p className="Iline text-left">Github:</p>
                            <a className="icn text-3xl text-right" href="https://github.com/MalharS1?tab=repositories" target="_blank" rel="noopener noreferrer">
                                <FaGithub />
                            </a>
                        </div>
                        <div className="flex justify-between w-full icnGrp">
                            <p className="Iline text-left">LinkedIn:</p>
                            <a className="icn text-3xl text-right" href="https://www.linkedin.com/in/malhar--singh" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>

                    {/* Form Container */}
                    <div className="flex flex-col w-2/4 z-10 mr-1">
                        <form ref={form} className="flex flex-col" onSubmit={sendEmail}>
                            <div className="mb-4">
                                <label className="frm-txt" htmlFor="fullName">Full Name<sup className="text-red-600">*</sup></label>
                                <input className="frm focus:outline-none" type="text" placeholder="John Doe" required />
                            </div>
                            <div className="mb-4">
                                <label className="frm-txt" htmlFor="email">Email<sup className="text-red-600">*</sup></label>
                                <input className="frm focus:outline-none" name="from_name" type="email" placeholder="example@gmail.com" required />
                            </div>
                            <div className="mb-2">
                                <label className="frm-txt" htmlFor="message">Message<sup className="text-red-600">*</sup></label>
                                <textarea className="frm min-h-[10rem] min-w-[35rem] max-h-[14rem] max-w-[35rem] focus:outline-none" maxLength={maxChar} name="message" placeholder="Type your message here..." required onChange={
                                    (e) => setCharCount(e.target.value.length)
                                } />
                                <div className="flex justify-center -translate-y-14 text-sm">{charCount} / {maxChar}</div>
                            </div>
                            <div className="flex justify-center relative">
                                <ShinyButton />
                            </div>
                        </form>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col justify-center pl-10 ml-5 w-1/4 mt-11 space-y-20 -translate-y-6">
                        <div className="flex justify-between w-full icnGrp">
                            <p className="Iline text-left">Email:</p>
                            <a className="icn text-3xl text-right" href="mailto:malharsingh28@gmail.com">
                                <MdEmail />
                            </a>
                        </div>
                        <div className="flex justify-between w-full icnGrp">
                            <p className="Iline text-left">Resume:</p>
                            <a className="icn text-3xl text-right" href="/assets/Resume.pdf" download>
                                <FaFileDownload />
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

export default Contact;