"use client";

import { getPatient, getUser, handleAppointmentAction } from '@/components/lib/actions/patient.actions';
import React, { useState } from 'react';
import Image from 'next/image';
import testomnialImage from "@/assets/images/testimonial-1.jpg";
import Button from '@/components/Button';
import { Doctors } from '@/constants';
import Link from 'next/link';

const Register = ({ params: { userId }, searchParams }: SearchParamProps) => {
  const [sending, setSending] = useState(false);

  const handleConfirmClick = async () => {
    setSending(true);
    try {
      const result = await handleAppointmentAction(userId, 'confirm');
      if (result.success) {
        alert('Confirmation SMS sent successfully!');
      } else {
        alert('Failed to send confirmation SMS. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while sending the confirmation.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex h-screen max-h-screen px-[5%] mt-10">
      <div className="success-img">
        <Link href="/"></Link>

        <section className="flex flex-col items-center gap-4">
          <Image
            src={testomnialImage}
            alt="testominial-image"
            width={1000}
            height={1000}
            className="side-img max-w-[390px] bg:bottom"
          />
          
          <h2 className="header mb-2 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className="request-details gap-4">
          <div className="flex items-center gap-3">
            {/* Doctor's image and name can be added here */}
          </div>
          <div className="flex gap-2 mb-10">
            {/* Appointment details can be added here */}
          </div>
        </section>

        <div className="flex flex-col gap-4">
          <Button 
            variant="secondary" 
            className="shad-primary-btn mb-2 text-black"
            onClick={handleConfirmClick}
            disabled={sending}
          >
            {sending ? 'Sending...' : 'Send Confirmation SMS'}
          </Button>

          <Button variant="secondary" className="shad-primary-btn mb-2 text-black">
            <Link href="/">
              New Appointment
            </Link>
          </Button>
        </div>

        <p className="copyright">© {new Date().getFullYear()} IFLAG</p>
      </div>
    </div>
  );
};

export default Register;
