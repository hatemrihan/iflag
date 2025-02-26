"use client";
import { inView } from "motion";
import {useInView } from "motion/react";
import { span } from "motion/react-client";
import { FC, useEffect, useRef } from "react";
import useTextRevealAnimation from "@/hooks/useTextRevealAnimation";

const Intro: FC = () => {
// const [scope, animate] = useAnimate();
const sectionRef= useRef<HTMLElement>(null);
const {scope, entranceAnimation} = useTextRevealAnimation();
  const inView = useInView(scope, {
    once: true,
  });
  useEffect (()=> {
if (inView) {
  entranceAnimation();
}
  },[inView]);
  return <section className="section mt-12 md:mt-16 lg:mt-20" id="intro" ref={sectionRef}>
<div className="container">
<h2 className="text-4xl md:text-7xl lg:text-8xl lg:w-[80%]" ref={scope}>What is Calisthenics
Body Weight Workouts?</h2>
<p className="text-1xl text-gray-700 l lg:mt-11">A dynamic form of strength training using your body
weight as resistance. It focuses on building strength,
flexibility, and coordination through functional
movements like: 
 Pull-ups, Push-ups,
 Dips, and
 Squats.
progressing to advanced skills like
Muscle-ups, Front Levers, and Human Flag.</p>
</div>


  </section>;
};

export default Intro;
