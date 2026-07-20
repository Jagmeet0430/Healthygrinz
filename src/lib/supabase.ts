import { createClient } from "@supabase/supabase-js";
import type { AppointmentPayload, ContactPayload } from "@/lib/validations";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export async function saveAppointment(payload: AppointmentPayload) {
  if (!supabase) {
    return { saved: false, reason: "Supabase is not configured." };
  }

  const { error } = await supabase.from("appointments").insert({
    name: payload.name,
    phone: payload.phone,
    concern: payload.concern,
    message: payload.message || null,
    preferred_time: payload.preferredTime || null,
  });

  if (error) {
    throw error;
  }

  return { saved: true };
}

export async function saveContactSubmission(payload: ContactPayload) {
  if (!supabase) {
    return { saved: false, reason: "Supabase is not configured." };
  }

  const { error } = await supabase.from("contact_messages").insert({
    name: payload.name,
    email: payload.email || null,
    phone: payload.phone || null,
    message: payload.message,
  });

  if (error) {
    throw error;
  }

  return { saved: true };
}
