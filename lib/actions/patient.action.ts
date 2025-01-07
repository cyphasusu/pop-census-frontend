"use server";



// CREATE APPWRITE USER
export async function createUser(user: CreateUserParams) {
  try {
    console.log("success");
  } catch (error: any) {
    console.error("An error occurred while creating a new user:", error);
  }
}

export async function getUser(userId: string) {
  try {
    console.log("success");
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
}

export async function registerPatient({
  identificationDocument,
  ...patient
}: RegisterUserParams) {
  try {
    console.log("success");
  } catch (err) {
    console.error("An error occurred while creating a new patient:", err);
  }
}

export const getPatient = async (userId: string) => {
  try {
    console.log("success");
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};
