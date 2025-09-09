"use server";

import { schemaCategory } from "@/lib/schema";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";

export async function PostCategory(
  _: unknown,
  formdata: FormData
): Promise<ActionResult> {
  const validate = schemaCategory.safeParse({
    name: formdata.get("name"),
  });

  if (!validate.success) {
    return {
      error: validate.error.issues[0].message,
    };
  }

  try {
    await prisma.category.create({
      data: {
        name: validate.data.name,
      },
    });
  } catch (error) {
    console.log(error);
    return { error: "Failed to insert data category" };
  }

  return redirect("/dashboard/categories");
}

export async function updateCategory(
  _: unknown,
  formdata: FormData,
  id: number | undefined
): Promise<ActionResult> {
  const validate = schemaCategory.safeParse({
    name: formdata.get("name"),
  });

  if (!validate.success) {
    return {
      error: validate.error.issues[0].message,
    };
  }

  if (id === undefined) {
    return {
      error: "Invalid ID",
    };
  }

  try {
    await prisma.category.update({
      where: { id: id },
      data: {
        name: validate.data.name,
      },
    });
  } catch (error) {
    console.log(error);
    return { error: "Failed to update data category" };
  }

  return redirect("/dashboard/categories");
}

export async function deleteCategory(
  _: unknown,
  formdata: FormData,
  id: number
): Promise<ActionResult> {
  try {
    await prisma.category.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
    return { error: "Failed to delete data category" };
  }
  return redirect("/dashboard/categories");
}
