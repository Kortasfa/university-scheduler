"use client"

import { createClient } from "@/utils/supabase/client";

export const getSubjectsAction = async () => {
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
    .from('academic_subject')
    .select(`
      id,
      name,
      description,
      created_at
    `);

  if (error) {
    console.error("Error fetching subjects:", error.message);
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    resources: data.map((subject) => ({
      id: subject.id,
      name: subject.name,
      description: subject.description,
      createdAt: subject.created_at,
    })),
  };
};
