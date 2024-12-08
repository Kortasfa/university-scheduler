"use client";

import { createClient } from "@/utils/supabase/client";

export const getGroupsAction = async () => {
  const supabase = await createClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return {
      error: true,
      message: "Unauthorized access",
    };
  }

  const {
    data,
    error
  } = await supabase
    .from('group')
    .select(`
      id,
      name,
      description,
      created_at
    `);

  if (error) {
    console.error("Error fetching groups:", error.message);
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    resources: data.map((group) => ({
      id: group.id,
      name: group.name,
      description: group.description,
      createdAt: group.created_at,
    })),
  };
};
