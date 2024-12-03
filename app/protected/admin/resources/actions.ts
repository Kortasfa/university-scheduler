"use server";

import { createClient } from "@/utils/supabase/server";

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

export const deleteResourceAction = async (id: string, resource: "user" | "group") => {
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
