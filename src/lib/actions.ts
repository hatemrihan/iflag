"use server";

import { contactFormSchema } from "./schema";
import { redirect } from "next/navigation";
import type { FormState } from "./types";

export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
    service: formData.get("service"),
  };

  try {
    // Validate the form data
    const validatedFields = contactFormSchema.parse(data);

    // Submit to Web3Forms
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
        ...validatedFields,
      }),
    });

    const result = await response.json();
    if (!result.success) {
      return {
        message: "Failed to submit form. Please try again.",
        errors: {},
      };
    }

    // Redirect to success page
    redirect("/submission");
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
        errors: {},
      };
    }
    return {
      message: "Failed to submit form. Please try again.",
      errors: {},
    };
  }
} 