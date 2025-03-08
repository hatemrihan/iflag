"use client";

import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import Button from '../Button'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { useFormState } from 'react-dom';
import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import hooImage from "@/assets/images/hoo-image.jpg";

// Animation variants
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

type FormState = {
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    message?: string[];
    branch?: string[];
    sessionDate?: string[];
  };
};

const initialState: FormState = {
  message: "",
  errors: {},
};

async function submitForm(prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    const data = {
      access_key: "d3255ed5-b656-40e1-b252-048bffd25034",
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      branch: formData.get("branch"),
      sessionDate: formData.get("sessionDate"),
      message: formData.get("message"),
      subject: formData.get("branch") ? "Appointment Request" : "Support Request",
      from_name: "IFLAG Website Form"
    };

    console.log("Submitting form data:", data);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log("Form submission result:", result);

    if (!result.success) {
      return {
        message: result.message || "Failed to submit form. Please try again.",
        errors: {}
      };
    }

    window.location.href = "/submission";
    return { message: "", errors: {} };
  } catch (error) {
    console.error("Form submission error:", error);
    return {
      message: "Failed to submit form. Please try again.",
      errors: {}
    };
  }
}

const ContactForm = () => {
  const [state, formAction] = useFormState(submitForm, initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  useEffect(() => {
    if (state?.message) {
      setIsSubmitting(false);
    }
  }, [state]);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    await formAction(formData);
  };

  return (
    <section className='min-h-screen w-full flex flex-col lg:flex-row items-center justify-center px-5 '>
      {/* Contact Form Section */}
           {/* Instagram Success Section */}
           <motion.div 
        ref={ref}
        className="w-full lg:w-1/2 p-4 lg:p-8  text-white"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="max-w-[500px] mx-auto">
          <motion.h1 
            className="text-3xl md:text-5xl lg:text-6xl text-center text-black font-bold mb-8"
            variants={textVariants}
          >
            Instagram Success
          </motion.h1>
          
          <motion.div 
            className="my-6 rounded-lg overflow-hidden shadow-xl"
            variants={imageVariants}
          >
            <Image 
              src={hooImage}
              alt="hoo-image"
              width={1920}
              height={1080}
              className="w-full h-auto object-cover"
            />
          </motion.div>

          <motion.p 
            className=" text-sm md:text-base leading-relaxed mb-8 text-black"
            variants={textVariants}
          >
            From day one, we built this page with passion, creativity, and a deep commitment to our community. What started as a small idea has now grown into a thriving space of 25K incredible followers. This isn&apos;t just about numbers—it&apos;s about the connections, the stories, and the journey we&apos;ve shared. Thank you for being part of this success. Here&apos;s to growing, learning, and creating together.
          </motion.p>

          <motion.div 
            variants={textVariants}
            className="text-center"
          >
            <a 
              href="https://www.instagram.com/iflagbars?igsh=MXMyMjJwdmxwNWRydA==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <button className="px-8 py-3 bg-black text-white rounded-full text-sm md:text-base hover:bg-gray-800 transition-colors transform hover:scale-105 duration-200 shadow-lg">
                Explore our page
              </button>
            </a>
          </motion.div>
        </div>
      </motion.div>
      <div className="w-full lg:w-1/2 p-4 lg:p-8">
        <h1 className='text-2xl font-bold mb-7 text-center text-black'>Join Our Ramadan Challenge!</h1>
        <Card className='max-w-[500px] w-full mx-auto bg-stone-300'>
          <Tabs defaultValue='sales'>
            <CardContent className='mt-5 bg-stone-300'>
              <TabsList className='grid grid-cols-2 bg-stone-400'>
                <TabsTrigger value='sales' className='text-black'>
                  Get Appointment
                </TabsTrigger>
                <TabsTrigger value='Support' className='text-black'>
                  Support
                </TabsTrigger>
              </TabsList>
              <TabsContent value='sales'>
                <p className='text-muted-foreground text-sm text-center'>Get Your Appointment Session Now</p>
                <form onSubmit={handleSubmit} className='flex flex-col mt-5 gap-y-4'>
                  <div className='grid space-y-1'>
                    <Label className='text-black'>Name</Label>
                    <Input 
                      className='bg-stone-200 text-white' 
                      name='name' 
                      placeholder='Hatem Rihan'
                      required 
                    />
                    {state?.errors?.name && (
                      <p className="text-red-500 text-sm">{state.errors.name[0]}</p>
                    )}
                  </div>
                  <div className='grid space-y-1'>
                    <Label className='text-black'>Email</Label>
                    <Input 
                      className='bg-stone-200 text-white' 
                      name='email' 
                      type="email"
                      placeholder='iflagbars@example.com'
                      required 
                    />
                    {state?.errors?.email && (
                      <p className="text-red-500 text-sm">{state.errors.email[0]}</p>
                    )}
                  </div>
                  <div className='grid space-y-1'>
                    <Label className='text-black'>Phone Number</Label>
                    <Input 
                      className='bg-stone-200 text-black' 
                      name='phone' 
                      placeholder='+20 1234567899'
                    />
                    {state?.errors?.phone && (
                      <p className="text-red-500 text-sm">{state.errors.phone[0]}</p>
                    )}
                  </div>
                  <div className='grid space-y-3'>
                    <Label className='text-black'>Branch</Label>
                    <Select name='branch' required>
                      <SelectTrigger className="w-[180px] bg-stone-200 text-black">
                        <SelectValue placeholder="Select a branch"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Branch</SelectLabel>
                          <SelectItem value="Guc">Guc</SelectItem>
                          <SelectItem value="elementfive">ElementFive</SelectItem>
                          <SelectItem value="Online">Online</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {state?.errors?.branch && (
                      <p className="text-red-500 text-sm">{state.errors.branch[0]}</p>
                    )}
                    <Label className='text-black'>Session Date</Label>
                    <Select name='sessionDate' required>
                      <SelectTrigger className="w-[180px] bg-stone-200 text-black">
                        <SelectValue placeholder="Select a Session Date"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Session Date</SelectLabel>
                          <SelectItem value="4:30pm">4:30 pm - preIftar</SelectItem>
                          <SelectItem value="9:00pm">9:00 pm</SelectItem>
                          <SelectItem value="10:00pm">10:00 pm</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {state?.errors?.sessionDate && (
                      <p className="text-red-500 text-sm">{state.errors.sessionDate[0]}</p>
                    )}
                  </div>
                  <Button 
                    className={`flex items-center justify-center text-black ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`} 
                    type='submit'
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                        Submitting...
                      </div>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                  {state?.message && (
                    <p className="text-red-500 text-sm text-center mt-2">{state.message}</p>
                  )}
                </form>
              </TabsContent>
              <TabsContent value='Support'>
                <p className='text-muted-foreground text-sm text-center'>Talk to our Support</p>
                <form onSubmit={handleSubmit} className='flex flex-col gap-y-4 mt-5'>
                  <div className='grid space-y-1'>
                    <Label className='text-black'>Name</Label>
                    <Input 
                      className='bg-stone-300 text-black' 
                      name='name' 
                      placeholder='Hatem Rihan'
                      required 
                    />
                    {state?.errors?.name && (
                      <p className="text-red-500 text-sm">{state.errors.name[0]}</p>
                    )}
                  </div>
                  <div className='grid space-y-1'>
                    <Label className='text-black'>Email</Label>
                    <Input 
                      className='bg-stone-300 text-black' 
                      name='email' 
                      type="email"
                      placeholder='iflagbars@example.com'
                      required 
                    />
                    {state?.errors?.email && (
                      <p className="text-red-500 text-sm">{state.errors.email[0]}</p>
                    )}
                  </div>
                  <div className='grid space-y-1'>
                    <Label className='text-black'>Phone Number</Label>
                    <Input 
                      className='bg-stone-300 text-black' 
                      name='phone' 
                      placeholder='+20 1234567899'
                    />
                    {state?.errors?.phone && (
                      <p className="text-red-500 text-sm">{state.errors.phone[0]}</p>
                    )}
                  </div>
                  <div className='grid space-y-1'>
                    <Label className='text-black'>Message</Label>
                    <Textarea 
                      className='bg-stone-300 text-black' 
                      name='message' 
                      placeholder='Write your message here'
                      required 
                    />
                    {state?.errors?.message && (
                      <p className="text-red-500 text-sm">{state.errors.message[0]}</p>
                    )}
                  </div>
                  <Button 
                    className={`flex items-center justify-center text-black ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`} 
                    type='submit'
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                        Submitting...
                      </div>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                  {state?.message && (
                    <p className="text-red-500 text-sm text-center mt-2">{state.message}</p>
                  )}
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>

 
    </section>
  );
};

export default ContactForm;
