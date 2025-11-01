import { createClient } from "@/lib/supabase/client";
import { db } from "@/lib/db";
import { userRoles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { UserRole } from "@/app/types";
import { AuthResponse } from "@supabase/supabase-js";

const supabase = createClient();

export async function userSignUp(
  role: UserRole,
  email: string,
  password: string
) {
  const { data, error } = (await supabase.auth.signUp({
    email,
    password,
  })) as AuthResponse

  if (error) {
    console.error("Signup failed:", error.message);
    return { success: false, message: error.message };
  }

  const user = data.user;

  if (!user) {
    return { success: false, message: "No user returned from signup." };
  }

  const { error: roleError } = await supabase
    .from("user_roles")
    .insert([{ user_id: user.id, role }]);

  if (roleError) {
    console.error("Role assignment failed:", roleError.message);
    return { success: false, message: roleError.message };
  }

  return { success: true, user };
}

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getUserRole(userId: string): Promise<UserRole | null> {
  try {
    const [userRole] = await db
      .select()
      .from(userRoles)
      .where(eq(userRoles.userId, userId))
      .limit(1);

    return userRole?.role || null;
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
}

export async function isAdmin(userId: string): Promise<boolean> {
  const role = await getUserRole(userId);
  return role === "admin";
}

export async function isEditor(userId: string): Promise<boolean> {
  const role = await getUserRole(userId);
  return role === "admin" || role === "editor";
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();
  const admin = await isAdmin(user.id);

  if (!admin) {
    throw new Error("Forbidden: Admin access required");
  }

  return user;
}

export async function requireEditor() {
  const user = await requireAuth();
  const editor = await isEditor(user.id);

  if (!editor) {
    throw new Error("Forbidden: Editor access required");
  }

  return user;
}
