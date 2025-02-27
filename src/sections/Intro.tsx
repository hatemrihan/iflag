"use client";

import React, { useEffect } from 'react'
import { useInView } from 'framer-motion'
import useTextRevealAnimation from '@/hooks/useTextRevealAnimation'

const Intro = () => {
  const { scope, entranceAnimation } = useTextRevealAnimation();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      entranceAnimation();
    }
  }, [isInView, entranceAnimation]);

  return (
    <section className="flex justify-center items-center min-h-screen p-4">
      <div className="p-6 max-w-md w-full text-center" ref={scope}>
        <h2 className="text-3xl md:text-5xl lg:text-6xl text-black">
          Transform Your Body
        </h2>
        <p className="mt-4 text-gray-600">
          Join our community and start your fitness journey today
        </p>
      </div>
    </section>
  )
}

export default Intro
