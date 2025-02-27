"use client";
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useInView } from 'framer-motion'
import useTextRevealAnimation from '@/hooks/useTextRevealAnimation'

import hooImage from "@/assets/images/hoo-image.jpg"

const All = () => {
  const { scope, entranceAnimation } = useTextRevealAnimation();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      entranceAnimation();
    }
  }, [isInView, entranceAnimation]);

  return (
    <section className="flex justify-center items-center min-h-screen  p-4">
      <div className=" p-6 max-w-md w-full text-center">
        <h1 className="text-4xl md:text-7xl lg:text-8xl text-center text-black" ref={scope}>Instagram Success</h1>
        <div className="my-6">
         
         <Image 
         src = {hooImage}
         alt="hoo-image"
         width={1920}
         height={1080}
         className="size-full object-cover"
         />

        </div>
        <p className="text-black text-sm md:text-base">
        From day one, we built this page with passion, creativity, and a deep commitment to our community. What started as a small idea has now grown into a thriving space of 25K incredible followers. This isn&apos;t just about numbers—it&apos;s about the connections, the stories, and the journey we&apos;ve shared. Thank you for being part of this success. Here&apos;s to growing, learning, and creating together.
        </p>
     <a href="https://www.instagram.com/iflagbars?igsh=MXMyMjJwdmxwNWRydA==">  <button className="mt-4 px-6 py-2 bg-black text-white rounded-full text-sm md:text-base">
          Explore our page
        </button> </a>
      </div>
    </section>
  )
}

export default All