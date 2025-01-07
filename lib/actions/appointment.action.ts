"use server";

import { revalidatePath } from "next/cache";

//  create appoint
export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    console.log("success");
  } catch (error) {
    console.error("An error occurred while creating a new appointment:", error);
  }
};

// GET APPOINTMENT
export const getAppointment = async (appointmentId: string) => {
  try {
    console.log("success");
  } catch (error) {
    console.error(
      "An error occurred while retrieving the existing patient:",
      error
    );
  }
};

//  UPDATE APPOINTMENT
export const updateAppointment = async ({
  appointmentId,
  userId,
  timeZone,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    console.log("success");
  } catch (error) {
    console.error("An error occurred while scheduling an appointment:", error);
  }
};

export const getRecentAppointmentList = async () => {
  try {
    console.log("success");
  } catch (error) {
    console.error(
      "An error occurred while retrieving the recent appointments:",
      error
    );
  }
};
