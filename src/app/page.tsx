"use client";
import PatientForm from "@/components/forms/PatientForm";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/images/hero-image.jpg";
import Image from "next/image";
import Link from "next/link";
import FAQs from "@/sections/FAQs";
import Footer from "@/sections/Footer";
import Header from "@/sections/Header";
import Hero from "@/sections/Hero";
import Intro from "@/sections/Intro";
import Pricing from "@/sections/Pricing";
import Projects from "@/sections/Projects";
import Testimonials from "@/sections/Testimonials";
import { PasskeyModal } from "@/components/PassKeyModal";
import holaImage from "@/assets/images/hola-image.jpg";
import All from "@/sections/All";
import Part from "@/sections/Part";



export default function Home({searchParams} :SearchParamProps) {
   const isAdmin = searchParams.admin === 'true';

   return (
      <>
      {isAdmin && <PasskeyModal />}
         <Header />
         <Hero />
         <Intro />
         <Projects />
         <Testimonials />
         <Part />
         <All />
         <FAQs />
         <Pricing />
         <PatientForm userId={""} patientId={""} setOpen={function (open: boolean): void {
            throw new Error("Function not implemented.");
         } } type={"schedule"} />
        
   
              <Footer />
      </>
   );
}

