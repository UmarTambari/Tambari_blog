"use server";

import { db } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { verifyPassword, setSession, clearSession } from "@/lib/auth";
import { redirect } from "next/navigation";

/**
 * Login action - validates credentials and creates session
 * Called from the login form
 */
export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validate input
  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    // Find admin user by email
    const [user] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, email))
      .limit(1);

    // Check if user exists and password matches
    if (!user || !(await verifyPassword(password, user.password))) {
      return { error: "Invalid email or password" };
    }

    // Create session (log them in)
    await setSession(user.id, user.email);

    // Redirect to admin dashboard
    redirect("/admin");
  } catch (error) {
    console.error("Login error:", error);
    return { error: "An error occurred during login" };
  }
}

/**
 * Logout action - clears session and redirects
 */
export async function logout() {
  await clearSession();
  redirect("/admin/login");
}

/**
 * Create first admin user (run this once to create your account)
 * You can delete this after creating your admin account
 */
export async function createFirstAdmin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  if (!email || !password || !name) {
    return { error: "All fields are required" };
  }

  try {
    // Check if any admin already exists
    const existingAdmins = await db.select().from(adminUsers).limit(1);
    
    if (existingAdmins.length > 0) {
      return { error: "Admin user already exists. Please login instead." };
    }

    // Import hashPassword here to avoid circular dependency
    const { hashPassword } = await import("@/lib/auth");
    const hashedPassword = await hashPassword(password);

    // Create admin user
    const [newAdmin] = await db
      .insert(adminUsers)
      .values({
        email,
        password: hashedPassword,
        name,
      })
      .returning();

    // Auto-login the new admin
    await setSession(newAdmin.id, newAdmin.email);

    redirect("/admin");
  } catch (error) {
    console.error("Create admin error:", error);
    return { error: "Failed to create admin user" };
  }
}