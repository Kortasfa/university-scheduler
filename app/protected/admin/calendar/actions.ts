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

  const periodsToInsert = periods.map((period, index) => ({
    user_id: user.id,
    start_time: period.startTime,
    end_time: period.endTime,
    period_order: index + 1
  }));

  const { error: periodsError } = await supabase
    .from('periods')
    .insert(periodsToInsert);

  if (periodsError) throw periodsError;
};

export const getCalendarSettings = async () => {
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) throw new Error('Not authenticated');

  const { data: periods, error: periodsError } = await supabase
    .from('periods')
    .select('id, start_time, end_time, period_order')
    .eq('user_id', user.id)
    .order('period_order', { ascending: true });

  if (periodsError) throw periodsError;
  
  return {
    periods: periods || []
  };
};