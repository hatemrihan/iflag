"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useEffect, useState } from "react"
import Image from "next/image"
import heroImage from "@/assets/images/hero-image.jpg"
import { UserFormValidation } from "@/components/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/components/lib/actions/patient.actions"
import { Label } from "@radix-ui/react-label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { SelectItem } from "../ui/select"
import { Doctors } from "@/constants"
import Link from "next/link"
import { Appointment } from "@/types/appwrite.types"
import fagrrImage from "@/assets/images/fagrr-image.jpg"
import useTextRevealAnimation from "@/hooks/useTextRevealAnimation"
import { useInView } from "motion/react"


export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = "textarea",
    PHONE_INPUT = "phoneInput",
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETOn = 'skeleton',
    SKELETON = "SKELETON"
}
interface PatientFormProps {
  userId: string;
  patientId: string;
  type: "schedule" | "cancel";
  appointment?: Appointment; // Assuming appointment is a string (ID)
  setOpen: (open: boolean) => void;
}

const PatientForm = ({
  userId, patientId, type, appointment, setOpen
}: {
  userId: string;
  patientId: string;
  appointment?: Appointment;
  setOpen: (open: boolean) => void;
  type: "create" | "cancel" |"schedule";
}) => {
  const {scope, entranceAnimation} =useTextRevealAnimation ();
  const inView = useInView(scope);

  useEffect(()=>{
    if (inView){
      entranceAnimation();
    }
  }, [inView, entranceAnimation]);
    const router = useRouter()
    const [isLoading, setisLoading] = useState(false)

    const form = useForm<z.infer<typeof UserFormValidation> & { birthDate: Date; branch: string; SessionDate: string }>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            schedule:new Date(),
            primaryPhysician: "",
        },
    })

    async function onSubmit({ name, email, phone,schedule, primaryPhysician }: z.infer<typeof UserFormValidation> & { birthDate: Date; branch: string; schedule:Date; }) {
        setisLoading(true)
        try {
            const userData = { name, email, phone,schedule,primaryPhysician}
            console.log("Sending user data:", userData)

            const user = await createUser(userData)
            console.log("API Response:", user)

            // Check for user.$id
            if (user && user.$id) {
                console.log("Valid User Object:", user)
                router.push(`/patients/${user.$id}/register`)
            } else {
                console.error("Invalid User Data:", user)
                alert("An error occurred. Invalid user data returned.")
            }
        } catch (error) {
            console.error("API Error:", error)
            if (error instanceof Error) {
                alert(`An error occurred: ${error.message}`)
            } else {

              
                alert("An unexpected error occurred.")
            }
        } finally {
            setisLoading(false)
        }
    }

    return (
        <>
      <h1 className="text-4xl text-black text-center mb-32" ref={scope}>Contact Us</h1>
         <div className="flex flex-col md:flex-row gap-8 min-h-screen items-center justify-center p-4 bg-stone-900 text-white">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1 sm:space-y-8 max-w-md w-full">
<section className="mb-0 space-y-4 text-center">

    <p className="text-white"> Schedule Your Session NOW!</p>
</section>
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="name"
                    label="Full name"
                    placeholder="Hatem Rihan"
                    className="text-white"
                    />

                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="example@gmail.com" />
            
                     <CustomFormField
     fieldType={FormFieldType.SELECT}
     control={form.control}
     name="primaryPhysician"
     label="Branch"
     placeholder="Select a Branch"
   >
     {Doctors.map((doctor, i) => (
       <SelectItem key={doctor.name + i} value={doctor.name}>
         <div className="flex cursor-pointer items-center gap-2">
           <p>{doctor.name}</p>
         </div>
       </SelectItem>
     ))}
   </CustomFormField>
   <CustomFormField
                    fieldType={FormFieldType.PHONE_INPUT}
                    control={form.control}
                    name="phone"
                    label="Phone number"
                    placeholder="+20 123 456 7890" 
                    className="bg-black"
                    />
   <CustomFormField
     fieldType={FormFieldType.DATE_PICKER}
     control={form.control}
     name="schedule"
     label="Expected appointment date"
     showTimeSelect
     dateFormat="MM/dd/yyyy  -  h:mm aa"
   />
                    <div className="flex flex-col gap-6 md:flex-row lg:flex-row text-md text-dark-600">
                        
</div>

                <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
                <div className="text-14-regular flex justify-between">
            <p className="justify-items-end text-white xl:text-left">
              ©  IFLAG           </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
            
          </div>
            </form>
        </Form><div className="relative w-full max-w-md md:max-w-lg aspect-square">
              
                 <Image
                 src= {fagrrImage}
                 alt="fagrr-image"
                 width={500}
                 height={500}
                 className="side-img max-w-[100%] sm:object-cover md:object-cover"
                 />
            </div>
            </div>
     
            </>
            
            
    )
}

export default PatientForm