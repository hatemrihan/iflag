"use client";
import React from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from "framer-motion";
import hooImage from "@/assets/images/hoo-image.jpg";

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

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const All = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.section 
      ref={ref}
      className="flex justify-center items-center min-h-screen p-4"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="p-6 max-w-md w-full text-center">
        <motion.h1 
          className="text-4xl md:text-7xl lg:text-8xl text-center text-black"
          variants={textVariants}
        >
          Instagram Success
        </motion.h1>
        
        <motion.div 
          className="my-6"
          variants={imageVariants}
        >
          <Image 
            src={hooImage}
            alt="hoo-image"
            width={1920}
            height={1080}
            className="size-full object-cover"
          />
        </motion.div>

        <motion.p 
          className="text-black text-sm md:text-base"
          variants={textVariants}
        >
          From day one, we built this page with passion, creativity, and a deep commitment to our community. What started as a small idea has now grown into a thriving space of 25K incredible followers. This isn&apos;t just about numbers—it&apos;s about the connections, the stories, and the journey we&apos;ve shared. Thank you for being part of this success. Here&apos;s to growing, learning, and creating together.
        </motion.p>

        <motion.div variants={textVariants}>
          <a href="https://www.instagram.com/iflagbars?igsh=MXMyMjJwdmxwNWRydA==" target="_blank" rel="noopener noreferrer">
            <button className="mt-4 px-6 py-2 bg-black text-white rounded-full text-sm md:text-base hover:bg-gray-800 transition-colors">
              Explore our page
            </button>
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default All;