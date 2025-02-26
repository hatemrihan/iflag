"use server";

import { ID, Query } from "node-appwrite";
import { Client, Messaging } from "node-appwrite";

import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";
import { string } from "zod";

const client = new Client()
    .setEndpoint(ENDPOINT!)
    .setProject(PROJECT_ID!);

const messaging = new Messaging(client);

// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
     user.schedule.toDateString(),
     user.primaryPhysician
    );

    return parseStringify(newuser);

  } catch (error: any) {
    // Check existing user

    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);
      
   

      return existingUser.users[0];

    }
    console.error("An error occurred while creating a new user:", error);
  }
};

// GET USER
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    const smsMessage = `Hello ${user.name}, your appointment has been received. We will contact you shortly.`;
    await sendSMSNotification(userId, smsMessage);
    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};

// REGISTER PATIENT
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
       
        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};

// GET PATIENT
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};
export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );
    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case "scheduled":
            acc.scheduledCount++;
            break;
          case "pending":
            acc.pendingCount++;
            break;
          case "cancelled":
            acc.cancelledCount++;
            break;
        }
        return acc;
      },
      initialCounts
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the recent appointments:",
      error
    );
  }
};
export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      appointment
      
    );

    revalidatePath("/admin");
    return parseStringify(newAppointment);
  } catch (error) {
    console.error("An error occurred while creating a new appointment:", error);
  }
};
export const updateAppointment = async ({userId, appointment, type}:UpdateAppointmentParams) => {
  try {
    const updateAppointment = await databases.updateDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      appointment.id,
      {
       ...appointment,
        userId,
      }
    )
    if(!updateAppointment){
      throw new Error('An error occurred while updating');
    }
    revalidatePath('/admin');
    return parseStringify(updateAppointment);
  } catch (error) {
   console.log(error);
  }
}
export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]

    );
    return parseStringify(message);
  } catch (error) {
    console.error("An error occurred while sending sms:", error);
  }
};

export const handleAppointmentAction = async (
  userId: string,
  type: 'confirm' | 'cancel' | 'schedule',
  appointmentDetails?: { date?: string; doctor?: string }
) => {
  try {
    const user = await users.get(userId);
    let smsMessage = '';

    switch (type) {
      case 'confirm':
        smsMessage = `Hello ${user.name}, your appointment has been confirmed! We look forward to seeing you.`;
        break;
      case 'cancel':
        smsMessage = `Hello ${user.name}, your appointment has been cancelled. Please contact us if you need to reschedule.`;
        break;
      case 'schedule':
        smsMessage = `Hello ${user.name}, your appointment request has been received${
          appointmentDetails?.doctor ? ` with Dr. ${appointmentDetails.doctor}` : ''
        }${
          appointmentDetails?.date ? ` for ${appointmentDetails.date}` : ''
        }. We will contact you shortly to confirm.`;
        break;
    }

    const result = await sendSMSNotification(userId, smsMessage);
    return { success: true, message: 'SMS notification sent successfully' };
  } catch (error) {
    console.error('Failed to send SMS notification:', error);
    return { success: false, message: 'Failed to send SMS notification' };
  }
};



