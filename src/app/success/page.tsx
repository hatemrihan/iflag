"use client";
import { FC, useRef, useState } from "react";
import image1 from "@/assets/images/event-6.jpg";
import image2 from "@/assets/images/event-5.jpg";
import image3 from "@/assets/images/event-4.jpg";
import image4 from "@/assets/images/event-3.jpg";
import image5 from "@/assets/images/event-2.jpg";
import image6 from "@/assets/images/project-3.jpg";
import { section } from "motion/react-client";
import Image from "next/image";
import { useScroll, motion, useTransform, AnimatePresence } from "motion/react";
import Testimonial from "@/components/Testimonial";
import finalImage from "@/assets/images/final-image.jpg";
import holaImage from "@/assets/images/hola-image.jpg";
import padelImage from "@/assets/images/padel-image.jpg";
import iceImage from "@/assets/images/ice-image.jpg";
import footballImage from "@/assets/images/football-image.jpg";
import firImage from "@/assets/images/fir-image.jpg";
import secccImage from "@/assets/images/seccc-image.jpg";
import project1Image from "@/assets/images/project-4.jpg";
import Header from "@/sections/Header";
import Hero from "@/sections/Hero";
import Intro from "@/sections/Intro";




/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const testimonials = [
  {
    name: "Sports Exo vol.1",
    company: "Event",
    role: "",
    quote:
      "",
    image: image1,
    imagePositionY: 0.2,
  },
  {
    name: "Sports Exo vol.2",
    company: "Event",
    role: "",
    quote: '',
      
    image: image2,
    imagePositionY: 0.1,
  },

  {
    name: "Finals National Championship 2022",
    company: "Event",
    role: "",
    quote:
      "",
    image: image3,
    imagePositionY: 0.55,
  },

  {
    name: "World shapionship Qualifiries",
    company: "Event",
    role: "",
    quote:
      "",
    image: image4,
    imagePositionY: 0.55,
  },

  {
    name: "iflag competition",
    company: "Event",
    role: "",
    quote:
      "",
    image: image5,
    imagePositionY: 0.55,
  },

  {
    name: "GUC Fitness Competitiony",
    company: "Event",
    role: "",
    quote:
      "",
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
   
   

    
  return ( 
    <>
          <Header />
          <Hero />  
      <section className="section" id="testimonials">
              <h2 className="text-4xl md:text-7xl lg:text-8xl flex flex-col overflow-hidden" ref={titleRef}>
                  <motion.span className="whitespace-nowrap" style={{
                      x: transformTop,
                  }}>
                      Meet Us </motion.span>
                  <motion.span className="whitespace-nowrap self-end text-red-orange-500" style={{
                      x: transformBottom,
                  }}>Know Our Events</motion.span>
              </h2>
              <div className="container">
                  <div className="mt-20">
                      <AnimatePresence mode="wait" initial={false}>
                          {testimonials.map(({ name, company, role, quote, image, imagePositionY }, index) => index === testimonialsIndex && (
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

              <div className="flex justify-center items-center min-h-screen  p-6 text-black">
                  <div className=" p-6 max-w-3xl w-full">
                      <h1 className="text-3xl md:text-5xl font-bold mb-4 uppercase text-center">Progress Tracker</h1>

                      <div className="flex flex-col md:flex-row items-center gap-4">
                          <Image
                              src={holaImage}
                              alt="final"
                              width={400}
                              height={400}
                              className=" w-full mb-10" />


                          <div className="text-left">
                              <h2 className="text-3xl font-bold text-black text-center mb-8">What is iFlag Clash?</h2>
                              <p className="text-sm md:text-base text-black">iFlag Clash is Monthly Members Competition</p>
                              <ul className="mt-2 text-black text-sm md:text-base">
                                  <li>Monthly competition for our iFlag members to track their progress through 5 main workouts.</li>
                                  <li>- We record maximum reps in 1 minute for each workout.</li>
                              </ul>
                          </div>
                      </div>

                      <div className="flex justify-between items-center mt-6">
                          <div className="text-center">
                              <p className="text-lg font-bold mb-2">Starting</p>
                              <span className="bg-black text-white px-4 py-2 rounded-md text-xl font-semibold">215</span>
                          </div>
                          <span className="text-2xl">➡</span>
                          <div className="text-center">
                              <p className="text-lg font-bold mb-2">Goal</p>
                              <span className="bg-black text-white px-4 py-2 rounded-md text-xl font-semibold">270</span>
                          </div>
                      </div>

                      <div className="mt-6 bg-black p-4 rounded-lg">
                          <table className="w-full text-left text-white">
                              <thead>
                                  <tr>
                                      <th className="pb-2 text-white">Workout</th>
                                      <th className="pb-2 text-white">Reps/Minute</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr><td>Max Pullups - Body Rows</td><td>25</td></tr>
                                  <tr><td>Max Pushups - Knee Pushups</td><td>60</td></tr>
                                  <tr><td>Max Sit-ups</td><td>45</td></tr>
                                  <tr><td>Max Dips - Seated Dips</td><td>35</td></tr>
                                  <tr><td>Max Squats</td><td>50</td></tr>
                              </tbody>
                          </table>
                          <div className="text-right font-bold text-lg mt-4">
                              <span>Total Score:</span>
                              <span className="bg-black text-white px-4 py-2 ml-2 rounded-md">215</span>
                          </div>
                      </div>
                  </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold  text-center">what is Other Activities?</h1>
              <div className="flex justify-center items-center min-h-screen  p-6 text-black">
                  <div className=" p-6 max-w-5xl w-full">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          <div className=" rounded-lg overflow-hidden">
                              <Image
                                  src={footballImage}
                                  alt="Tough Mudder vol.1"
                                  width={300} height={160}
                                  className="w-full h-40 object-cover" />
                              <div className="p-2  text-center font-semibold">Weekly Football Matches</div>
                          </div>
                          <div className=" rounded-lg overflow-hidden">
                              <Image
                                  src={iceImage}
                                  alt="Tough Mudder vol.2"
                                  width={300}
                                  height={160}
                                  className="w-full h-40 object-cover" />
                              <div className="p-2  text-center font-semibold">Ice Warrior Challenge</div>
                          </div>
                          <div className=" rounded-lg overflow-hidden">
                              <Image
                                  src={firImage}
                                  alt="Ice Warrior Challenge"
                                  width={300}
                                  height={160}
                                  className="w-full h-40 object-cover" />
                              <div className="p-2  text-center font-semibold">Tough Mudder vol.1</div>
                          </div>
                          <div className=" rounded-lg overflow-hidden">
                              <Image
                                  src={secccImage}
                                  alt="Weekly Football Matches"
                                  width={300}
                                  height={160}
                                  className="w-full h-40 object-cover" />
                              <div className="p-2  text-center font-semibold">Tough Mudder vol.2</div>
                          </div>
                          <div className=" rounded-lg overflow-hidden">
                              <Image
                                  src={padelImage}
                                  alt="Weekly Padel Matches"
                                  width={300}
                                  height={160}
                                  className="w-full h-40 object-cover" />
                              <div className="p-2  text-center font-semibold">Weekly Padel Matches</div>
                          </div>
                          <div className=" rounded-lg overflow-hidden">
                              <Image
                                  src={project1Image}
                                  alt="Morning Runs"
                                  width={300}
                                  height={160}
                                  className="w-full h-40 object-cover" />
                              <div className="p-2  text-center font-semibold">Morning Runs</div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          </> );
  
  
};

export default Testimonials;
