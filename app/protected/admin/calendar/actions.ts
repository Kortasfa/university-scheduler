"use server";

import { PeriodTime } from "@/components/calendar/calendar-settings";
import { createClient } from "@/utils/supabase/server";

export const insertCalendarSettings = async (periods: PeriodTime[]) => {
  const supabase = await createClient();
  
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) throw new Error('Not authenticated');

  const { error: deleteError } = await supabase
    .from('periods')
    .delete()
    .eq('user_id', user.id);

  if (deleteError) throw deleteError;

  const periodsToInsert = periods.map(period => ({
    user_id: user.id,
    start_time: period.startTime,
    end_time: period.endTime,
    period_order: period.periodOrder
  }));

  const { error: insertError } = await supabase
    .from('periods')
    .insert(periodsToInsert);

  if (insertError) throw insertError;
};

export const getCalendarSettings = async () => {
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) throw new Error('Not authenticated');

  const { data: periods, error: periodsError } = await supabase
    .from('periods')
    .select('start_time, end_time, period_order')
    .eq('user_id', user.id)
    .order('period_order', { ascending: true });

  if (periodsError) throw periodsError;
  
  return {
    periods: periods.map(period => ({
      periodOrder: period.period_order,
      startTime: period.start_time.slice(0, -3),
      endTime: period.end_time.slice(0, -3),
    })
  )};
};

export const getActivitiesAction = async (startDate?: Date) => {
  const supabase = await createClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return {
      error: true,
      message: "Unauthorized access",
    };
  }

  const start = startDate ? new Date(startDate) : new Date();
  start.setHours(0, 0, 0, 0);
  
  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  end.setHours(23, 59, 59, 999);

  const {
    data,
    error
  } = await supabase
    .from('activity')
    .select(`
      id,
      academic_subject!inner(name),
      date,
      period_order,
      group_id
    `)
    .gte('date', start.toISOString())
    .lt('date', end.toISOString())

  if (error) {
    console.error("Error fetching activities:", error.message);
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    resources: data.map((activity) => ({
      id: activity.id,
      //@ts-expect-error
      name: activity.academic_subject.name,
      date: new Date(activity.date),
      period_id: activity.period_order,
      group_id: activity.group_id,
    })),
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
      name
    `)

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
    })),
  };
};