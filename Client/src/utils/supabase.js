import { createClient } from "@supabase/supabase-js";

// IMPORTANT: Hardcoded values for demonstration only. In production, use environment variables.
const SUPABASE_URL = "https://awtthccfyrjdwgcjfuth.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3dHRoY2NmeXJqZHdnY2pmdXRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MDk2OTMsImV4cCI6MjA2MzM4NTY5M30.cGJ5EDDqZNJf7rATXkbhC3bzNF4Sa5_5yRXwg3qakBs";

console.log("Initializing Supabase with URL:", SUPABASE_URL);
console.log(
  "Using anon key starting with:",
  SUPABASE_ANON_KEY.substring(0, 10) + "..."
);

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Authentication helpers
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const resetPassword = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  return { data, error };
};

export const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

// Partnership data operations
export const getPartners = async () => {
  const { data, error } = await supabase.from("partners").select("*");
  return { data, error };
};

export const getPartnerById = async (id) => {
  const { data, error } = await supabase
    .from("partners")
    .select("*")
    .eq("id", id)
    .single();
  return { data, error };
};

export const createPartner = async (partnerData) => {
  const { data, error } = await supabase
    .from("partners")
    .insert([partnerData])
    .select();
  return { data, error };
};

export const updatePartner = async (id, updates) => {
  const { data, error } = await supabase
    .from("partners")
    .update(updates)
    .eq("id", id)
    .select();
  return { data, error };
};

export const deletePartner = async (id) => {
  const { error } = await supabase.from("partners").delete().eq("id", id);
  return { error };
};
