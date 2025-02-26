"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Appointment } from "@/types/appwrite.types";
import PatientForm from "./forms/PatientForm";

interface AppointmentModalProps {
  patientId: string;
  userId: string;
  appointment?: Appointment;
  type: "schedule" | "cancel";
  title: string; // Added title prop
  description: string; // Added description prop
}

export const AppointmentModal = ({
  patientId,
  userId,
  appointment,
  type,
  title,
  description,
}: AppointmentModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`capitalize ${type === "schedule" ? "text-green-500" : "text-red-500"}`}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{title}</DialogTitle>
          <DialogDescription>
            {description} to {type} appointment
          </DialogDescription>
        </DialogHeader>

        <PatientForm  
          userId={userId}
          patientId={patientId}
          type={type}
          appointment={appointment ? appointment.id : ""} // Assuming appointment has an 'id' property
         setOpen={setOpen}
        /> 
      </DialogContent>
    </Dialog>
  );
};
