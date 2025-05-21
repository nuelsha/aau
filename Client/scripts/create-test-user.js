import { supabase } from "./src/utils/supabase.js";

// This script creates a test user in Supabase

const createTestUser = async () => {
  try {
    console.log("Creating test user...");

    const { data, error } = await supabase.auth.signUp({
      email: "test@example.com",
      password: "password123",
      options: {
        data: {
          name: "Test User",
          role: "admin",
        },
      },
    });

    if (error) {
      console.error("Error creating test user:", error.message);
      return;
    }

    console.log("Test user created successfully:", data);
    console.log("User can now login with:");
    console.log("Email: test@example.com");
    console.log("Password: password123");
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

createTestUser();
