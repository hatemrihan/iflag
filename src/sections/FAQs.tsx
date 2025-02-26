"use client";
import { div } from "motion/react-client";
import { FC, useState } from "react";
import { AnimatePresence, motion  } from "motion/react";
import { twMerge } from "tailwind-merge";


/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const faqs = [
  {
    question: "Why iFlag, why you should choose us?",
    answer:
      "A community-driven calisthenics gym offering expert coaching, inclusive vibes, and creative challenges that make fitness fun and rewarding,It’s more than just a gym, we travel, hang out, and enjoy activities together outside of workouts, building friendships that last beyond the bars.",
  },
  {
    question: "What is Our Mission?",
    answer:
      "We are dedicated to creating a welcoming and empowering space where positive energy thrives. At iFlag Bars, we’re more than just workouts,we focus on building a supportive community through challenges, activities, and unforgettable experiences.From training sessions to traveling together, we aim to promote calisthenics as a lifestyle that enhances both physical and mental well-beingwhile fostering genuine friendships.", 
      
  },
  {
    question: "Our Branches?",
    answer:
      "Element Five - New Cairo, GUC-University, Nasr City, Biancki-North Coast, Mivida- Emar Misr, Stella-North Coast",
  },
  {
    question: "iFlag Statistics?",
    answer:
      "Number of Sessions: 5000+Sessions, 12000+Happy Client,Competitions We Did 12 Local Events, 2-NationalChampion ships,Number of Transformations: +700 Transformations, Competitions We Won: 18 LocalCompetitions, 1-WorldChampionship."
  },
];

const FAQs: FC = () => {
  const [selectedIndex, setSelectedIndex]= useState<number|null>(null);
  return <section className="section" id="faqs"> 
    <div className="container">
<h2 className="text-4xl md:text-7xl lg:text-8xl">FAQs</h2>

<div className="mt-10 md:mt-16 lg:mt-20">
  {faqs.map(({question, answer},faqIndex ) => (
    <div key={question} className="border-t border-stone-400 border-dotted py-6 md:py-8 lg:py-10 last:border-b relative isolate group/faq" onClick={() => {
      if(faqIndex === selectedIndex){
        setSelectedIndex(null);
      } else{
        setSelectedIndex(faqIndex)}}
      }
      >
<div className={twMerge("absolute h-0 w-full bottom-0 left-0 bg-slate-300 -z-10 group-hover/faq:h-full transition-all duration-700", faqIndex === selectedIndex && 'h-full')}></div>
<div className={twMerge("flex items-center justify-between gap-4 transition-all duration-500 group-hover/faq:lg:px-8" , faqIndex === selectedIndex && 'lg:px-8')}>
<div className="text-2xl md:text-3xl lg:text-4xl">{question}</div>
<div className={twMerge("inline-flex items-center justify-center size-11 border border-stone-400 rounded-full shrink-0 transition duration-300 bg-slate-200")}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
</div>
  </div>
  <AnimatePresence>
  {faqIndex === selectedIndex && (
 <motion.div
 className="overflow-hidden lg:px-8"
 initial={{
  height:0
 }}
 animate={{
  height: 'auto'
 }}
 exit={{height:0}}
transition={{duration:0.7, ease:'easeOut'}} 
 >
  <p className="text-xl mt-4">{answer}</p>
  </motion.div>
  )}
  </AnimatePresence>
  </div>
  ))}
</div>
</div>
  </section>;
};

export default FAQs;
