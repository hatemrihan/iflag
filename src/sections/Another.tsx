"use client";
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

const Another: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const loadVideo = async () => {
      try {
        videoElement.defaultMuted = true;
        videoElement.muted = true;
        videoElement.playsInline = true;
        
        // Start loading the video
        await videoElement.load();
        
        // Wait for enough data to be loaded
        if (videoElement.readyState >= 3) {
          setIsVideoLoaded(true);
          videoElement.play().catch(console.error);
        }
      } catch (error) {
        console.error("Video loading error:", error);
        setIsVideoError(true);
      }
    };

    const handleCanPlay = () => {
      setIsVideoLoaded(true);
      videoElement.play().catch(console.error);
    };

    const handleError = (e: any) => {
      console.error("Video error:", e);
      setIsVideoError(true);
      setIsVideoLoaded(true); // Show content even if video fails
    };

    videoElement.addEventListener('canplay', handleCanPlay);
    videoElement.addEventListener('error', handleError);
    loadVideo();

    return () => {
      videoElement.removeEventListener('canplay', handleCanPlay);
      videoElement.removeEventListener('error', handleError);
    };
  }, []);

  const handleTryNowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactForm = document.querySelector('#contact');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 overflow-hidden">
      {/* Navigation */}
      {/* <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4 bg-gradient-to-b from-black/30 to-transparent">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
           <Link href="/">
            <span className="text-xl font-semibold text-white">IFLAG</span>
            </Link>
          </div>
          

          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-white/90 hover:bg-white rounded-full text-sm transition-colors">
              Join us
            </button>
            <button className="px-4 py-2 bg-black/80 hover:bg-black text-white rounded-full text-sm transition-colors">
              Home
            </button>
          </div>
        </div>
      </nav> */}

      {/* Main Content */}
      <div className="relative h-screen">
        {/* Video Background */}
        <div className="absolute inset-0 bg-black">
          {!isVideoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/videos/poster.jpg"
            className={`w-full h-full object-cover scale-[1.01] ${isVideoLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
            style={{ 
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              minWidth: '100%',
              minHeight: '100%',
              width: 'auto',
              height: 'auto'
            }}
          >
            {/* Mobile version (smaller size) */}
            <source 
              media="(max-width: 768px)"
              src="/videos/Flagvid-mobile.mp4"
              type="video/mp4"
            />
            {/* Desktop version (higher quality) */}
            <source 
              src="/videos/Flagvid-compressed.mp4"
              type="video/mp4"
            />
            {/* Original as fallback */}
            <source 
              src="/videos/Flagvid.MP4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />
        </div>

        {/* Content Grid */}
        <div className="relative h-full">
          <div className="max-w-7xl mx-auto h-full">
            {/* Left Column Content */}
            <div className="absolute left-6 md:left-12 top-32 space-y-20">
              {/* Metrics */}
              <div className="space-y-4 text-white">
              
                <div className="text-3xl font-light tracking-wide">26 km</div>
                <div className="text-3xl font-light tracking-wide">27 °C</div>
                
              </div>

              {/* Main Text */}
              <div className="max-w-xl">
                <h1 className="text-5xl md:text-6xl font-light text-white leading-tight">
                  Impactful coaches
                  <br />
                  for our team
                </h1>
                
                <div className="flex flex-col sm:flex-row gap-6 mt-0 lg:mt-6">
                  <button 
                    onClick={handleTryNowClick}
                    className="min-w-[160px] whitespace-nowrap px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm backdrop-blur-sm transition-all transform hover:scale-105 cursor-pointer"
                  >
                    Try Now Free Trial
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column Content */}
            <div className="absolute right-6 md:right-12 top-32 flex flex-col justify-between h-[calc(100%-12rem)]">
              {/* Environmental Data */}
              <div className="text-white text-sm space-y-6">
                <div>
                  <p className="font-medium mb-2">Illumination</p>
                  <p className="text-white/60 mb-1">Next moonset</p>
                  <p className="mb-4">4:30pm</p>
                  <p className="text-white/60 mb-1">Ramadan</p>
                  <p>30 days</p>
                </div>
              </div>

           
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-12 left-6 md:left-12 right-6 md:right-12">
              {/* Metrics Bar */}
              <div className="flex items-center gap-8 text-white mb-8">
                <div className="flex items-center gap-4">
                 
      
                </div>
                <div className="flex items-center gap-4">
               
                </div>
              
              </div>

              {/* Description */}
              <p className="text-white/80 max-w-xl text-lg mb-8 leading-relaxed">
          To be leading calisthenics community in the region, inspiring individuals to push their limits and achieve greatness.
              </p>

              {/* Product Carousel */}
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Another;