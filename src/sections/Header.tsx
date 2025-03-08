"use client";

import { FC, useEffect, useState, MouseEvent } from "react";
import Button from "@/components/Button";
import {motion, useAnimate} from "motion/react";
import { useInView } from 'framer-motion'
import useTextRevealAnimation from '@/hooks/useTextRevealAnimation'


/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const navItems = [
  {
    label: "About",
    href: "#intro",
  },
  {
    label: "What we do",
    href: "#projects",
  },
  {
    label: "Pricing",
    href: "#pricing",
  },
  {
    label: "FAQs",
    href: "#faqs",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const[topLineScope, topLineAnimate] =useAnimate();
  const[bottomLineScope, bottomLineAnimate] = useAnimate();
  const [navScope, navAnimate] = useAnimate();
  const { scope, entranceAnimation } = useTextRevealAnimation();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      entranceAnimation();
    }
  }, [isInView, entranceAnimation]);

  useEffect(() => {
    if (isOpen) {
      topLineAnimate([
        [
          topLineScope.current,
          {
            translateY: 8,
            rotate: 0,
          },
          { duration: 0.2 }
        ],
        [
          topLineScope.current,
          {
            rotate: 45,
            translateY: 8,
          },
          { duration: 0.2 }
        ]
      ]);

      bottomLineAnimate([
        [
          bottomLineScope.current,
          {
            translateY: -8,
            rotate: 0,
          },
          { duration: 0.2 }
        ],
        [
          bottomLineScope.current,
          {
            rotate: -45,
            translateY: -8,
          },
          { duration: 0.2 }
        ]
      ]);

      navAnimate(
        navScope.current,
        {
          height: "100%",
        },
        {
          duration: 0.7,
        }
      );
    } else {
      topLineAnimate([
        [
          topLineScope.current,
          {
            rotate: 0,
          },
          { duration: 0.2 }
        ],
        [
          topLineScope.current,
          {
            translateY: 0,
          },
          { duration: 0.2 }
        ]
      ]);

      bottomLineAnimate([
        [
          bottomLineScope.current,
          {
            rotate: 0,
          },
          { duration: 0.2 }
        ],
        [
          bottomLineScope.current,
          {
            translateY: 0,
          },
          { duration: 0.2 }
        ]
      ]);

      navAnimate(navScope.current, {
        height: 0,
      });
    }
  }, [isOpen, topLineAnimate, topLineScope, bottomLineAnimate, bottomLineScope, navScope, navAnimate]);

  const handleClickMobileNavItem = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(false);
    const url = new URL(e.currentTarget.href);
    const hash = url.hash;
    const target = document.querySelector(hash);
    if (!target) return;
    target.scrollIntoView({behavior:'smooth'});
  }

  const handleLogoClick = () => {
    window.location.href = '/';
  };
 
  return <header>
    <div className="fixed top-0 left-0 w-full h-0 overflow-hidden bg-stone-900 z-10" ref={navScope}>
<nav className="mt-20 flex flex-col">
  {navItems.map(({label, href})=> (
       <a href={href} key={label} className="text-stone-200 border-t last:border-b border-stone-800 py-8 group/nav-items relative isolate" onClick={handleClickMobileNavItem}>
        <div className="container !max-w-full flex  items-center justify-between ">
          <div className="absolute w-full h-0 bg-stone-800 group-hover/nav-items:h-full transition-all duration-500 bottom-0 -z-10 "></div>
    <span className="text-3xl group-hover/nav-items:pl-4 transition-all duration-500 ">{label}</span>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
</svg>
</div>
    </a>
  ))}
</nav>
    </div>
    <div className="fixed top-0 left-0 w-full   z-10">
    <div className="fixed top-0 left-0 w-full z-10 ">

</div>
<div className="container !max-w-full">
<div className="flex justify-between h-20 items-center">
<div>
<button 
  onClick={handleLogoClick} 
  className="cursor-pointer hover:opacity-80 transition-opacity"
>
<span className="text-xl font-bold uppercase text-black">IFLAG&nbsp;</span>
</button>
</div>
</div>
</div>
    </div>
    <div className="fixed top-0 left-0 w-full z-10">
    <div className="container !max-w-full">
  <div className="flex justify-end h-20 items-center">
   
    <div className="flex items-center gap-4">
    <button 
      className="size-11 border border-stone-400 rounded-full inline-flex items-center justify-center bg-stone-200 hover:bg-stone-300 transition-colors cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.rect
          x="3"
          y="7"
          width="18"
          height="2"
          fill="currentColor"
          ref={topLineScope}
          style={{
            transformOrigin: "center",
          }}
        />
        <motion.rect
          x="3"
          y="15"
          width="18"
          height="2"
          fill="currentColor"
          ref={bottomLineScope}
          style={{
            transformOrigin: "center",
          }}
        />
      </svg>
    </button>
    <a href="#contact"><Button variant="primary" className="hidden md:inline-flex">Join Us Now</Button></a>
  </div>
</div>
</div>
    </div>


  </header>;
  
};

export default Header;
