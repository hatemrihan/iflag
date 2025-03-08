"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import winnersImage from '@/assets/images/winners-image.jpg'
import { useInView } from 'framer-motion';
import useTextRevealAnimation from '@/hooks/useTextRevealAnimation';

const EquiPulseHomePage: React.FC = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const { scope, entranceAnimation } = useTextRevealAnimation();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      entranceAnimation();
    }
  }, [isInView, entranceAnimation]);

  const handleTryNowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactForm = document.querySelector('#contact');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const animateImage = () => {
      const img = imageRef.current;
      if (!img) return;
      
      let startTime = Date.now();
      
      const animate = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        
        const baseSpeed = 4000;
        const verticalAmplitude = 15;
        const scaleRange = 0.05;
        
        const progress = elapsed % baseSpeed / baseSpeed;
        const verticalOffset = verticalAmplitude * Math.sin(2 * Math.PI * progress);
        const scale = 1 + (scaleRange * Math.sin(2 * Math.PI * progress * 2));
        
        img.style.transform = `
          translateY(${verticalOffset}px)
          scale(${scale})
        `;
        img.style.transition = 'transform 0.2s ease-out';
        
        requestAnimationFrame(animate);
      };
      
      animate();
      return () => {
        img.style.transform = 'none';
      };
    };
    
    animateImage();
  }, []);

  return (
    <div className="relative bg-stone-200 min-h-screen overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <header className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
            <span className="text-black font-medium">IFLAG</span>
          </div>
          
       
        </header>

        {/* Main Content */}
        <div className="mt-16 flex flex-col md:grid md:grid-cols-2 gap-8">
          <div className="max-w-xl">
            <p className="text-gray-600 text-sm mb-4" ref={scope}>
              Join us in the pursuit of excellence and<br />
              take your game to new heights
            </p>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-black leading-tight mb-8" ref={scope}>
              Energize Your<br />
              Ambition, Pulse<br />
              Your Way
            </h1>
            <button 
              onClick={handleTryNowClick}
              className="min-w-[160px] whitespace-nowrap px-8 py-4 bg-stone-900 hover:bg-stone-800 text-white rounded-full text-sm transition-all transform hover:scale-105"
            >
              Try Now Free Trial
            </button>
          </div>

          {/* Single Floating Image */}
          <div className="relative flex justify-center items-center mt-8 md:mt-0">
            <div className="w-full max-w-[320px] md:w-80  rounded-2xl overflow-hidden">
              <Image
                ref={imageRef}
                src={winnersImage}
                alt="Exercise"
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
   
    </div>
  );
};

export default EquiPulseHomePage;