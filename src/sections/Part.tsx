"use client";
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import firImage from '@/assets/images/fir-image.jpg';
import event2Image from '@/assets/images/event-2.jpg';
import event3Image from '@/assets/images/event-3.jpg';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from "framer-motion";
import heroImage from '../assets/images/hero-image.jpg'

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

const AnotherPortofolioPage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const handleClickMobileNavItem= (e:React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(false);
    const url = new URL(e.currentTarget.href);
    const hash = url.hash;
    const target = document.querySelector(hash);
    if (!target) return;
    target.scrollIntoView({behavior:'smooth'});
  }
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-200 flex flex-col" id="AnotherPortofolioPage">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid grid-cols-12 gap-4" ref={ref}>
          {/* Title Section */}
          <motion.div 
            className="col-span-12 md:col-span-6 flex items-center"
            variants={textVariants}
            initial="hidden"
            animate={controls}
          >
            <h1 className="text-7xl lg:text-8xl text-black leading-none">
              Our Events
            </h1>
          </motion.div>

          {/* Image Grid */}
          <motion.div 
            className="col-span-12 md:col-span-6 grid grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {/* Image 1 */}
            <motion.div className="col-span-1 space-y-4" variants={imageVariants}>
              <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                <Image 
                  src={firImage} 
                  alt="Portrait" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-sm text-black">
                Sports Expo vol.1
              </div>
            </motion.div>

            {/* Image 2 */}
            <motion.div className="col-span-1 space-y-4" variants={imageVariants}>
              <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                <Image 
                  src={event2Image} 
                  alt="Editorial" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-sm text-black">
                Sports Vol Expo.2
              </div>
            </motion.div>

            {/* Image 3 */}
            <motion.div className="col-span-1 space-y-4" variants={imageVariants}>
              <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                <Image 
                  src={event3Image} 
                  alt="Editorial" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-sm text-black">
                Finals National Championship 2022
              </div>
            </motion.div>

            {/* Image 4 */}
            <motion.div className="col-span-1 space-y-4" variants={imageVariants}>
              <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                <Image 
                  src={heroImage} 
                  alt="Editorial" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-sm text-black">
                Iflag - competition
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <div className="w-full border-t border-gray-700 my-10"></div>
    </div>
  );
};

export default AnotherPortofolioPage;
 