"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import Organization from "./../database/models/organization.model";

// CREATE
export async function createOrganizationDB(
  organization: CreateOrganizationDBParams
) {
  try {
    await connectToDatabase();

    const newOrganization = await Organization.create(organization);

    return JSON.parse(JSON.stringify(newOrganization));
  } catch (error) {
    handleError(error);
  }
}

export async function updateOrganizationDB(id: string, orgClerkId: string) {
  try {
    await connectToDatabase();

    const updatedOrganization = await Organization.findOneAndUpdate(
      { id },
      { orgClerkId: orgClerkId },
      {
        new: true,
      }
    );

    if (!updatedOrganization) throw new Error("organization update failed");

    return JSON.parse(JSON.stringify(updatedOrganization));
  } catch (error) {
    handleError(error);
  }
}
