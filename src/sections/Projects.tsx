"use client";
import { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import image1 from "@/assets/images/project-1.jpg";
import image3 from "@/assets/images/project-3.jpg";
import image4 from "@/assets/images/project-4.jpg";
import image5 from "@/assets/images/project-5.jpg";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    name: "Training",
    image: image1,
    path: "/"
  },
  {
    name: "Events",
    image: image3,
    path: "/"
  },
  {
    name: " Activities",
    image: image4,
    path: "/"
  },
  {
    name: "Success",
    image: image5,
    path: "/"
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const Projects: FC = () => {
  const controls = useAnimation();
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.4,
    triggerOnce: false // Set to false for infinite loop
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <section ref={sectionRef} className="section" id="projects">
      <div className="container">
        <motion.h2 
          initial="hidden"
          animate={controls}
          variants={textVariants}
          className="text-4xl md:text-7xl lg:text-8xl"
        >
          What we do
        </motion.h2>
        <motion.div 
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="mt-10 md:mt-16 lg:mt-20"
        >
          {projects.map(({ name, image, path }) => (
            <motion.div key={name} variants={textVariants}>
              <Link 
                href={path}
                className="border-t last:border-b border-stone-400 border-dotted md:py-8 lg:py-10 py-6 flex flex-col relative group/project"
              >
                <div className="absolute bottom-0 left-0 w-full h-0 group-hover/project:h-full transition-all duration-700 bg-stone-300"></div>

                <div className="relative">
                  <div className="aspect-video md:hidden sm:hidden"> 
                    <Image src={image} alt={`${name} image`} className="size-full object-cover"/>
                  </div>
                  <div className="mt-8 md:mt-0 flex justify-between items-center md:grid md:[grid-template-columns:1fr_300px_max-content] md:gap-8">
                    <div className="lg:*:group-hover/project:pl-8 transition-all duration-700">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl">{name}</h3>
                    </div>
                    <div className="relative">
                      <div className="absolute aspect-video w-full top-1/2 -translate-y-1/2 opacity-0 scale-90 group-hover/project:opacity-100 group-hover/project:scale-100 lg:group-hover/project:scale-110 transition-all duration-500 z-10">
                        <Image src={image} alt={`${name} image`} className="size-full object-cover"/>
                      </div>
                    </div>
                    <div className="lg:group-hover/project:pr-8 transition-all duration-700">
                      <div className="size-6 overflow-hidden">
                        <div className="h-6 w-12 flex group-hover/project: -translate-x-1/2 transition-transform duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
