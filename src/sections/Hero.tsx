"use client";
import { FC, useEffect, useRef, useState } from "react";
import heroImage from "@/assets/images/hero-Image.jpg";
import Image from 'next/image';
import Button from '@/components/Button';

import { motion, useAnimate, useScroll, useTransform } from "motion/react";

import useTextRevealAnimation from "@/hooks/useTextRevealAnimation";




const Hero: FC = () => {
  const scrollingDiv = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({
    target: scrollingDiv,
    offset: ["start end", "end end"]
  });
  const portraitWidth = useTransform(scrollYProgress, [0,1], ['100%', '240%']) ;
  const {scope, entranceAnimation} =useTextRevealAnimation();
  useEffect(()=>{
entranceAnimation();
  },[entranceAnimation]);
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
   

  return <section>
    <div className="grid md:grid-cols-12 md:h-screen items-stretch sticky top-0">
      <div className="md:col-span-7 flex flex-col justify-center">
        <div className="container !max-w-full">
      <motion.h1
      initial={{opacity: 0 }}
      animate={{opacity: 1, }}
      className="text-4xl mt-40 md:text-6xl lg:text-6xl md:mt-0 " 
      ref={scope}>
        iFlag Bars is a specialized calisthenics gym that focuses on building strength, agility, and endurance through
      bodyweight exercises.
      </motion.h1>
      <div className="flex flex-col md:flex-row md:items-center mt-8 items-start gap-6">
        <motion.div
        initial={{opacity: 0, y:'100%'}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.5,delay:1.75,}}
        
        >
           <a href="#pricing" onClick={handleClickMobileNavItem}>
     <Button variant="secondary"  iconAfter={
     <div className="overflow-hidden size-5"  onClick={() =>setIsOpen(!isOpen)}>
      <div className="h-5 w-10 flex group-hover/button:-translate-x-1/2 transition-transform duration-500">
      <svg xmlns="http://www.w3.org/2000/svg"
       fill="none"
        viewBox="0 0 24 24"
         strokeWidth="1.5"
          stroke="currentColor"
           className="size-5">
            
  <path
   strokeLinecap="round" 
  strokeLinejoin="round" 
  d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"/>
</svg>
       {/* sec svg  */}
<svg xmlns="http://www.w3.org/2000/svg"
       fill="none"
        viewBox="0 0 24 24"
         strokeWidth="1.5"
          stroke="currentColor"
           className="size-5">
            
  <path
   strokeLinecap="round" 
  strokeLinejoin="round" 
  d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"/>
</svg>
</div>
</div>
}

>
      <span className="text-black">View Our Programs</span>
</Button>
</a>
</motion.div>
<motion.div
  initial={{opacity: 0, y:'100%'}}
  animate={{opacity:1, y:0}}
  transition={{duration:0.5,delay:2.2,}}

>
     <a href="#contact" onClick={handleClickMobileNavItem}> <Button variant="text">
        START NOW.</Button></a>
        </motion.div>
</div>
      </div>
      </div>
      <div className="md:col-span-5 relative">
     <motion.div className="mt-20 md:mt-0 md:size-full md:absolute md:right-0 max-md:!w-full" style={{
      width:portraitWidth,
     }}>
     <Image src= {heroImage} alt="Hero-Image" className=" size-full object-cover" />
     </motion.div>
     </div>
     </div>
     <div className="md:h-[200vh]" ref={scrollingDiv}>
     </div>
  </section>;
};


export default Hero;
