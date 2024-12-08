"use client";

import { createClient } from "@/utils/supabase/client";

export const deleteResourceAction = async (id: string, resource: "user" | "group" | "subject") => {
  const supabase = await createClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return {
      error: true,
      message: "Unauthorized access",
    };
  }

  const { error } = await supabase
    .from(resource)
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting ${resource}:`, error.message);
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    message: `${resource} successfully deleted`,
  };
};