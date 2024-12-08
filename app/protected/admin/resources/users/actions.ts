"use client";

import { createClient } from "@/utils/supabase/client";

export const getUsersAction = async () => {
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
    .from('user')
    .select(`
      id,
      first_name,
      surname,
      middle_name,
      avatar_path,
      group!inner(name),
      role!inner(name)
    `)

  if (error) {
    console.error("Error fetching users:", error.message);
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    resources: data.map((user) => ({
      name: user.first_name + " " + user.surname + " " + user.middle_name,
      id: user.id,
      avatar: user.avatar_path,
      // @ts-ignore
      group: user.group.name,
      // @ts-ignore
      role: user.role.name,
    })),
  };
};