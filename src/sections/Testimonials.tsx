"use client";
import { FC, useRef, useState } from "react";
import image1 from "@/assets/images/testimonial-1.jpg";
import image2 from "@/assets/images/testimonial-2.jpg";
import image3 from "@/assets/images/testimonial-3.jpg";
import image4 from "@/assets/images/testimonial-4.jpg";
import image5 from "@/assets/images/testimonial-5.jpg";
import image6 from "@/assets/images/testimonial-6.jpg";
import { section } from "motion/react-client";
import Image from "next/image";
import { useScroll, motion, useTransform, AnimatePresence } from "motion/react";
import Testimonial from "@/components/Testimonial";

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const testimonials = [
  {
    name: "Omer El-Gendy",
    company: "IFLAG",
    role: "Head Coach",
    quote:
      "Omer is the Founder and Head Coach iFlag Bars, he won 1stPlace World Champion 2022, 1stPlace National Champion 2022,Strongest Man on Earth Title 2022.",
    image: image1,
    imagePositionY: 0.2,
  },
  {
    name: "Ali Mohamed",
    company: "",
    role: "",
    quote: 'Coach',
      
    image: image2,
    imagePositionY: 0.1,
  },

  {
    name: "Fagr Raafat",
    company: "",
    role: "",
    quote:
      "Coach",
    image: image3,
    imagePositionY: 0.55,
  },

  {
    name: "Abdelrahman",
    company: "",
    role: "",
    quote:
      "Coach",
    image: image4,
    imagePositionY: 0.55,
  },

  {
    name: "Nada",
    company: "",
    role: "",
    quote:
      "Coach",
    image: image5,
    imagePositionY: 0.55,
  },

  {
    name: "Toqa El-Kabany",
    company: "",
    role: "",
    quote:
      "Coach",
    image: image6,
    imagePositionY: 0.55,
  },



];

const Testimonials: FC = () => {
  const titleRef = useRef(null);
  const {scrollYProgress} = useScroll({
    target:titleRef,
    offset: ['start end', 'end start']
  });

 const transformTop = useTransform(scrollYProgress, [0,1], ['0%', '15%']);
 const transformBottom = useTransform(scrollYProgress, [0,1], ['0%', '-15%']);
  const [testimonialsIndex, setTestimonialIndex]= useState(0);
    const handleClickPrev= () => {
      setTestimonialIndex(curr => {
        if (curr===0) {
          return testimonials.length - 1;
        }
        return curr - 1;
      })
    };
    const handleClickNext= () =>{
      setTestimonialIndex((curr) => {
        if (curr === testimonials.length - 1) return 0;
return curr + 1;
      });
    };
  return <section className="section" id="testimonials">
   <h2 className="text-4xl md:text-7xl lg:text-8xl flex flex-col overflow-hidden" ref={titleRef}>
    <motion.span className="whitespace-nowrap" style={{
      x:transformTop ,
    }}>
      Meet Our Coaches</motion.span>
    <motion.span className="whitespace-nowrap self-end text-red-orange-500" style={{
      x: transformBottom,
    }}>Meet Our Coaches</motion.span>
   </h2>
   <div className="container">
<div className="mt-20">
  <AnimatePresence mode="wait" initial={false}>
  {testimonials.map(({name,company, role, quote, image, imagePositionY}, index)=> index === testimonialsIndex && (
   <Testimonial name={name} company={company} role={role} quote={quote} image={image} imagePositionY={imagePositionY} key={name} />
    )
   )}
   </AnimatePresence>
</div>
<div className="flex gap-4 mt-6 lg:mt-10">
  <button className="border border-stone-400 size-11 inline-flex items-center justify-center rounder-full hover:bg-red-orange-500 text-black hover:border-red-orange-50 transition-all duration-300" onClick={handleClickPrev}>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
</svg>
  </button>
  <button className="border border-stone-400 size-11 inline-flex items-center justify-center rounder-full hover:bg-red-orange-500 text-black hover:border-red-orange-50 transition-all duration-300" onClick={handleClickNext}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
</svg>
  </button>
</div>
   </div>
  </section>;
};

export default Testimonials;
