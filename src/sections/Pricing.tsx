"use client";
import { FC, useEffect } from "react";
import { useInView } from 'framer-motion';
import useTextRevealAnimation from '@/hooks/useTextRevealAnimation';

const Pricing: FC = () => {
  const { scope, entranceAnimation } = useTextRevealAnimation();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      entranceAnimation();
    }
  }, [isInView, entranceAnimation]);
  
  return (
    <section className="section" id="pricing">
      <div className="border-white py-12 px-4 md:px-16 lg:px-32">
        <h2 className="text-4xl mb-4 md:text-7xl lg:text-8xl text-center text-black" ref={scope}>
          OUR PRICES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Group Sessions */}
          <div className="p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold bg-stone-900 text-white p-2 rounded">Group Sessions</h3>
            <p className="mt-2 text-black text-sm">Unlimited Sessions Memberships</p>
            <ul className="mt-4 text-lg text-gray-700">
              <li>1 Year = 15,600 LE</li>
              <li>6 Months = 9,000 LE</li>
              <li>3 Months = 5,400 LE</li>
              <li>1 Month = 2,400 LE</li>
            </ul>
            <a href="#ContactForm">
              <button className="mt-6 bg-stone-900 px-6 py-2 rounded-lg text-white hover:bg-orange-500">
                Purchase
              </button>
            </a>
          </div>

          {/* Private Sessions */}
          <div className="p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold bg-stone-900 text-white p-2 rounded">Private Sessions</h3>
            <p className="mt-2 text-black text-sm">Avg 10 Sessions/Month</p>
            <ul className="mt-4 text-lg text-gray-700">
              <li>1 Month 1 on 1 = 4,800 LE</li>
              <li>2 Months 1 on 1 = 8,400 LE</li>
              <li>1 Month Group 2 PT = 4,200 LE Each</li>
              <li>2 Months Group 2 PT = 7,200 LE Each</li>
              <li>1 Month Group 3 PT = 3,600 LE Each</li>
              <li>2 Months Group 3 PT = 7,200 LE Each</li>
            </ul>
            <a href="#ContactForm">
              <button className="mt-6 bg-stone-900 px-6 py-2 rounded-lg text-white hover:bg-orange-500">
                Purchase
              </button>
            </a>
          </div>

          {/* Online Training */}
          <div className="p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold bg-stone-900 text-white p-2 rounded">Online Training</h3>
            <p className="mt-2 text-black text-sm">12 Sessions/Month</p>
            <ul className="mt-4 text-lg text-gray-700">
              <li>1 Month Program = 3,000 LE</li>
              <li>3 Months Program = 5,500 LE</li>
              <li>6 Months Program = 10,000 LE</li>
              <li>1 Year Program = 18,500 LE</li>
            </ul>
            <a href="#ContactForm">
              <button className="mt-6 bg-stone-900 px-6 py-2 rounded-lg text-white hover:bg-orange-500">
                Purchase
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;