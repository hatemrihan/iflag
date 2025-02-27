"use server";

import { redirect } from "next/navigation";

export async function GetAppointmentAction(formData: FormData) {
    const response = await fetch(process.env.GET_APPOINTMENT_URL!,{
        method: "POST",
        body: formData,
    });
    if (!response.ok){
        throw new Error("Something went wrong");
   }
   return redirect("/admin")
}